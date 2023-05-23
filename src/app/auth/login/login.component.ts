import { Component, AfterViewInit, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

import { LoginForm } from 'src/app/interfaces/login-form.interface';
import { UsuarioService } from 'src/app/services/usuario.service';

declare const google:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit, AfterViewInit{

  // @ViewChild('googleBtn') declare googleBtn: ElementRef ;
  @ViewChild('googleBtn') googleBtn!: ElementRef;

  
  public formSubmitted = false;

  public loginForm = this.fb.group({
    email: [localStorage.getItem('email') || '', [ Validators.required, Validators.email ] ],
    password: ['', Validators.required ],
    remember: [false]
  });


  constructor( private router: Router,
              private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private ngZone: NgZone){}
  ngAfterViewInit(): void {
  }
  ngOnInit(): void {
    this.googleInit();
  }

  
  googleInit () {
    google.accounts.id.initialize({
      client_id: '273296174498-80cikj2oejdvtfv24mmdhl5d7bg6nadk.apps.googleusercontent.com',
      callback: (response:any) => this.handleCredentialResponse(response)
    });
    google.accounts.id.renderButton(
       document.getElementById("buttonDiv"),
      //this.googleBtn.nativeElement,
      { theme: "outline", size: "large" }  // customization attributes
    );
  }

  handleCredentialResponse ( response: any ){
    //console.log("Encoded JWT ID token: " + response.credential);
    this.usuarioService.loginGoogle(response.credential).subscribe( resp => {
          //Navegar al Dashboard
          this.ngZone.run( () => {
            this.router.navigateByUrl('/');

          });    } )

  }

  login(){
    
    this.usuarioService.login( this.loginForm.value as LoginForm )
        .subscribe( resp => {
          if ( this.loginForm.get('remember')?.value ){
              localStorage.setItem('email', this.loginForm.get('email')?.value || '' );
          } else {
            localStorage.removeItem('email');
          }

          //Navegar al Dashboard
          this.ngZone.run( () => {
            this.router.navigateByUrl('/');

          });

        }, (err) => {
          //si sucede un error
          Swal.fire('Error', err.error.msg, 'error');
          //console.log(err);
        } );
                        
                         
    //console.log( this.loginForm.value );
    
  }
}
