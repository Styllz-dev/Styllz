from django.contrib import admin
from app.models import Style, Clothing, Prompt, Result


@admin.register(Style, Clothing)
class BaseModel(admin.ModelAdmin):
    def get_list_display(self, request):
        return [field.name for field in self.model._meta.concrete_fields]


class ResultAdmin(admin.TabularInline):
    model = Result


@admin.register(Prompt)
class PromptModel(BaseModel):
    inlines = [ResultAdmin]
