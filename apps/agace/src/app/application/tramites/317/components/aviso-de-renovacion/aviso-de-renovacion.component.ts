import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CatalogoSelectComponent, InputFecha, InputFechaComponent, TituloComponent,Catalogo, InputRadioComponent } from '@libs/shared/data-access-user/src';
import { FECHA_DE_PAGO } from '../../models/aviso.model';

import { AvisoUnicoService } from '../../services/aviso-unico.service';

import { map, Subject, takeUntil } from 'rxjs';

import { PreOperativo } from '../../models/aviso.model';

import { UnicoState } from '../../estados/unico.store'; 
import { UnicoStore } from '../../estados/unico.store'; 

import { UnicoQuery } from '../../estados/queries/unico.query'; 

@Component({
  selector: 'app-aviso-de-renovacion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,TituloComponent,InputFechaComponent,CatalogoSelectComponent,InputRadioComponent],
  templateUrl: './aviso-de-renovacion.component.html',
  styleUrls: ['./aviso-de-renovacion.component.scss'],
})
export class AvisoDeRenovacionComponent implements OnInit, OnDestroy {
  fechaInicioInput: InputFecha = FECHA_DE_PAGO;
  public localidadList!: Catalogo[];
  private destroyed$ = new Subject<void>();
  tipoPersonaOptions: PreOperativo[] = [];
  avisoForm!: FormGroup;
  public solicitudState!: UnicoState; 

constructor(private fb: FormBuilder,private service:AvisoUnicoService , private unicoStore: UnicoStore, // Inject store for managing state.
  private unicoQuery: UnicoQuery) {}

  ngOnInit(): void {

    this.unicoQuery.selectSolicitud$ // Observable para obtener el estado actual de la aplicación.
      .pipe(
        takeUntil(this.destroyed$), // Darse de baja automáticamente cuando el componente se destruya..
        map((seccionState) => {
          this.solicitudState = seccionState; // Asignar el estado obtenido a solicitudState..
        })
      )
      .subscribe();

    this.initializeForm();
    this.loadLocalidad();
    this.loadAsignacionData();
    this.cargarRadio();
   }

  private initializeForm(): void {
    this.avisoForm = this.fb.group({
      modalidad: [this.solicitudState?.modalidad],
      protestaVerdad: [this.solicitudState?.protestaVerdad],
      envioAviso: [this.solicitudState?.envioAviso],
      numeroAviso:[this.solicitudState?.numeroAviso],
      claveReferencia: [{ value: '', disabled: true }],
      numeroOperacion: [this.solicitudState?.numeroOperacion],
      cadenaDependencia: [{ value: '', disabled: true }],
      banco: [this.solicitudState?.banco],
      llavePago: [this.solicitudState?.llavePago],
      fechaPago: [this.solicitudState?.fechaPago],
      importePago: [{ value: '', disabled: true }],
    });
  }

  loadAsignacionData(): void {
    this.service.getSolicitante().pipe(
      takeUntil(this.destroyed$)
    ).subscribe(
      (data:any) => {
        this.avisoForm.patchValue({
        claveReferencia: data.claveReferencia,
          cadenaDependencia: data.cadenaDependencia,
          importePago: data.importePago,
        });
      }
    );
  }

loadLocalidad(): void {
    this.service.obtenerDatosLocalidad()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data): void => {
        this.localidadList = data as Catalogo[];
      });
  }

  cargarRadio(): void {
    this.service.obtenerRadio()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((resp) => {
        this.tipoPersonaOptions = resp;
      });
  }
 

  public onFechaCambiada(nuevo_valor: string): void {
    this.avisoForm.get('fechaPago')?.setValue(nuevo_valor);
    this.avisoForm.get('fechaPago')?.markAsUntouched();
    this.unicoStore.setfechaPago(nuevo_valor);
  }

resetPagoDatos(): void {
    this.avisoForm.patchValue({
     numeroOperacion: '',
     banco: '',
    llavePago: '',
    fechaPago: '',
    });
  }

  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof UnicoStore): void {
    const VALOR = form.get(campo)?.value; 
    (this.unicoStore[metodoNombre] as (value: any) => void)(VALOR); 
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
