import { Component, ElementRef, Input, input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TituloComponent } from "@ng-mf/data-access-user";
import { AlertComponent } from "@ng-mf/data-access-user";
import { map, Subject, takeUntil } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProveedorExtranjero } from '../../models/avisomodify.model';


import { Tramite32301Store } from '../../estados/tramite32301.store';
import { Tramite32301Query } from '../../estados/tramite32301.query';

import { Modal } from 'bootstrap';
@Component({
  selector: 'app-proveedor-extranjero',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TituloComponent, AlertComponent],
  templateUrl: './proveedorExtranjero.component.html',
})
export class ProveedorExtranjeroComponent implements OnInit, OnDestroy {
  seccionProveedoresExistentes: string = 'Sección de Proveedores Existentes';
  ProveedoresTitulo!:string;
  proveedorXtranjForm!: FormGroup;
  proveedorExtranjero!:ProveedorExtranjero
  @Input() proveedortype!: string;

  private destroy$: Subject<void> = new Subject<void>();
  CargaExtranjeroModelInstance!:Modal;
  
    @ViewChild('CargaExtranjeroModel', { static: false }) CargaExtranjeroModel!: ElementRef;
  
  constructor(private fb: FormBuilder,
      private store: Tramite32301Store,
      private Tramite32301Query:Tramite32301Query
    ) { }
      
  ngOnInit(): void {
    this.ProveedoresTitulo = this.proveedortype == 'extranjero' ? 'Aviso de modificaciones de clientes y proveedores extranjeros' : 'Aviso de modificaciones de clientes y proveedores nacionales'
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
  fileValidator(control: any) {
    const file = control.value;
    if (file && file.name.endsWith('.xlsx')) {
      return null; // File is valid
    } 
    return { invalidFileType: true }; // Invalid file type
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

    cargarArchivoAjax() {
      if (this.proveedorXtranjForm.valid) {
        console.log('File uploaded successfully:', this.proveedorXtranjForm.value.archivoExtranjero);
        this.store.setRegistrosProveedoresExtranjeros(this.proveedorXtranjForm.value);

      } else {
        this.openCargaExtranjeroModel()
      }
    }
    
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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
