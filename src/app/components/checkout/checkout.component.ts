import { Component, OnInit } from '@angular/core';
import { UserWService } from "../../services/user-w.service";
import { DataApiService } from '../../services/data-api.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { TixInterface } from '../../models/tix-interface'; 
import { SaleInterface } from '../../models/sale-interface';
import { OrderInterface } from '../../models/order-interface'; 
import { FormBuilder, FormGroup,  Validators } from '@angular/forms';
import { ScrollTopService }  from '../../services/scroll-top.service';
import { isError } from "util";
import { ActivatedRoute, Params} from '@angular/router';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(
    public scrollTopService:ScrollTopService,
    private route:ActivatedRoute,
    public _uw:UserWService,
    private dataApi: DataApiService,
    private location: Location,
    public router: Router,
    private formBuilder: FormBuilder
    ) { }

  public sale : SaleInterface ={
      car:[],
      email:"",
      status:"",
      metodo:"",
      direccion:"",
      id:"",
      personaContacto:"",
      total:0
    };
    
    public order : OrderInterface ={
      car:[],
      email:"",
      status:"",
      metodo:"",
      direccion:"",
      id:"",
      steeps:[
        {steep:true},
        {steep:false},
        {steep:false},
        {steep:false}
      ],
      personaContacto:"",
      total:0
    };
recargo=0;
    ngFormSendSale: FormGroup;
    ngFormSendOrder: FormGroup;
    submitted = false;
    okOrder(){};
public setMetodo(){
      if(this.ngFormSendOrder.value.metodo=="bsTansferencia"){
           this.recargo=0;
           this._uw.recargo=false;
      //  this.setBs();
      }   
       if(this.ngFormSendOrder.value.metodo=="bitcoin"){
    //      this.setUsd();
         this.recargo=(this._uw.subTotal*this._uw.currency)*(this._uw.info[0].bitcoin/100);
             this._uw.recargo=true;
      } 
      if(this.ngFormSendOrder.value.metodo=="paypal"){
     //     this.setUsd();
          this.recargo=(this._uw.subTotal*this._uw.currency)*(this._uw.info[0].paypal/100);
             this._uw.recargo=true;
      } 
       if(this.ngFormSendOrder.value.metodo=="bsTansferencia"){
        this.recargo=0;
    //    this.setBs();
           this._uw.recargo=false;
      } 
       if(this.ngFormSendOrder.value.metodo=="bsPunto"){
        this.recargo=0;
   //     this.setBs();
           this._uw.recargo=false;
      } 
       if(this.ngFormSendOrder.value.metodo=="colp"){
        this.recargo=0;
   //     this.setColp();
           this._uw.recargo=false;
      } 
       if(this.ngFormSendOrder.value.metodo=="usd"){
        this.recargo=0;
     //     this.setUsd();
             this._uw.recargo=false;
      }    
       if(this.ngFormSendOrder.value.metodo=="usdt"){
        this.recargo=0;
   //       this.setUsd();
             this._uw.recargo=true;
      }      
    }

  ngOnInit() {

     this.ngFormSendSale = this.formBuilder.group({
      direccion: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      personaContacto: ['', [Validators.required]],
      metodo:['',[Validators.required]],
      email: ['', [Validators.required]],
      total: [0,[Validators.required]]
    });

    this.ngFormSendOrder = this.formBuilder.group({
      direccion: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      personaContacto: ['', [Validators.required]],
      metodo:['',[Validators.required]],
      email: ['', [Validators.required]],
      total: [0,[Validators.required]]
    });

    
  
    }


     get fval() {
      return this.ngFormSendOrder.controls;
    }
}
