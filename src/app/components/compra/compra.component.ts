import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params} from '@angular/router';
import { DataApiService} from '../../services/data-api.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { TixInterface } from '../../models/tix-interface'; 
import { CategoryInterface } from '../../models/category-interface'; 
import { UserWService } from "../../services/user-w.service";

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css']
})
export class CompraComponent implements OnInit {

  constructor(
    private dataApi: DataApiService,
    private location: Location,
    public route:ActivatedRoute,
    public router: Router, 
    public _uw:UserWService
    ) { }

  ngOnInit() {
  }

}
