import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  constructor(
      public router: Router,
      public route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
  }

  open_menu() {
    // @ts-ignore
    document.getElementById('dop-menu').style.display='block';
    // @ts-ignore
    document.getElementById('menu').style.left='0';
    // @ts-ignore
    document.getElementById('dop-menu').style.background='rgba(0,0,0,50%)';
  }
  close_menu() {
    // @ts-ignore
    document.getElementById('menu').style.left='calc(-1*var(--width))';
    // @ts-ignore
    document.getElementById('dop-menu').style.background='transparent';
    // @ts-ignore
    document.getElementById('dop-menu').style.display='none';

  }

  go(link:string) {
    if(link[0]!='/') {
      this.router.navigate(['/']);
      window.scrollTo({
        // @ts-ignore
        top: document.getElementById(link).offsetTop,
        behavior: "smooth"
      })
    }
    else
      this.router.navigate([link]);
    this.close_menu();
  }
  check(link: string):boolean {
    if(ActivatedRoute.name=='') {
      // @ts-ignore
      if (window.scrollY >= document.getElementById(link).offsetTop && window.scrollY <= document.getElementById(link).offsetTop + document.getElementById(link).offsetHeight)
        return true;
    }
    return false;
  }
}
