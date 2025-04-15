import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { AlertComponent, TituloComponent } from "@ng-mf/data-access-user";
import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Modal } from 'bootstrap';
import { ProveedorExtranjero } from '../../models/avisomodify.model';
import { Tramite32301Query } from '../../estados/tramite32301.query';
import { Tramite32301Store } from '../../estados/tramite32301.store';
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
    ) { // constructor
      }
      
  ngOnInit(): void {
    this.ProveedoresTitulo = this.proveedortype === 'extranjero' ? 'Aviso de modificaciones de clientes y proveedores extranjeros' : 'Aviso de modificaciones de clientes y proveedores nacionales'
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
 
        static fileValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const FILE = control.value;
    if (FILE && FILE.name.endsWith('.xlsx')) {
      return null; // File is valid
    } 
    return { invalidFileType: true }; // Invalid file type
  }


  onFileSelected(event: Event):void {
    const INPUT = event.target as HTMLInputElement;
    const FILET = INPUT?.files?.[0];

    if (FILET) {
      this.proveedorXtranjForm.patchValue({ archivoExtranjero: FILET });
      this.proveedorXtranjForm.get('archivoExtranjero')?.updateValueAndValidity();
  
    }
    else{
      this.openCargaExtranjeroModel()
    }

 
    }

    cargarArchivoAjax():void {
      if (this.proveedorXtranjForm.valid) {
        this.store.setRegistrosProveedoresExtranjeros(this.proveedorXtranjForm.value);
      } else {
        this.openCargaExtranjeroModel()
      }
    }
    
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  
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

}
