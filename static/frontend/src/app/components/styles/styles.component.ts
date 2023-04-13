import { Component, OnInit } from '@angular/core';
import { Styles } from "../../interface/slyles_info";

@Component({
  selector: 'app-styles',
  templateUrl: './styles.component.html',
  styleUrls: ['./styles.component.css']
})
export class StylesComponent implements OnInit {
  styles = Styles;

  constructor() { }

  ngOnInit(): void {
  }

}
