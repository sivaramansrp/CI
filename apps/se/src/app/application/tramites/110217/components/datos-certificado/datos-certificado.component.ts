import { Catalogo, CatalogoLista } from '../../models/certificado-origen.model';
import { CatalogoSelectComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReplaySubject, Subject, map, takeUntil } from 'rxjs';
import { CertificadosOrigenService } from '../../services/certificado-origen.service.ts';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Tramite110217Query } from '../../../../estados/queries/tramite110217.query';
import { Tramite110217State } from '../../../../estados/tramites/tramite110217.store';
import { Tramite110217Store } from '../../../../estados/tramites/tramite110217.store';
import { Validators } from '@angular/forms';

/**
 * Componente para gestionar los datos del certificado.
 *
 * Este componente permite al usuario ingresar y gestionar información relacionada con el certificado,
 * como observaciones, idioma, entidad federativa y representación federal.
 */
@Component({
  selector: 'app-datos-certificado',
  imports: [
    TituloComponent,
    ReactiveFormsModule,
    CatalogoSelectComponent,
    CommonModule,
  ],
  templateUrl: './datos-certificado.component.html',
  styleUrl: './datos-certificado.component.scss',
  standalone: true,
})
export class DatosCertificadoComponent implements OnInit, OnDestroy {
  /**
   * Subject para destruir notificador.
   */
  consultaDatos!: ConsultaioState;
  /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
   */
  soloLectura: boolean = false;

  /**
   * ReplaySubject para manejar la destrucción del componente.
   * Se utiliza para cancelar las suscripciones activas y evitar fugas de memoria.
   */
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
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
  public tramiteState!: Tramite110217State;

  /**
   * Constructor del componente.
   *
   * @param {FormBuilder} fb - Constructor para crear formularios reactivos.
   * @param {CertificadosOrigenService} certificadosOrigenService - Servicio para obtener datos relacionados con el certificado.
   * @param {Tramite110217Store} store - Store para gestionar el estado del trámite.
   * @param {Tramite110217Query} tramiteQuery - Query para obtener el estado del trámite.
   */
  constructor(
    private fb: FormBuilder,
    private certificadosOrigenService: CertificadosOrigenService,
    public store: Tramite110217Store,
    public tramiteQuery: Tramite110217Query,
    private consultaioQuery: ConsultaioQuery
  ) // eslint-disable-next-line no-empty-function
  {}

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
    this.inicializarFormulario();
   
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.consultaDatos = seccionState;
          this.soloLectura = this.consultaDatos.readonly;
          this.certificadoFormulario();
        })
      )
      .subscribe();
  }
  /**
   * Configura el formulario de certificado según el modo de solo lectura.
   *
   * Si `soloLectura` es `true`, deshabilita el formulario para que no se pueda editar.
   * Si es `false`, habilita el formulario para permitir la edición.
   */
  certificadoFormulario(): void {
    if (this.soloLectura) {
      this.formDatosCertificado.disable();
    } else {
      this.formDatosCertificado.enable();
    }
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
      idioma: [
        this.tramiteState?.idioma,
        [Validators.required, Validators.min(0)],
      ],
      entidadFederativa: [
        this.tramiteState?.entidadFederativa,
        [Validators.required, Validators.min(0)],
      ],
      representacionFederal: [
        this.tramiteState?.representacionFederal,
        [Validators.required, Validators.min(0)],
      ],
    });
    this.formDatosCertificado.markAllAsTouched();
    this.certificadoFormulario();
  }

  /**
   * Carga la lista de idiomas disponibles desde el servicio.
   */
  cargarIdioma(): void {
    this.certificadosOrigenService
      .obtenerIdioma()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((datos: CatalogoLista) => {
        this.idiomas = datos.datos;
      });
  }

  /**
   * Maneja la selección de un idioma y actualiza el estado del store.
   */
  idiomaSeleccion(): void {
    this.setValoresStore(this.formDatosCertificado, 'idioma', 'setIdioma');
  }

  /**
   * Carga la lista de entidades federativas disponibles desde el servicio.
   */
  cargarEntidadFederativa(): void {
    this.certificadosOrigenService
      .obtenerEntidadFederativa()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((datos: CatalogoLista) => {
        this.entidadFederativas = datos.datos;
      });
  }

  /**
   * Maneja la selección de una entidad federativa y actualiza el estado del store.
   */
  entidadFederativaSeleccion(): void {
    this.setValoresStore(
      this.formDatosCertificado,
      'entidadFederativa',
      'setEntidadFederativa'
    );
  }

  /**
   * Carga la lista de representaciones federales disponibles desde el servicio.
   */
  cargarRepresentacionFederal(): void {
    this.certificadosOrigenService
      .obtenerRepresentacionFederal()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((datos: CatalogoLista) => {
        this.representacionFederal = datos.datos;
      });
  }

  /**
   * Maneja la selección de una representación federal y actualiza el estado del store.
   */
  representacionFederalSeleccion(): void {
    this.setValoresStore(
      this.formDatosCertificado,
      'representacionFederal',
      'setRepresentacionFederal'
    );
  }

  /**
   * Actualiza el estado del store con el valor seleccionado en el formulario.
   *
   * @param {FormGroup} form - El formulario reactivo.
   * @param {string} campo - El nombre del campo en el formulario.
   * @param {keyof Tramite110217Store} metodoNombre - El nombre del método en el store para actualizar el estado.
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite110217Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.store[metodoNombre] as (value: unknown) => void)(VALOR);
  }
}
