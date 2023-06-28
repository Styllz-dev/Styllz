from app.core.utils import save_image

from app.models import Prompt, Result

from django.conf import settings
from PIL import Image
import webuiapi


def make_photo(prompt: Prompt):
    if settings.SD_API["host"]:
        api = webuiapi.WebUIApi(**settings.SD_API)
        result = api.txt2img(
            prompt=f"a full-length portrait photo with face of (styllzuser{settings.SD_USER} man:1.2) wearing {prompt.style} {prompt.details} <lora:styllzuser{settings.SD_USER}:1>",
            negative_prompt="(blue eyes, semi-realistic, cgi, 3d, render, sketch, cartoon, drawing, anime, duplicate:1.4), mustache, fat, text, cropped, out of frame, worst quality, low quality, jpeg artifacts, ugly, morbid, mutilated, extra fingers, mutated hands, poorly drawn hands, poorly drawn face, mutation, deformed, blurry, dehydrated, bad anatomy, bad proportions, extra limbs, cloned face, disfigured, gross proportions, malformed limbs, missing arms, missing legs, extra arms, extra legs, fused fingers, too many fingers, long neck",
            seed=3362803203,
            cfg_scale=5,
            sampler_index='DPM++ SDE Karras',
            steps=25,
            width=640,
            height=720,
            enable_hr=True,
            hr_scale=2,
            hr_upscaler=webuiapi.HiResUpscaler.Latent,
            denoising_strength=0.7,
            ).image
    else:
        result = Image.new("RGB", (1280, 1440))

    return Result.objects.create(prompt=prompt, image=save_image(result))
