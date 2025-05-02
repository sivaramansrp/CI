import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { AlertComponent, InputFecha, InputFechaComponent, TituloComponent } from '@libs/shared/data-access-user/src';

import {ConfiguracionColumna } from '@libs/shared/data-access-user/src';
import { TablaDinamicaComponent } from '@ng-mf/data-access-user';
import { TablaSeleccion } from '@ng-mf/data-access-user';

import { FECHA_DE_PAGO, NICO_TABLA, PermisoModel } from '../../models/permiso-importacion.model';
import {PermisoPetroleoService} from '../../services/permiso-petroleo.service';

import { map, takeUntil } from 'rxjs';
import { Subject } from 'rxjs';

import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';

import { AVISO_PRIVACIDAD, INFORMACION_DE_LA_OBRA_ARTE } from '../../enums/permiso-petroleo.enum';
import { ExportarIlustraciones130302State, Tramite130302Store } from '../../estados/tramite130302.store';
import { Tramite130302Query } from '../../estados/queries/tramite130302.query';

@Component({
  selector: 'app-importacion-exportacion-petroleo',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,TituloComponent,TablaDinamicaComponent,FormasDinamicasComponent, AlertComponent,InputFechaComponent],
  templateUrl: './importacion-exportacion-petroleo.component.html',
  styleUrls: ['./importacion-exportacion-petroleo.component.css']
})
export class ImportacionExportacionPetroleoComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  private destroyed$ = new Subject<void>();
  public informacionFormData = INFORMACION_DE_LA_OBRA_ARTE;
  fechaInicioInput: InputFecha = FECHA_DE_PAGO;
  public forma: FormGroup = new FormGroup({
    ninoFormGroup: new FormGroup({})
  });
  public destroy$ = new Subject<void>();
  public aduanaAlert = AVISO_PRIVACIDAD;

  public exportarIlustracionesState!: ExportarIlustraciones130302State;

  get ninoFormGroup(): FormGroup {
    return this.forma.get('ninoFormGroup') as FormGroup;
  }

  public onFechaCambiada(nuevo_valor: string): void {
    this.form.get('fechaPago')?.setValue(nuevo_valor);
    this.form.get('fechaPago')?.markAsUntouched();
    this.tramite130302Store.setprorrogaAl(nuevo_valor);
  }
  /**
   * property TablaSeleccion
   * description Configuración de la tabla de selección.
   */
  tipoSeleccionTabla = TablaSeleccion;

  /**
   * property tercerosProd
   * description Lista de productos de terceros.
   */
  tercerosProd: PermisoModel[] = [];

  constructor(private fb: FormBuilder, private service:PermisoPetroleoService,private tramite130302Store: Tramite130302Store,
    private tramite130302Query: Tramite130302Query) {}

  configuracionTabla: ConfiguracionColumna<PermisoModel>[] = NICO_TABLA;

  ngOnInit(): void {
    this.tramite130302Query.selectExportarIlustraciones$
    .pipe(
      takeUntil(this.destroy$),
      map((seccionState) => {
        this.exportarIlustracionesState = seccionState;
      })
    )
    .subscribe();
    this.form = new FormGroup({
      saldoDisponible:   new FormControl(this.exportarIlustracionesState?.saldoDisponible),
      prorrogaDel: new FormControl(this.exportarIlustracionesState?.prorrogaDel),
      prorrogaAl: new FormControl(this.exportarIlustracionesState?.prorrogaAl),
      motivoJustificacion: new FormControl(this.exportarIlustracionesState?.motivoJustificacion),
      otrasDeclaraciones: new FormControl(this.exportarIlustracionesState?.otrasDeclaraciones),
    });
    this.loadMercancias();
  }

  loadMercancias(): void {
    this.service.obtenerTabla()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((resp) => {
        this.tercerosProd = resp;
      });
  }
  
establecerCambioDeValor(event: { campo: string; valor: object | string }): void {
    if (event) {
      this.tramite130302Store.setDynamicFieldValue(event.campo, event.valor);
    
    }
  }
  
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite130302Store): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite130302Store[metodoNombre] as (value: string) => void)(VALOR);
  }
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
 
}
