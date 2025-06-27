import { ANO_CATALOGO, AprovechamientoTextos, FECHA_INICIAL, FECHA_PAGO, MES_CATALOGO, RADIO_OPCIONS, RADIO_PARCIAL, RADIO_TOTAL } from '../constantes/adace32508.enum';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Catalogo, CatalogoSelectComponent, InputFecha, InputFechaComponent, InputRadioComponent, Notificacion, NotificacionesComponent, Pedimento, TituloComponent, ValidacionesFormularioService } from '@libs/shared/data-access-user/src';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReplaySubject, map, takeUntil } from 'rxjs';
import { Solicitud32508State, Tramite32508Store } from '../state/Tramite32508.store';
import { AdaceService } from '../services/adace.service';
import { CommonModule } from '@angular/common';
import { Tramite32508Query } from '../state/Tramite32508.query';
/**
 * Componente que representa el aviso dentro del trámite 32508.
 * Este componente gestiona la lógica y la interfaz de usuario para capturar y mostrar
 * los datos relacionados con el aviso, incluyendo formularios, catálogos y notificaciones.
 */
@Component({
  selector: 'app-aviso',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TituloComponent,
    InputRadioComponent,
    CatalogoSelectComponent,
    InputFechaComponent,
    NotificacionesComponent
  ],
  providers: [AdaceService],
  templateUrl: './aviso.component.html',
  styleUrl: './aviso.component.css',
})
export class AvisoComponent implements OnInit, AfterViewInit, OnDestroy {
  /**
   * Observable para gestionar la destrucción del componente.
   */
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  /**
   * Formulario reactivo para gestionar los datos del aviso.
   */
  avisoForm!: FormGroup;

  /**
   * Opciones para los radios relacionados con el aprovechamiento.
   */
  radioOpcions = RADIO_OPCIONS;

  /**
   * Opciones para el radio relacionado con la disminución parcial.
   */
  radioParcial = RADIO_PARCIAL;

  /**
   * Opciones para el radio relacionado con la disminución total.
   */
  radioTotal = RADIO_TOTAL;

  /**
   * Configuración para la fecha inicial del dictamen.
   */
  fechaInitialInput: InputFecha = FECHA_INICIAL;

  /**
   * Configuración para la fecha de pago.
   */
  fechaPagoInput: InputFecha = FECHA_PAGO;

  /**
   * Texto relacionado con el aprovechamiento parcial.
   */
  textoParcial = AprovechamientoTextos.PARCIAL;

  /**
   * Texto relacionado con el aprovechamiento total.
   */
  textoTotal = AprovechamientoTextos.TOTAL;

  /**
   * Configuración para el catálogo de años.
   */
  public anoCatalogo = ANO_CATALOGO;

  /**
   * Configuración para el catálogo de meses.
   */
  public mesCatalogo = MES_CATALOGO;

  /**
   * Estado actual de la solicitud.
   */
  public solicitudState!: Solicitud32508State;

  /**
   * Lista de pedimentos asociados al aviso.
   */
  public pedimentos: Array<Pedimento> = [];

  /**
   * Notificación a mostrar en el modal.
   */
  public nuevaNotificacion!: Notificacion;

  /**
   * Índice del elemento a eliminar.
   */
  public elementoParaEliminar!: number;

  /**
   * Indica si se está cargando un archivo.
   */
  cargarArchivo: boolean = false;

  /**
   * Valor seleccionado en los radios.
   */
  valorSeleccionado: string | number = 'disminucion';

  /**
   * Nombre del archivo seleccionado.
   */
  nombreArchivo: string = '';
  monstrarDisminucion: boolean = false;
  mostrarCompensacion: boolean = false;
  mostrarDisminucionYCompensacion: boolean = false;

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
  esFormularioSoloLectura: boolean = false;

