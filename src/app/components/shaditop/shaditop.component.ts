import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params} from '@angular/router';
import { DataApiService} from '../../services/data-api.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { TixInterface } from '../../models/tix-interface'; 
import { CategoryInterface } from '../../models/category-interface'; 
import { UserWService } from "../../services/user-w.service";


@Component({
  selector: 'app-shaditop',
  templateUrl: './shaditop.component.html',
  styleUrls: ['./shaditop.component.css']
})
export class ShaditopComponent implements OnInit {

  constructor(
  private dataApi: DataApiService,
    private location: Location,
    public route:ActivatedRoute,
    public router: Router, 
    public _uw:UserWService
    ) { }

public categories:CategoryInterface;
public category:CategoryInterface;

filterCategory(category){
  this._uw.filtered=true;
  this._uw.categorySelected=category.idcategory;
  this._uw.categorySelectedName=category.name;
  console.log("category selected:"+category.idcategory);
}
filterSubcategory(subcategory){
  this._uw.filtered=true;
  this._uw.subcategorySelected=subcategory.idsub;
  this._uw.subcategorySelectedName=subcategory.name;
  console.log("subcategory selected:"+subcategory.idsub);

}

getAllCategories(){
        this.dataApi.getAllCategories().subscribe((res:any) => {
      if (res[0] === undefined){
         console.log("no hay categorias");
       }else{
        this.categories=res;
        console.log("primera categoria: "+res[1].name);            
        }
     });  
    }

  ngOnInit() {
    this._uw.numProd=0;
    this.getAllCategories();
  }

}
