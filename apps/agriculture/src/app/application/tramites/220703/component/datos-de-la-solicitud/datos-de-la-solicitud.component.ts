/* eslint-disable @typescript-eslint/no-explicit-any */
import { AlertComponent, CatalogoSelectComponent, CatalogosSelect, InputFecha, InputFechaComponent, SeccionLibState, TablaDinamicaComponent, TablaSeleccion, TituloComponent } from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DatosDeLaSolicitudInt, DatosDelTramite, ResponsableInspección } from '../../modelos/acuicola.model';
import { EXPEDICION_FACTURA_FECHA, INSTRUCCION_DOBLE_CLIC, MEDIO_SERVICIO, medioInfo } from '../../constantes/acuicola.enum';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { map, takeUntil, tap } from 'rxjs';
import { AcuicolaService } from '../../service/acuicola.service';
import { CommonModule } from '@angular/common';
import { ConfiguracionColumna } from '../../modelos/configuracio-columna.model';
import { SeccionLibQuery } from '@libs/shared/data-access-user/src';
import { SeccionLibStore } from '@libs/shared/data-access-user/src';
import { Subject } from 'rxjs';
import { TEXTOS_220703 } from '../../constantes/acuicola.enum';
import { TramiteStore } from '../../estados/tramite220703.store';
import { TramiteStoreQuery } from '../../estados/tramite220703.query';
import { delay } from 'rxjs';

