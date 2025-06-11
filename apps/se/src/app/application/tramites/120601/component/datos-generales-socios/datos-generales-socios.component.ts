import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject,map, takeUntil } from 'rxjs';

import { ConsultaioQuery, TableComponent, TituloComponent } from '@ng-mf/data-access-user';
import { BtnContinuarComponent } from '@ng-mf/data-access-user';
import { InputRadioComponent } from '@ng-mf/data-access-user';

import { AlertComponent } from '@ng-mf/data-access-user';
import { ListaPasosWizard } from '@ng-mf/data-access-user';
import { PASOS } from '@ng-mf/data-access-user';

import { DATOS_GENERALES_EXTRANJEROS } from '@ng-mf/data-access-user';
import { DATOS_GENERALES_SOCIOS } from '@ng-mf/data-access-user';
import { DatosEmpresaService } from '../../services/datos-empresa.service';
import { DatosPasos } from '@ng-mf/data-access-user';
import { DatosSociosTable } from '../../modelos/datos-empresa.model';
import { TablaDinamicaComponent } from '@ng-mf/data-access-user';
import { TablaSeleccion } from '@ng-mf/data-access-user';
import { Tramite120601Query } from '../../estados/tramite-120601.query';
import { Tramite120601Store } from '../../estados/tramite-120601.store';


/**
 * Componente para gestionar los datos generales de socios.
 */
@Component({
  selector: 'app-datos-generales-socios',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TituloComponent, BtnContinuarComponent, InputRadioComponent, AlertComponent, TableComponent, TablaDinamicaComponent],
  templateUrl: './datos-generales-socios.component.html',
  styleUrl: './datos-generales-socios.component.scss',
})
export class DatosGeneralesSociosComponent implements OnInit, OnDestroy {

  /** Formulario para la solicitud del usuario */
  FormSolicitud!: FormGroup;

  /** Formulario para almacenar el recuento total de filas */
  formularioParaConteoTotal!: FormGroup;

  /** Pasos para la navegación en el asistente */
  pasos: ListaPasosWizard[] = PASOS;

  /** Índice del paso actual */
  indice: number = 1;

  /**
   * Objeto que almacena la configuración de los pasos del formulario.
   * Contiene el número total de pasos, el índice actual y los textos de los botones de navegación.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * Define el tipo de selección de la tabla como casilla de verificación (checkbox).
   */
  tablaCasilla = TablaSeleccion.CHECKBOX;

  /**
   * Índice de la fila seleccionada en la tabla. Por defecto, se inicializa en 1.
   */
  filaSeleccionada: number = 1;

  /** Configuración de la tabla para socios */
  configuracionTabla = DATOS_GENERALES_SOCIOS;

  /** Configuración de la tabla para socios extranjeros */
  configuracionTabla_Extranjeros = DATOS_GENERALES_EXTRANJEROS;

  /** Array de datos para socios */
  datosSocios: DatosSociosTable[] = [];

  /** Array de datos para socios extranjeros */
  datosExtranjeros = [];

  /** 
   * Subject para manejar la destrucción del componente y evitar fugas de memoria.
   */
  private destroyed$ = new Subject<void>();

  /**
  * Indica si el formulario está en modo solo lectura.
  * Cuando es `true`, los campos del formulario no se pueden editar.
  */
   esFormularioSoloLectura: boolean = false; 


  /**
   * Constructor - inicializa el form builder.
   * @param fb - Instancia de FormBuilder
   */
  constructor(private fb: FormBuilder, private store: Tramite120601Store, private query: Tramite120601Query, private empresaService: DatosEmpresaService, private consultaioQuery: ConsultaioQuery,) {
    // Si es necesario, se puede agregar aquí la lógica del constructor.
    this.consultaioQuery.selectConsultaioState$
    .pipe(
      takeUntil(this.destroyed$),
      map((seccionState) => {
       this.esFormularioSoloLectura = seccionState.readonly;
       this.inicializarEstadoFormulario()
      })
    )
    .subscribe()
  }

  /**
   * Guarda los datos del formulario de importador/exportador.
   * Deshabilita los campos si el formulario está en modo solo lectura.
   */

