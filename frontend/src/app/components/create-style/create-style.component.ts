import { Component, OnInit } from '@angular/core';
import { StylesApiService } from "../../services/api/styles-api.service";
import { Styles } from "../../models/styles.model";

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
  public styles: string[] = [];
  public chosen_style: string = "";
  public name: string = "";
  public link: string = "";
  public imageUrl?: string;

  constructor(private stylesApi : StylesApiService) { }

  ngOnInit(): void {
    this.stylesApi.getAll().subscribe(
        data=> {
          for (let i = 0; i < data.length; ++i) {
              // @ts-ignore
              this.styles.push(data[i].name)
              console.log(data[i].name);
            }
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

    }
  }

  // @ts-ignore
  onFileSelected(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imageUrl = reader.result as string;
    };
  }
}