@Component({
  selector: 'app-datos-de-la-solicitud',
  standalone: true,
  imports: [
    AlertComponent,
    TituloComponent,
    CatalogoSelectComponent,
    InputFechaComponent,
    TablaDinamicaComponent,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './datos-de-la-solicitud.component.html',
  styleUrl: './datos-de-la-solicitud.component.scss'
})
export class DatosDeLaSolicitudComponent implements OnInit, OnDestroy {

  datosDeLaSolicitudForm!: FormGroup;

  SolicitudState!: DatosDeLaSolicitudInt;

  colapsable: boolean = false;

  instruccionDobleClic: string = INSTRUCCION_DOBLE_CLIC;

  tablaSeleccionCheckbox: TablaSeleccion = TablaSeleccion.CHECKBOX;

  horaDeInspeccion!: CatalogosSelect;

  aduanaDeIngreso!: CatalogosSelect;

  oficinaDeInspeccion!: CatalogosSelect;

  puntoDeInspeccion!: CatalogosSelect;

  tipoContenedor!: CatalogosSelect;

  medioDeTransporte!: CatalogosSelect;

  TEXTOS = TEXTOS_220703;

  exportadorTabla: ConfiguracionColumna<medioInfo>[] = MEDIO_SERVICIO;

  mercanciaDatos: medioInfo[] = [];

  fechaInicioInput: InputFecha = EXPEDICION_FACTURA_FECHA;

  private unsubscribe$ = new Subject<void>();
  private seccion!: SeccionLibState;
  private destroyNotifier$: Subject<void> = new Subject();

  constructor(
    private readonly fb: FormBuilder,
    private readonly acuicolaService: AcuicolaService,
    private tramiteStoreQuery: TramiteStoreQuery, //Para la integración de Akita
    private tramiteStore: TramiteStore, //Para la integración de Akita
    private seccionQuery: SeccionLibQuery, //Para la integración de Akita
    private seccionStore: SeccionLibStore, //Para la integración de Akita

    // eslint-disable-next-line no-empty-function
  ) { }

  ngOnInit(): void {
    this.tramiteStoreQuery.selectSolicitudTramite$.pipe(
      takeUntil(this.destroyNotifier$),
      map((seccionState) => {
        this.SolicitudState = seccionState.SolicitudState;
      })
    ).subscribe();

    this.iniciarFormulario();
    this.getHoraDeInspeccion();
    this.cargarDatos();
    this.getAduanaDeIngreso();
    this.getOficinaDeInspeccion();
    this.getPuntoDeInspeccion();
    this.getTipoContenedor();
    this.obtenerResponsableDatos();
    this.getMedioDeTransporte();

    this.tramiteStoreQuery.selectSolicitudTramite$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState: any) => {
          if (seccionState) {
            this.SolicitudState = seccionState.SolicitudState;
            this.datosDeLaSolicitudForm.patchValue(this.SolicitudState);
          }
        })
      ).subscribe();

    this.datosDeLaSolicitudForm.statusChanges
      .pipe(
        takeUntil(this.destroyNotifier$),
        delay(10),
        tap(() => {
          const ACTIVE_STATE = { ...this.datosDeLaSolicitudForm.value };
          this.tramiteStore.setSolicitudTramite(ACTIVE_STATE);
        })
      )
      .subscribe();

    this.seccionQuery.selectSeccionState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.seccion = seccionState;
        })
      )
      .subscribe();

  }

  iniciarFormulario(): void {
    this.datosDeLaSolicitudForm = this.fb.group({
      justificacion: ['', Validators.required],
      certificadosAutorizados: [{ value: '', disabled: true }, Validators.required],
      fechaInicio: ['', Validators.required],
      horaDeInspeccion: ['', Validators.required],
      aduanaDeIngreso: ['', Validators.required],
      oficinaDeInspeccion: ['', Validators.required],
      puntoDeInspeccion: ['', Validators.required],
      nombreInsp: [{ value: '', disabled: true }, Validators.required],
      primerApellido: [{ value: '', disabled: true }, Validators.required],
      segundoApellido: [{ value: '', disabled: true }, Validators.required],
      cantidadContenedores: [{ value: '', disabled: true }, Validators.required],
      tipoContenedor: ['', Validators.required],
      medioDeTransporte: ['', Validators.required],
      identificacionTransporte: ['', Validators.required],
      esSolicitudFerros: ['', Validators.required]
    });
  }

  mostrarColapsable(): void {
    this.colapsable = !this.colapsable;
  }

  cargarDatos(): void {
    this.acuicolaService
      .obtenerDatosCertificados()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data: DatosDelTramite) => {
        this.datosDeLaSolicitudForm.patchValue(data);
      })
  }

  getHoraDeInspeccion(): void {
    this.acuicolaService.getHoraDeInspeccion().subscribe((resp) => {
      if (resp.code === 200) {
        const RESPONSE = resp.data;
        this.horaDeInspeccion = {
          labelNombre: 'Hora de inspección',
          required: false,
          primerOpcion: 'Selecciona un valor',
          catalogos: RESPONSE,
        };
      }
    })
  }



  getAduanaDeIngreso(): void {
    this.acuicolaService.getAduanaDeIngreso().subscribe((resp) => {
      if (resp.code === 200) {
        const RESPONSE = resp.data;
        this.aduanaDeIngreso = {
          labelNombre: 'Aduana de ingreso',
          required: false,
          primerOpcion: 'Selecciona un valor',
          catalogos: RESPONSE,
        };
      }
    });
  }

  getOficinaDeInspeccion(): void {
    this.acuicolaService.getOficinaDeInspeccion().subscribe((resp) => {
      if (resp.code === 200) {
        const RESPONSE = resp.data;
        this.oficinaDeInspeccion = {
          labelNombre: 'Oficina de inspección de Sanidad Agropecuaria',
          required: false,
          primerOpcion: 'Selecciona un valor',
          catalogos: RESPONSE,
        };
      }
    });
  }

  getPuntoDeInspeccion(): void {
    this.acuicolaService.getPuntoDeInspeccion().subscribe((resp) => {
      if (resp.code === 200) {
        const RESPONSE = resp.data;
        this.puntoDeInspeccion = {
          labelNombre: 'Punto de inspección',
          required: false,
          primerOpcion: 'Selecciona un valor',
          catalogos: RESPONSE,
        };
      }
    });
  }

  getTipoContenedor(): void {
    this.acuicolaService.getTipoContenedor().subscribe((resp) => {
      if (resp.code === 200) {
        const RESPONSE = resp.data;
        this.tipoContenedor = {
          labelNombre: 'Tipo contenedor',
          required: false,
          primerOpcion: 'Selecciona un valor',
          catalogos: RESPONSE,
        };
      }
    });
  }

  getMedioDeTransporte(): void {
    this.acuicolaService.getMedioDeTransporte().subscribe((resp) => {
      if (resp.code === 200) {
        const RESPONSE = resp.data;
        this.medioDeTransporte = {
          labelNombre: 'Medio de transporte*',
          required: false,
          primerOpcion: 'Selecciona un valor',
          catalogos: RESPONSE,
        };
      }
    });
  }

  obtenerResponsableDatos(): void {
    this.acuicolaService
      .obtenerResponsableDatos()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data: ResponsableInspección) => {
        this.datosDeLaSolicitudForm.patchValue(data);
      })
  }

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.unsubscribe();
  }
}
