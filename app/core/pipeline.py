from app.core.photo_mask import make_photo_mask
from app.core.imagegen import dress

from app.models import Prompt


def make_photo(prompt: Prompt):
    original, mask = make_photo_mask(prompt.image.open("rb"))
    dress(original, mask, prompt)
