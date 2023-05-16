import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import {Clothes} from "../../models/clothes.model";
import {ClothesApiService} from "../../services/api/clothes-api.service";

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css']
})
export class StartPageComponent implements OnInit {
  public clothes = [
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
  ]
  public clothesIcons:string[] = [];
  public clothesNames:string[] = [];
  public card_state = "pack1";
  constructor(public router: Router, public route: ActivatedRoute, public clothesApi:ClothesApiService) { }

  ngOnInit(): void {
    this.clothesApi.getAll().subscribe(
        data=>{
          for (let i=0;i<data.length;++i) {
            // @ts-ignore
            this.clothesIcons.push(data[i].icon);
            // @ts-ignore
            this.clothesNames.push(data[i].icon);
          }
        }
    )
    addEventListener('scroll', function () {
      // @ts-ignore
      let y = document.getElementById('clothes-array').getBoundingClientRect().y;
      y = (y - 500) / 30 - 50;
      // @ts-ignore
      document.getElementById('clothes-array').style.left = y + '%';
    })

    // @ts-ignore
    let y = document.getElementById('clothes-array').getBoundingClientRect().y;
    y = (y - 500) / 30 - 50;
    // @ts-ignore
    document.getElementById('clothes-array').style.left = y + '%';
  }

  change_card_state(new_state:string): void {
    if (window.innerWidth >= 600 && new_state!=this.card_state) {
      // @ts-ignore
      for (let i = 0; i < document.getElementById(this.card_state).children.length; ++i) {
        // @ts-ignore
        document.getElementById(this.card_state).children[i].style.animationName = 'none';
      }

      // @ts-ignore
      document.getElementById(new_state).style.display = 'block';

      // @ts-ignore
      for (let i = 0; i < document.getElementById(new_state).children.length; ++i) {
        // @ts-ignore
        document.getElementById(new_state).children[i].style.animationDuration = '1s';
        // @ts-ignore
        let left = document.getElementById(new_state).children[i].getBoundingClientRect().x;
        // @ts-ignore
        let top = document.getElementById(new_state).children[i].getBoundingClientRect().y;
        if (left <= window.innerWidth / 2) {
          // @ts-ignore
          document.getElementById(new_state).children[i].style.animationName = 'left-in';
        } else {
          // @ts-ignore
          document.getElementById(new_state).children[i].style.animationName = 'right-in';
        }
      }

      // @ts-ignore
      document.getElementById(this.card_state).style.display = 'none';
      this.card_state = new_state;
    }
  }

  check_window_size(): boolean {
    return window.innerWidth>=600;
  }

  scroll_container2(): void {
    window.scrollTo({
      // @ts-ignore
      top: document.getElementById('container2').offsetTop,
      behavior: "smooth"
    });
  }
}
