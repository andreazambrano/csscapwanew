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
  npedido=0;
  public sale : SaleInterface ={
      car:[],
      email:"",
      status:"",
      metodo:"",
      direccion:"",
      personaContacto:"",
      total:0
    };
    


    public orderToSend : OrderInterface ={
      name:"",
      link:"",
      message:"",
      email:""
    };

    public order : OrderInterface ={
      car:[],
      email:"",
      status:"",
      metodo:"",
      direccion:"",
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
    okOrder(){
       this.submitted = true;
        if (this.ngFormSendOrder.invalid) {
          this._uw.errorFormSendOrder=true;
        return;
            } 
      this.order.car=this._uw.car;
      this.npedido=this.aleatorio(10000,99999);
      let npedidoString = this.npedido.toString();
      this.order.npedido=npedidoString;
      this._uw.pedido.nroReserva=this.order.npedido;
      this._uw.order=this.order;
      this._uw.order.total=this._uw.total;
      this.orderToSend.message="Hola, hemos registrado una nueva orden de compra a nombre de: ";
      this.orderToSend.name=this.order.personaContacto;
      this.orderToSend.email=this.order.email;
      this.orderToSend.link="https://www.corpcssca.com/cart/"+this._uw.pedido.nroReserva;
       this.dataApi.saveOrder(this._uw.order).subscribe(
           order => this.router.navigate(['/compra'])
        );
             this.dataApi.sendOrder(this.orderToSend).subscribe();

    };


    
public setMetodo(){
     
    }
  public aleatorio(a,b) {
    return Math.round(Math.random()*(b-a)+parseInt(a));
  }

  ngOnInit() {


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
