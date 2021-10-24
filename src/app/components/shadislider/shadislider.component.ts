import { Component, OnInit } from '@angular/core';
import { UserWService } from "../../services/user-w.service";
 //declare var $: any;
@Component({
  selector: 'app-shadislider',
  templateUrl: './shadislider.component.html',
  styleUrls: ['./shadislider.component.css']
})
export class ShadisliderComponent implements OnInit {
  constructor(

     public _uw:UserWService
  	) { }
  loadAPI = null; 
      url="assets/assetsshadi/js/vendor/vendor.min.js";
   url2 = "assets/assetsshadi/js/plugins/plugins.min.js"; 
   url3 = "assets/assetsshadi/js/main2.js"; 
  // url4 = "assets/assetsshadi/js/offset_overlay.js"; 
     public loadScript() {
      let node = document.createElement("script");
      node.src = this.url;
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
    //  public loadScript4() {
    //   let node = document.createElement("script");
    //   node.src = this.url4;
    //   node.type = "text/javascript";
    //   node.async = true;
    //   node.charset = "utf-8";
    //   document.getElementsByTagName("head")[0].appendChild(node);
    // }
  ngOnInit() {
  	 if (this._uw.loaded==true){
          this.loadAPI = new Promise(resolve => {
            this.loadScript();
             this.loadScript2();
            this.loadScript3();
            this._uw.totalCharge=this._uw.totalCharge+1;
           // this.loadScript4();
          });
        }
        this._uw.loaded=true;

  }

 
}
