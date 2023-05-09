import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import Swal from 'sweetalert2'

import { RegisterForm } from 'src/app/interfaces/register-form.interface';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css' ]
})
export class RegisterComponent {

  public formSubmitted = false;

  public registerForm = this.fb.group({
    nombre: ['Celeste', Validators.required ],
    email: ['test60@gmail.com', [ Validators.required, Validators.email ] ],
    password: ['123456', Validators.required ],
    password2: ['123456', Validators.required ],
    terminos: [true, Validators.required ],
  }, {
    validators: this.passwordsIguales('password','password2')
  });

  constructor ( private fb: FormBuilder, 
                private usuarioService: UsuarioService,
                private router : Router){}

  crearUsuario() {
    this.formSubmitted = true;
     console.log(this.registerForm.value);
    //console.log(this.registerForm);

    if(this.registerForm.invalid){
      return;
    }

    //realizar el posteo
    //this.usuarioService.crearUsuario( this.registerForm.value )
    this.usuarioService.crearUsuario( (this.registerForm.value as RegisterForm) )
      .subscribe( resp => {
        
          //Navegar al Dashboard
          this.router.navigateByUrl('/');

      }, (err) => {
        //si sucede un error
        Swal.fire('Error', err.error.msg, 'error');
      } );
  }

  campoNoValido( campo: string ): boolean {
    if( !this.registerForm.get(campo)?.valid && this.formSubmitted){
      return true;

    } else{
      return false;
    }
  }

  aceptaTerminos(){
    return !this.registerForm.get('terminos')?.value && this.formSubmitted
  }

  contrasenasNoValidas(){
    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value;

    if( (pass1 !== pass2 ) && this.formSubmitted ){
      return true; 
    } else {
      return false;
    }
  }

  passwordsIguales(pass1: string, pass2: string) {
    
    return (FormGroup: AbstractControl): ValidationErrors | null => {
      const pass1Control: FormControl = FormGroup.get(pass1) as FormControl;
      const pass2Control: FormControl = FormGroup.get(pass2) as FormControl;
 
      if (pass1Control.value !== pass2Control.value) {
        pass2Control.setErrors({ noEsIgual: true });
        return { noEsIgual: true };
      } else {
        pass2Control?.setErrors(null);
        return null;
      }
    };
  }
}
