import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, map, merge, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Modal } from 'bootstrap';

import { CAATRegistradoEmpresaForm, CandidatoModificarCaatForm, PersonaFisicaExtranjeraForm } from '../../models/modificacion-transportacion-maritima.model';
import { CAAT_CANDIDATO_MODIFICAR_ENCABEZADO_DE_TABLA, CAAT_REGISTRADO_EMPRESA_ENCABEZADO_DE_TABLA, OPCIONES_DE_BOTON_DE_RADIO, TEXTOS } from '../../constantes/modificacion-transportacion-maritima.enum';
import { Catalogo, CatalogoSelectComponent, InputRadioComponent, Notificacion, NotificacionesComponent, TablaDinamicaComponent, TablaSeleccion, TituloComponent } from '@libs/shared/data-access-user/src';
import { Tramite40202Store, TransportacionMaritima40202State } from '../../../../core/estados/tramites/tramite40202.store';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { ModificacionTransportacionMaritimaService } from '../../services/modificacion-transportacion-maritima/modificacion-transportacion-maritima.service';
import { Tramite40202Query } from '../../../../core/queries/tramite40202.query';

/**
 * Componente para modificar CAAT marítimo.
 */
@Component({
  selector: 'app-modificar-caat-maritimo',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TituloComponent,
    InputRadioComponent,
    TablaDinamicaComponent,
    CatalogoSelectComponent,
    NotificacionesComponent
  ],
  templateUrl: './modificar-caat-maritimo.component.html',
  styleUrl: './modificar-caat-maritimo.component.scss',
})
export class ModificarCaatMaritimoComponent implements OnDestroy {
  /**
   * Formulario reactivo para buscar empresas CAAT.
   */
  buscarEmpresaForm!: FormGroup;

  /**
   * Formulario reactivo para gestionar la información de personas físicas extranjeras.
   */
  personaFisicaExtranjeraForm!: FormGroup;

  /**
   * Catálogos para los selectores.
   */
  pais!: Catalogo[];

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
   * Configuración para el encabezado de la tabla de candidato a modificar CAAT.
   */
  candidatoModificarCaatEncabezadoDeTabla = CAAT_CANDIDATO_MODIFICAR_ENCABEZADO_DE_TABLA;

  /**
   * Tabla de datos de CAAT registrado empresa.
   */
  caatRegistradoEmpresaTabla: CAATRegistradoEmpresaForm[] = [];

  /**
   * Tabla de datos de candidato a modificar CAAT.
   */
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
   * Referencia al botón de cerrar el modal.
   */
  @ViewChild('closeModal') closeModal!: ElementRef;

  /**
   * Referencia al modal de agregar persona física extranjera.
   */
  @ViewChild('modal-agregar-pfe', { static: false }) modalAgregarPFE!: ElementRef;

  /**
   * Bandera para mostrar el botón de agregar seleccionado.
   */
  mostrarAgregarSeleccionado: boolean = true;

  /**
   * Subject para destruir notificador.
   */
  private destruirNotificador$: Subject<void> = new Subject();

  /**
   * Elemento modal para mostrar información adicional.
   */
  modalElemento!: HTMLElement | null;

  /**
   * Instancia del modal de agregar persona física extranjera.
   */
  modalAgregarPFEInstance!: Modal;

  /**
   * Notificación para mostrar mensajes al usuario.
   */
  public nuevaAlertaNotificacion!: Notificacion;  

  /**
   * Notificación para mostrar mensajes de selección al usuario.
   */
  public nuevaAlertaSeleccionNotificacion!: Notificacion;

  /**
   * @property {boolean} formularioDeshabilitado
   * @description Indica si el formulario está deshabilitado (solo lectura).
   */
  formularioDeshabilitado: boolean = false;

  /**
   * @property {boolean} mostrarError
   * @description Indica si se debe mostrar un mensaje de error.
   */
  mostrarError: boolean = false;

