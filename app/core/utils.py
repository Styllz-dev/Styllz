from urllib.request import urlopen
from typing import Optional
from io import BytesIO


def format_params(value: Optional[str], template: Optional[str] = None) -> str:
    if value:
        if template:
            return template.format(value)
        else:
            return value


def download_image(url: str) -> BytesIO:
    buffer = BytesIO()
    buffer.write(urlopen(url).read())
    return buffer
