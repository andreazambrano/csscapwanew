import { Component, OnInit } from '@angular/core';
import { UserWService } from "../../services/user-w.service";
@Component({
  selector: 'app-shadistatic',
  templateUrl: './shadistatic.component.html',
  styleUrls: ['./shadistatic.component.css']
})
export class ShadistaticComponent implements OnInit {

  constructor(
 public _uw:UserWService

  	) { }

  ngOnInit() {
  }

}
