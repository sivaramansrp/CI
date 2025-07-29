/**
 * @module DatosDeLosResiduosComponent
 * Este módulo define el componente `DatosDeLosResiduosComponent` que maneja la información de los residuos.
 */
import { Catalogo } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { DatosPasos } from '@ng-mf/data-access-user';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { REGEX_NUMEROS_DECIMALES } from '@ng-mf/data-access-user';

import { Solicitud231001State, Tramite231001Store } from '../../../../tramites/231001/estados/tramites/tramite231001.store';
import { MateriaprimaformserviceService } from '../../services/materia-prima-formservice.service';
import { Subject } from 'rxjs';
import { TituloComponent } from '@ng-mf/data-access-user';
import { Tramite231001Query } from '../../../../tramites/231001/estados/queries/tramite231001.query';
import { Validators } from '@angular/forms';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';

/**
 * Componente que maneja los datos relacionados con los residuos, incluidos los formularios y catálogos.
 */
@Component({
  selector: 'app-datos-de-los-residuos',
  templateUrl: './datos-de-los-residuos.component.html',
  styleUrl: './datos-de-los-residuos.component.scss',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CatalogoSelectComponent,
    CommonModule,
    TituloComponent,
  ],
})
export class DatosDeLosResiduosComponent implements OnInit, OnDestroy {
  /**
   * @property {FormGroup} materiaPrimaForm
   * Formulario principal del componente para la gestión de datos de residuos.
   */
  materiaPrimaForm!: FormGroup;

  /**
   * @property {boolean} mostrarMsgCantSe06
   * Indica si se debe mostrar el mensaje de cantidad SE06.
   */
  mostrarMsgCantSe06: boolean = false;

  /**
   * @property {DatosPasos} datosPasosGuardar
   * Objeto que maneja los datos de los pasos del formulario.
   */
  datosPasosGuardar: DatosPasos = {
    txtBtnSig: 'Guardar',
    txtBtnAnt: 'Cancelar',
    indice: 2,
    nroPasos: 0,
  };

  /**
   * Opciones del catálogo de unidad de medida.
   */
  comboUnidadMedida!: Catalogo[];

  /**
   * Opciones del catálogo de capítulo de fracción.
   */
  comboCapituloFraccion!: Catalogo[];

  /**
   * Opciones del catálogo de partida de fracción.
   */
  comboPartidaFraccion!: Catalogo[];

  /**
   * Opciones del catálogo de subpartida de fracción.
   */
  comboSubPartidaFraccion!: Catalogo[];

  /**
   * Opciones del catálogo de fracción arancelaria.
   */
  comboFraccionArancelariaParametros!: Catalogo[];

  /**
   * Subject utilizado para gestionar la destrucción del componente y la cancelación de suscripciones.
   */
  private destroyed$ = new Subject<void>();
     /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando se establece en `true`, todos los controles del formulario y elementos interactivos
   * se deshabilitan, impidiendo que el usuario realice cambios. Esta propiedad normalmente se
   * configura según el estado de la aplicación, por ejemplo, al visualizar una solicitud enviada
   * o cuando el usuario no tiene permisos de edición.
   */
    esFormularioSoloLectura: boolean = false;
      /**
   * Estado actual de la sección del trámite 120501.
   * Esta propiedad almacena los datos del estado de la sección, obtenidos generalmente
   * desde el store o desde una consulta al backend. Se utiliza para inicializar y actualizar
   * los formularios del componente con los valores correspondientes a la solicitud en curso.
   */
     private seccionState!: Solicitud231001State;

  /**
   * Instancia de FormBuilder para crear formularios.
   *  Servicio para realizar solicitudes HTTP.
   */
  constructor(
    private fb: FormBuilder,
    private service: MateriaprimaformserviceService,
    private tramite231001Query: Tramite231001Query,
    private tramite231001Store: Tramite231001Store,
    private consultaioQuery: ConsultaioQuery
  ) {
     this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe();

  
  }

  /**
   * @ngOnInit
   * Método que se ejecuta cuando el componente es inicializado. Carga los catálogos de unidad de medida y capítulo de fracción.
   */
  ngOnInit(): void {
    this.inicializarEstadoFormulario();
    this.loadComboUnidadMedida();
    this.loadComboCapituloFraccion();
    this.loadComboPartidaFraccion();
    this.loadComboSubPartidaFraccion();
    this.loadComboFraccionArancelariaParametros();
  }
  /**
   * Método que carga las opciones del catálogo de unidad de medida.
   */
  loadComboUnidadMedida(): void {
     this.service.getUnidadMedida().pipe(
        takeUntil(this.destroyed$)
      ).subscribe(
        (data) => {
          this.comboUnidadMedida = data;
        }
      );
  }

  /**
   * Método que carga las opciones del catálogo de capítulo de fracción.
   */
  loadComboCapituloFraccion(): void {
     this.service.getCapituloFraccion().pipe(
    takeUntil(this.destroyed$)).subscribe(
    (data) => {
      this.comboCapituloFraccion = data;
    }
  );
  }

