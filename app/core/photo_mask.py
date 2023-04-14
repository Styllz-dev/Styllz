from io import BytesIO

import cv2
import mediapipe as mp
import numpy as np
from PIL import Image


def make_photo_mask(stream: BytesIO) -> BytesIO:
    raw_image = Image.open(stream)

    frame = np.asarray(raw_image)

    # frame = cv2.imread("input.jpg", cv2.IMREAD_UNCHANGED)
    # print(frame.shape[0], frame.shape[1])
    # for x in range(frame.shape[0]):
    #     for y in range(200):
    #         result[x][y] = [frame[x][y][0], frame[x][y][1], frame[x][y][2], 0]

    # cv2.imwrite('outputT.png', result)

    mp_drawing = mp.solutions.drawing_utils
    mp_holistic = mp.solutions.holistic

    holistic = mp_holistic.Holistic(min_detection_confidence=0.5, min_tracking_confidence=0.5)

    # Recolor Feed
    image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    # Make Detections
    results = holistic.process(image)
    # print(results.pose_landmarks)
    # face_landmarks, pose_landmarks, left_hand_landmarks, right_hand_landmarks
    # Recolor image back to BGR for rendering
    image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)

    # Draw face landmarks
    mp_drawing.draw_landmarks(image, results.face_landmarks, mp_holistic.FACEMESH_TESSELATION,
                              mp_drawing.DrawingSpec(color=(80, 110, 10), thickness=1, circle_radius=1),
                              mp_drawing.DrawingSpec(color=(80, 256, 121), thickness=1, circle_radius=1)
                              )

    # Right hand
    # mp_drawing.draw_landmarks(image, results.right_hand_landmarks, mp_holistic.HAND_CONNECTIONS)

    # Left Hand
    # mp_drawing.draw_landmarks(image, results.left_hand_landmarks, mp_holistic.HAND_CONNECTIONS)

    # Pose Detections
    mp_drawing.draw_landmarks(image, results.pose_landmarks, mp_holistic.POSE_CONNECTIONS)
    landmark = results.pose_landmarks.landmark

    def distance(f, s, shape=frame.shape):
        x1, y1 = landmark[f].x * shape[1], landmark[f].y * shape[0]
        x2, y2 = landmark[s].x * shape[1], landmark[s].y * shape[0]
        return ((x1 - x2) ** 2 + (y1 - y2) ** 2) ** 0.5

    presence = 0.25
    left_border = landmark[12].x * (1 - presence)
    right_border = landmark[11].x * (1 + presence)

    middle = (left_border + right_border) / 2

    def InBorder(landmarkIndex):
        return (left_border < landmark[landmarkIndex].x < right_border) and landmark[landmarkIndex].y < landmark[0].y

    pose_validated = False

    if (landmark[12].y > landmark[24].y > landmark[26].y > landmark[
        28].y and  # left side vertical
            landmark[11].y > landmark[23].y > landmark[25].y > landmark[
                27].y and  # right side vertical
            landmark[12].x < middle and landmark[24].x < middle and landmark[26].x < middle and landmark[
                28].x < middle and  # left side horizontal
            landmark[11].x > middle and landmark[23].x > middle and landmark[25].x > middle and landmark[
                27].x > middle and  # right side horizontal
            landmark[8].x > landmark[12].x and landmark[8].y > landmark[12].y and landmark[8].x < landmark[7].x <
            landmark[11].x and landmark[7].y > landmark[11].y and  # head
            InBorder(14) and InBorder(16) and InBorder(18) and InBorder(20) and InBorder(22) and  # left hand
            InBorder(13) and InBorder(15) and InBorder(17) and InBorder(19) and InBorder(21) and  # right hand
            InBorder(24) and InBorder(26) and InBorder(28) and InBorder(30) and InBorder(32) and  # left leg
            InBorder(23) and InBorder(25) and InBorder(27) and InBorder(29) and InBorder(29)  # right leg
    ):
        pose_validated = True

    pose_validated = True
    cutting_coef = 0.05
    if (pose_validated):
        top_border = max(landmark[12].y - cutting_coef, 0)
        bottom_border = min(max([landmark[27].y, landmark[28].y, landmark[29].y, landmark[30].y, landmark[31].y,
                                 landmark[32].y]) + cutting_coef, 1)

        # print(top_border, bottom_border)
        # cutting person

        # atODO validate photo

        result = np.zeros((frame.shape[0], frame.shape[1], 4), dtype=np.uint8)

        for x in range(frame.shape[1]):
            for y in range(frame.shape[0]):
                result[y][x] = [frame[y][x][0], frame[y][x][1], frame[y][x][2], 255]
        for x in range(int(left_border * frame.shape[1]), int(right_border * frame.shape[1])):
            for y in range(int(top_border * frame.shape[0]), int(bottom_border * frame.shape[0])):
                result[y][x] = [frame[y][x][0], frame[y][x][1], frame[y][x][2], 0]

        # cv2.imwrite('output.png', result)

    else:
        pass
        # print("Wrong pose")

    final_image = Image.fromarray(result)

    final_stream = BytesIO()
    final_image.save(final_stream, format="PNG")

    return final_stream

    # cv2.imwrite('outputL.png', image)

    # cv2.waitKey(0)
    # cv2.destroyWindow("python")

    # poseDetector = mp.solutions.hands.Hands(
    #     static_image_mode=True,
    #     max_num_hands=1,
    #     min_detection_confidence=0.5)
    # image = cv2.imread("input.jpg")
    # flipped = np.fliplr(image)
    # flippedRGB = cv2.cvtColor(flipped, cv2.COLOR_BGR2RGB)
    # results = poseDetector.process(flippedRGB)
    # if results.multi_hand_landmarks is not None:
    #     def distance(f, s, landmark=results.multi_hand_landmarks[0].landmark, shape=flippedRGB.shape):
    #         x1, y1 = landmark[f].x * shape[1], landmark[f].y * shape[0]
    #         x2, y2 = landmark[s].x * shape[1], landmark[s].y * shape[0]
    #         return ((x1 - x2) ** 2 + (y1 - y2) ** 2) ** 0.5
    #
    #     f1 = distance(0, 8)
    #     f2 = distance(0, 12)
    #     f3 = distance(0, 16)
    #     f4 = distance(0, 20)
    #     ft = distance(0, 1) + distance(1, 2) + distance(2, 3) + distance(3, 4)
    #
    #     avgf = (f1 + f2 + f3 + f4) / 4
    #     # print(f1, f2, f3, f4, ft, avgf)
    #
    #     ratio_diff = 0.3
    #
    #     if abs(f1 / avgf - 1) < ratio_diff and abs(f2 / avgf - 1) < ratio_diff and abs(
    #             f3 / avgf - 1) < ratio_diff and abs(f4 / avgf - 1) < ratio_diff:
    #         if (ft > avgf):
    #             print("Stone")
    #         else:
    #             print("Paper")
    #     else:
    #         print("Sissors")
    #
    # # res_image = cv2.cvtColor(np.fliplr(flippedRGB), cv2.COLOR_RGB2BGR)
    # # print(results.multi_handedness)
    # # cv2.imshow("Hands", res_image)
    # # cv2.waitKey(0)
    # poseDetector.close()
