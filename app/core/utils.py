from django.core.files.temp import NamedTemporaryFile
from django.core.files import File

from base64 import b64decode
from typing import Optional


def format_params(value: Optional[str], template: Optional[str] = None) -> str:
    if value:
        if template:
            return template.format(value)
        else:
            return value


def download_image(source: str) -> File:
    img_tmp = NamedTemporaryFile(delete=True)
    img_tmp.write(b64decode(source))
    img_tmp.flush()
    return File(img_tmp, name=f"{img_tmp.name[1:]}.png")
