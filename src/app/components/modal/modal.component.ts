import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params} from '@angular/router';
import { DataApiService} from '../../services/data-api.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { TixInterface } from '../../models/tix-interface'; 
import { CategoryInterface } from '../../models/category-interface'; 
import { UserWService } from "../../services/user-w.service";
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor(
  private dataApi: DataApiService,
    private location: Location,
    private route:ActivatedRoute,
    private router: Router, 
    public _uw:UserWService

    ) { }

public tixs:TixInterface;
oncart(){
  this._uw.tixPreview.oncart=true;
  // console.log("en el carrito");
}
outcart(){


    this._uw.tixPreview.quantity=0;
   this._uw.tixPreview.oncart=false;
  this.cartCalculate();
     // console.log("fuera del carrito");
}


minus(){
  
   if(this._uw.tixPreview.quantity>0){      
   this._uw.tixPreview.quantity=this._uw.tixPreview.quantity-1;
   this.cartCalculate();
  }
  if(this._uw.tixPreview.quantity==0){
    this._uw.tixPreview.oncart=false;
    this.outcart();
  }
}
plus(){
  this._uw.tixPreview.quantity=this._uw.tixPreview.quantity+1;
  this.oncart();
  if(this._uw.tixPreview.quantity>0){
    this.cartCalculate();
  }
}
cartCalculate(){
  //this._uw.car =[];
  this._uw.numProd=0;
  this._uw.total=0;

    if (this._uw.tixPreview.quantity>0){
      this._uw.car.push(this._uw.tixPreview);
      this._uw.numProd=this._uw.numProd+1;
      this._uw.total=this._uw.total+(this._uw.tixPreview.quantity*this._uw.tixPreview.price);
    }
   console.log("tamaño: "+this._uw.car.length)

}
  ngOnInit() {

  }

}
