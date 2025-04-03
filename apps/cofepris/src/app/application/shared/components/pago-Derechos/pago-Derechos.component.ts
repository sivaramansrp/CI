import { Component, OnDestroy, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AvisoImportacionService } from '../../services/parmiso-importacion.service'; 

import { map, Subject, takeUntil } from 'rxjs';

import { Catalogo, InputFecha, InputFechaComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';

import { FECHA_DE_PAGO } from '../../models/pago-derechos.model';

import { Avisocalidad260514Store, Solicitud260514State } from '../../estados/stores/aviso-calidad.store'; 

import { Avisocalidad260514Query } from '../../estados/queries/aviso-calidad.query'; 

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
        private avisocalidad260514Store: Avisocalidad260514Store, 
        private avisocalidad260514Query: Avisocalidad260514Query){}
        public solicitudState!: Solicitud260514State;
        private destroyed$ = new Subject<void>();
        public derechosList!: Catalogo[]; 
        private destroyNotifier$: Subject<void> = new Subject();
       fechaInicioInput: InputFecha = FECHA_DE_PAGO;

  ngOnInit(): void {

    this.avisocalidad260514Query.selectSolicitud$ 
          .pipe(
            takeUntil(this.destroyNotifier$), 
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
  }

   setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Avisocalidad260514Store): void {
    const valor = form.get(campo)?.value; // Obtener el valor del campo especificado del formulario.
    (this.avisocalidad260514Store[metodoNombre] as (value: any) => void)(valor); 
  }
    
  ngOnDestroy(): void {
      this.destroyed$.next(); 
      this.destroyed$.complete();
      this.destroyNotifier$.next(); 
      this.destroyNotifier$.complete();  
       
    }
}
