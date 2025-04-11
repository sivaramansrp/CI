import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';

import { CAAT_REGISTRADO_EMPRESA_ENCABEZADO_DE_TABLA, OPCIONES_DE_BOTON_DE_RADIO, TEXTOS } from '../../constantes/transportacion-maritima.enum';
import { InputRadioComponent, TablaDinamicaComponent, TablaSeleccion, TituloComponent } from '@libs/shared/data-access-user/src';
import { Tramite40201Store, TransportacionMaritima40201State } from '../../../../core/estados/tramites/tramite40201.store';
import { CAATRegistradoEmpresaForm } from '../../models/transportacion-maritima.model';
import { Tramite40201Query } from '../../../../core/queries/tramite40201.query';
import { TransportacionMaritimaService } from '../../services/transportacion-maritima/transportacion-maritima.service';

/**
 * Componente para buscar empresas CAAT.
 */
@Component({
  selector: 'app-buscar-empresa-caat',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TituloComponent,
    InputRadioComponent,
    TablaDinamicaComponent
  ],
  templateUrl: './buscar-empresa-caat.component.html',
  styleUrl: './buscar-empresa-caat.component.css',
})
export class BuscarEmpresaCaatComponent implements OnInit, OnDestroy {
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

  /**
   * Tabla de datos de CAAT registrado empresa.
   */
  caatRegistradoEmpresaTabla: CAATRegistradoEmpresaForm[] = [];

  /**
   * Configuración de tabla para selección de tipo checkbox.
   */
  tablaSeleccionCheckbox: TablaSeleccion = TablaSeleccion.CHECKBOX;

  /**
   * Estado de la solicitud.
   */
  public transportacionMaritimaState!: TransportacionMaritima40201State;

  /**
   * Subject para destruir notificador.
   */
  private destruirNotificador$: Subject<void> = new Subject();

  /**
   * Constructor del componente.
   * @param fb FormBuilder para crear formularios reactivos.
   * @param tramite40201Store Store para gestionar el estado del trámite 40201.
   * @param tramite40201Query Query para consultar el estado del trámite 40201.
   * @param transportacionMaritimaService Servicio para obtener los catálogos y datos relacionados con los transportacion marítima.
   */
  constructor(
    private fb: FormBuilder,
    private tramite40201Store: Tramite40201Store,
    private tramite40201Query: Tramite40201Query,
    private transportacionMaritimaService: TransportacionMaritimaService,
  ) {
    // El constructor se utiliza para la inyección de dependencias
  }

  /**
   * Inicializa el componente.
   * Suscribe a los cambios en el estado de la sección y crea el formulario reactivo.
   */
  ngOnInit(): void {
    this.tramite40201Query.selectSeccionState$
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
    this.tramite40201Store.setCaatRegistradoEmpresaTabla([]);
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
    this.transportacionMaritimaService.obtenerBuscarEmpresaCaat()
      .pipe(takeUntil(this.destruirNotificador$))
      .subscribe({
        next: (result) => {
          const TABLA_DATOS = result.data;
          const NUEVO_CUERPO_TABLA = TABLA_DATOS.map((item: CAATRegistradoEmpresaForm) => ({
            rfc: item.rfc,
            nombreDenominacionRazonSocial: item.nombreDenominacionRazonSocial,
            caat: item.caat,
            perfilCaat: item.perfilCaat,
            inicioVigencia: item.inicioVigencia,
            finVigencia: item.finVigencia,
            pais: item.pais
          }));
          this.caatRegistradoEmpresaTabla = NUEVO_CUERPO_TABLA;
          this.tramite40201Store.setCaatRegistradoEmpresaTabla(NUEVO_CUERPO_TABLA);
        }
      });
  }

  /**
   * Establece los valores en el store de tramite40201.
   *
   * @param {FormGroup} form - El formulario del cual se obtiene el valor.
   * @param {string} campo - El nombre del campo del formulario cuyo valor se va a obtener.
   * @param {string} metodoNombre - El nombre del método en el store que se va a invocar con el valor del campo.
   * @returns {void}
   */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite40201Store): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite40201Store[metodoNombre] as (value: unknown) => void)(VALOR);
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