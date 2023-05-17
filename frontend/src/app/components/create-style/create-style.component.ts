import { Component, OnInit } from '@angular/core';
import { StylesApiService } from "../../services/api/styles-api.service";
import { PromptApiService } from "../../services/api/prompt-api.service";
import { ClothesApiService } from "../../services/api/clothes-api.service";
import { Styles } from "../../models/styles.model";
import { Prompt } from "../../models/prompt.model";
import { Clothes } from "../../models/clothes.model";
import { ClothesColorCombine } from "../../models/clothes-color-combine.model";

@Component({
  selector: 'app-create-style',
  templateUrl: './create-style.component.html',
  styleUrls: ['./create-style.component.css']
})
export class CreateStyleComponent implements OnInit {
  // Get from backend static parameters
  public styles_list_to_display: Styles[] = [];
  public clothes_list_to_display: string[] = [
    "/static/assets/clothes-images/blouse.png",
    "/static/assets/clothes-images/dress.png",
    "/static/assets/clothes-images/housecoat.png",
    "/static/assets/clothes-images/jacket.png",
    "/static/assets/clothes-images/pants.png",
    "/static/assets/clothes-images/robe.png",
    "/static/assets/clothes-images/scarf.png",
    "/static/assets/clothes-images/shirt.png",
    "/static/assets/clothes-images/shorts.png",
    "/static/assets/clothes-images/sweater.png",
    "/static/assets/clothes-images/t-shirt.png",
    "/static/assets/clothes-images/trousers.png",
    "/static/assets/clothes-images/trousers-with-side-pockets.png",
  ];

  // Post to backend parameters
  public chosen_style?: Styles;
  public name: string = "";
  public link: string = "";
  public details: string = "";
  public color_scheme: string = "";
  public imageUrl?: string;
  public clothes_array: ClothesColorCombine[] = [];
  public image?: File;

  // Progress bar parameters
  private current_fs="";
  private next_fs="";
  private prev_fs="";
  public progressbar_status=1;
  public progressbar_texts:string[] = [
      "photo",
      "style",
      "clothes",
      "details",
      "get",
      "post",
  ]
  //for pages in style-making
  public pages_count=6;
  public pages_names:string[]=[
      "",
      "Image Upload",
      "Style Choosing",
      "Choose Clothes and Color",
      "Set Details",
      "Find Best Image",
      "Post Image",
  ]


  constructor(
      private stylesApi : StylesApiService,
      private promptApi : PromptApiService) { }

  ngOnInit(): void {
    this.stylesApi.getAll().subscribe(
        data=> {
          this.styles_list_to_display = data;
        }
    )
  }

  is_all_chosen(): boolean {
    return this.chosen_style !== "";
  }
  create_style(): void {
    if (this.is_all_chosen()) {
      const data:Prompt = {
        type: this.chosen_style?.id,
        image: this.image,
        clothes: this.clothes_array,
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
    console.log(this.image)
  }

  go(id: number): void {
    this.progressbar_status=id;
  }
  finish(): void {
    // TODO сделать
    return;
  }
  post(): void {

  }

  isContainClothesItem(index: number): boolean {
    for (let i=0;i<this.clothes_array.length;++i)
      if(this.clothes_array[i].clothing==index)
        return true;
    return false;
  }
  addClothesItem(index: number): void {
    if (!this.isContainClothesItem(index)) {
      this.clothes_array.push({clothing: index, color: "none"});
    } else {
      for (let i = 0; i < this.clothes_array.length; ++i)
        if (this.clothes_array[i].clothing == index)
          this.clothes_array.splice(i, 1);
    }
  }
  updateClothesImage(index:number): void {
    if (this.isContainClothesItem(index)) {
      // @ts-ignore
      let value=document.getElementById("input_"+index).value;
      for (let i=0; i<this.clothes_array.length;++i)
        if(this.clothes_array[i].clothing==index) this.clothes_array[i].color=value;
    }
  }
}
