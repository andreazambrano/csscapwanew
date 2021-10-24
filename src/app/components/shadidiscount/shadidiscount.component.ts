import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params} from '@angular/router';
import { DataApiService} from '../../services/data-api.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { TixInterface } from '../../models/tix-interface'; 
import { CategoryInterface } from '../../models/category-interface'; 
import { UserWService } from "../../services/user-w.service";
import { CarouselModule } from 'ngx-owl-carousel-o';

declare var $: any;
@Component({
  selector: 'app-shadidiscount',
  templateUrl: './shadidiscount.component.html',
  styleUrls: ['./shadidiscount.component.css']
})
export class ShadidiscountComponent implements AfterViewInit {   title = 'angularowlslider';
  customOptions: any = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 2
      },
      940: {
        items: 3
      }
    },
    nav: true
  };


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

  public tixsDiscount:any[]=[];
  public tixsBestseller:any[]=[];
  public tixsBestseller2:any[]=[];





    url = "assets/assetsshadi/js/vendor/vendor.min.js";
  url1 = "assets/assetsshadi/js/plugins/slick.js";
  url2 = "assets/assetsshadi/js/plugins/plugins.min.js";
  url3= "assets/assetsshadi/js/main.js";


   loadAPI = null;  
 public loadScript() {
    let node = document.createElement("script");
    node.src = this.url;
    node.type = "text/javascript";
    node.async = true;
    node.charset = "utf-8";
    document.getElementsByTagName("head")[0].appendChild(node);
  }
    public loadScript1() {
    let node = document.createElement("script");
    node.src = this.url1;
    node.type = "text/javascript";
    node.async = true;
    node.charset = "utf-8";
    document.getElementsByTagName("head")[0].appendChild(node);
  }   
  public loadScript2() {
    let node = document.createElement("script");
    node.src = this.url2;
    node.type = "text/javascript";
    node.async = true;
    node.charset = "utf-8";
    document.getElementsByTagName("head")[0].appendChild(node);
  }   
  public loadScript3() {
    let node = document.createElement("script");
    node.src = this.url3;
    node.type = "text/javascript";
    node.async = true;
    node.charset = "utf-8";
    document.getElementsByTagName("head")[0].appendChild(node);
  } 

getAllTixs(){
  this.tixsDiscount=[];
this.tixsBestseller=[];
this.tixsBestseller2=[];
        this.dataApi.getAllTixsReturn().subscribe((res:any) => {
      if (res[0] === undefined){
        console.log("hey");
       }else{
        this.tixs=res;   
        this._uw.totalTixs=res.length; 
        this.selectDiscount();        
        this.selectBestseller();        
        }
     });  
    }
selectDiscount(){
      for (let i=0;i<this._uw.totalTixs;i++){
        if(this.tixs[i].discount!=undefined && this.tixs[i].discount >0  ){
          this.tixsDiscount.push(this.tixs[i]);
        }
      }
    } 
selectBestseller(){
  let yeoman = 0;
      for (let i=0;i<this._uw.totalTixs;i++){
        if(this.tixs[i].bestseller!=undefined && this.tixs[i].bestseller === true ){
          if(yeoman>3){
          this.tixsBestseller2.push(this.tixs[i]);
          }
          if(yeoman<=3 ){
            yeoman=yeoman+1;
          this.tixsBestseller.push(this.tixs[i]);
          }
        }
      }
      this._uw.bestsellerSize=yeoman;

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
        console.log("ya se encuentra en el carro!");
      }
    }
    this.getAllTixs();
  } 



  ngAfterViewInit() {
this.tixsDiscount=[];
this.tixsBestseller=[];
this.tixsBestseller2=[];
     if (this._uw.loaded==true){
      this.loadAPI = new Promise(resolve => {
        // this.loadScript();
        // this.loadScript1();
        // this.loadScript2();
        // this.loadScript3();
       
        });
      }
      this._uw.loaded=true;
    this.getAllTixs();

    
  }

}
