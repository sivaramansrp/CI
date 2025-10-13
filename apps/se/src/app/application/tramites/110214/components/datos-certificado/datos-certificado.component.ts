import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { Catalogo } from '../../models/validar-inicialmente-certificado.model';
import { CatalogoLista } from '../../models/validar-inicialmente-certificado.model';
import { CatalogoSelectComponent } from "@libs/shared/data-access-user/src";
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { Tramite110214Query } from '../../../../estados/queries/tramite110214.query';
import { Tramite110214State } from '../../../../estados/tramites/tramite110214.store';
import { Tramite110214Store } from '../../../../estados/tramites/tramite110214.store';
import { ValidarInicialmenteCertificadoService } from '../../services/validar-inicialmente-certificado.service';
import { Validators } from '@angular/forms';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';
/**
 * Componente para gestionar los datos del certificado.
 * 
 * Este componente permite al usuario ingresar y gestionar información relacionada con el certificado,
 * como observaciones, idioma, entidad federativa y representación federal.
 */
@Component({
  selector: 'app-datos-certificado',
  imports: [TituloComponent, ReactiveFormsModule, CatalogoSelectComponent, CommonModule],
  templateUrl: './datos-certificado.component.html',
  styleUrl: './datos-certificado.component.scss',
  standalone: true
})
export class DatosCertificadoComponent implements OnInit, OnDestroy {

  /**
   * Formulario reactivo para los datos del certificado.
   */
  formDatosCertificado!: FormGroup;

  /**
   * Lista de idiomas disponibles.
   */
  idiomas: Catalogo[] = [];

  /**
   * Lista de entidades federativas disponibles.
   */
  entidadFederativas: Catalogo[] = [];

  /**
   * Lista de representaciones federales disponibles.
   */
  representacionFederal: Catalogo[] = [];

  /**
   * Notificador para destruir las suscripciones y evitar fugas de memoria.
   */
  destroyNotifier$: Subject<void> = new Subject();

  /**
   * Estado actual del trámite.
   */
  public tramiteState!: Tramite110214State;

  /**
   * @property {ConsultaioState} consultaDatos
   * @description Estado actual de la consulta, que contiene información relacionada con el trámite y el solicitante.
   */
  consultaDatos!: ConsultaioState;
  /**
   * @property {boolean} soloLectura
   * @description Indica si el formulario o los campos están en modo de solo lectura.
   * @default false
   */
  soloLectura: boolean = false;

  /**
   * Constructor del componente.
   * 
   * @param {FormBuilder} fb - Constructor para crear formularios reactivos.
   * @param {ValidarInicialmenteCertificadoService} ValidarInicialmenteCertificadoService - Servicio para obtener datos relacionados con el certificado.
   * @param {Tramite110214Store} store - Store para gestionar el estado del trámite.
   * @param {Tramite110214Query} tramiteQuery - Query para obtener el estado del trámite.
   */
  constructor(
    private fb: FormBuilder,
    private validarInicialmenteCertificadoService: ValidarInicialmenteCertificadoService,
    public store: Tramite110214Store,
    public tramiteQuery: Tramite110214Query,
    private consultaioQuery: ConsultaioQuery,
  ) { }

  /**
   * Método que se ejecuta al inicializar el componente.
   * 
   * Carga los datos iniciales, configura el formulario y suscribe al estado del trámite.
   */
  ngOnInit(): void {
    this.cargarIdioma();
    this.cargarEntidadFederativa();
    this.cargarRepresentacionFederal();
    this.tramiteQuery.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.tramiteState = seccionState;
        })
      )
      .subscribe();
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.consultaDatos = seccionState;
          this.soloLectura = this.consultaDatos.readonly;
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe();
    this.inicializarFormulario();
  }

  /**
   * Método que se ejecuta al destruir el componente.
   * 
   * Libera los recursos y cancela las suscripciones activas.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

  /**
   * Inicializa el formulario con los datos del estado del trámite.
   */
  inicializarFormulario(): void {
    this.formDatosCertificado = this.fb.group({
      observaciones: [this.tramiteState?.observaciones],
      idioma: [this.tramiteState?.idioma, [Validators.required, Validators.min(0)]],
      entidadFederativa: [this.tramiteState?.entidadFederativa, [Validators.required, Validators.min(0)]],
      representacionFederal: [this.tramiteState?.representacionFederal, [Validators.required, Validators.min(0)]],
    });
    // this.formDatosCertificado.markAllAsTouched();
    this.inicializarEstadoFormulario();
  }
  /**
   * @method inicializarEstadoFormulario
   * @description Inicializa el estado del formulario según el modo de solo lectura.
   * 
   * Si la propiedad `soloLectura` es verdadera, deshabilita todos los controles del formulario.
   * En caso contrario, habilita los controles del formulario.
   * 
   * @returns {void}
   */
  inicializarEstadoFormulario(): void {
    if (this.soloLectura) {
      this.formDatosCertificado?.disable();
    } else {
      this.formDatosCertificado?.enable();
    }
  }

  /**
   * Carga la lista de idiomas disponibles desde el servicio.
   */
  cargarIdioma(): void {
    this.validarInicialmenteCertificadoService
      .obtenerIdioma()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(
        (datos: CatalogoLista) => {
          this.idiomas = datos.datos;
        }
      );
  }

  /**
   * Maneja la selección de un idioma y actualiza el estado del store.
   */
  idiomaSeleccion(): void {
    this.setValoresStore(this.formDatosCertificado, 'idioma', 'setIdioma');
    this.store.setFormValidity('datosCertificado', this.formDatosCertificado.valid);
  }

  /**
   * Carga la lista de entidades federativas disponibles desde el servicio.
   */
  cargarEntidadFederativa(): void {
    this.validarInicialmenteCertificadoService
      .obtenerEntidadFederativa()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(
        (datos: CatalogoLista) => {
          this.entidadFederativas = datos.datos;
        }
      );
  }

  /**
   * Maneja la selección de una entidad federativa y actualiza el estado del store.
   */
  entidadFederativaSeleccion(): void {
    this.setValoresStore(this.formDatosCertificado, 'entidadFederativa', 'setEntidadFederativa');
    this.store.setFormValidity('datosCertificado', this.formDatosCertificado.valid);
  }

  /**
   * Carga la lista de representaciones federales disponibles desde el servicio.
   */
  cargarRepresentacionFederal(): void {
    this.validarInicialmenteCertificadoService
      .obtenerRepresentacionFederal()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(
        (datos: CatalogoLista) => {
          this.representacionFederal = datos.datos;
        }
      );
  }

  /**
   * Maneja la selección de una representación federal y actualiza el estado del store.
   */
  representacionFederalSeleccion(): void {
    this.setValoresStore(this.formDatosCertificado, 'representacionFederal', 'setRepresentacionFederal');
    this.store.setFormValidity('datosCertificado', this.formDatosCertificado.valid);
  }
  /**
   * Valida el formulario de datos del certificado.
   * 
   * @returns {boolean} - Retorna true si el formulario es válido, false en caso contrario.
   */
  public validarFormulario(): void {
    this.formDatosCertificado.markAllAsTouched();
  }
  /**
   * Actualiza el estado del store con el valor seleccionado en el formulario.
   * 
   * @param {FormGroup} form - El formulario reactivo.
   * @param {string} campo - El nombre del campo en el formulario.
   * @param {keyof Tramite110214Store} metodoNombre - El nombre del método en el store para actualizar el estado.
   */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite110214Store): void {
    const VALOR = form.get(campo)?.value;
    (this.store[metodoNombre] as (value: unknown) => void)(VALOR);
  }
}