  guardarDatosFormulario(): void {
    if (this.esFormularioSoloLectura) {
    this.FormSolicitud.get('datosImportadorExportador.nacionalidad')?.disable();
    this.FormSolicitud.get('datosImportadorExportador.persona')?.disable();
    this.FormSolicitud.get('datosImportadorExportador.cadenaDependencia')?.disable();
  }else if (!this.esFormularioSoloLectura){
    this.FormSolicitud.get('datosImportadorExportador.nacionalidad')?.enable();
    this.FormSolicitud.get('datosImportadorExportador.persona')?.enable();
    this.FormSolicitud.get('datosImportadorExportador.cadenaDependencia')?.enable();
  }
}

/**
 * Inicializa el estado del formulario. 
 * Guarda los datos del formulario y actualiza su estado.
 */

  inicializarEstadoFormulario(): void {
  this.guardarDatosFormulario();
  this.actualizarEstadoFormulario();
}

/**
 * Ajusta el estado de solo lectura del formulario.
 * Deshabilita o habilita los campos según corresponda.
 */
actualizarEstadoFormulario(): void {
  if (this.esFormularioSoloLectura) {
    this.FormSolicitud.disable();
  } else {
    this.FormSolicitud.enable();
  }
}

  /**
   * Hook del ciclo de vida - inicializa el componente y los formularios.
   */
  ngOnInit(): void {
    this.obtenerDatosTablaDeSocios();

    this.FormSolicitud = this.fb.group({
      datosImportadorExportador: this.fb.group({
        nacionalidad: ['No', Validators.required],
        persona: ['No', Validators.required],
        cadenaDependencia: ['', Validators.required]
      }),
    });

    this.formularioParaConteoTotal = this.fb.group({
      recuentoTotalDeFilas: [{ value: '', disabled: true }],
    });

    const TOTAL_ROW_COUNT = this.datosSocios.length;
    this.formularioParaConteoTotal.patchValue({ recuentoTotalDeFilas: TOTAL_ROW_COUNT });

    this.query.selectNacionalidad$.pipe(
      takeUntil(this.destroyed$)
    ).subscribe((data)=>{
      this.FormSolicitud.patchValue({
        datosImportadorExportador: {
          nacionalidad: data
        }
      })
    });

    this.query.selectPersona$.pipe(
      takeUntil(this.destroyed$)
    ).subscribe((data)=>{
      this.FormSolicitud.patchValue({
        datosImportadorExportador: {
          persona: data
        }
      })
    });

    this.query.selectCadenaDependencia$.pipe(
      takeUntil(this.destroyed$)
    ).subscribe((data)=>{
      this.FormSolicitud.patchValue({
        datosImportadorExportador: {
          cadenaDependencia: data
        }
      })
    });
   this.inicializarEstadoFormulario();
  }

  /**
   * Obtiene los datos de la tabla de socios desde el servicio.
   * Suscribe a los datos y los asigna a la variable `datosSocios`.
   */

  obtenerDatosTablaDeSocios(): void {
    this.empresaService.obtenerDatosTablaDeSocios().subscribe((data)=>{
      this.datosSocios = data;
    })
  }

  /**
   * Maneja el evento de cambio en la selección de una fila de la tabla.
   * Actualiza el índice de la fila seleccionada y el estado del formulario.
   */
  enCambioNacionalidad(): void {
    this.store.setNacionalidad(this.FormSolicitud.get(['datosImportadorExportador', 'nacionalidad'])?.value);
  }


  /**
   * Maneja el evento de cambio en la selección de una fila de la tabla.
   */

  enCambioPersona(): void {
    this.store.setPersona(this.FormSolicitud.get(['datosImportadorExportador','persona'])?.value);
  }

  /**
   * Maneja el evento de cambio en la cadena de dependencia.
   * Actualiza el estado del store con el nuevo valor de la cadena de dependencia.
   */

  enCambioCadenaDependencia(): void {
    this.store.setCadenaDependencia(this.FormSolicitud.get(['datosImportadorExportador','cadenaDependencia'])?.value);
  }

  /**
   * Hook del ciclo de vida - se ejecuta cuando el componente se destruye.
   * Libera los recursos y completa el Subject `destroyed$`.
   * @param {void}
   */

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
