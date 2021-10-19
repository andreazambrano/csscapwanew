import { Component, OnInit } from '@angular/core';
import { UserWService } from "../../services/user-w.service";
@Component({
  selector: 'app-shadicart',
  templateUrl: './shadicart.component.html',
  styleUrls: ['./shadicart.component.css']
})
export class ShadicartComponent implements OnInit {

  constructor(
    public _uw:UserWService

  	) { }

  ngOnInit() {
  }

}
