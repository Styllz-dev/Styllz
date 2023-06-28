from django.core.files.temp import NamedTemporaryFile
from django.core.files import File

from PIL import Image
from typing import Optional


def format_params(value: Optional[str], template: Optional[str] = None) -> str:
    if value:
        if template:
            return template.format(value)
        else:
            return value


def save_image(img: Image) -> File:
    img_tmp = NamedTemporaryFile(delete=True)
    img.save(img_tmp, format="PNG")
    img_tmp.flush()
    return File(img_tmp, name=f"{img_tmp.name[1:]}.png")
