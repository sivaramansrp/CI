/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-empty-function */
/* eslint-disable @nx/enforce-module-boundaries */
import { AcuicolaService } from '../../servicios/acuicola.service';
import { AlertComponent} from '@libs/shared/data-access-user/src';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { CatalogosSelect } from '@libs/shared/data-access-user/src';
import { ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ConfiguracionColumna} from '@libs/shared/data-access-user/src';
import { DatosDelTramite } from '../../modelos/acuicola.model';
import { EXPEDICION_FACTURA_FECHA } from '../../constantes/inspeccion-fisica-zoosanitario.enums';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { INSTRUCCION_DOBLE_CLIC } from '../../constantes/inspeccion-fisica-zoosanitario.enums';
import { InputFecha } from '@libs/shared/data-access-user/src';
import { InputFechaComponent } from '@libs/shared/data-access-user/src';
import { JsonPipe } from '@angular/common';
import { MEDIO_SERVICIO } from '../../modelos/datos-de-interfaz.model';
import { MedioDeTransporteService } from '../../servicios/medio-de-transporte';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ResponsableInspección } from '../../modelos/acuicola.model';
import { Subject } from 'rxjs';
import { TEXTOS_220501 } from '@libs/shared/data-access-user/src';
import { TablaDinamicaComponent } from '@ng-mf/data-access-user';
import { TablaSeleccion } from '@ng-mf/data-access-user';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { Validators } from '@angular/forms';
import { takeUntil } from 'rxjs';

import { medioInfo } from '../../modelos/datos-de-interfaz.model';
@Component({
  selector: 'datos-de-la-solicitud',
  standalone: true,
  imports: [
    AlertComponent,
    TituloComponent,
    CatalogoSelectComponent,
    InputFechaComponent,
    ReactiveFormsModule,
    TablaDinamicaComponent,
    JsonPipe,
    CommonModule
  ],
  templateUrl: './datos-de-la-solicitud.component.html',
  styleUrl: './datos-de-la-solicitud.component.scss'
})
export class DatosDeLaSolicitudComponent implements OnInit, OnDestroy {

  datosDeLaSolicitudForm!: FormGroup;

  colapsable: boolean = false;

  instruccionDobleClic: string = INSTRUCCION_DOBLE_CLIC;

  horaDeInspeccion!: CatalogosSelect;
  aduanaDeIngreso!: CatalogosSelect;
  oficinaDeInspeccion!: CatalogosSelect;
  puntoDeInspeccion!: CatalogosSelect;
  tipoContenedor!: CatalogosSelect;
  medioDeTransporte!: CatalogosSelect;

  TEXTOS = TEXTOS_220501;

  mercanciaDatos: string[] = [];

  fechaInicioInput: InputFecha = EXPEDICION_FACTURA_FECHA;

  tableData = {
    header: [
      "Fraccion arancelaria",
      "Descripción de la fracción",
      "Nico",
      "Descripción Nico",
      "Unidad de medida de tarifa (UMT)",
      "Cantidad total UMT",
    ],
  };

  /**
   * Tipo de selección de la tabla.
   * @type {TablaSeleccion}
   */
       tablaSeleccionCheckbox: TablaSeleccion = TablaSeleccion.CHECKBOX;
     /**
      * Configuración de las columnas de la tabla para servicios MERCANCIA.
      * @type {ConfiguracionColumna<medioInfo>[]}
      */
     exportadorTabla: ConfiguracionColumna<medioInfo>[] = MEDIO_SERVICIO;
       /**
        * Datos de los servicios MERCANCIA.
        * @type {medioInfo[]}
        */
       medioTableDatos: medioInfo[] = [];
   
         /**
      * @property {any[]} medioContenido - Array de datos Medio de transporte.
      */
     // eslint-disable-next-line @typescript-eslint/no-explicit-any
     medioContenido: any[] = [];

  private destroyNotifier$: Subject<void> = new Subject();

  constructor(
    private readonly fb: FormBuilder,
    private readonly acuicolaService: AcuicolaService,
    private readonly medioDeTransporteService: MedioDeTransporteService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.iniciarFormulario();
    this.getHoraDeInspeccion();
    this.cargarDatos();
    this.getAduanaDeIngreso();
    this.getOficinaDeInspeccion();
    this.getPuntoDeInspeccion();
    this.getTipoContenedor();
    this.obtenerResponsableDatos();
    this.getMedioDeTransporte();
    this.fetchData();
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
  fetchData(): void {
    this.medioDeTransporteService.getDatos()
    .subscribe({
      next: (response: any) => {
        if (response && Array.isArray(response.medioContenido)) {
          this.medioTableDatos = response.medioContenido;
          this.cdr.detectChanges(); 
        } else {
          console.error("La respuesta de la API no tiene el formato esperado: ", response);
        }
      },
      error: (error) => {
        console.error("Error al obtener datos: ", error);
      }
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
    });
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
