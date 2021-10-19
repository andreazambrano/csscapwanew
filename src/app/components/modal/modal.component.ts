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
public added  = false;
public indice  = 0;
public tixs:TixInterface;
public tix:TixInterface;
oncart(){
  this.tix.oncart=true;
  // console.log("en el carrito");
}
outcart(){


    this.tix.quantity=0;
   this.tix.oncart=false;
  //this.cartCalculate();
     // console.log("fuera del carrito");
}

oncart2(index){
   let id=index;
  this._uw.tixs[id].oncart=true;
  // console.log("en el carrito");
   //this.cartCalculate();
}

cartCalculate2(){
  this._uw.car =[];
  this._uw.numProd=0;
  this._uw.total=0;
  // console.log("tamaño: "+this._uw.totalTixs)
  for (let i = 0; i < this._uw.totalTixs; i++){
    if (this._uw.tixs[i].quantity>0){
      this._uw.car.push(this._uw.tixs[i]);
      this._uw.numProd=this._uw.numProd+1;
      this._uw.total=this._uw.total+(this._uw.tixs[i].quantity*this._uw.tixs[i].globalPrice);
    }
  }
}
minus(){
  
   if(this._uw.tixPreview.quantity>0){      
   this._uw.tixPreview.quantity=this._uw.tixPreview.quantity-1;
  // this.cartCalculate2();
  }
  if(this._uw.tixPreview.quantity==0){
    this._uw.tixPreview.oncart=false;
    this.outcart();
  }
}
plus(){
  this._uw.tixPreview.quantity=this._uw.tixPreview.quantity+1;
  //this.oncart2();
  if(this._uw.tixPreview.quantity>0){
 //s   this.cartCalculate2();
  }
}
addToCar(){
  this._uw.numProd=0;
  this._uw.total=0;
  let size = this._uw.carIds.length;
  console.log("tamaño: "+this._uw.car.length);
  if(size==0){
      this._uw.carIds=this._uw.carIds.concat({idTix:this._uw.tixPreview.id}); 
      this._uw.car.push(this._uw.tixPreview);
      this.added =true;
      console.log("se agrega el primero" +this._uw.carIds[0].idTix);  
  }
  else{
      for (let i=0;i<this._uw.car.length;i++){
        if(this._uw.tixPreview.id==this._uw.carIds[i].idTix){
          this.indice=i;
          this.added =true;
          if (this._uw.tixPreview.quantity>0 && this._uw.car[this.indice]!=undefined){
              this._uw.car[this.indice].quantity=this._uw.tixPreview.quantity;
            }
          console.log("ya esta, se actualiza");
        }
      }
      if(this.added!=true){
          this._uw.carIds=this._uw.carIds.concat({idTix:this._uw.tixPreview.id}); 
          this._uw.car.push(this._uw.tixPreview);
          console.log("no está, se agrega");
      }
  } 
  for (let i=0;i<this._uw.car.length;i++){
    this._uw.total=this._uw.total+(this._uw.car[i].quantity*this._uw.car[i].price);
  }  
   this._uw.numProd=this._uw.car.length;
   console.log("indice: "+this._uw.tixPreview.id);
   this.added=false;
}

getAllTixs(){
        this.dataApi.getAllTixsReturn().subscribe((res:any) => {
      if (res[0] === undefined){
        console.log("hey");
       }else{
        this._uw.tixs=res;            
        }
     });  
    }
  ngOnInit() {

    if (this._uw.loaded!=true){
      this.getAllTixs();    ///  this.loadAPI = new Promise(resolve => {
           // this.loadInfo1();
      this._uw.loaded=true;
      }
    }
  

}
