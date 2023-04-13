from typing import Optional


def format_params(value: Optional[str], template: Optional[str] = None) -> str:
    if value:
        if template:
            return template.format(value)
        else:
            return value
