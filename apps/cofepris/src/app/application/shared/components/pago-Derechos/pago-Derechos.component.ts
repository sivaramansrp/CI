import { Component, OnDestroy, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AvisoImportacionService } from '../../services/parmiso-importacion.service'; 

import { Subject, takeUntil } from 'rxjs';

import { Catalogo, InputFecha, InputFechaComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';

import { FECHA_DE_PAGO } from '../../models/pago-derechos.model';

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
      private service: AvisoImportacionService,){}
       private destroyed$ = new Subject<void>();
        public derechosList!: Catalogo[]; 
 fechaInicioInput: InputFecha = FECHA_DE_PAGO;

  ngOnInit(): void {
    this.derechosForm = this.fb.group({
      claveReferencia: [''], 
      cadenaDependencia: [''], 
      banco: [''], 
      llavePago: [''], 
      fechaPago: [''], 
      importePago: [''], 
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
    
  ngOnDestroy(): void {
      this.destroyed$.next(); 
      this.destroyed$.complete(); 
       
    }
}
