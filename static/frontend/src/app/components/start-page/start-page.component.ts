import { Component, OnInit } from '@angular/core';
import { Profile } from "../../interface/profile";
import {ActivatedRoute, Router} from "@angular/router";
import {ProfileService} from "../../services/profile.service";

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css']
})
export class StartPageComponent implements OnInit {
  public clothes = [
    "/static/frontend/dist/assets/clothes-images/blouse.png",
    "/static/frontend/dist/assets/clothes-images/dress.png",
    "/static/frontend/dist/assets/clothes-images/housecoat.png",
    "/static/frontend/dist/assets/clothes-images/jacket.png",
    "/static/frontend/dist/assets/clothes-images/pants.png",
    "/static/frontend/dist/assets/clothes-images/robe.png",
    "/static/frontend/dist/assets/clothes-images/scarf.png",
    "/static/frontend/dist/assets/clothes-images/shirt.png",
    "/static/frontend/dist/assets/clothes-images/shorts.png",
    "/static/frontend/dist/assets/clothes-images/sweater.png",
    "/static/frontend/dist/assets/clothes-images/t-shirt.png",
    "/static/frontend/dist/assets/clothes-images/trousers.png",
    "/static/frontend/dist/assets/clothes-images/trousers-with-side-pockets.png",
    "/static/frontend/dist/assets/clothes-images/blouse.png",
    "/static/frontend/dist/assets/clothes-images/dress.png",
    "/static/frontend/dist/assets/clothes-images/housecoat.png",
    "/static/frontend/dist/assets/clothes-images/jacket.png",
    "/static/frontend/dist/assets/clothes-images/pants.png",
    "/static/frontend/dist/assets/clothes-images/robe.png",
    "/static/frontend/dist/assets/clothes-images/scarf.png",
    "/static/frontend/dist/assets/clothes-images/shirt.png",
    "/static/frontend/dist/assets/clothes-images/shorts.png",
    "/static/frontend/dist/assets/clothes-images/sweater.png",
    "/static/frontend/dist/assets/clothes-images/t-shirt.png",
    "/static/frontend/dist/assets/clothes-images/trousers.png",
    "/static/frontend/dist/assets/clothes-images/trousers-with-side-pockets.png",
    "/static/frontend/dist/assets/clothes-images/blouse.png",
    "/static/frontend/dist/assets/clothes-images/dress.png",
    "/static/frontend/dist/assets/clothes-images/housecoat.png",
    "/static/frontend/dist/assets/clothes-images/jacket.png",
    "/static/frontend/dist/assets/clothes-images/pants.png",
    "/static/frontend/dist/assets/clothes-images/robe.png",
    "/static/frontend/dist/assets/clothes-images/scarf.png",
    "/static/frontend/dist/assets/clothes-images/shirt.png",
    "/static/frontend/dist/assets/clothes-images/shorts.png",
    "/static/frontend/dist/assets/clothes-images/sweater.png",
    "/static/frontend/dist/assets/clothes-images/t-shirt.png",
    "/static/frontend/dist/assets/clothes-images/trousers.png",
    "/static/frontend/dist/assets/clothes-images/trousers-with-side-pockets.png",
  ]
  constructor(public router: Router, public route: ActivatedRoute) { }

  ngOnInit(): void {
    addEventListener('scroll', function () {
      // @ts-ignore
      let y = document.getElementById('clothes-array').getBoundingClientRect().y;
      y = (y - 500) / 30 - 50;
      console.log(y + '%');
      // @ts-ignore
      document.getElementById('clothes-array').style.left = y + '%';
    })

    // @ts-ignore
    let y = document.getElementById('clothes-array').getBoundingClientRect().y;
    y = (y - 500) / 30 - 50;
    console.log(y + '%');
    // @ts-ignore
    document.getElementById('clothes-array').style.left = y + '%';
  }

  login(): void {
    this.router.navigate(['/sign-in'])
  }
}