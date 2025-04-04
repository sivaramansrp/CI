import { Component, OnDestroy, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AvisoImportacionService } from '../../services/parmiso-importacion.service'; 

import { map,takeUntil } from 'rxjs';

import { Subject } from 'rxjs';

import { Catalogo, InputFecha, InputFechaComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';

import { FECHA_DE_PAGO } from '../../models/pago-derechos.model';

import { AvisocalidadStore, SolicitudState } from '../../estados/stores/aviso-calidad.store'; 

import { AvisocalidadQuery } from '../../estados/queries/aviso-calidad.query'; 

@Component({
  selector: 'app-pago-derechos',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,CatalogoSelectComponent,TituloComponent, InputFechaComponent],
  templateUrl: './pago-Derechos.component.html',
  styleUrl: './pago-Derechos.component.scss',
})
export class PagoDerechosComponent implements OnDestroy, OnInit {
  derechosForm!:FormGroup;
  constructor(private fb: FormBuilder, 
        private service: AvisoImportacionService,
        private avisocalidadStore: AvisocalidadStore, 
        private avisocalidadQuery: AvisocalidadQuery){}
        public solicitudState!: SolicitudState;
        private destroyed$ = new Subject<void>();
        public derechosList!: Catalogo[]; 
       fechaInicioInput: InputFecha = FECHA_DE_PAGO;

  ngOnInit(): void {

    this.avisocalidadQuery.selectSolicitud$ 
          .pipe(
            takeUntil(this.destroyed$), 
            map((seccionState) => {
              this.solicitudState = seccionState; 
            })
          )
          .subscribe();
    this.derechosForm = this.fb.group({
      claveReferencia: [this.solicitudState?.claveReferencia], 
      cadenaDependencia: [this.solicitudState?.cadenaDependencia], 
      banco: [this.solicitudState?.banco], 
      llavePago: [this.solicitudState?.llavePago], 
      fechaPago: [this.solicitudState?.fechaPago], 
      importePago: [this.solicitudState?.importePago], 
    });
    this.loadComboUnidadMedida();
  } 

loadComboUnidadMedida(): void {
      this.service.getDatos() // Llamar al método del servicio para obtener datos.
        .pipe(takeUntil(this.destroyed$)) // Darse de baja automáticamente cuando el componente sea destruido. .
        .subscribe((data): void => {
          this.derechosList = data as Catalogo[]; // Asignar los datos obtenidos a derechosList.
        });
    }

public cambioFechaIngreso(nuevo_valor: string): void {
    this.derechosForm.get('fechaPago')?.setValue(nuevo_valor);
    this.derechosForm.get('fechaPago')?.markAsUntouched();
    this.avisocalidadStore.setfechaPago(nuevo_valor);
  }

   setValoresStore<T>(form: FormGroup, campo: string, metodoNombre: keyof AvisocalidadStore): void {
    const VALOR = form.get(campo)?.value as T; // Obtener el valor del campo especificado del formulario.
    (this.avisocalidadStore[metodoNombre] as (value: T) => void)(VALOR); 
  }
    
  ngOnDestroy(): void {
      this.destroyed$.next(); 
      this.destroyed$.complete();
       }
}
