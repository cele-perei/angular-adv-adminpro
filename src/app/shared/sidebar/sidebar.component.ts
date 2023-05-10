import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {
  public usuario: Usuario | undefined;


  menuItems : any[];
  constructor( private sidebarService: SidebarService,
              private usuarioService: UsuarioService ){
    
    this.usuario = usuarioService.usuario;
    this.menuItems = sidebarService.menu;
    console.log(this.menuItems);
  }

}
