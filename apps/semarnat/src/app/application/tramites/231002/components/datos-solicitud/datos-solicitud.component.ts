import { CatalogoSelectComponent, InputRadioComponent, REGEX_POSTAL, TableComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RadioOpcion, SolicitudJson } from '@libs/shared/data-access-user/src/core/models/231002/solicitud.model';
import { map, takeUntil } from 'rxjs';
import { AvisoOpcionesDeRadio } from '../../models/aviso-catalogo.model';
import { CommonModule } from '@angular/common';
import { DatoSolicitudQuery } from '../../estados/queries/dato-solicitud.query';
import { DatoSolicitudStore } from '../../estados/tramites/dato-solicitud.store';
import { DatosResiduosPeligrososComponent } from '../datos-residuos-peligrosos/datos-residuos-peligrosos.component';
import { EstadoDatoSolicitud } from '../../models/datos-solicitud.model';
import { MercanciasDesmontadasOSinMontarService } from '../../services/mercancias-desmontadas-o-sin-montar.service';
import { Modal } from 'bootstrap';
import { Subject } from 'rxjs';
import { TEXTOS } from '../../constantes/aviso-retorno.enum';
import rawData from '@libs/shared/theme/assets/json/231002/solicitud.json';

/**
 * Constante que contiene las opciones de radio y demás datos del archivo JSON.
 */
const RADIO_OPCIONES = rawData as SolicitudJson;

/**
 * Componente que gestiona los datos de la solicitud para el proceso de reciclaje.
 * 
 * Maneja múltiples formularios para capturar información sobre:
 * - Solicitud principal
 * - Empresa recicladora
 * - Lugar de reciclaje
 * - Empresa transportista
 * - Precauciones de manejo
 * 
 * Integra con estado global mediante stores y queries para persistencia de datos.
 */
@Component({
  selector: 'app-datos-solicitud',
  standalone: true,
  imports: [
    CommonModule,
    CatalogoSelectComponent,
    TituloComponent,
    ReactiveFormsModule,
    TableComponent,
    InputRadioComponent,
    DatosResiduosPeligrososComponent
  ],
  templateUrl: './datos-solicitud.component.html',
  styleUrl: './datos-solicitud.component.scss'
})
export class DatosSolicitudComponent implements OnInit, OnDestroy {
  /** Referencia al elemento modal para agregar mercancías */
  @ViewChild('modalAgregarMercancias') modalElement!: ElementRef;

  /** Formulario principal de la solicitud */
  solicitudForm!: FormGroup;

  /** Formulario para datos de empresa recicladora */
  formularioEmpresaReciclaje!: FormGroup;

  /** Formulario para datos del lugar de reciclaje */
  formularioLugarReciclaje!: FormGroup;

  /** Formulario para datos de empresa transportista */
  formularioEmpresaTransportista!: FormGroup;

  /** Formulario para precauciones de manejo */
  formularioPrecaucionesManejo!: FormGroup;

  /** Opciones de radio obtenidas del JSON estático */
  radioOptions: RadioOpcion[] = RADIO_OPCIONES?.radioOptions;

  /** Subject para gestionar la destrucción de suscripciones */
  private destroyed$ = new Subject<void>();

  /** Opciones de radio para avisos dinámicos */
  avisoOpcionesDeRadio: AvisoOpcionesDeRadio = {} as AvisoOpcionesDeRadio;

  /** Tipo de aviso actualmente seleccionado */
  tipoAviso: string | number = 'por defecto';

  /** Textos estáticos para la interfaz de usuario */
  TEXTOS = TEXTOS;

  /** Etiquetas y configuraciones de formulario desde JSON */
  etiquetasForm = RADIO_OPCIONES;

  /** Estado actual de la consulta (lectura/edición) */
  public consultaState!: ConsultaioState;

  /** Bandera que indica si el formulario es de solo lectura */
  public esFormularioSoloLectura: boolean = false;

  /**
   * Constructor para inyección de dependencias
   * @param fb Constructor de formularios reactivos
   * @param datoSolicitudStore Store para estado de datos de solicitud
   * @param datoSolicitudQuery Query para estado de datos de solicitud
   * @param consultaQuery Query para estado de consulta
   * @param mercanciasDesmontadasOSinMontarService Servicio para opciones de radio
   */
  constructor(
    public fb: FormBuilder,
    private datoSolicitudStore: DatoSolicitudStore,
    private datoSolicitudQuery: DatoSolicitudQuery,
    private consultaQuery: ConsultaioQuery,
    public mercanciasDesmontadasOSinMontarService: MercanciasDesmontadasOSinMontarService
  ) {
    this.obtenerAvisoOpcionesDeRadio();
  }

