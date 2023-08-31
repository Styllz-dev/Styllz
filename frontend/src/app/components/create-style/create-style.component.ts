import { Component, OnInit } from '@angular/core';
import {PromptApiService} from "../../services/api/prompt-api.service";
import {Prompt} from "../../models/prompt.model";

const loader_text_count:number=8;

@Component({
  selector: 'app-create-style',
  templateUrl: './create-style.component.html',
  styleUrls: ['./create-style.component.css']
})
export class CreateStyleComponent implements OnInit {
  public styles = [
      "/assets/styles-images/sport.png",
      "/assets/styles-images/casual.png",
      "/assets/styles-images/business.png",
      "/assets/styles-images/classic.png",
      "/assets/styles-images/glamour.png",
      "/assets/styles-images/oversize.png",
  ];
  public styles_text = [
    "sport",
    "casual",
    "business",
    "classic",
    "glamour",
    "oversize",
  ]
  public chosen_style: number = -1;
  public text: string="";

  public loader_text_type:number=1;
  public made_first_create:boolean=false;

  private formData:any;
  public images_to_display?: string[] = [];


  constructor(
      private promptApi : PromptApiService,
  ) { }

  ngOnInit(): void {
    this.change_type();
  }


  get_prompt() {
    // @ts-ignore
    if(document.getElementById('prompt').value.length>200) {
      // @ts-ignore
      document.getElementById('prompt').value=document.getElementById('prompt').value.substr(0,200);
    } else {
      // @ts-ignore
      this.text = document.getElementById('prompt').value;
    }
  }
  chose_img(i:number) {
    this.chosen_style=i;
  }
  is_all_chosen() {
    if(this.chosen_style!=-1&&this.text.length>0) return true;
    return false;
  }

  change_type(): void {
    this.loader_text_type=1;
    function change(that: CreateStyleComponent, status:string){
      that.loader_text_type%=loader_text_count;
      that.loader_text_type+=1;
      setTimeout(change, 3000, that)
    }
    setTimeout(change, 3000, this);
  }
  get_drink(): string {
    function getRandomInt(max:number) {
      return Math.floor(Math.random() * max);
    }
    var type=getRandomInt(5);
    if(type==1) return "чай";
    if(type==2) return "кофе";
    if(type==3) return "лимонад";
    if(type==4) return "воду";
    if(type==5) return "квас";
    return "кофе";
  }

  generate(): void{
    this.promptApi.create(this.formData).subscribe(
        response => {
          function get_images(that: CreateStyleComponent) {
            that.promptApi.get(response.id).subscribe(
                response=> { // @ts-ignore
                  if (response.results!=undefined&&response.results.length>0) {
                    console.log(response);
                    that.images_to_display = response.results;
                  }  else if (response.error) {
                    console.log(response.error);
                  }  else {
                    setTimeout(get_images, 200, that)
                  }
                }
            )
          }
          setTimeout(get_images, 200, this);
        }
    )
  }
  create(): void {
    this.made_first_create=true;
    if (this.is_all_chosen()) {
      const data:Prompt = {
        style: this.styles_text[this.chosen_style],
        details: this.text,
      }
      this.formData = new FormData()
      for (const [name, value] of Object.entries(data)) {
        if (value && value.length !== 0) {
          this.formData.append(name, value);
        }
      }

      this.generate();
    }
  }
  get_next(): void {
    this.loader_text_type=1;
    if(this.images_to_display!=undefined&&this.images_to_display.length>0) this.images_to_display.splice(0,1);
    if(this.images_to_display!=undefined&&this.images_to_display.length==0) this.create();
  }
}
