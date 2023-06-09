import { Component, OnDestroy, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { Subscription, delay } from 'rxjs';
import { BusquedasService } from 'src/app/services/busquedas.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit, OnDestroy {

  public hospitales : Hospital[] = [];
  public hospitalesTemp: Hospital[] = [];

  public cargando: boolean = true;

  public imgSubs: Subscription;

  constructor( private hospitalService : HospitalService,
                private modalImagenService: ModalImagenService,
                private busquedasService: BusquedasService ){}

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }
  ngOnInit(): void {
    this.cargarHospitales();

    this.imgSubs = this.imgSubs = this.modalImagenService.nuevaImagen
    .pipe(delay(1000))
    .subscribe( img => this.cargarHospitales() );
    
  }
  
  cargarHospitales(){
    
    this.cargando = true;
    this.hospitalService.cargarHospitales()
        .subscribe( hospitales =>{
          this.cargando = false;
          this.hospitales = hospitales;
          this.hospitalesTemp = hospitales;
        });

  }

  guardarCambios( hospital: Hospital ){
    this.hospitalService.actualizarHospital(hospital._id, hospital.nombre)  
        .subscribe( resp => {
          Swal.fire('Actualizado', hospital.nombre, 'success');   
        });
  }

  eliminarHospital( hospital: Hospital ){
    this.hospitalService.borrarHospital(hospital._id)  
        .subscribe( resp => {
          this.cargarHospitales(); 
          Swal.fire('Eliminado', hospital.nombre, 'success');   
        });
  }

  async abrirSweetAlert(){
    const {value = ''} = await Swal.fire<string>({
      title: 'Crear hospital',
      text: 'Ingrese el nombre del nuevo hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del hospital',
      showCancelButton: true
    });

    if(value.trim().length >0){
      this.hospitalService.crearHospital(value)
          .subscribe( resp => {
            this.cargarHospitales(); 
          })
    }
  }

  abrirModal( hospital:Hospital ){
    this.modalImagenService.abrirModal('hospitales', hospital._id, hospital.img  );

  }

  buscar( termino: string ) {

    if ( termino.length === 0 ) {
      return this.hospitales = this.hospitalesTemp; 
    }

    return this.busquedasService.buscar( 'hospitales', termino )
        .subscribe( (resp: Hospital[]) => {

          this.hospitales = resp;

        });
  }

}
