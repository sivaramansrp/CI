import { Catalogo, CatalogoLista } from '../../models/certificado-origen.model';
import {
  CatalogoSelectComponent,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, ReplaySubject, Subject, map, takeUntil } from 'rxjs';
import { CertificadosOrigenService } from '../../services/certificado-origen.service.ts';
import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Tramite110217Query } from '../../../../estados/queries/tramite110217.query';
import { Tramite110217State } from '../../../../estados/tramites/tramite110217.store';
import { Tramite110217Store } from '../../../../estados/tramites/tramite110217.store';
import { Validators } from '@angular/forms';
import { DatosCertificadoDeComponent } from '../../../../shared/components/datos-certificado-de/datos-certificado-de.component';

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
    DatosCertificadoDeComponent,
  ],
  templateUrl: './datos-certificado.component.html',
  styleUrl: './datos-certificado.component.scss',
  standalone: true,
})
export class DatosCertificadoComponent implements OnInit, OnDestroy {
  /**
   * Idioma: Indica si el idioma está habilitado o no.
   */
  idioma: boolean = true;

  /**
   * Observable que contiene la lista de idiomas disponibles.
   */
  idiomaDatos$!: Observable<Catalogo[]>;

  /**
   * Observable que contiene la lista de entidades federativas disponibles.
   */
  entidadFederativas$!: Observable<Catalogo[]>;

  /**
   * Observable que contiene la lista de representaciones federales disponibles.
   */
  representacionFederal$!: Observable<Catalogo[]>;

  /**
   * Valores actuales del formulario de datos del certificado.
   */
  formDatosCertificadoValues!: { [key: string]: unknown };

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
   * Referencia al componente hijo DatosCertificadoDeComponent
   * Permite acceder al formulario y métodos del componente hijo
   */
  @ViewChild(DatosCertificadoDeComponent)
  datosCertificadoDeRef!: DatosCertificadoDeComponent;

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
    private consultaioQuery: ConsultaioQuery // eslint-disable-next-line no-empty-function
  ) {
    this.tramiteQuery.formDatosCertificado$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((estado) => {
        this.formDatosCertificadoValues = estado;
      });

    /**
     * Asignación de los observables que contienen los catálogos de datos a los que se puede suscribir el componente.
     */
    this.idiomaDatos$ = this.tramiteQuery.selectIdioma$;
    this.entidadFederativas$ = this.tramiteQuery.selectEntidadFederativa$;
    this.representacionFederal$ =
      this.tramiteQuery.selectrepresentacionFederal$;
  }

  /**
   * Método que se ejecuta al inicializar el componente.
   *
   * Carga los datos iniciales, configura el formulario y suscribe al estado del trámite.
   */
  ngOnInit(): void {
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.consultaDatos = seccionState;
          this.soloLectura = this.consultaDatos.readonly;
        })
      )
      .subscribe();
  }

  /**
   * Método para validar el formulario del componente hijo
   * @returns boolean indicando si el formulario es válido
   */
  isChildFormValid(): boolean {
    return this.datosCertificadoDeRef?.validarFormularios() || false;
  }

  /**
   * Establece el estado de validez del formulario en el store.
   * @param valida Indica si el formulario es válido o no.
   */
  setFormValida(valida: boolean): void {
    this.store.setFormValida({ datos: valida });
  }

  /**
   * Método público para validar todos los formularios del componente datos-certificado.
   * Valida el formulario del componente hijo DatosCertificadoDeComponent y actualiza el estado.
   * @returns boolean indicando si todos los formularios son válidos
   */
  public validateAll(): boolean {
    let valid = true;

    if (this.datosCertificadoDeRef) {
      const ES_FORMULARIO_HIJO_VALIDO =
        this.datosCertificadoDeRef.validarFormularios();
      if (!ES_FORMULARIO_HIJO_VALIDO) {
        valid = false;
      }

      this.setFormValida(ES_FORMULARIO_HIJO_VALIDO);
    }

    return valid;
  }

  /**
   * Valida el formulario de datos del certificado.
   *
   * @returns {boolean} - Retorna true si el formulario es válido, false en caso contrario.
   */
  public validarFormulario(): boolean {
    let isValid = true;

    if (!this.formDatosCertificado) {
      return false;
    }

    if (this.formDatosCertificado.invalid) {
      this.formDatosCertificado.markAllAsTouched();
      isValid = false;
    }

    return isValid;
  }

  /**
   * Maneja la selección de un idioma y actualiza el estado del store.
   */
  idiomaSeleccion(estado: Catalogo): void {
    this.store.setIdiomaSeleccion(estado);
  }

  /**
   * Método que selecciona una representación federal y actualiza el estado en el store.
   * @param estado El estado de la representación federal seleccionada.
   */
  representacionFederalSeleccion(estado: Catalogo): void {
    this.store.setRepresentacionFederalDatosSeleccion(estado);
  }

  /**
   * Establece valores en el estado de la tienda para un formulario genérico de certificado.
   *
   * @param event - Objeto que contiene los datos necesarios para actualizar el estado.
   * @param event.formGroupName - Nombre del grupo de formulario (no utilizado en esta implementación).
   * @param event.campo - Nombre del campo que se actualizará en el estado.
   * @param event.valor - Valor que se asignará al campo especificado.
   * @param event.storeStateName - Nombre del estado de la tienda (no utilizado en esta implementación).
   *
   * @returns void
   *
   * @command Este método actualiza el estado de la tienda con los valores proporcionados.
   */
  setValoresStore(event: {
    formGroupName: string;
    campo: string;
    valor: undefined;
    storeStateName: string;
  }): void {
    const { campo: CAMPO, valor: VALOR } = event;
    this.store.setFormDatosCertificado({ [CAMPO]: VALOR });
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
}