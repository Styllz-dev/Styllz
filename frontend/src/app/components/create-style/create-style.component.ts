import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-style',
  templateUrl: './create-style.component.html',
  styleUrls: ['./create-style.component.css']
})
export class CreateStyleComponent implements OnInit {
  public styles = [
      "/static/assets/styles-images/sport.png",
      "/static/assets/styles-images/casual.png",
      "/static/assets/styles-images/business.png",
      "/static/assets/styles-images/classic.png",
      "/static/assets/styles-images/glamour.png",
      "/static/assets/styles-images/oversize.png",
  ];
  public styles_text = [
    "sport",
    "casual",
    "business",
    "classic",
    "glamour",
    "oversize",
  ]
  public chosen_image: number = -1;
  public prompt: string="";

  constructor() { }

  ngOnInit(): void {
  }

  get_prompt() {
    // @ts-ignore
    if(document.getElementById('prompt').value.length>200) {
      // @ts-ignore
      document.getElementById('prompt').value=document.getElementById('prompt').value.substr(0,200);
    } else {
      // @ts-ignore
      this.prompt = document.getElementById('prompt').value;
    }
  }
  chose_img(i:number) {
    this.chosen_image=i;
  }
  is_all_chosen() {
    if(this.chosen_image!=-1&&this.prompt.length>0) return true;
    return false;
  }

  create(): void {

  }
}
