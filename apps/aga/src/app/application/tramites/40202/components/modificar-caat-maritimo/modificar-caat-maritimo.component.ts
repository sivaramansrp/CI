import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';

import { CAATRegistradoEmpresaForm, CandidatoModificarCaatForm } from '../../models/modificacion-transportacion-maritima.model';
import { CAAT_CANDIDATO_MODIFICAR_ENCABEZADO_DE_TABLA, CAAT_REGISTRADO_EMPRESA_ENCABEZADO_DE_TABLA, OPCIONES_DE_BOTON_DE_RADIO, TEXTOS } from '../../constantes/modificacion-transportacion-maritima.enum';
import { InputRadioComponent, TablaDinamicaComponent, TablaSeleccion, TituloComponent } from '@libs/shared/data-access-user/src';
import { Tramite40202Store, TransportacionMaritima40202State } from '../../../../core/estados/tramites/tramite40202.store';
import { ModificacionTransportacionMaritimaService } from '../../services/modificacion-transportacion-maritima/modificacion-transportacion-maritima.service';
import { Tramite40202Query } from '../../../../core/queries/tramite40202.query';

@Component({
  selector: 'app-modificar-caat-maritimo',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TituloComponent,
    InputRadioComponent,
    TablaDinamicaComponent
  ],
  templateUrl: './modificar-caat-maritimo.component.html',
  styleUrl: './modificar-caat-maritimo.component.css',
})
export class ModificarCaatMaritimoComponent implements OnInit, OnDestroy {
  /**
   * Formulario reactivo para buscar empresas CAAT.
   */
  buscarEmpresaForm!: FormGroup;

  /**
   * Opciones de botón de radio.
   */
  opcionDeBotonDeRadio = OPCIONES_DE_BOTON_DE_RADIO;

  /**
   * Vista seleccionada por el usuario.
   */
  vista: string | number = '';

  /**
   * Texto de la sección.
   */
  TEXTOS = TEXTOS;

  /**
   * Configuración para el encabezado de la tabla de CAAT registrado empresa.
   */
  caatRegistradoEmpresaEncabezadoDeTabla = CAAT_REGISTRADO_EMPRESA_ENCABEZADO_DE_TABLA;

  candidatoModificarCaatEncabezadoDeTabla = CAAT_CANDIDATO_MODIFICAR_ENCABEZADO_DE_TABLA;

  /**
   * Tabla de datos de CAAT registrado empresa.
   */
  caatRegistradoEmpresaTabla: CAATRegistradoEmpresaForm[] = [];

  candidatoModificarCaatTabla: CandidatoModificarCaatForm[] = [];

  /**
   * Configuración de tabla para selección de tipo checkbox.
   */
  tablaSeleccionCheckbox: TablaSeleccion = TablaSeleccion.CHECKBOX;

  /**
   * Estado de la solicitud.
   */
  public transportacionMaritimaState!: TransportacionMaritima40202State;

  /**
   * Subject para destruir notificador.
   */
  private destruirNotificador$: Subject<void> = new Subject();

  /**
   * Constructor del componente.
   * @param fb FormBuilder para crear formularios reactivos.
   * @param tramite40202Store Store para gestionar el estado del trámite 40202.
   * @param tramite40202Query Query para consultar el estado del trámite 40202.
   * @param transportacionMaritimaService Servicio para obtener los catálogos y datos relacionados con los transportacion marítima.
   */
  constructor(
    private fb: FormBuilder,
    private tramite40202Store: Tramite40202Store,
    private tramite40202Query: Tramite40202Query,
    private modificacionTransportacionMaritimaService: ModificacionTransportacionMaritimaService,
  ) {
    // El constructor se utiliza para la inyección de dependencias
  }

  /**
   * Inicializa el componente.
   * Suscribe a los cambios en el estado de la sección y crea el formulario reactivo.
   */
  ngOnInit(): void {
    this.tramite40202Query.selectSeccionState$
      .pipe(
        takeUntil(this.destruirNotificador$),
        map((seccionState) => {
          this.transportacionMaritimaState = seccionState;
          this.caatRegistradoEmpresaTabla = seccionState.caatRegistradoEmpresaTabla ?? [];
          if (seccionState.tipoDeEmpresaOpcion) {
            this.vista = seccionState.tipoDeEmpresaOpcion;
          }
        })
      )
      .subscribe();

    // Inicializar el formulario principal
    this.crearTipoDeEmpresaForm();
  }

  /**
   * Inicializa el formulario reactivo
   * @returns {void}
   */
  crearTipoDeEmpresaForm(): void {
    this.buscarEmpresaForm = this.fb.group({
      tipoDeEmpresa: this.fb.group({
        tipoDeEmpresaOpcion:
          this.transportacionMaritimaState?.tipoDeEmpresaOpcion
      }),
      tipoDeEmpresaNacional: this.fb.group({
        buscarPorRFCNa: [
          this.transportacionMaritimaState?.buscarPorRFCNa,
          [
            Validators.maxLength(20)
          ]
        ],
        buscarPorDenominacionNa: [
          this.transportacionMaritimaState?.buscarPorDenominacionNa,
          [
            Validators.maxLength(50)
          ]
        ],
        folioCaatBusquedaNa: [
          this.transportacionMaritimaState?.folioCaatBusquedaNa,
          [
            Validators.maxLength(50)
          ]
        ]
      }),
      tipoDeEmpresaExtranjera: this.fb.group({
        buscarPorDenominacionEx: [
          this.transportacionMaritimaState?.buscarPorDenominacionEx,
          [
            Validators.maxLength(50)
          ]
        ],
        folioCaatBusquedaEx: [
          this.transportacionMaritimaState?.folioCaatBusquedaEx,
          [
            Validators.maxLength(50)
          ]
        ]
      })
    });
  }

