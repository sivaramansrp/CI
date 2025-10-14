import {
  CONFIGURACION_COLUMNAS_MERCANCIAS,
  CONFIGURACION_COLUMNAS_SCIAN,
  CONFIGURACION_COLUMNAS_SOLICITUD,
  DATOS_INICIALES_TABLA,
} from '../../constantes/260910-enum';
import {
  Catalogo,
  CatalogosSelect,
  REGEX_CORREO,
  REGEX_LOCALIDAD,
  TablaSeleccion,
  ValidacionesFormularioService,
} from '@libs/shared/data-access-user/src';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  ConsultaioQuery,
  ConsultaioState,
  REGEX_LETRAS_NUMEROS_COMA_PARENTESIS_ESPACIO,
  REGEX_RFC,
  REGEX_SOLO_NUMEROS,
} from '@ng-mf/data-access-user';
import {
  DatosDeSolicitud,
  RadioOptions,
  Solicitud,
  SolicitudDatos,
} from '../../models/solicitud-datos.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  Solicitud260910State,
  Solicitud260910Store,
} from '../../estados/tramites260910.store';
import { Subject, map, takeUntil } from 'rxjs';
import { Mercancia } from '../../models/mercancia.model';
import { Modal } from 'bootstrap';
import { ModificarMercanciasComponent } from '../mercancias-datos/mercancias-datos.component';
import { SCIAN } from '../../models/SCIAN.model';
import { Solicitud260910Query } from '../../estados/tramites260910.query';
import { SolicitudDatosService } from '../../services/solicitud-datos.service';
import { TEXTOS } from '../../constantes/constantes';

/**
 * Componente que representa los datos de la solicitud.
 */
@Component({
  selector: 'app-solicitud-datos',
  templateUrl: './solicitud-datos.component.html',
  styleUrl: './solicitud-datos.component.scss',
})
export class SolicitudDatosComponent implements OnInit, OnDestroy {
  /**
   * Textos estáticos utilizados en el componente.
   */
  TEXTOS = TEXTOS;

  /**
   * Controla la visibilidad del panel plegable.
   * @default true (panel ampliado)
   */
  public colapsable = true;

  /**
   * Controlador para manejar la destrucción del componente.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Configuración de la tabla SCIAN.
   */
  public tableDataSCIAN = DATOS_INICIALES_TABLA;

  /**
   * Configuración de la tabla de mercancías.
   */
  public tableDataMercancias = DATOS_INICIALES_TABLA;

  /**
   * Opciones de botones de selección por radio para tipo de operación.
   */
  tipoOperacionRadioOptions: RadioOptions[] = [];

  /**
   * Catálogo relacionado con el régimen.
   */
  regimenCatalogo: CatalogosSelect = {} as CatalogosSelect;

  /**
   * Catálogo relacionado con la aduana.
   */
  aduanaCatalogo: CatalogosSelect = {} as CatalogosSelect;

  /**
   * Catálogo relacionado con la SCIANCatalogo.
   */
  SCIANCatalogo: CatalogosSelect = {} as CatalogosSelect;

  /**
   * Catálogo relacionado con la descripción SCIAN.
   */
  SCIANDescCatalogo: CatalogosSelect = {} as CatalogosSelect;

  /**
   * Catálogo relacionado con los estados.
   */
  estadoCatalogo: CatalogosSelect = {} as CatalogosSelect;

  /**
   * Formulario reactivo para datos de solicitud.
   */
  solicitudForm!: FormGroup;

  /**
   * Formulario reactivo para clave SCIAN.
   */
  claveSCIANForm!: FormGroup;

  /**
   * Datos de mercancías seleccionadas.
   */
  selectedMercanciasDatos: Mercancia[] = [];

  /**
   * Datos de SCIAN seleccionados.
   */
  seleccionaSCIANDatos: SCIAN[] = [];

  /**
   * Referencia al elemento del modal de alerta.
   */
  @ViewChild('modal-alerta') modalAlertaElement!: ElementRef;

  /**
   * Referencia al elemento del modal de confirmación.
   */
  @ViewChild('modalConfirmar') modalConfirmarElement!: ElementRef;

  /**
   * Referencia al elemento del modal de mercancías.
   */
  @ViewChild('modalAgregarMercancias') modalElement!: ElementRef;

  /**
   * Referencia al elemento del modal SCIAN.
   */
  @ViewChild('modal-agregar-scian') modalElementSCIAN!: ElementRef;

