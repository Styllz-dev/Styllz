from app.core.photo_mask import make_photo_mask
from app.core.imagegen import dress
from app.core.exceptions import MaskException

from app.models import Prompt


def make_photo(prompt: Prompt):
    try:
        original, mask = make_photo_mask(prompt.image.open("rb"))
        dress(original, mask, prompt)
    except MaskException as ex:
        prompt.error = str(ex)
        prompt.save()