  /**
   * Método que carga las opciones del catálogo de partida de fracción
   */
  loadComboPartidaFraccion(): void{
    this.service.getPartidaFraccion().pipe(
    takeUntil(this.destroyed$)).subscribe(
    (data) => {
      this.comboPartidaFraccion = data;
    }
  );
  }

  /**
   * Método que carga las opciones del catálogo de subpartida de fracción desde un archivo JSON.
   */
  loadComboSubPartidaFraccion(): void {
    this.service.getSubPartidaFraccion().pipe(
    takeUntil(this.destroyed$)).subscribe(
    (data) => {
      this.comboSubPartidaFraccion = data;
    }
  );
  }

  /**
   * Método que carga las opciones del catálogo de fracción arancelaria desde un archivo JSON.
   */
  loadComboFraccionArancelariaParametros(): void {
    this.service.getFraccionArancelariaParametros().pipe(
    takeUntil(this.destroyed$)).subscribe(
    (data) => {
      this.comboFraccionArancelariaParametros = data;
    }
  );
  }

  /**
   * Convierte la cantidad numérica a su equivalente en texto.
   */
  obtenerLetraCantidad(cantidad: string): void {
    this.materiaPrimaForm.patchValue({
      cantidadEnLetra: cantidad === '1' ? 'UNO' : '',
    });
  }

/**
 * Actualiza el estado del store `tramite231001Store` con el valor de un campo específico del formulario.
 * El formulario reactivo (`FormGroup`) del cual se obtiene el valor.
 * El nombre del campo cuyo valor se actualizará en el store.
 * Actualiza el estado del store con el valor actual de un campo del formulario.
 */
setValoresStore(form: FormGroup, campo: string): void {
  const VALOR = form.get(campo)?.value;
  this.tramite231001Store.actualizarEstado({ [campo]: VALOR });
}

  /**
   * @ngOnDestroy
   * Método que se ejecuta cuando el componente es destruido, limpiando los recursos y cancelando las suscripciones.
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
   /**
 * Inicializa el estado de los formularios según el modo de solo lectura.
 *
 * Si el formulario está en modo solo lectura (`esFormularioSoloLectura`), llama a `guardarDatosFormulario()`
 * para deshabilitar todos los controles. En caso contrario, inicializa los formularios normalmente.
 */
   inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario(); 
    } else {
      this.inicializarFormulario();
    }
  }
    /**
 * Guarda y actualiza el estado de los formularios según el modo de solo lectura.
 *
 * Inicializa los formularios y luego los deshabilita si el formulario está en modo solo lectura,
 * o los habilita si está en modo edición.
 */
  guardarDatosFormulario(): void {
    this.inicializarFormulario();
    if (this.esFormularioSoloLectura) {
      this.materiaPrimaForm.disable();
     
    } else {
      this.materiaPrimaForm.enable();
     
    } 
}
  /**
 * Inicializa los formularios principales del componente con los valores actuales del estado.
 */
  inicializarFormulario(): void {
    this. obtenerEstadoSolicitud();
      this.materiaPrimaForm = this.fb.group({
      descUnidadMedida: [''],
      descFraccion: [''],
      generica1: [''],
      clavePartida: [''],
      claveSubPartida: [''],

      nombreDeLaMateriaPrima: [
        this.seccionState?.nombreDeLaMateriaPrima,
        [Validators.required, Validators.maxLength(120)],
      ], 
      cantidad: [
        this.seccionState?.cantidad,
        [
          Validators.required,
          Validators.pattern(REGEX_NUMEROS_DECIMALES),
          Validators.maxLength(18),
        ],
      ], 
      cantidadEnLetra: [
        { value: this.seccionState?.cantidadEnLetra, disabled: true },
        Validators.maxLength(256),
      ], 
      unidadMedidaComercial: [this.seccionState?.unidadMedidaComercial, Validators.required],
      capituloFraccion: [this.seccionState?.capituloFraccion, Validators.required],
      partidaFraccion: [this.seccionState?.partidaFraccion, Validators.required],
      subPartidaFraccion: [this.seccionState?.subPartidaFraccion, Validators.required],
      fraccion: [this.seccionState?.fraccion, Validators.required],
    });
  }

    /**
   * Suscribe al observable `selectSolicitud$` del query `tramite120501Query` para obtener el estado actual de la solicitud y actualizar la propiedad `seccionState` con los datos recibidos. La suscripción se mantiene activa hasta que se emite un valor en `destroyed$`, evitando fugas de memoria.
   */
  obtenerEstadoSolicitud(): void {
    this.tramite231001Query.selectSolicitud$?.pipe(takeUntil(this.destroyed$))
      .subscribe((data: Solicitud231001State) => {
        this.seccionState = data;
      });
  }
}