  /**
   * Obtiene el formulario de tipo de empresa.
   * @returns {FormGroup} El formulario de tipo de empresa.
   */
  get tipoDeEmpresa(): FormGroup {
    return this.buscarEmpresaForm.get('tipoDeEmpresa') as FormGroup;
  }

  /**
   * Obtiene el formulario de tipo de empresa nacional.
   * @returns {FormGroup} El formulario de tipo de empresa nacional.
   */
  get tipoDeEmpresaNacional(): FormGroup {
    return this.buscarEmpresaForm.get('tipoDeEmpresaNacional') as FormGroup;
  }

  /**
   * Obtiene el formulario de tipo de empresa extranjera.
   * @returns {FormGroup} El formulario de tipo de empresa extranjera.
   */
  get tipoDeEmpresaExtranjera(): FormGroup {
    return this.buscarEmpresaForm.get('tipoDeEmpresaExtranjera') as FormGroup;
  }

  /**
   * Método que se ejecuta cuando el usuario selecciona una opción de tipo de empresa.
   * @returns {void}
   * @param valor - Valor seleccionado por el usuario.
   * @description Este método se ejecuta cuando el usuario selecciona una opción de tipo de empresa.
   */
  enCambioDeValor(valor: string | number): void {
    this.vista = valor;
    this.limpiarCampos();
  }

  /**
   * Método que se ejecuta al hacer clic en el botón de buscar empresa.
   * @returns {void}
   * @description Este método se ejecuta cuando el usuario hace clic en el botón de buscar empresa.
   */
  buscarEmpresa(): void {
    this.limpiarCampos();
    this.obtenerBuscarEmpresaCaat();
  }

  /**
   * Limpia los campos del formulario y restablece los valores en el store.
   * @returns {void}
   * @description Este método se utiliza para limpiar los campos del formulario y restablecer los valores en el store.
   */
  limpiarCampos(): void {
    this.tramite40202Store.setCaatRegistradoEmpresaTabla([]);
    this.tipoDeEmpresaExtranjera.reset();
    this.tipoDeEmpresaNacional.reset();
    this.setValoresStore(this.tipoDeEmpresaExtranjera, 'buscarPorDenominacionEx', 'setBuscarPorDenominacionEx');
    this.setValoresStore(this.tipoDeEmpresaExtranjera, 'folioCaatBusquedaEx', 'setFolioCaatBusquedaEx');
    this.setValoresStore(this.tipoDeEmpresaNacional, 'buscarPorRFCNa', 'setBuscarPorRFCNa');
    this.setValoresStore(this.tipoDeEmpresaNacional, 'buscarPorDenominacionNa', 'setBuscarPorDenominacionNa');
    this.setValoresStore(this.tipoDeEmpresaNacional, 'folioCaatBusquedaNa', 'setFolioCaatBusquedaNa');
  }

  /**
   * Obtiene la lista de empresas CAAT registradas.
   * @returns {void}
   * @description Este método se utiliza para obtener la lista de empresas CAAT registradas.
   */
  obtenerBuscarEmpresaCaat(): void {
    this.modificacionTransportacionMaritimaService.obtenerBuscarEmpresaCaat()
      .pipe(takeUntil(this.destruirNotificador$))
      .subscribe({
        next: (result) => {
          const TABLA_DATOS = result.data;
          const NUEVO_CUERPO_TABLA = TABLA_DATOS.map((item: CAATRegistradoEmpresaForm) => ({
            rfc: item.rfc,
            nombreDenominacionRazonSocial: item.nombreDenominacionRazonSocial,
            caat: item.caat,
            inicioVigencia: item.inicioVigencia,
            finVigencia: item.finVigencia,
            pais: item.pais
          }));
          this.caatRegistradoEmpresaTabla = NUEVO_CUERPO_TABLA;
          this.tramite40202Store.setCaatRegistradoEmpresaTabla(NUEVO_CUERPO_TABLA);
        }
      });
  }

  /**
   * Establece los valores en el store de tramite40202.
   *
   * @param {FormGroup} form - El formulario del cual se obtiene el valor.
   * @param {string} campo - El nombre del campo del formulario cuyo valor se va a obtener.
   * @param {string} metodoNombre - El nombre del método en el store que se va a invocar con el valor del campo.
   * @returns {void}
   */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite40202Store): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite40202Store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /**
   * Se ejecuta al destruir el componente.
   * Emite un valor y completa el subject `destruirNotificador$` para cancelar las suscripciones.
   */
  ngOnDestroy(): void {
    this.destruirNotificador$.next();
    this.destruirNotificador$.complete();
  }
}