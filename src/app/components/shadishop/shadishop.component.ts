import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params} from '@angular/router';
import { DataApiService} from '../../services/data-api.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { TixInterface } from '../../models/tix-interface'; 
import { CategoryInterface } from '../../models/category-interface'; 
import { UserWService } from "../../services/user-w.service";


@Component({
  selector: 'app-shadishop',
  templateUrl: './shadishop.component.html',
  styleUrls: ['./shadishop.component.css']
})
export class ShadishopComponent implements OnInit {

  constructor(
  private dataApi: DataApiService,
    private location: Location,
    private route:ActivatedRoute,
    private router: Router, 
    public _uw:UserWService
    ) { }
public categories:CategoryInterface;
public category:CategoryInterface;
public tixs:TixInterface;
public tix:TixInterface;

getAllTixs(){
        this.dataApi.getAllTixsReturn().subscribe((res:any) => {
      if (res[0] === undefined){
        console.log("hey");
       }else{
        this.tixs=res;  
        this._uw.totalTixsShop=res.length;  
        this.discountCalculate();        
        }
     });  
    }

discountCalculate(){
   for (let i=0;i<this._uw.totalTixsShop;i++){
      if(this.tixs[i].discount!=undefined){
        let prev =this.tixs[i].price;
        this.tixs[i].price=this.tixs[i].price-(this.tixs[i].price*this.tixs[i].discount/100)
        this.tixs[i].oldprice= prev;
      }

      if(this.tixs[i].discount==undefined || this.tixs[i].discount===0){this.tixs[i].oldprice=0;}

   }
}

tixCharge(tix){
  this._uw.tixPreview = tix;
  this._uw.tixPreview.quantity = 1;
}
  public viewProduct(tix){
    let id=tix.id;
    let tixToView = tix;
    this._uw.tixPreview=tixToView;
    this._uw.tixPreview.quantity=1; 
    this._uw.imagePreviewProduct=this._uw.tixPreview.images[0];
    for (let i=0;i<this._uw.car.length;i++){
      if(id==this._uw.car[i].id){
        this._uw.tixPreview.quantity=this._uw.car[i].quantity;
        this._uw.idToUpdate=i;
       // console.log("ya se encuentra en el carro!");
      }
    }
    this.getAllTixs();
  } 

  ngOnInit() {
          this.getAllTixs();
  }

}
