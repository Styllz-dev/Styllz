from django.conf import settings

from utils import format_params

from io import BytesIO
from dataclasses import dataclass, field
import openai

from typing import Optional, List


@dataclass
class Clothing:
    name: str
    color: Optional[str] = None
    details: Optional[str] = None

    def __str__(self):
        return f"{format_params(self.color, '{} ')}{format_params(self.details, '{} ')}{self.name}"


@dataclass
class Request:
    type: str
    clothes: List[Clothing] = field(default_factory=list)
    colorscheme: Optional[str] = None
    details: Optional[str] = None


def _make_prompt(request: Request) -> str:
    return f"Person dressed in {format_params(request.colorscheme, '{} colorscheme ')}{format_params(request.details, '{} ')} {request.type} style{format_params(''.join(map(str, request.clothes)), ' with: {}')}."


def edit(original: BytesIO, mask: BytesIO, prompt: str) -> List[str]:
    return list(map(lambda img: img["url"], openai.Image.create_edit(
        image=original.getvalue(),
        mask=mask.getvalue(),
        prompt=prompt,
        n=4,
        size=settings.IMAGEGEN_SIZE
    )["data"]))


def dress(original: BytesIO, mask: BytesIO, request: Request) -> List[str]:
    return edit(original, mask, _make_prompt(request))

