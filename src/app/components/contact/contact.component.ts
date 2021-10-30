import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params} from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router'; 
import { UserWService } from "../../services/user-w.service";
import { DataApiService } from '../../services/data-api.service';
import { isError } from "util";
import { ContactInterface } from '../../models/contact-interface'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(
      private authService: AuthService,
    private formBuilder: FormBuilder,
    public _uw:UserWService,
    public dataApi: DataApiService,
    private location: Location,
    private route:ActivatedRoute,
    private router: Router
  	) { }
 ngFormContact: FormGroup;
    submitted = false;
    public isError = false;
    public waiting = false;
    public msgError = '';
    contact = {
 		nombre:"",
        email:"",
        mensaje:"",
        asunto:""
  };
  number=0;

sendContact(){
    if (this.ngFormContact.valid){

      this.contact.nombre=this.contact.nombre;
      this.contact.email=this.contact.email;
      this.contact.mensaje=this.contact.mensaje;
      this.contact.asunto=this.contact.asunto;
 
   
      this._uw.contact=this.contact;
      this._uw.isLogged=true;
    
      this.dataApi.sendContact(this.contact).subscribe();
    //  this.router.navigate(['/question']);
    } else {
      this.onIsError();
    }
   }
  ngOnInit() {
            this.ngFormContact = this.formBuilder.group({
      nombre: ['', Validators.required],
      asunto: ['', Validators.required],
      mensaje: ['', Validators.required],
      email: ['', [Validators.required,Validators.email]]
    });
  }
  get fval() {
  return this.ngFormContact.controls;
  }

  onIsError(): void {
    this.isError = true;
    setTimeout(() => {
      this.isError = false;
    }, 4000);
  }


}
