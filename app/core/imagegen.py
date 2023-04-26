from app.models import Prompt, Result
from django.core.files import File
from django.conf import settings
from django.db import models

from app.core.utils import format_params, download_image

from io import BytesIO
import openai


def _make_prompt(prompt: Prompt) -> str:
    return f"Person dressed in {format_params(prompt.colorscheme, '{} colorscheme ')}{format_params(prompt.details, '{} ')} {prompt.type} style{format_params(''.join(map(str, prompt.clothes)), ' with: {}')}."


def dress(original: BytesIO, mask: BytesIO, prompt: Prompt) -> models.QuerySet[Result]:
    urls = list(map(lambda img: img["url"], openai.Image.create_edit(
        image=original.getvalue(),
        mask=mask.getvalue(),
        prompt=_make_prompt(prompt),
        n=4,
        size=settings.IMAGEGEN_SIZE
    )["data"]))

    for url in urls:
        image = download_image(url)
        Result.objects.create(prompt=prompt, image=File(image))

    return Result.objects.filter(prompt=prompt)

