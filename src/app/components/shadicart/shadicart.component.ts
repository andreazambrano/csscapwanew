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
remove(i){
      // this._uw.subTotal=this._uw.subTotal-(this._uw.car[i].quantity*this._uw.car[i].globalPrice);
      this._uw.car.splice(i, 1);
      this._uw.numProd=this._uw.numProd-1;
      // if(this._uw.numProd<1){
      // 	this.router.navigate(['/']);
      // }
      
    } 
  ngOnInit() {
  }

}