  /**
   * Constructor del componente.
   * @param adace Servicio para gestionar datos relacionados con los catálogos.
   * @param fb Constructor de formularios reactivos.
   * @param store Almacén global para gestionar el estado del trámite.
   * @param query Consulta para obtener el estado actual del trámite.
   * @param validacionesService Servicio para validar campos del formulario.
   */
  constructor(
    private adace: AdaceService,
    public fb: FormBuilder,
    private store: Tramite32508Store,
    private query: Tramite32508Query,
    private validacionesService: ValidacionesFormularioService,
    private consultaioQuery: ConsultaioQuery
  ) { }

    /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Configura el formulario, obtiene datos iniciales y suscribe al estado global.
   */
  ngOnInit(): void {
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.consultaDatos = seccionState;
          this.esFormularioSoloLectura = this.consultaDatos.readonly;
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe();
    this.query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();
    this.donanteDomicilio();
    this.obtenerDatosAnoPeriodo();
    this.obtenerDatosMesPeriodo();
  this.setValoresStore( this.avisoForm, 'radioParcial', 'setRadioPartial' )
  }

  ngAfterViewInit(): void {
    if (this.avisoForm.get('tipoDictamen')?.value === '') {
      this.avisoForm.get('tipoDictamen')?.setValue('disminucion');
    }
  }

  /**
   * Obtiene los datos del catálogo de años.
   */
  obtenerDatosAnoPeriodo(): void {
    this.adace
      .obtenerDatosAno()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((resp): void => {
        this.anoCatalogo.catalogos = resp as Catalogo[];
      });
  }

  /**
   * Obtiene los datos del catálogo de meses.
   */
  obtenerDatosMesPeriodo(): void {
    this.adace
      .obtenerDatosMes()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((resp): void => {
        this.mesCatalogo.catalogos = resp as Catalogo[];
      });
  }

  /**
   * Maneja la selección de un archivo en el input.
   * @param event Evento de cambio del input de archivo.
   */
  alSeleccionarArchivo(event: Event): void {
    const TARGET = event.target as HTMLInputElement;
    const FILE = TARGET?.files ? TARGET.files[0] : null;
    this.nombreArchivo = FILE ? FILE.name : 'Sin archivos seleccionados';
    this.avisoForm.patchValue({
      archivo: FILE,
    });
  }

  /**
   * Marca que se está cargando un archivo y abre el modal.
   */
  cargaArchivo(): void {
    this.cargarArchivo = true;
    this.abrirModal();
  }

  /**
   * Elimina un pedimento de la lista.
   * @param borrar Indica si se debe eliminar el pedimento.
   */
  eliminarPedimento(borrar: boolean): void {
    if (borrar) {
      this.pedimentos.splice(this.elementoParaEliminar, 1);
    }
  }

  /**
   * Abre un modal con una notificación.
   * @param i Índice del elemento a eliminar (opcional).
   */
  abrirModal(i: number = 0): void {
    this.nuevaNotificacion = {
      tipoNotificacion: 'alert',
      categoria: 'danger',
      modo: 'action',
      titulo: '',
      mensaje: 'Se realizo la carga correctamente',
      cerrar: false,
      tiempoDeEspera: 2000,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: '',
    };
    this.elementoParaEliminar = i;
  }

  /**
   * Actualiza la fecha de pago en el formulario y el estado global.
   * @param nuevo_fechaPago Nueva fecha de pago.
   */
  cambioFechaPago(nuevo_fechaPago: string): void {
    this.avisoForm.patchValue({
      fechaPago: nuevo_fechaPago,
    });
    this.setValoresStore(this.avisoForm, 'fechaPago', 'setFechaPago');
  }

  /**
   * Actualiza la fecha de elaboración en el formulario y el estado global.
   * @param nuevo_fechaPago Nueva fecha de elaboración.
   */
  cambioFechaInitial(nuevo_fechaPago: string): void {
    this.avisoForm.patchValue({
      fechaElaboracion: nuevo_fechaPago,
    });
    this.setValoresStore(this.avisoForm, 'fechaElaboracion', 'setFechaElaboracion');
  }

  /**
   * Valida el formulario y marca todos los campos como tocados si es inválido.
   */
  validarDestinatarioFormulario(): void {
    if (this.avisoForm.invalid) {
      this.avisoForm.markAllAsTouched();
    }
  }

