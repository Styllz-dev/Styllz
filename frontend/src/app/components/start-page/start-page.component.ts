import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css']
})
export class StartPageComponent implements OnInit {

  constructor(
      public router: Router,
      public route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
  }

  go(link:string) {
    this.router.navigate([link]);
  }
}
