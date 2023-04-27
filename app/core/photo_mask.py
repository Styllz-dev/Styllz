import cv2
import mediapipe as mp
import numpy as np
from io import BytesIO
from typing import Tuple
from PIL import Image
from app.core.exceptions import PoseException, PhotoException

maximum_resolution = 960
minimum_resolution = 128

def make_photo_mask(stream: BytesIO) -> Tuple[BytesIO, BytesIO]:
    # region Image processing
    raw_image = Image.open(stream)

    x, y = raw_image.size
    min_resolution_raw_image = min(x, y)
    if (min_resolution_raw_image > maximum_resolution):
        k = maximum_resolution/min_resolution_raw_image
        raw_image = raw_image.resize((int(x * k), int(y * k)), Image.ANTIALIAS) # Image compression

    frame = np.asarray(raw_image)
    mp_holistic = mp.solutions.holistic
    holistic = mp_holistic.Holistic(min_detection_confidence=0.5, min_tracking_confidence=0.5)
    # endregion

    # region Pose detection
    frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    results = holistic.process(frame)
    frame = cv2.cvtColor(frame, cv2.COLOR_RGB2BGR)
    landmark = results.pose_landmarks.landmark
    # endregion

    # region Determining borders
    distance = abs(landmark[11].x - landmark[12].x)
    presence_x = distance / 2
    presence_y = presence_x / 4
    left_border = landmark[12].x - presence_x
    right_border = landmark[11].x + presence_x
    middle = (left_border + right_border) / 2
    top_border = max((landmark[12].y + landmark[11].y + (landmark[10].y + landmark[10].y) / 2) / 3 - presence_y, 0)
    bottom_border = min(max([landmark[27].y, landmark[28].y, landmark[29].y, landmark[30].y, landmark[31].y,
                             landmark[32].y]) + presence_y, 1)
    # endregion

    _validate_pose(landmark, left_border, middle, right_border)

    frame_with_hole = _cut_person(frame, right_border, left_border, bottom_border, top_border)

    frame, frame_with_hole = _crop_frames(frame, frame_with_hole, landmark, bottom_border, left_border, middle,
                                          right_border, presence_x, presence_y)

    # region Returning frame
    final_frame = Image.fromarray(frame)
    final_stream_frame = BytesIO()
    final_frame.save(final_stream_frame, format="PNG")
    final_frame_with_hole = Image.fromarray(frame_with_hole)
    final_stream_frame_with_hole = BytesIO()
    final_frame_with_hole.save(final_stream_frame_with_hole, format="PNG")
    return final_stream_frame, final_stream_frame_with_hole
    # endregion


def _validate_pose(landmark, left_border, middle, right_border) -> bool:
    def in_border(landmark_indexes):
        for landmark_index in landmark_indexes:
            if not (left_border < landmark[landmark_index].x < right_border and
                    landmark[landmark_index].y > landmark[0].y):
                return False
        return True

    left_side_vertical = landmark[12].y < landmark[24].y < landmark[26].y < landmark[28].y
    right_side_vertical = landmark[11].y < landmark[23].y < landmark[25].y < landmark[27].y
    left_side_horizontal = landmark[12].x < middle and landmark[24].x < middle and landmark[26].x < middle and \
                           landmark[28].x < middle
    right_side_horizontal = landmark[11].x > middle and landmark[23].x > middle and landmark[25].x > middle and \
                            landmark[27].x > middle
    head_horizontal = landmark[12].x < landmark[8].x < landmark[7].x < landmark[11].x
    head_vertical = landmark[8].y < landmark[12].y and landmark[7].y < landmark[11].y
    left_hand = in_border([14, 16, 18, 20, 22])
    right_hand = in_border([13, 15, 17, 19, 21])
    left_leg = in_border([24, 26, 28, 30, 32])
    right_leg = in_border([23, 25, 27, 29, 31])

    if (left_side_vertical and right_side_vertical and left_side_horizontal and right_side_horizontal
            and head_horizontal and head_vertical and left_hand and right_hand and left_leg and right_leg):
        return True
    else:
        raise PoseException(
            f"{left_side_vertical}, {right_side_vertical}, {left_side_horizontal}, {right_side_horizontal}, {head_horizontal}, {head_vertical}, {left_hand}, {right_hand}, {left_leg}, {right_leg}")


def _cut_person(frame, right_border, left_border, bottom_border, top_border):
    result = np.zeros((frame.shape[0], frame.shape[1], 4), dtype=np.uint8)
    for x in range(frame.shape[1]):
        for y in range(frame.shape[0]):
            result[y][x] = [frame[y][x][0], frame[y][x][1], frame[y][x][2], 255]
    for x in range(int(left_border * frame.shape[1]), int(right_border * frame.shape[1])):
        for y in range(int(top_border * frame.shape[0]), int(bottom_border * frame.shape[0])):
            result[y][x] = [frame[y][x][0], frame[y][x][1], frame[y][x][2], 0]
    return result


def _crop_frames(frame, frame_with_hole, landmark, bottom_border, left_border, middle, right_border, presence_x, presence_y):
    cropping_top = int((landmark[0].y - presence_x) * frame.shape[1])
    cropping_bottom = int((bottom_border + presence_y) * frame.shape[0])
    if cropping_top < 0 or cropping_bottom > frame.shape[0]:
        raise PhotoException("Bad top/bottom borders")

    height = cropping_bottom - cropping_top # Height of the quad

    if (height < minimum_resolution):
        raise PhotoException()

    half_height = int(height / 2)
    cropping_left = int(middle * frame.shape[1]) - half_height
    cropping_right = cropping_left + height
    if (left_border <= 0 or right_border >= 1):
        raise PhotoException("Bad left/right borders")

    if cropping_left < 0 or cropping_right > frame.shape[1]:
        raise PhotoException("Bad left/right borders")
        # gap = int((height - (cropping_right - cropping_left)) / 2)
        # new_frame = np.zeros((frame.shape[0], frame.shape[1], 4), dtype=np.uint8)
        # new_frame_with_hole = np.zeros((frame.shape[0], frame.shape[1], 4), dtype=np.uint8)
        # for x in range(height):
        #     for y in range(height):
        #         if (x < gap or x >= gap + abs(cropping_right - cropping_left)):
        #             new_frame[y][x] = [0, 0, 0, 255]
        #             new_frame_with_hole[y][x] = [0, 0, 0, 255]
        #         else:
        #             new_frame[y][x] = [frame[y + cropping_top][x - gap][0], frame[y + cropping_top][x - gap][1],
        #                                frame[y + cropping_top][x - gap][2], 255]
        #             # print(y + cropping_top, x - gap)
        #             new_frame_with_hole[y][x] = [frame_with_hole[y + cropping_top][x - gap][0],
        #                                          frame_with_hole[y + cropping_top][x - gap][1],
        #                                          frame_with_hole[y + cropping_top][x - gap][2], 255]

    frame = frame[cropping_top:cropping_bottom, cropping_left:cropping_right]
    frame_with_hole = frame_with_hole[cropping_top:cropping_bottom, cropping_left:cropping_right]
    return frame, frame_with_hole


# img = cv2.imread("lesha.jpg")
#
# imgf = Image.fromarray(img)
# final_stream_frame = BytesIO()
# imgf.save(final_stream_frame, format="JPEG")
#
# a, b = make_photo_mask(final_stream_frame)
# res = Image.open(b)
# frameres = np.asarray(res)
#
# cv2.imwrite("output.png", frameres)
