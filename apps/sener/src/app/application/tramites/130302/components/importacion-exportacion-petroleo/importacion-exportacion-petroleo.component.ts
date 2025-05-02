import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { Catalogo, ConfiguracionColumna, MENSAJEDEALERTA } from '@libs/shared/data-access-user/src';
import { TablaDinamicaComponent } from '@ng-mf/data-access-user';
import { TablaSeleccion } from '@ng-mf/data-access-user';
import { NICO_TABLA, PermisoModel } from '../../models/permiso-importacion.model';
import {PermisoPetroleoService} from '../../services/permiso-petroleo.service' 
import { map, Subject, takeUntil } from 'rxjs';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { AVISO_PRIVACIDAD, INFORMACION_DE_LA_OBRA_ARTE } from '../../enums/permiso-petroleo.enum';
import { ExportarIlustraciones270101State, Tramite270101Store } from '../../estados/tramite130302.store';
import { Tramite270101Query } from '../../estados/queries/tramite130302.query';

@Component({
  selector: 'app-importacion-exportacion-petroleo',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,TituloComponent,TablaDinamicaComponent,FormasDinamicasComponent, AlertComponent],
  templateUrl: './importacion-exportacion-petroleo.component.html',
  styleUrls: ['./importacion-exportacion-petroleo.component.css']
})
export class ImportacionExportacionPetroleoComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  private destroyed$ = new Subject<void>();
  public informacionFormData = INFORMACION_DE_LA_OBRA_ARTE;

  public forma: FormGroup = new FormGroup({
    ninoFormGroup: new FormGroup({})
  });
  public destroy$ = new Subject<void>();
  public aduanaAlert = AVISO_PRIVACIDAD;

  public exportarIlustracionesState!: ExportarIlustraciones270101State;

  get ninoFormGroup(): FormGroup {
    return this.forma.get('ninoFormGroup') as FormGroup;
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

  constructor(private fb: FormBuilder, private service:PermisoPetroleoService,private tramite270101Store: Tramite270101Store,
    private tramite270101Query: Tramite270101Query) {}

  configuracionTabla: ConfiguracionColumna<PermisoModel>[] = NICO_TABLA;

  ngOnInit(): void {
    this.tramite270101Query.selectExportarIlustraciones$
    .pipe(
      takeUntil(this.destroy$),
      map((seccionState) => {
        this.exportarIlustracionesState = seccionState;
      })
    )
    .subscribe();
    this.form = this.fb.group({
      folioTramite: ['', Validators.required],
      tipoSolicitud: ['', Validators.required],
      regimen: ['', Validators.required],
      clasificacionRegimen: ['', Validators.required],
      periodoVigencia: ['', Validators.required],
      unidadMedida: ['', Validators.required],
      fraccionArancelaria: ['', Validators.required],
      cantidadAutorizada: ['', Validators.required],
      valorAutorizado: ['', Validators.required],
      nico: ['', Validators.required],
      descripcionNico: ['', Validators.required],
      acotacion: [''],
      permisoValidoDesde: ['', Validators.required],
      permisoValidoHasta: ['', Validators.required],
      saldoDisponible: [''],
      prorrogaDel: [''],
      prorrogaAl: [''],
      motivoJustificacion: ['', Validators.required],
      otrasDeclaraciones: [''],
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
  

  onSubmit(): void {
    if (this.form.valid) {
      console.log('Form Data:', this.form.value);
    }
  }
  establecerCambioDeValor(event: { campo: string; valor: object | string }): void {
    if (event) {
      this.tramite270101Store.setDynamicFieldValue(event.campo, event.valor);
      // this.exportarIlustracionesService.setForm('lugar', this.ninoFormGroup);
    }
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
 
}
