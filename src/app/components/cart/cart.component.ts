import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params} from '@angular/router';
import { DataApiService} from '../../services/data-api.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { TixInterface } from '../../models/tix-interface'; 
import { OrderInterface } from '../../models/order-interface'; 
import { CategoryInterface } from '../../models/category-interface'; 
import { UserWService } from "../../services/user-w.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(

  private dataApi: DataApiService,
    private location: Location,
    public route:ActivatedRoute,
    public router: Router, 
    public _uw:UserWService
  	) { }

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
  ngOnInit() {
    this.getOrderByNpedido(this.route.snapshot.paramMap.get('id'));
  }
  getOrderByNpedido(id: string){
    this.dataApi.getOrderByNpedido(id).subscribe(order => (this._uw.order = order));

  }
}
