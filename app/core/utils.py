from django.core.files.temp import NamedTemporaryFile
from django.core.files import File

from urllib.request import urlopen
from typing import Optional


def format_params(value: Optional[str], template: Optional[str] = None) -> str:
    if value:
        if template:
            return template.format(value)
        else:
            return value


def download_image(url: str) -> File:
    img_tmp = NamedTemporaryFile(delete=True)
    with urlopen(url) as uo:
        assert uo.status == 200
        img_tmp.write(uo.read())
        img_tmp.flush()
    return File(img_tmp, name=f"{img_tmp.name[1:]}.png")