  /**
   * Constructor del componente.
   * @param fb FormBuilder para crear formularios reactivos.
   * @param tramite40202Store Store para gestionar el estado del trámite 40202.
   * @param tramite40202Query Query para consultar el estado del trámite 40202.
   * @param consultaioQuery - Query para consultar el estado de la consulta.
   * @param transportacionMaritimaService Servicio para obtener los catálogos y datos relacionados con los transportacion marítima.
   */
  constructor(
    private fb: FormBuilder,
    private tramite40202Store: Tramite40202Store,
    private tramite40202Query: Tramite40202Query,
    private consultaioQuery: ConsultaioQuery,
    private modificacionTransportacionMaritimaService: ModificacionTransportacionMaritimaService,
  ) {
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destruirNotificador$),
        map((seccionState) => {
          this.formularioDeshabilitado = seccionState.readonly;
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe();

    this.inicializaCatalogos();

    this.tramite40202Query.selectSeccionState$
      .pipe(
        takeUntil(this.destruirNotificador$),
        map((seccionState) => {
          this.transportacionMaritimaState = seccionState;
          this.caatRegistradoEmpresaTabla = seccionState.caatRegistradoEmpresaTabla ?? [];
          this.candidatoModificarCaatTabla = seccionState.candidatoModificarCaatTabla ?? [];
          this.mostrarAgregarSeleccionado = seccionState.mostrarAgregarSeleccionado ?? true;
          if (seccionState.tipoDeEmpresaOpcion) {
            this.vista = seccionState.tipoDeEmpresaOpcion;
          }
        })
      )
      .subscribe();

    // Inicializar el formulario principal
    this.crearTipoDeEmpresaForm();

    this.paisSeleccion();
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
    this.personaFisicaExtranjeraForm = this.fb.group({
      seguroNumero: [
        this.transportacionMaritimaState.seguroNumero,
        [
          Validators.required,
          Validators.maxLength(11)
        ]
      ],
      nombrePFE: [
        this.transportacionMaritimaState.nombrePFE,
        [
          Validators.required,
          Validators.maxLength(200)
        ]
      ],
      apellidoPaternoPFE: [
        this.transportacionMaritimaState.apellidoPaternoPFE,
        [
          Validators.required,
          Validators.maxLength(200)
        ]
      ],
      apellidoMaternoPFE: [
        this.transportacionMaritimaState.apellidoMaternoPFE,
        [
          Validators.required,
          Validators.maxLength(200)
        ]
      ],
      correoPFE: [
        this.transportacionMaritimaState.correoPFE,
        [
          Validators.required,
          Validators.maxLength(320)
        ]
      ],
      paisPFE: [
        this.transportacionMaritimaState.paisPFE,
        Validators.required
      ],
      codigoPostalPFE: [
        this.transportacionMaritimaState.codigoPostalPFE,
        [
          Validators.required,
          Validators.maxLength(12)
        ]
      ],
      ciudadPFE: [
        this.transportacionMaritimaState.ciudadPFE,
        [
          Validators.required,
          Validators.maxLength(120)
        ]
      ],
      estadoPFE: [
        this.transportacionMaritimaState.estadoPFE,
        [
          Validators.required,
          Validators.maxLength(200)
        ]
      ],
      callePFE: [
        this.transportacionMaritimaState.callePFE,
        [
          Validators.required,
          Validators.maxLength(100)
        ]
      ],
      numeroExteriorPFE: [
        this.transportacionMaritimaState.numeroExteriorPFE,
        [
          Validators.required,
          Validators.maxLength(55)
        ]
      ],
      numeroInteriorPFE: [
        this.transportacionMaritimaState.numeroInteriorPFE,
        [
          Validators.maxLength(55)
        ]
      ],
    });

    this.inicializarEstadoFormulario();
  }

  /**
   * @method inicializarEstadoFormulario
   * @description Inicializa el estado del formulario `personaFisicaExtranjeraForm & buscarEmpresaForm` basado en si el formulario está deshabilitado o no.
   * Si el formulario está deshabilitado, se deshabilita el campo `personaFisicaExtranjeraForm & buscarEmpresaForm`.
   * Si no está deshabilitado, se habilita el campo `personaFisicaExtranjeraForm & buscarEmpresaForm`.
   * @returns {void}
   */
  inicializarEstadoFormulario(): void {
    if (this.formularioDeshabilitado) {
      this.buscarEmpresaForm.disable();
      this.personaFisicaExtranjeraForm.disable();
    } else if (!this.formularioDeshabilitado) {
      this.buscarEmpresaForm.enable();
      this.personaFisicaExtranjeraForm.enable();
    }
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
   * Inicializa los catálogos necesarios para el formulario.
   */
  inicializaCatalogos(): void {
    const PAIS$ = this.modificacionTransportacionMaritimaService
      .getPaisCatalogo()
      .pipe(
        map((resp) => {
          this.pais = resp.data;
        })
      );

    merge(
      PAIS$
    )
      .pipe(takeUntil(this.destruirNotificador$))
      .subscribe();
  }

  /**
   * Selecciona el país de la persona física extranjera y lo guarda en el store.
   * @description Este método se ejecuta cuando se selecciona un país en el formulario.
   */
  paisSeleccion(): void {
    const PAIS = this.personaFisicaExtranjeraForm.get('paisPFE')?.value;
    this.tramite40202Store.setPaisPFE(PAIS);
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
  buscarEmpresa(valor: number): void {
    if(valor === 1) {
      this.abrirAlertaModal();
    }
    if (valor === 2) {
      this.limpiarCampos();
      this.obtenerBuscarEmpresaCaat();
    }
  }

  /**
   * Limpia los campos del formulario y restablece los valores en el store.
   * @returns {void}
   * @description Este método se utiliza para limpiar los campos del formulario y restablecer los valores en el store.
   */
  limpiarCampos(): void {
    this.tramite40202Store.setCaatRegistradoEmpresaTabla([]);
    this.tramite40202Store.setCandidatoModificarCaatTabla([]);
    this.tipoDeEmpresaExtranjera.reset();
    this.tipoDeEmpresaNacional.reset();
    this.mostrarAgregarSeleccionado = true;
    this.tramite40202Store.setMostrarAgregarSeleccionado(this.mostrarAgregarSeleccionado);
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
            pais: item.pais,
            nombrePFE: item.nombrePFE,
            apellidoPaternoPFE: item.apellidoPaternoPFE,
            apellidoMaternoPFE: item.apellidoMaternoPFE,
            correoPFE: item.correoPFE,
            callePFE: item.callePFE,
            numeroExteriorPFE: item.numeroExteriorPFE,
            numeroInteriorPFE: item.numeroInteriorPFE,
            ciudadPFE: item.ciudadPFE,
            estadoPFE: item.estadoPFE,
            codigoPostalPFE: item.codigoPostalPFE
          }));
          this.caatRegistradoEmpresaTabla = NUEVO_CUERPO_TABLA;
          this.tramite40202Store.setCaatRegistradoEmpresaTabla(NUEVO_CUERPO_TABLA);
        }
      });
  }

  /**
   * Agrega la selección de una empresa CAAT registrada a la tabla de candidatos a modificar CAAT.
   * @param caatRegistradoEmpresaTabla - La tabla de empresas CAAT registradas seleccionadas.
   * @returns {void}
   */
  agregarSeleccionado(caatRegistradoEmpresaTabla: CAATRegistradoEmpresaForm[]): void {
    if (!caatRegistradoEmpresaTabla || caatRegistradoEmpresaTabla.length <= 0) {
      this.abrirAlertaSeleccionModal();
      return;
    }

    const PAIS = this.pais.find((pais) => pais.descripcion === caatRegistradoEmpresaTabla[0].pais)?.id;
    this.personaFisicaExtranjeraForm.patchValue({
      nombrePFE: caatRegistradoEmpresaTabla[0].nombrePFE,
      apellidoPaternoPFE: caatRegistradoEmpresaTabla[0].apellidoPaternoPFE,
      apellidoMaternoPFE: caatRegistradoEmpresaTabla[0].apellidoMaternoPFE,
      seguroNumero: caatRegistradoEmpresaTabla[0].rfc,
      correoPFE: caatRegistradoEmpresaTabla[0].correoPFE,
      callePFE: caatRegistradoEmpresaTabla[0].callePFE,
      numeroExteriorPFE: caatRegistradoEmpresaTabla[0].numeroExteriorPFE,
      numeroInteriorPFE: caatRegistradoEmpresaTabla[0].numeroInteriorPFE,
      ciudadPFE: caatRegistradoEmpresaTabla[0].ciudadPFE,
      estadoPFE: caatRegistradoEmpresaTabla[0].estadoPFE,
      codigoPostalPFE: caatRegistradoEmpresaTabla[0].codigoPostalPFE,
      pais: PAIS || ''
    });

    this.mostrarModal('modal-agregar-pfe');
  }

  /**
   * Elimina un elemento de la lista de pedimentos en la posición especificada.
   * 
   * @param {number} i - El índice del elemento a eliminar.
   * 
   * @remarks
   * Después de eliminar el elemento, se actualiza el título y mensaje del modal,
   * y se abre el modal para mostrar un aviso al usuario.
   */
  abrirAlertaModal(): void {
    this.nuevaAlertaNotificacion = {
      tipoNotificacion: 'alert',
      categoria: 'danger',
      modo: 'action',
      titulo: 'Alerta',
      mensaje: 'No hay resultados para el criterio de la busqueda.',
      cerrar: false,
      tiempoDeEspera: 2000,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: '',
    }
  }

  /**
   * Muestra una alerta de selección de elemento.
   * @description Este método se ejecuta cuando no se selecciona ningún elemento en la tabla de empresas CAAT registradas.
   * @returns {void}
   */
  abrirAlertaSeleccionModal(): void {
    this.nuevaAlertaSeleccionNotificacion = {
      tipoNotificacion: 'alert',
      categoria: 'danger',
      modo: 'action',
      titulo: 'Alerta',
      mensaje: 'Selecciona un elemento.',
      cerrar: false,
      tiempoDeEspera: 2000,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: '',
    }
  }

  /**
   * Muestra un modal específico.
   * @param id - El ID del modal que se va a mostrar.
   * @returns {void}
   */
  mostrarModal(id: string): void {
    this.modalElemento = document.getElementById(id);
    if (this.modalElemento) {
      const MODAL = Modal.getOrCreateInstance(this.modalElemento);
      MODAL.show();
    }
  }

  /**
   * Agrega una nueva persona física extranjera a la tabla.
   * @description Este método se ejecuta cuando se hace clic en el botón "Agregar" en el formulario.
   * @param personaFisicaExtranjeraFormDatos - Los datos de la persona física extranjera a agregar.
   * @returns {void}
   */
  agregarPFE(personaFisicaExtranjeraFormDatos: PersonaFisicaExtranjeraForm): void {
    const PAIS = this.pais.find((pais) => pais.id === Number(personaFisicaExtranjeraFormDatos.paisPFE))?.descripcion;

    const NUEVO_CUERPO_TABLA = [...this.candidatoModificarCaatTabla];

    NUEVO_CUERPO_TABLA.push({
      nombreDenominacionRazonSocial: `${personaFisicaExtranjeraFormDatos.nombrePFE} ${personaFisicaExtranjeraFormDatos.apellidoPaternoPFE} ${personaFisicaExtranjeraFormDatos.apellidoMaternoPFE}`.trim(),
      rfc: personaFisicaExtranjeraFormDatos.seguroNumero,
      correoElectronico: personaFisicaExtranjeraFormDatos.correoPFE,
      nombreDG: personaFisicaExtranjeraFormDatos.nombreDG,
      domicilio: `${personaFisicaExtranjeraFormDatos.callePFE} ${personaFisicaExtranjeraFormDatos.numeroExteriorPFE} ${personaFisicaExtranjeraFormDatos.ciudadPFE} ${personaFisicaExtranjeraFormDatos.estadoPFE} ${PAIS} ${personaFisicaExtranjeraFormDatos.codigoPostalPFE}`.trim(),
    });
    this.candidatoModificarCaatTabla = NUEVO_CUERPO_TABLA;
    this.tramite40202Store.setCandidatoModificarCaatTabla(this.candidatoModificarCaatTabla);
    this.mostrarAgregarSeleccionado = false;
    this.tramite40202Store.setMostrarAgregarSeleccionado(this.mostrarAgregarSeleccionado);
    this.limpiarDatosPFE();
    this.cerrarModal();
  }

  /**
   * Limpia los datos del formulario de persona física extranjera.
   * @description Este método se ejecuta cuando se hace clic en el botón "Limpiar" en el formulario.
   * @returns {void}
   */
  limpiarDatosPFE(): void {
    this.personaFisicaExtranjeraForm.reset();
    this.actualizarFormularioState();
  }

  /**
   * Actualiza el estado del formulario en el store.
   * @description Este método se ejecuta cuando se cambian los valores en el formulario.
   * @returns {void}
   */
  actualizarFormularioState(): void {
    this.setValoresStore(this.personaFisicaExtranjeraForm, 'nombrePFE', 'setNombrePFE');
    this.setValoresStore(this.personaFisicaExtranjeraForm, 'seguroNumero', 'setSeguroNumero');
    this.setValoresStore(this.personaFisicaExtranjeraForm, 'apellidoPaternoPFE', 'setApellidoMaternoPFE');
    this.setValoresStore(this.personaFisicaExtranjeraForm, 'apellidoMaternoPFE', 'setApellidoMaternoPFE');
    this.setValoresStore(this.personaFisicaExtranjeraForm, 'correoPFE', 'setCorreoPFE');
    this.setValoresStore(this.personaFisicaExtranjeraForm, 'paisPFE', 'setPaisPFE');
    this.setValoresStore(this.personaFisicaExtranjeraForm, 'codigoPostalPFE', 'setCodigoPostalPFE');
    this.setValoresStore(this.personaFisicaExtranjeraForm, 'ciudadPFE', 'setCiudadPFE');
    this.setValoresStore(this.personaFisicaExtranjeraForm, 'estadoPFE', 'setEstadoPFE');
    this.setValoresStore(this.personaFisicaExtranjeraForm, 'callePFE', 'setCallePFE');
    this.setValoresStore(this.personaFisicaExtranjeraForm, 'numeroExteriorPFE', 'setNumeroExteriorPFE');
    this.setValoresStore(this.personaFisicaExtranjeraForm, 'numeroInteriorPFE', 'setNumeroInteriorPFE');
  }

  /**
   * Método para validar el formulario.
   * @returns {boolean} Verdadero si el formulario es válido, falso en caso contrario.
   */
  validarFormulario(): boolean {
    if(this.candidatoModificarCaatTabla.length === 0) {
      this.mostrarError = true;
      return false;
    }
    this.mostrarError = false;
    return true;
  }

  /**
   * Cierra el modal.
   * 
   * @returns {void}
   */
  cerrarModal(): void {
    if (this.closeModal) {
      this.closeModal.nativeElement.click();
    }
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