  /**
   * Tipo seleccionado para acciones.
   */
  seleccionadoTipo: string = '';

  /**
   * Opciones de botones de selección por radio para hacerlos públicos.
   */
  hacerlosRadioOptions: RadioOptions[] = [];

  /**
   * Valor seleccionado para hacerlos públicos.
   */
  hacerlosPublicos = 0;

  /**
   * Estado actual de la solicitud.
   */
  solicitud260910State: Solicitud260910State = {} as Solicitud260910State;

  /**
   * Configuración de selección para tabla de mercancías.
   */
  mercanciasSeleccionTabla = TablaSeleccion.CHECKBOX;

  /**
   * Configuración de selección para tabla SCIAN.
   */
  SCIANSeleccionTabla = TablaSeleccion.CHECKBOX;

  /**
   * Configuración de selección para tabla de solicitudes.
   */
  solicitudSeleccionTabla = TablaSeleccion.UNDEFINED;

  /**
   * Configuración de columnas para tabla de solicitudes.
   */
  solicitudConfiguracionTabla = CONFIGURACION_COLUMNAS_SOLICITUD;

  /**
   * Datos de solicitudes.
   */
  solicitudDatos: SolicitudDatos[] = [];

  /**
   * Configuración de columnas para tabla de mercancías.
   */
  mercanciasConfiguracionTabla = CONFIGURACION_COLUMNAS_MERCANCIAS;

  /**
   * Configuración de columnas para tabla SCIAN.
   */
  SCIANConfiguracionTabla = CONFIGURACION_COLUMNAS_SCIAN;

  /**
   * Datos de mercancías.
   */
  mercanciasDatos: Mercancia[] = [];

  /**
   * Datos de SCIAN.
   */
  SCIANDatos: SCIAN[] = [];

  /**
   * Estado actual de la consulta.
   */
  public consultaState!: ConsultaioState;

  /**
   * Indica si el formulario es de solo lectura.
   */
  public esFormularioSoloLectura: boolean = false;

  /**
   * Referencia al componente hijo ModificarMercanciasComponent.
   */
  @ViewChild(ModificarMercanciasComponent)
  mercanciasComponent!: ModificarMercanciasComponent;

  /**
   * Mercancía seleccionada para editar en el modal
   */
  seleccionadaMercancia!: Mercancia | null;

  /**
   * Indica si se muestra el botón de acción en el componente.
   */
  mostrarBoton: boolean = false;

  /**
   * Indica si se muestra el botón de búsqueda en el componente.
   * Se inicializa en false.
   * @default false
   */
  mostrarBuscarBoton: boolean = false;

  /**
   * Constructor del componente.
   * @param solicitudDatosService Servicio para datos de solicitud
   * @param solicitud260910Store Almacén para estado de solicitud
   * @param solicitud260910Query Consulta para estado de solicitud
   * @param fb Constructor de formularios
   * @param validacionesService Servicio para validar formularios.
   */
  constructor(
    public solicitudDatosService: SolicitudDatosService,
    public solicitud260910Store: Solicitud260910Store,
    public solicitud260910Query: Solicitud260910Query,
    public fb: FormBuilder,
    private consultaQuery: ConsultaioQuery,
    private validacionesService: ValidacionesFormularioService
  ) {
    // Constructor vacío, no requiere inicialización adicional.
  }

  /**
   * Inicialización del componente.
   */
  ngOnInit(): void {
    this.inicializarFormGroup();
    this.obtenerEstadoCatalogo();
    this.obtenerDatosDeAplicacion();
    this.obtenerRegimenDestinaraListo();
    this.obtenerAduanaListo();
    this.obtenerMercanciaListo();
    this.obtenerSolicitud();
    this.obtenerSCIANMesa();
    this.obtenerSCIANListo();
    this.obtenerSCIANDescListo();
    this.configurarSuscripcionEstadoConsulta();
  }

