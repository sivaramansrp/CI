import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Modal } from 'bootstrap';
import { map, Subject, takeUntil } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { TituloComponent } from "@ng-mf/data-access-user";
import { AlertComponent } from "@ng-mf/data-access-user";

import { Tramite32301Store } from '../../estados/tramite32301.store';
import { Tramite32301Query } from '../../estados/tramite32301.query';

import { ProveedorExtranjero } from '../../models/avisomodify.model';

@Component({
  selector: 'app-adicion-procesos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TituloComponent, AlertComponent],
  templateUrl: './adicionProcesos.component.html',
})
export class AdicionProcesosComponent {
  private destroy$: Subject<void> = new Subject<void>();
  CargaExtranjeroModelInstance!:Modal;

  seccionProveedoresExistentes: string = 'Registros cargodos:';
  ProveedoresTitulo!:string;

  proveedorExtranjero!:ProveedorExtranjero
  proveedorXtranjForm!: FormGroup;

   constructor(private fb: FormBuilder,
        private store: Tramite32301Store,
        private Tramite32301Query:Tramite32301Query
      ) { }
    ngOnInit(): void {
    this.ProveedoresTitulo =  'Proceso(s) productivo(s)*'
      this.inicializaProveedorExtranjer();
            this.Tramite32301Query.select()
              .pipe(takeUntil(this.destroy$))
              .subscribe(state => {
                this.proveedorExtranjero = state as unknown as ProveedorExtranjero;
                this.crearFormProveedorExtranjer();
              });
          
    }
    inicializaProveedorExtranjer(){
      this.store.setRegistrosProveedoresExtranjeros({ archivoExtranjero: [], registrosProveedoresExtranjeros: '0' });
    }
    crearFormProveedorExtranjer(){
  
      this.proveedorXtranjForm = this.fb.group({
        archivoExtranjero: [ this.proveedorExtranjero?.archivoExtranjero, Validators.required],
        registrosProveedoresExtranjeros: [{ value: this.proveedorExtranjero?.registrosProveedoresExtranjeros, disabled: true }]
      });
    }


    onFileSelected(event: any) {
      const file = event.target.files[0];
  
      if (file) {
        this.proveedorXtranjForm.patchValue({ archivoExtranjero: file });
        this.proveedorXtranjForm.get('archivoExtranjero')?.updateValueAndValidity();
    
      }
      else{
        this.openCargaExtranjeroModel()
      }
  
   
      }

      cargarArchivoProcesosAjax(): void {

      }
      vistaPreviaArchivoProcesosAjax(): void {
      }
  openCargaExtranjeroModel(){
    if (this.CargaExtranjeroModelInstance) {
      this.CargaExtranjeroModelInstance.show();
    }
  }

  closeCargaExtranjeroModel(){
    if (this.CargaExtranjeroModelInstance) {
      this.CargaExtranjeroModelInstance.hide();
    }
  }
}