  /**
   * Inicialización del componente:
   * - Crea formularios
   * - Recupera estado guardado
   * - Configura suscripción para estado de solo lectura
   */
  ngOnInit(): void {
    this.inicializarSolicitudForm();
    this.inicializarFormularioEmpresaReciclaje();
    this.inicializarFormularioLugarReciclaje();
    this.inicializarFormularioEmpresaTransportista();
    this.inicializarFormularioPrecaucionesManejo();
    this.recuperarValoresDesdeStore();
    this.configurarSuscripcionEstadoConsulta();
  }

  /**
   * Configura la suscripción al estado de consulta para controlar modo lectura/edición
   */
  private configurarSuscripcionEstadoConsulta(): void {
    this.consultaQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.consultaState = seccionState;
          this.esFormularioSoloLectura = seccionState.readonly;
          this.actualizarEstadoFormularios();
        })
      )
      .subscribe();
  }

  /**
   * Inicializa el formulario principal de solicitud con validadores
   */
  private inicializarSolicitudForm(): void {
    this.solicitudForm = this.fb.group({
      ideGenerica1: ['primera_vez', Validators.required],
      numeroRegistroAmbiental: ['', Validators.required],
      descripcionGenerica1: ['', Validators.required],
      numeroProgramaImmex: ['', Validators.required],
      domicilio: ['', Validators.required]
    });
  }

  /**
   * Inicializa el formulario de empresa recicladora con validadores
   */
  private inicializarFormularioEmpresaReciclaje(): void {
    this.formularioEmpresaReciclaje = this.fb.group({
      requiereEmpresa: ['Si', Validators.required],
      nombreEmpresa: ['', Validators.required],
      representanteLegal: ['', Validators.required],
      telefono: ['', Validators.required],
      correoElectronico: ['', [Validators.required, Validators.email]]
    });
  }

  /**
   * Inicializa el formulario de lugar de reciclaje con validadores
   */
  private inicializarFormularioLugarReciclaje(): void {
    this.formularioLugarReciclaje = this.fb.group({
      razonSocial: ['', Validators.required],
      pais: ['', Validators.required],
      destinoDomicilio: ['', Validators.required],
      codigoPostal: [
        '',
        [Validators.required, Validators.pattern(REGEX_POSTAL), Validators.maxLength(8)]
      ]
    });
  }

  /**
   * Inicializa el formulario de empresa transportista con validadores
   */
  private inicializarFormularioEmpresaTransportista(): void {
    this.formularioEmpresaTransportista = this.fb.group({
      nombreEmpresaTransportistaResiduos: ['', Validators.required],
      numeroAutorizacionSemarnat: ['', Validators.required]
    });
  }

  /**
   * Inicializa el formulario de precauciones de manejo con validadores
   */
  private inicializarFormularioPrecaucionesManejo(): void {
    this.formularioPrecaucionesManejo = this.fb.group({
      clave: ['', Validators.required],
      precaucionesManejo: ['', Validators.required]
    });
  }

  /**
   * Maneja cambios en el campo "requiereEmpresa" para habilitar/deshabilitar campos relacionados
   * @param valor Valor seleccionado ('Si' o 'No')
   */
  onRequiereEmpresaChange(valor: string): void {
    const DEBE_HABILITAR = valor === 'Si';
    const CAMPOS = ['nombreEmpresa', 'representanteLegal', 'telefono', 'correoElectronico'];

    CAMPOS.forEach(campo => {
      const CONTROL = this.formularioEmpresaReciclaje.get(campo);
      if (CONTROL) {
        if (DEBE_HABILITAR) {
          CONTROL.enable();
        } else {
          CONTROL.disable();
        }
      }
    });
  }

  /**
   * Recupera valores guardados en el store y los aplica a los formularios
   */
  private recuperarValoresDesdeStore(): void {
    const ESTADO = this.datoSolicitudQuery.getValue();

    this.solicitudForm.patchValue(ESTADO.solicitudForm, { emitEvent: false });
    this.formularioEmpresaReciclaje.patchValue(ESTADO.empresaReciclaje, { emitEvent: false });
    this.formularioLugarReciclaje.patchValue(ESTADO.lugarReciclaje, { emitEvent: false });
    this.formularioEmpresaTransportista.patchValue(ESTADO.empresaTransportista, { emitEvent: false });
    this.formularioPrecaucionesManejo.patchValue(ESTADO.precaucionesManejo, { emitEvent: false });
  }

  /**
   * Actualiza un campo específico del formulario principal en el store
   * @param campo Nombre del campo a actualizar
   */
  actualizarCampoSolicitudForm(campo: keyof EstadoDatoSolicitud['solicitudForm']): void {
    const VALOR = this.solicitudForm.get(campo)?.value;
    this.datoSolicitudStore.actualizarSolicitudForm({
      ...this.solicitudForm.getRawValue(),
      [campo]: VALOR
    });
  }

  /**
   * Actualiza un campo específico del formulario de empresa recicladora en el store
   * @param campo Nombre del campo a actualizar
   */
  actualizarCampoEmpresaReciclaje(campo: keyof EstadoDatoSolicitud['empresaReciclaje']): void {
    const VALOR = this.formularioEmpresaReciclaje.get(campo)?.value;

    if (campo === 'requiereEmpresa') {
      this.onRequiereEmpresaChange(VALOR);
    }

    this.datoSolicitudStore.actualizarEmpresaReciclaje({
      ...this.formularioEmpresaReciclaje.getRawValue(),
      [campo]: VALOR
    });
  }

  /**
   * Actualiza un campo específico del formulario de empresa transportista en el store
   * @param campo Nombre del campo a actualizar
   */
  actualizarCampoEmpresaTransportista(campo: keyof EstadoDatoSolicitud['empresaTransportista']): void {
    const VALOR = this.formularioEmpresaTransportista.get(campo)?.value;
    this.datoSolicitudStore.actualizarEmpresaTransportista({
      ...this.formularioEmpresaTransportista.getRawValue(),
      [campo]: VALOR
    });
  }

  /**
   * Actualiza un campo específico del formulario de precauciones en el store
   * @param campo Nombre del campo a actualizar
   */
  actualizarCampoPrecaucionesManejo(campo: keyof EstadoDatoSolicitud['precaucionesManejo']): void {
    const VALOR = this.formularioPrecaucionesManejo.get(campo)?.value;
    this.datoSolicitudStore.actualizarPrecaucionesManejo({
      ...this.formularioPrecaucionesManejo.getRawValue(),
      [campo]: VALOR
    });
  }

  /**
   * Muestra el modal para agregar operaciones de importación
   */
  agregarOperacionImp(): void {
    if (this.modalElement) {
      const MODAL_INSTANCE = new Modal(this.modalElement.nativeElement);
      MODAL_INSTANCE.show();
    }
  }

  /**
   * Establece el tipo de aviso seleccionado
   * @param evento Valor del tipo de aviso
   */
  setTipoDeAviso(evento: string | number): void {
    this.tipoAviso = evento;
  }

  /**
   * Obtiene opciones de radio para avisos desde el servicio
   */
  obtenerAvisoOpcionesDeRadio(): void {
    this.mercanciasDesmontadasOSinMontarService
      .obtenerAvisoOpcionesDeRadio()
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (respuesta: AvisoOpcionesDeRadio) => {
          this.avisoOpcionesDeRadio = respuesta;
        }
      });
  }

  /**
   * Actualiza el estado de habilitación de los formularios según el modo (lectura/edición)
   */
  private actualizarEstadoFormularios(): void {
    if (this.esFormularioSoloLectura) {
      this.deshabilitarFormularios();
    } else {
      this.habilitarFormularios();
    }
  }

  /**
   * Deshabilita todos los formularios para modo de solo lectura
   */
  private deshabilitarFormularios(): void {
    this.solicitudForm.disable();
    this.formularioEmpresaReciclaje.disable();
    this.formularioLugarReciclaje.disable();
    this.formularioEmpresaTransportista.disable();
    this.formularioPrecaucionesManejo.disable();
  }

  /**
   * Habilita todos los formularios para modo de edición
   */
  private habilitarFormularios(): void {
    this.solicitudForm.enable();
    this.formularioEmpresaReciclaje.enable();
    this.formularioLugarReciclaje.enable();
    this.formularioEmpresaTransportista.enable();
    this.formularioPrecaucionesManejo.enable();
  }

  /**
   * Limpieza al destruir el componente:
   * - Completa los subjects de destrucción
   * - Cancela suscripciones activas
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