  /**
   * Configura la suscripción al estado de consulta para controlar modo lectura/edición
   */
  private configurarSuscripcionEstadoConsulta(): void {
    this.consultaQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.consultaState = seccionState;
          this.esFormularioSoloLectura = seccionState?.readonly;
          this.actualizarEstadoFormularios();
        })
      )
      .subscribe();
  }

  /**
   * Inicializa los formularios reactivos.
   */
  inicializarFormGroup(): void {
    this.solicitudForm = this.fb.group({
      tipoOperacion: [
        this.solicitud260910State.tipoOperacion,
        Validators.required,
      ],
      observaciones: [
        { value: this.solicitud260910State.observaciones, disabled: true },
        [Validators.required, Validators.maxLength(2000)],
      ],
      rfcSanitario: [
        { value: this.solicitud260910State.rfcSanitario, disabled: true },
        [
          Validators.required,
          Validators.pattern(REGEX_RFC),
          Validators.maxLength(13),
        ],
      ],
      razonSocial: [
        { value: this.solicitud260910State.razonSocial, disabled: true },
        [
          Validators.required,
          Validators.maxLength(100),
          Validators.pattern(REGEX_LETRAS_NUMEROS_COMA_PARENTESIS_ESPACIO),
        ],
      ],
      correoElectronico: [
        { value: this.solicitud260910State.correoElectronico, disabled: true },
        [Validators.required, Validators.pattern(REGEX_CORREO)],
      ],
      codigoPostal: [
        { value: this.solicitud260910State.codigoPostal, disabled: true },
        [
          Validators.required,
          Validators.maxLength(12),
          Validators.pattern(REGEX_SOLO_NUMEROS),
        ],
      ],
      estado: [
        { value: this.solicitud260910State.estado, disabled: true },
        [Validators.required],
      ],
      municipio: [
        { value: this.solicitud260910State.municipio, disabled: true },
        [Validators.required, Validators.maxLength(120)],
      ],
      localidad: [
        { value: this.solicitud260910State.localidad, disabled: true },
        [Validators.maxLength(120), Validators.pattern(REGEX_LOCALIDAD)],
      ],
      colonia: [
        { value: this.solicitud260910State.colonia, disabled: true },
        [Validators.maxLength(120)],
      ],
      calle: [
        { value: this.solicitud260910State.calle, disabled: true },
        [Validators.required, Validators.maxLength(100)],
      ],
      lada: [
        { value: this.solicitud260910State.lada, disabled: true },
        [Validators.maxLength(5), Validators.pattern(REGEX_SOLO_NUMEROS)],
      ],
      telefono: [
        { value: this.solicitud260910State.telefono, disabled: true },
        [
          Validators.required,
          Validators.maxLength(30),
          Validators.pattern(REGEX_SOLO_NUMEROS),
        ],
      ],
      avisoDeFuncionamiento: [
        {
          value: this.solicitud260910State.avisoDeFuncionamiento,
          disabled: true,
        },
      ],
      licenciaSanitaria: [
        { value: this.solicitud260910State.licenciaSanitaria, disabled: true },
      ],
      liveFreshFrozen: [this.solicitud260910State.liveFreshFrozen],
      regimen: [
        { value: this.solicitud260910State.regimen, disabled: true },
        [Validators.required],
      ],
      aduana: [
        { value: this.solicitud260910State.aduana, disabled: true },
        [Validators.required],
      ],
      hacerlos: [
        { value: this.solicitud260910State.hacerlos, disabled: true },
        [Validators.required],
      ],
      rfc: [
        { value: this.solicitud260910State.rfc, disabled: true },
        [Validators.required, Validators.maxLength(13)],
      ],
      legalRazonSocial: [
        { value: this.solicitud260910State.legalRazonSocial, disabled: true },
        [Validators.required, Validators.maxLength(30)],
      ],
      apellidoPaterno: [
        { value: this.solicitud260910State.apellidoPaterno, disabled: true },
        [Validators.required, Validators.maxLength(30)],
      ],
      apellidoMaterno: [
        { value: this.solicitud260910State.apellidoMaterno, disabled: true },
        [Validators.maxLength(30)],
      ],
      manifesto: [
        { value: this.solicitud260910State.manifesto, disabled: true },
      ],
    });

    this.claveSCIANForm = this.fb.group({
      claveSCIAN: [this.solicitud260910State.claveSCIAN, [Validators.required]],
      claveSCIANDesc: [
        this.solicitud260910State.claveSCIANDesc,
        [Validators.required],
      ],
    });

    this.solicitud260910Query.seleccionarSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((respuesta: Solicitud260910State) => {
          this.solicitud260910State = respuesta;
          this.solicitudForm.patchValue({
            tipoOperacion: this.solicitud260910State.tipoOperacion,
            observaciones: this.solicitud260910State.observaciones,
            rfcSanitario: this.solicitud260910State.rfcSanitario,
            razonSocial: this.solicitud260910State.razonSocial,
            correoElectronico: this.solicitud260910State.correoElectronico,
            codigoPostal: this.solicitud260910State.codigoPostal,
            estado: this.solicitud260910State.estado,
            municipio: this.solicitud260910State.municipio,
            localidad: this.solicitud260910State.localidad,
            colonia: this.solicitud260910State.colonia,
            calle: this.solicitud260910State.calle,
            lada: this.solicitud260910State.lada,
            telefono: this.solicitud260910State.telefono,
            claveSCIAN: this.solicitud260910State.claveSCIAN,
            claveSCIANDesc: this.solicitud260910State.claveSCIANDesc,
            avisoDeFuncionamiento:
              this.solicitud260910State.avisoDeFuncionamiento,
            licenciaSanitaria: this.solicitud260910State.licenciaSanitaria,
            liveFreshFrozen: this.solicitud260910State.liveFreshFrozen,
            regimen: this.solicitud260910State.regimen,
            aduana: this.solicitud260910State.aduana,
            hacerlos: this.solicitud260910State.hacerlos,
            rfc: this.solicitud260910State.rfc,
            legalRazonSocial: this.solicitud260910State.legalRazonSocial,
            apellidoPaterno: this.solicitud260910State.apellidoPaterno,
            apellidoMaterno: this.solicitud260910State.apellidoMaterno,
            manifesto: this.solicitud260910State.manifesto,
          });
          this.claveSCIANForm.patchValue({
            claveSCIAN: this.solicitud260910State.claveSCIAN,
            claveSCIANDesc: this.solicitud260910State.claveSCIANDesc,
          });
          if (this.solicitud260910State.tipoOperacion) {
            this.actualizarEstadoFormulario();
          }
          this.mercanciasDatos = this.solicitud260910State.mercanciasDatos;
          this.SCIANDatos = this.solicitud260910State.SCIANDatos;
        })
      )
      .subscribe();
  }

  /**
   * Alterna la visibilidad del panel plegable.
   */
  mostrarColapsable(): void {
    this.colapsable = !this.colapsable;
  }

  /**
   * Obtiene datos de solicitud desde el servicio.
   */
  obtenerSolicitud(): void {
    this.solicitudDatosService
      .obtenerSolicitud()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (respuesta: Solicitud) => {
          this.solicitud260910Store.setRfc(respuesta.rfc);
          this.solicitud260910Store.setLicenciaSanitaria(
            respuesta.licenciaSanitaria
          );
          this.solicitud260910Store.setRegimen(respuesta.regimen);
          this.solicitud260910Store.setAduana(respuesta.aduana);
          this.solicitud260910Store.setEstado(respuesta.estado);
          this.solicitud260910Store.setHacerlos(respuesta.hacerlos);
          this.solicitud260910Store.setManifesto(respuesta.manifesto);
          this.solicitud260910Store.setRfcSanitario(respuesta.rfcSanitario);
          this.solicitud260910Store.setRazonSocial(respuesta.razonSocial);
          this.solicitud260910Store.setCorreoElectronico(
            respuesta.correoElectronico
          );
          this.solicitud260910Store.setCodigoPostal(respuesta.codigoPostal);
          this.solicitud260910Store.setMunicipio(respuesta.municipio);
          this.solicitud260910Store.setLocalidad(respuesta.localidad);
          this.solicitud260910Store.setColonia(respuesta.colonia);
          this.solicitud260910Store.setCalle(respuesta.calle);
          this.solicitud260910Store.setLada(respuesta.lada);
          this.solicitud260910Store.setTelefono(respuesta.telefono);
          this.solicitud260910Store.setAvisoDeFuncionamiento(
            respuesta.avisoDeFuncionamiento
          );
          this.solicitud260910Store.setLegalRazonSocial(
            respuesta.legalRazonSocial
          );
          this.solicitud260910Store.setApellidoPaterno(
            respuesta.apellidoPaterno
          );
          this.solicitud260910Store.setApellidoMaterno(
            respuesta.apellidoMaterno
          );
        },
      });
  }

  /**
   * Obtiene catálogo de estados.
   */
  obtenerEstadoCatalogo(): void {
    this.solicitudDatosService
      .obtenerEstadoCatalogo()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (respuesta: CatalogosSelect) => {
          this.estadoCatalogo = respuesta;
        },
      });
  }

  /**
   * Obtiene datos de aplicación relacionados con la solicitud.
   */
  obtenerDatosDeAplicacion(): void {
    this.solicitudDatosService
      .obtenerDatosDeSolicitud()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (respuesta: DatosDeSolicitud) => {
          this.solicitudDatos = respuesta.tablaFilaDatos;
          this.hacerlosRadioOptions = respuesta.hacerlosRadioOptions;
          this.tableDataSCIAN = respuesta.tablaFilaDatos[0]?.SCIANLista;
          this.tipoOperacionRadioOptions = respuesta.tipoOperacionOptions;
        },
      });
  }

  /**
   * Obtiene lista de mercancías.
   */
  obtenerMercanciaListo(): void {
    this.solicitudDatosService
      .obtenerMercanciaListo()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (res: Mercancia[]) => {
          this.solicitud260910Store.setMercanciasDatos(res);
        },
      });
  }

  /**
   * Obtiene datos SCIAN desde servicio.
   */
  obtenerSCIANMesa(): void {
    this.solicitudDatosService
      .obtenerSCIANMesa()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (res: SCIAN[]) => {
          this.solicitud260910Store.setSCIANDatos(res);
        },
      });
  }

  /**
   * Obtiene catálogo de regímenes.
   */
  obtenerRegimenDestinaraListo(): void {
    this.solicitudDatosService
      .obtenerRegimenDestinaraListo()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (respuesta: CatalogosSelect) => {
          this.regimenCatalogo = respuesta;
        },
      });
  }

  /**
   * Obtiene catálogo de aduanas.
   */
  obtenerAduanaListo(): void {
    this.solicitudDatosService
      .obtenerAduanaListo()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (respuesta: CatalogosSelect) => {
          this.aduanaCatalogo = respuesta;
        },
      });
  }

  /**
   * Obtiene catálogo SCIAN.
   */
  obtenerSCIANListo(): void {
    this.solicitudDatosService
      .obtenerSCIANListo()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (respuesta: CatalogosSelect) => {
          this.SCIANCatalogo = respuesta;
        },
      });
  }

  /**
   * Obtiene catálogo de descripciones SCIAN.
   */
  obtenerSCIANDescListo(): void {
    this.solicitudDatosService
      .obtenerSCIANDescListo()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (respuesta: CatalogosSelect) => {
          this.SCIANDescCatalogo = respuesta;
        },
      });
  }

  /**
   * Abre modal para modificar mercancías.
   */
  openModificarMercancias(): void {
    if (this.selectedMercanciasDatos.length > 0) {
      this.seleccionadaMercancia = this.selectedMercanciasDatos[0];
      if (this.modalElement) {
        const MODAL_INSTANCE = new Modal(this.modalElement.nativeElement);
        MODAL_INSTANCE.show();
      }
    }
  }

  /**
   * Maneja la modificación de una mercancía.
   * @param nuevoValor Nuevo valor de mercancía modificado
   */
  onMercanciaModificada(nuevoValor: Mercancia): void {
    this.solicitud260910Store.modificarMercanciasDatos(nuevoValor);
  }

  /**
   * Abre modal para agregar SCIAN.
   */
  openAgregarSCIAN(): void {
    if (this.modalElementSCIAN) {
      const MODAL_INSTANCE_SCIAN = new Modal(
        this.modalElementSCIAN.nativeElement
      );
      MODAL_INSTANCE_SCIAN.show();
    }
  }

  /**
   * Abre modal para agregar mercancías.
   */
  openAgregarMercancias(): void {
    this.seleccionadaMercancia = null;
    if (this.modalElement) {
      const MODAL_INSTANCE = new Modal(this.modalElement.nativeElement);
      MODAL_INSTANCE.show();
    }
  }

  /**
   * Establece estado seleccionado.
   * @param evento Catálogo seleccionado
   */
  setEstado(evento: Catalogo): void {
    this.solicitud260910Store.setEstado(evento.id);
  }

  /**
   * Establece licencia sanitaria.
   * @param evento Evento de entrada
   */
  setLicenciaSanitaria(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud260910Store.setLicenciaSanitaria(VALOR);
  }

  /**
   * Establece régimen seleccionado.
   * @param evento Catálogo seleccionado
   */
  setRegimen(evento: Catalogo): void {
    this.solicitud260910Store.setRegimen(evento.id);
  }

  /**
   * Establece aduana seleccionada.
   * @param evento Catálogo seleccionado
   */
  setAduana(evento: Catalogo): void {
    this.solicitud260910Store.setAduana(evento.id);
  }

  /**
   * Establece clave SCIAN seleccionada.
   * @param evento Catálogo seleccionado
   */
  setClaveSCIAN(evento: Catalogo): void {
    this.solicitud260910Store.setClaveSCIAN(evento.id);
    this.SCIANDescCatalogo.catalogos.forEach((elemento) => {
      if (elemento.clave === evento.clave) {
        this.solicitud260910Store.setClaveSCIANDesc(elemento.id);
      }
    });
  }

  /**
   * Establece descripción SCIAN seleccionada.
   * @param evento Catálogo seleccionado
   */
  setClaveSCIANDesc(evento: Catalogo): void {
    this.solicitud260910Store.setClaveSCIANDesc(evento.id);
  }

  /**
   * Establece valor de hacerlos públicos.
   * @param evento Valor seleccionado
   */
  setHacerlos(evento: number | string): void {
    this.solicitud260910Store.setHacerlos(evento);
  }

  /**
   * Establece tipo de operación.
   * @param evento Valor seleccionado
   */
  setTipoOperacion(evento: number | string): void {
    this.solicitud260910Store.setTipoOperacion(evento);
    this.actualizarEstadoFormulario();
  }

  /**
   * Actualiza el estado de los formularios según el modo de solo lectura.
   */
  actualizarEstadoFormulario(): void {
    this.mostrarBuscarBoton = true;
    if (this.solicitudForm.get('tipoOperacion')?.value === 'PRO') {
      this.solicitudForm.disable();
      this.solicitudForm.get('tipoOperacion')?.enable();
      this.solicitudForm.get('rfc')?.enable();
      this.solicitudForm.get('observaciones')?.enable();
      this.mostrarBoton = false;
    } else {
      this.solicitudForm.enable();
      this.solicitudForm.get('avisoDeFuncionamiento')?.disable();
      this.solicitudForm.get('legalRazonSocial')?.disable();
      this.solicitudForm.get('apellidoPaterno')?.disable();
      this.solicitudForm.get('apellidoMaterno')?.disable();
      this.mostrarBoton = true;
    }
  }

  /**
   * Establece RFC.
   * @param evento Evento de entrada
   */
  setRFC(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud260910Store.setRfc(VALOR);
  }

  /**
   * Obtiene datos de mercancías seleccionadas.
   * @param evento Datos seleccionados
   */
  getMercanciasDatos(evento: Mercancia[]): void {
    this.selectedMercanciasDatos = evento;
  }

  /**
   * Obtiene datos SCIAN seleccionados.
   * @param evento Datos seleccionados
   */
  getSCIANDatos(evento: SCIAN[]): void {
    this.seleccionaSCIANDatos = evento;
  }

  /**
   * Elimina mercancías seleccionadas.
   */
  eliminarMercancias(): void {
    if (this.selectedMercanciasDatos.length > 0) {
      this.solicitud260910Store.removeMercanciaDatos(
        this.selectedMercanciasDatos[0]
      );
    }
  }

  /**
   * Elimina SCIAN seleccionado.
   */
  eliminarSCIAN(): void {
    if (this.seleccionaSCIANDatos.length > 0) {
      this.solicitud260910Store.eliminarSCAINDatos(
        this.seleccionaSCIANDatos[0]
      );
    }
  }

  /**
   * Limpia los campos del formulario de clave SCIAN.
   * @returns { void }
   */
  limpiarSCIAN(): void {
    this.claveSCIANForm.reset();
  }

  /**
   * Agrega nuevo SCIAN.
   */
  agregarSCIAN(): void {
    const SELECCIONADA_SCIAN =
      this.SCIANCatalogo.catalogos.find(
        (item) =>
          item.id === Number(this.claveSCIANForm.get('claveSCIAN')?.value)
      )?.descripcion ?? '';
    const SELECCIONADA_SCIAN_DESCRIPCION =
      this.SCIANDescCatalogo.catalogos.find(
        (item) =>
          item.id === Number(this.claveSCIANForm.get('claveSCIANDesc')?.value)
      )?.descripcion ?? '';
    const OBJETO_JSON = {
      claveSCIAN: SELECCIONADA_SCIAN,
      claveSCIANDesc: SELECCIONADA_SCIAN_DESCRIPCION,
    };
    this.solicitud260910Store.addSCIANDatos(OBJETO_JSON);
    this.limpiarSCIAN();
  }

  /**
   * Selecciona tipo para acciones.
   * @param tipo Tipo seleccionado
   */
  seleccionaTipo(tipo: string): void {
    if (tipo === 'Mercancias') {
      this.eliminarMercancias();
    } else if (tipo === 'SCIAN') {
      this.eliminarSCIAN();
    }
    this.selectedMercanciasDatos = [];
    this.seleccionaSCIANDatos = [];
  }

  /**
   * Muestra modal de confirmación para eliminar elementos.
   * @param tipo Tipo de elemento a eliminar
   */
  confirmarEliminarMercancias(tipo: string): void {
    if (
      this.selectedMercanciasDatos.length > 0 ||
      this.seleccionaSCIANDatos.length > 0
    ) {
      this.seleccionadoTipo = tipo;
      if (this.modalConfirmarElement) {
        const MODAL_CONFIRMAR_INSTANCE = new Modal(
          this.modalConfirmarElement.nativeElement
        );
        MODAL_CONFIRMAR_INSTANCE.show();
      }
    }
  }

  /**
   * Establece estado del producto (fresco/congelado/vivo).
   */
  setLiveFreshFrozen(): void {
    const FROZEN_CHECKBOX = this.solicitudForm.get('liveFreshFrozen')?.value;
    this.solicitud260910Store.setLiveFreshFrozen(FROZEN_CHECKBOX);
  }

  /**
   * Establece aviso de funcionamiento.
   */
  setAvisoDeFuncionamiento(): void {
    const AVISO_CHECKBOX = this.solicitudForm.get(
      'avisoDeFuncionamiento'
    )?.value;
    this.solicitud260910Store.setAvisoDeFuncionamiento(AVISO_CHECKBOX);
    if (this.solicitudForm.get('avisoDeFuncionamiento')?.value === true) {
      this.solicitudForm.get('licenciaSanitaria')?.disable();
    } else {
      this.solicitudForm.get('licenciaSanitaria')?.enable();
    }
  }

  /**
   * Establece valor de manifiesto.
   * @param evento Evento de entrada
   */
  setManifesto(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).checked;
    this.solicitud260910Store.setManifesto(VALOR);
  }

  /**
   * Busca representante legal por RFC.
   * @returns {void}
   */
  buscarRepresentanteLegal(rfc: string): void {
    if (rfc.length > 0) {
      this.solicitudDatosService
        .buscarRepresentanteLegal()
        .pipe(takeUntil(this.destroyNotifier$))
        .subscribe({
          next: (respuesta) => {
            this.solicitudForm.patchValue({
              legalRazonSocial: respuesta.nombreRazonSocial,
              apellidoPaterno: respuesta.apellidoPaterno,
              apellidoMaterno: respuesta.apellidoMaterno,
            });
            this.solicitud260910Store.setLegalRazonSocial(
              respuesta.nombreRazonSocial
            );
            this.solicitud260910Store.setApellidoPaterno(
              respuesta.apellidoPaterno
            );
            this.solicitud260910Store.setApellidoMaterno(
              respuesta.apellidoMaterno
            );
          },
        });
    }
  }

  /**
   * Actualiza valores en el almacén.
   * @param form Formulario reactivo
   * @param campo Nombre del campo
   * @param metodoNombre Método del almacén
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Solicitud260910Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (
      this.solicitud260910Store[metodoNombre] as (
        value: string | number | boolean
      ) => void
    )(VALOR);
  }

  /**
   * Muestra modal de selección de establecimiento.
   */
  seleccionarEstablecimiento(): void {
    if (this.modalAlertaElement) {
      const MODAL_ALERTA_INSTANCE = new Modal(
        this.modalAlertaElement.nativeElement
      );
      MODAL_ALERTA_INSTANCE.show();
    }
  }

  /**
   * Método para validar el formulario.
   * @param form Formulario a validar.
   * @param field Campo a validar.
   * @returns {boolean} Regresa un booleano si el campo es válido o no.
   */
  esValido(form: FormGroup, field: string): boolean {
    return this.validacionesService.isValid(form, field) === true;
  }

  /**
   * Destrucción del componente.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

  /**
   * Actualiza el estado de habilitación de los formularios según el modo (lectura/edición)
   */
  private actualizarEstadoFormularios(): void {
    if (this.esFormularioSoloLectura) {
      this.solicitudForm.disable();
      this.claveSCIANForm.disable();
    }
  }
}