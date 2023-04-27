from app.models import Prompt, Result
from django.core.files import File
from django.conf import settings
from django.db import models

from app.core.utils import format_params, download_image

from io import BytesIO
from typing import Iterator
import openai


def _make_prompt(prompt: Prompt) -> str:
    return f"Person dressed in {format_params(prompt.colorscheme, '{} colorscheme ')}{format_params(prompt.details, '{} ')} {prompt.type} style{format_params(''.join(map(str, prompt.clothes.all())), ' with: {}')}."


def dress(original: BytesIO, mask: BytesIO, prompt: Prompt) -> models.QuerySet[Result]:
    #urls = list(map(lambda img: img["url"], openai.Image.create_edit(
    #    image=original.getvalue(),
    #    mask=mask.getvalue(),
    #    prompt=_make_prompt(prompt),
    #    n=4,
    #    size=settings.IMAGEGEN_SIZE
    #)["data"]))

    urls = ['https://oaidalleapiprodscus.blob.core.windows.net/private/org-3wJbIg1wFsiBal0vawnThjbX/user-jwsphlb4zF6HmS9huUVCZppb/img-621pw07kYJBMYwABwkYVkouk.png?st=2023-04-27T07%3A54%3A03Z&se=2023-04-27T09%3A54%3A03Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-04-27T07%3A44%3A42Z&ske=2023-04-28T07%3A44%3A42Z&sks=b&skv=2021-08-06&sig=7EfdmBNwdkIplRVzRNV/T56aEVb/30G0U0YkflURJGA%3D', 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-3wJbIg1wFsiBal0vawnThjbX/user-jwsphlb4zF6HmS9huUVCZppb/img-2qDZcB16PS1ogYJ1Kt2m60PX.png?st=2023-04-27T07%3A54%3A03Z&se=2023-04-27T09%3A54%3A03Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-04-27T07%3A44%3A42Z&ske=2023-04-28T07%3A44%3A42Z&sks=b&skv=2021-08-06&sig=AH03CNrv6xDAKSmtNuHSIV0KpXNlGSYgRv855dNUXQU%3D', 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-3wJbIg1wFsiBal0vawnThjbX/user-jwsphlb4zF6HmS9huUVCZppb/img-LGpZUsAvgSGE4EzVd9URt5VX.png?st=2023-04-27T07%3A54%3A03Z&se=2023-04-27T09%3A54%3A03Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-04-27T07%3A44%3A42Z&ske=2023-04-28T07%3A44%3A42Z&sks=b&skv=2021-08-06&sig=AFh60OkTEf8gxMdBZbA4nc5XIiCCoYyofFLInGQj2rc%3D', 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-3wJbIg1wFsiBal0vawnThjbX/user-jwsphlb4zF6HmS9huUVCZppb/img-3sOeVXcx7aCl5WV66fpCPMn6.png?st=2023-04-27T07%3A54%3A03Z&se=2023-04-27T09%3A54%3A03Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-04-27T07%3A44%3A42Z&ske=2023-04-28T07%3A44%3A42Z&sks=b&skv=2021-08-06&sig=L9NkoAc/GCCUwkKjRiOmcJp3KYSAu3MANbY8PYYR86Q%3D']

    for url in urls:
        print(url)
        image = download_image(url)
        Result.objects.create(prompt=prompt, image=image)
    return Result.objects.filter(prompt=prompt)

