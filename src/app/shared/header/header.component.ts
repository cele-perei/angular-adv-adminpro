import { AfterViewInit, Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';
import { Router } from '@angular/router';

declare let $: any; 

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {

  public usuario : Usuario | undefined;

  constructor( private usuarioService: UsuarioService,
                private router: Router ){
    this.usuario = usuarioService.usuario;
  }

  buscar( termino: string ) {
    if ( termino.length === 0){
      return;
      //this.router.navigateByUrl(`/dashboard`);
    }

    this.router.navigateByUrl(`/dashboard/buscar/${termino}`);
  }


  logout(){
    this.usuarioService.logout();
  }
}
