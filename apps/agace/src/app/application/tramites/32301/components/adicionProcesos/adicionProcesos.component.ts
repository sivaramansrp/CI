import { AlertComponent, TituloComponent } from "@ng-mf/data-access-user";
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Modal } from 'bootstrap';
import { ProveedorExtranjero } from '../../models/avisomodify.model';
import { Tramite32301Query } from '../../estados/tramite32301.query';
import { Tramite32301Store } from '../../estados/tramite32301.store';

@Component({
  selector: 'app-adicion-procesos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TituloComponent, AlertComponent],
  templateUrl: './adicionProcesos.component.html',
})
export class AdicionProcesosComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  CargaExtranjeroModelInstance!:Modal;

  seccionProveedoresExistentes: string = 'Registros cargodos:';
  ProveedoresTitulo!:string;

  proveedorExtranjero!:ProveedorExtranjero
  proveedorXtranjForm!: FormGroup;

   constructor(private fb: FormBuilder,
        private store: Tramite32301Store,
        private Tramite32301Query:Tramite32301Query
      ) {
        //constructor
       }
    ngOnInit(): void {
    this.ProveedoresTitulo = 'Proceso(s) productivo(s)*'
      this.inicializaProveedorExtranjer();
            this.Tramite32301Query.select()
              .pipe(takeUntil(this.destroy$))
              .subscribe(state => {
                this.proveedorExtranjero = state as unknown as ProveedorExtranjero;
                this.crearFormProveedorExtranjer();
              });
          
    }
    inicializaProveedorExtranjer():void{
      this.store.setRegistrosProveedoresExtranjeros({ archivoExtranjero: [], registrosProveedoresExtranjeros: '0' });
    }
    crearFormProveedorExtranjer():void{
  
      this.proveedorXtranjForm = this.fb.group({
        archivoExtranjero: [ this.proveedorExtranjero?.archivoExtranjero, Validators.required],
        registrosProveedoresExtranjeros: [{ value: this.proveedorExtranjero?.registrosProveedoresExtranjeros, disabled: true }]
      });
    }


    onFileSelected(event: Event):void {
      const INPUT = event.target as HTMLInputElement;
      const FILE = INPUT?.files?.[0];
  
      if (FILE) {
        this.proveedorXtranjForm.patchValue({ archivoExtranjero: FILE });
        this.proveedorXtranjForm.get('archivoExtranjero')?.updateValueAndValidity();
    
      }
      else{
        this.openCargaExtranjeroModel()
      }
  
   
      }

      // cargarArchivoProcesosAjax(): void {

      // }
      // vistaPreviaArchivoProcesosAjax(): void {
      // }
  openCargaExtranjeroModel():void{
    if (this.CargaExtranjeroModelInstance) {
      this.CargaExtranjeroModelInstance.show();
    }
  }

  closeCargaExtranjeroModel():void{
    if (this.CargaExtranjeroModelInstance) {
      this.CargaExtranjeroModelInstance.hide();
    }
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