  /**
   * Verifica si un campo del formulario es válido.
   * @param form Formulario reactivo.
   * @param field Nombre del campo a verificar.
   * @returns `true` si el campo es válido, de lo contrario `false`.
   */
  esValido(form: FormGroup, field: string): boolean {
    return this.validacionesService.isValid(form, field) || false;
  }

  /**
   * Actualiza un valor en el estado global utilizando el almacén.
   * @param form Formulario reactivo.
   * @param campo Nombre del campo a actualizar.
   * @param metodoNombre Nombre del método del almacén para actualizar el estado.
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite32508Store,
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.store[metodoNombre] as (value: unknown) => void)(VALOR);


    const AVISO_RADIO = this.avisoForm.get('tipoDictamen')?.value === '' ? 'disminucion' : this.avisoForm.get('tipoDictamen')?.value ;

    if (AVISO_RADIO === 'disminucion') {
      this.monstrarDisminucion = true;
      this.mostrarCompensacion = false;
      this.mostrarDisminucionYCompensacion = false;
    } else if (AVISO_RADIO === 'compensacion') {
      this.monstrarDisminucion = false;
      this.mostrarCompensacion = true;
      this.mostrarDisminucionYCompensacion = false;
    } else if (AVISO_RADIO === 'disminucionYCompensacion') {
      this.monstrarDisminucion = false;
      this.mostrarCompensacion = false;
      this.mostrarDisminucionYCompensacion = true;
    }


  }
  /**
   * Configura el formulario con los valores iniciales del estado.
   */
  donanteDomicilio(): void {
    this.avisoForm = this.fb.group({
      claveFiscalizado: [this.solicitudState?.claveFiscalizado, [Validators.required]],
      adace: [{ value: this.solicitudState?.adace, disabled: true }, [Validators.required]],
      tipoDictamen: [this.solicitudState?.tipoDictamen, [Validators.required]],
      rfc: [this.solicitudState?.rfc, [Validators.required]],
      nombre: [{ value: this.solicitudState?.nombre, disabled: true }, [Validators.required]],
      numeroInscripcion: [this.solicitudState?.numeroInscripcion, [Validators.required]],
      ano: [this.solicitudState?.ano, [Validators.required]],
      mes: [this.solicitudState?.mes, [Validators.required]],
      radioParcial: [this.solicitudState?.radioParcial, [Validators.required]],
      radioTotal: [this.solicitudState?.radioTotal, [Validators.required]],
      saldoPendiente: [this.solicitudState?.saldoPendiente, [Validators.required]],
      aprovechamiento: [this.solicitudState?.aprovechamiento, [Validators.required]],
      disminucionAplicada: [this.solicitudState?.disminucionAplicada, [Validators.required]],
      saldoPendienteDisminuir: [this.solicitudState?.saldoPendienteDisminuir, [Validators.required]],
      cantidad: [this.solicitudState?.cantidad, [Validators.required]],
      llaveDePago: [this.solicitudState?.llaveDePago, [Validators.required]],
      fechaElaboracion: [this.solicitudState?.fechaElaboracion, [Validators.required]],
      fechaPago: [this.solicitudState?.fechaPago, [Validators.required]],
      archivo: [null, [Validators.required]],
      compensacionAplicada: [this.solicitudState?.compensacionAplicada, [Validators.required]],
      saldoPendienteCompensar: [this.solicitudState?.saldoPendienteCompensar, [Validators.required]],
    });
    this.inicializarEstadoFormulario();
  }

  /**
  * @method inicializarEstadoFormulario
  * @description Inicializa el estado del formulario según el modo de solo lectura.
  * 
  * Si la propiedad `soloLectura` es verdadera, deshabilita todos los controles del formulario.
  * En caso contrario, habilita los controles del formulario
  * 
  * @returns {void}
  */
  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.avisoForm?.disable();
    } else {
      this.avisoForm?.enable();
      ['adace', 'nombre'].map(field =>this.avisoForm.get(field)?.disable());
    }
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
   * Completa el observable `destroyed$` para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}