import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, delay } from 'rxjs';
import { Medico } from 'src/app/models/medico.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy{

  constructor( private modalImagenService: ModalImagenService,
                private medicoService: MedicoService,
                private busquedasService: BusquedasService ) {}

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }


  public medicos : Medico[] = [];
  public medicosTemp: Medico[] = [];
  public cargando: boolean = true;

  public imgSubs: Subscription;

  ngOnInit(): void {
    this.cargarMedicos();

    this.imgSubs = this.imgSubs = this.modalImagenService.nuevaImagen
    .pipe(delay(1000))
    .subscribe( img => this.cargarMedicos() );
  }

  cargarMedicos(){
    
    this.cargando = true;
    this.medicoService.cargarMedicos()
        .subscribe( medicos =>{
          this.cargando = false;
          this.medicos = medicos;
          this.medicosTemp = medicos;
        });

  }

  abrirModal( medico: Medico ){
    this.modalImagenService.abrirModal('medicos', medico._id, medico.img  );

  }

  buscar( termino: string ) {

    if ( termino.length === 0 ) {
      return this.medicos = this.medicosTemp; 
    }

    return this.busquedasService.buscar( 'medicos', termino )
        .subscribe( (resp: Medico[]) => {

          this.medicos = resp;

        });
  }

  borrarMedico(medico: Medico){
    return Swal.fire({
      title: '¿Borrar médico?',
      text: `Esta a punto de borrar a ${ medico.nombre }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.value) {
        
        this.medicoService.borrarMedico( medico._id )
          .subscribe( resp => {
            
            this.cargarMedicos();
            Swal.fire(
              'Médico borrado',
              `${ medico.nombre } fue eliminado correctamente`,
              'success' 
            );
            
          });

      }
    })
  }

  


}
