import { Component, OnInit } from '@angular/core';
import { StylesApiService } from "../../services/api/styles-api.service";
import { PromptApiService } from "../../services/api/prompt-api.service";
import { Styles } from "../../models/styles.model";
import {Prompt} from "../../models/prompt.model";

@Component({
  selector: 'app-create-style',
  templateUrl: './create-style.component.html',
  styleUrls: ['./create-style.component.css']
})
export class CreateStyleComponent implements OnInit {
  // public styles: string[] = [
  //   "Деловой стиль",
  //   "Пижамный стиль",
  //   "Классический стиль",
  //   "Спортивный стиль",
  //   "Street style",
  //   "Пляжный стиль",
  //   "Итальянский стиль",
  //   "Романтический стиль",
  //   "Оверсайз",
  //   "Минимализм",
  //   "Ретро",
  //   "Casual",
  //   "Гламур",
  //   "Business Casual",
  //   "Городской шик",
  // ]
  public styles: Styles[] = [];
  public chosen_style?: Styles;
  public name: string = "";
  public link: string = "";
  public details: string = "";
  public color_scheme: string = "";
  public imageUrl?: string;
  public clothes_array: number[] = [];
  public image?: File;

  constructor(private stylesApi : StylesApiService, private promptApi : PromptApiService) { }

  ngOnInit(): void {
    this.stylesApi.getAll().subscribe(
        data=> {
          this.styles = data;
        }
    )
  }

  image_chosen(): boolean {
    try {
      // @ts-ignore
      this.link = document.getElementById('image-input').value;
    } catch (mes) {
      return false;
    }
    if (this.link !== '')
      return true;
    return false;
  }
  show_list() {
    // @ts-ignore
    document.getElementById('styles-list').style.display = 'block';
  }
  hide_list() {
    // @ts-ignore
    document.getElementById('styles-list').style.display = 'none';
  }
  is_all_chosen(): boolean {
    return this.name !== "" && this.chosen_style !== "";
  }
  create_style(): void {
    if (this.is_all_chosen()) {
      const data:Prompt = {
        type: this.chosen_style?.id,
        image: this.image,
        clothes: this.clothes_array,
        colorscheme: this.color_scheme,
        details: this.details,
      }
      let formData = new FormData()
      for (const [name, value] of Object.entries(data)) {
        if (value && value.length !== 0) {
          formData.append(name, value);
        }
      }

      this.promptApi.create(formData).subscribe(
          response => {
            console.log(response)
          }
      )
    }
  }

  // @ts-ignore
  onFileSelected(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    this.image = file;
    reader.onload = () => {
      this.imageUrl = reader.result as string;
    };
  }
}
