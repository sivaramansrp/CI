import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Catalogo, CatalogoSelectComponent} from '@libs/shared/data-access-user/src';
import { Component, TemplateRef } from '@angular/core';
import { ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { InputFecha, InputFechaComponent, InputRadioComponent, REGEX_NUMEROS_USD, REGEX_REEMPLAZAR, REGEX_SOLO_NUMEROS, TablaDinamicaComponent, TablaSeleccion, TituloComponent } from '@libs/shared/data-access-user/src';
import { AvisoCatalogo } from '../../models/aviso-catalogo.model';
import { AvisoOpcionesDeRadio } from '../../models/aviso-catalogo.model';
import { CatalogosSelect } from '@libs/shared/data-access-user/src'; 
import { CommonModule } from '@angular/common';
import { ConfiguracionColumna } from '@libs/shared/data-access-user/src';
import { OperacionDeImportacion } from '../../models/aviso-catalogo.model';

import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { Solicitud32501State, Solicitud32501Store } from '../../estados/solicitud32501.store';
import { Subject, map, takeUntil } from 'rxjs';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { FECHA_INGRESO } from '../../enums/solicitud32501.enum';
import { HttpClientModule } from '@angular/common/http';
import { MercanciasDesmontadasOSinMontarService } from '../../services/mercancias-desmontadas-o-sin-montar.service';
import { Modal } from 'bootstrap';
import { ModalOperacionComponent } from '../modal-operacion/modal-operacion.component';
import { Solicitud32501Query } from '../../estados/solicitud32501.query';

/**
 * Componente `DatosSolicitudComponent` que gestiona la lógica y la interfaz de usuario
 * para la sección de datos de solicitud en el trámite 32501.
 *
 */
@Component({
  selector: 'app-datos-solicitud',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CatalogoSelectComponent,
    CommonModule,
    FormsModule,
    HttpClientModule,
    InputFechaComponent,
    TituloComponent,
    TablaDinamicaComponent,
    ModalOperacionComponent,
    InputRadioComponent
],
  providers: [MercanciasDesmontadasOSinMontarService, BsModalService],
  templateUrl: './datos-solicitud.component.html',
  styleUrl: './datos-solicitud.component.scss',
})
/**
 * Componente `DatosSolicitudComponent` que gestiona la lógica y la interfaz de usuario
 * para la sección de datos de solicitud en el trámite 32501.
 *
 */
export class DatosSolicitudComponent implements OnInit, OnDestroy {
  /**
   * Indica si el formulario está en modo solo lectura.
   */
  esSoloLectura!: boolean;
  /**
   * Formulario para la gestión de avisos.
   */
  formAviso!: FormGroup;

  /**
   * Opciones de radio para el tipo de aviso.
   */
  avisoOpcionesDeRadio: AvisoOpcionesDeRadio = {} as AvisoOpcionesDeRadio;

  /**
   * Tipo de aviso seleccionado.
   */
  tipoAviso: string | number = 'por defecto';

  /**
   * Opción seleccionada para Fracción Arancelaria.
   */
  opcionFraccionArancelaria: CatalogosSelect = {} as CatalogosSelect;

  /**
   * Opción seleccionada para Entidad Federativa.
   */
  opcionEntidadFederativa: CatalogosSelect = {} as CatalogosSelect;

  /**
   * Catálogo de opciones para Entidad Federativa.
   */
  catalogosOpcionEntidadFederativa: Catalogo[] = [];

  /**
   * Catálogo de opciones para Delegación o Municipio.
   */
  catalogosOpcionDelegacionMunicipio: Catalogo[] = [];

  /**
   * Catálogo de opciones para Colonia.
   */
  catalogosOpcionColonia: Catalogo[] = [];

  /**
   * Opción seleccionada para Delegación o Municipio.
   */
  opcionDelegacionMunicipio: CatalogosSelect = {} as CatalogosSelect;

  /**
   * Opción seleccionada para Colonia.
   */
  opcionColonia: CatalogosSelect = {} as CatalogosSelect;

  /**
   * Lista de entidades federativas.
   */
  delegacionMunicipioLista: CatalogosSelect = {} as CatalogosSelect;

  /**
   * Lista de delegaciones o municipios.
   */
  coloniaLista: CatalogosSelect = {} as CatalogosSelect;

  /**
   * Observable para manejar la destrucción de suscripciones.
   */
  private destroyed$ = new Subject<void>();

  /**
   * Referencia al modal para agregar mercancías.
   */
  @ViewChild('modalAgregarMercancias') modalElement!: ElementRef;

  /**
   * Fecha de inicio predefinida.
   */
  public fechaInicioInput: InputFecha = FECHA_INGRESO;

  /**
   * Tipo de selección de la tabla.
   */
  tipoSeleccionTabla = TablaSeleccion.CHECKBOX;

  /**
   * Mensaje que se muestra en los modales de selección.
   * Contiene texto dinámico para diferentes estados de validación.
   */
  mensajeSeleccion: string = '';

  /**
   * Transportista actualmente seleccionado en la tabla.
   * Se utiliza para operaciones de edición y eliminación.
   */
  selectedOperacionDeImportacion: OperacionDeImportacion | null = null;

  /**
   * Referencia al modal principal para abrir/cerrar transportistas.
   * Se utiliza para gestionar el estado del modal de Bootstrap.
   */
  modalRefabir?: BsModalRef;

  /**
   * Referencia al template del modal de selección requerida.
   * Se muestra cuando se requiere seleccionar un elemento de la tabla.
   */
  @ViewChild('templateSeleccionRequerida') templateSeleccionRequerida!: TemplateRef<void>;

  /**
   * Referencia al template del modal de confirmación de eliminación.
   * Template para confirmar la eliminación de transportistas.
   */
  @ViewChild('templateConfirmacionEliminacion') templateConfirmacionEliminacion!: TemplateRef<void>;

  /**
   * Configuración de las columnas para la tabla de operaciones de importación.
   */
  configuracionColumnas: ConfiguracionColumna<OperacionDeImportacion>[] = [
    {
      encabezado: 'Patente o autorización del agente aduanal',
      clave: (item: OperacionDeImportacion) => item.agenteAduanal,
      orden: 1,
    },
    {
      encabezado: 'RFC del agente aduanal',
      clave: (item: OperacionDeImportacion) => item.rfc,
      orden: 2,
    },
    {
      encabezado: 'Número de pedimento',
      clave: (item: OperacionDeImportacion) => item.numeroDePedimento,
      orden: 3,
    },
    {
      encabezado: 'Aduana de importación',
      clave: (item: OperacionDeImportacion) => item.aduanaDeImportacion,
      orden: 4,
    },
  ];

  /**
   * Lista de operaciones de importación.
   */
  operacionDeImportacionLista: OperacionDeImportacion[] =
    [] as OperacionDeImportacion[];

  /**
   * Estado de la solicitud 32501.
   */
  solicitud32501State: Solicitud32501State = {} as Solicitud32501State;

  /**
   * Constructor de la clase `DatosSolicitudComponent`.
   *
   * @param fb - Servicio de `FormBuilder` para la creación y gestión de formularios reactivos.
   * @param MercanciasDesmontadasOSinMontarService - Servicio para manejar operaciones relacionadas con mercancías desmanteladas sin monitoreo.
   * @param solicitud32501Query - Servicio para realizar consultas relacionadas con la solicitud 32501.
   * @param solicitud32501Store - Almacén para gestionar el estado de la solicitud 32501.
   * @param consultaQuery - Servicio para realizar consultas relacionadas con la consulta de IO.
   *
   * Este constructor inicializa el componente obteniendo el aviso del catálogo
   * y la operación de importación mediante las funciones `obtenerAvisoDelCatalogo`
   * y `obtenerOperacionDeImportacion`.
   */
  constructor(
    public fb: FormBuilder,
    public mercanciasDesmontadasOSinMontarService: MercanciasDesmontadasOSinMontarService,
    public solicitud32501Query: Solicitud32501Query,
    public solicitud32501Store: Solicitud32501Store,
    private consultaQuery: ConsultaioQuery,
    private modalService: BsModalService,
  ) {}

  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   *
   * - Configura el formulario `formAviso` con los valores iniciales y validaciones necesarias
   *   basadas en el estado `solicitud32501State`.
   * - Suscribe al observable `seleccionarSolicitud$` para actualizar el estado del formulario
   *   cuando se reciben nuevos datos de la solicitud.
   * - Utiliza `takeUntil` para gestionar la desuscripción automática cuando el componente
   *   se destruye, evitando fugas de memoria.
   */
  ngOnInit(): void {
    this.obtenerValoresDelStore();
    this.inicializarFormulario();

    this.obtenerOperacionDeImportacion();
    this.obtenerAvisoOpcionesDeRadio();
    this.consultaQuery.selectConsultaioState$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((estadoSeccion) => {
        this.esSoloLectura = estadoSeccion.readonly;
        if (estadoSeccion.create) {
          this.getAvisoDelCatalogo();
        } else {
          this.obtenerAvisoDelCatalogo();
        }
        this.habilitarDeshabilitarFormulario();
      });
  }

  /**
   * Inicializa el formulario `formAviso` con los controles y validaciones necesarios.
   * Utiliza el `FormBuilder` para crear un grupo de controles con valores iniciales
   * basados en el estado actual de la solicitud (`solicitud32501State`).
   * Cada control tiene sus respectivas validaciones, como requerimientos y patrones.
   */

  inicializarFormulario(): void {
    this.formAviso = this.fb.group({
      adace: [{ value: this.solicitud32501State?.adace, disabled: true }],
      fechaIniExposicion: [
        { value: this.solicitud32501State?.fechaIniExposicion, disabled: true },
        Validators.required,
      ],
      ideGenerica1: [
        this.solicitud32501State?.ideGenerica1,
        [Validators.required],
      ],
      idTransaccionVU: [
        this.solicitud32501State?.idTransaccionVU,
        [Validators.maxLength(25), Validators.minLength(25)],
      ],
      cveFraccionArancelaria: [
        this.solicitud32501State?.cveFraccionArancelaria,
        Validators.required,
      ],
      nico: [
        this.solicitud32501State?.nico,
        [
          Validators.required,
          Validators.pattern(REGEX_SOLO_NUMEROS),
          Validators.maxLength(2),
          Validators.minLength(2),
        ],
      ],
      peso: [
        this.solicitud32501State?.peso,
        [
          Validators.required,
          Validators.pattern(REGEX_NUMEROS_USD),
          Validators.maxLength(16),
          Validators.max(9999999999999.99),
          Validators.min(0.01),
        ],
      ],
      valorUSD: [
        this.solicitud32501State?.valorUSD,
        [
          Validators.required,
          Validators.pattern(REGEX_NUMEROS_USD),
          Validators.maxLength(15),
          Validators.max(9999999999999.99),
          Validators.min(0.01),
        ],
      ],
      descripcionMercancia: [
        this.solicitud32501State?.descripcionMercancia,
        [Validators.required, Validators.maxLength(250)],
      ],
      nombreComercial: [
        this.solicitud32501State?.nombreComercial,
        [Validators.maxLength(250)],
      ],
      entidadFederativa: [
        this.solicitud32501State?.entidadFederativa,
        Validators.required,
      ],
      delegacionMunicipio: [
        this.solicitud32501State?.delegacionMunicipio,
        Validators.required,
      ],
      colonia: [this.solicitud32501State?.colonia, [Validators.required]],
      calle: [
        this.solicitud32501State?.calle,
        [Validators.required, Validators.maxLength(250)],
      ],
      numeroExterior: [
        this.solicitud32501State?.numeroExterior,
        [Validators.required, Validators.maxLength(15)],
      ],
      numeroInterior: [
        this.solicitud32501State?.numeroInterior,
        [Validators.maxLength(15)],
      ],
      codigoPostal: [
        this.solicitud32501State?.codigoPostal,
        [
          Validators.required,
          Validators.pattern(REGEX_SOLO_NUMEROS),
          Validators.maxLength(5),
        ],
      ],
    });
  }

  /**
   * Habilita o deshabilita los campos del formulario según el modo de solo lectura.
   * Si `esSoloLectura` es verdadero, deshabilita los controles especificados.
   * Si es falso, los habilita para permitir la edición.
   */
  habilitarDeshabilitarFormulario(): void {
    if (this.esSoloLectura) {
      this.formAviso.get('ideGenerica1')?.disable();
      this.formAviso.get('idTransaccionVU')?.disable();
      this.formAviso.get('nico')?.disable();
      this.formAviso.get('peso')?.disable();
      this.formAviso.get('valorUSD')?.disable();
      this.formAviso.get('descripcionMercancia')?.disable();
      this.formAviso.get('nombreComercial')?.disable();
      this.formAviso.get('calle')?.disable();
      this.formAviso.get('numeroExterior')?.disable();
      this.formAviso.get('numeroInterior')?.disable();
      this.formAviso.get('codigoPostal')?.disable();
    } else {
      this.formAviso.get('ideGenerica1')?.enable();
      this.formAviso.get('idTransaccionVU')?.enable();
      this.formAviso.get('nico')?.enable();
      this.formAviso.get('peso')?.enable();
      this.formAviso.get('valorUSD')?.enable();
      this.formAviso.get('descripcionMercancia')?.enable();
      this.formAviso.get('nombreComercial')?.enable();
      this.formAviso.get('calle')?.enable();
      this.formAviso.get('numeroExterior')?.enable();
      this.formAviso.get('numeroInterior')?.enable();
      this.formAviso.get('codigoPostal')?.enable();
    }
  }
  /**
   * Obtiene los valores del store `solicitud32501Query` y actualiza el estado
   * `solicitud32501State` con la respuesta obtenida.
   *
   * Utiliza el operador `takeUntil` para asegurarse de que la suscripción se cancele
   * cuando el componente sea destruido, evitando fugas de memoria.
   *
   * @returns {void} Este método no retorna ningún valor.
   */
  obtenerValoresDelStore(): void {
    this.solicitud32501Query.seleccionarSolicitud$
      .pipe(
        takeUntil(this.destroyed$),
        map((respuesta: Solicitud32501State) => {
          this.tipoAviso = respuesta.ideGenerica1;
          this.solicitud32501State = respuesta;
        })
      )
      .subscribe();
  }
  /**
   * Obtiene un aviso del catálogo utilizando el servicio `mercanciasDesmontadasOSinMontarService`.
   * Se suscribe al observable y actualiza las opciones relacionadas con la fracción arancelaria,
   * entidad federativa, delegación/municipio y colonia con los valores obtenidos de la respuesta.
   *
   * @returns {void} Este método no retorna ningún valor.
   */
  obtenerAvisoDelCatalogo(): void {
    this.mercanciasDesmontadasOSinMontarService
      .obtenerAvisoDelCatalogo()
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (respuesta: AvisoCatalogo) => {
          this.opcionFraccionArancelaria = respuesta.cveFraccionArancelaria;
          this.opcionEntidadFederativa = respuesta.entidadFederativa;
          this.opcionDelegacionMunicipio = respuesta.delegacionMunicipio;
          this.opcionColonia = respuesta.colonia;
        },
      });
  }

  /**
   * Obtiene un aviso del catálogo utilizando el servicio `mercanciasDesmontadasOSinMontarService`.
   * Se suscribe al observable y actualiza las opciones relacionadas con la fracción arancelaria,
   * entidad federativa, delegación/municipio y colonia con los valores obtenidos de la respuesta.
   *
   * @returns {void} Este método no retorna ningún valor.
   */
  getAvisoDelCatalogo(): void {
    this.mercanciasDesmontadasOSinMontarService
      .obtenerAvisoDelCatalogo()
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (respuesta: AvisoCatalogo) => {
          this.opcionFraccionArancelaria = respuesta.cveFraccionArancelaria;
          this.opcionEntidadFederativa = respuesta.entidadFederativa;
          this.delegacionMunicipioLista = respuesta.delegacionMunicipio;
          this.coloniaLista = respuesta.colonia;
        },
      });
  }
  /**
   * Obtiene las opciones de radio para el aviso desde el servicio `MercanciasDesmontadasOSinMontarService`.
   * Se suscribe al observable y actualiza la propiedad `avisoOpcionesDeRadio` con la respuesta obtenida.
   *
   * @returns {void} Este método no retorna ningún valor.
   */
  obtenerAvisoOpcionesDeRadio(): void {
    this.mercanciasDesmontadasOSinMontarService
      .obtenerAvisoOpcionesDeRadio()
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (respuesta: AvisoOpcionesDeRadio) => {
          this.avisoOpcionesDeRadio = respuesta;
        },
      });
  }

  /**
   * Obtiene la lista de operaciones de importación desde el servicio correspondiente.
   *
   * Este método realiza una solicitud al servicio `MercanciasDesmontadasOSinMontarService` para obtener
   * las operaciones de importación y las asigna a la propiedad `operacionDeImportacionLista`.
   *
   * La suscripción al observable se gestiona utilizando el operador `takeUntil` para
   * evitar fugas de memoria, asegurándose de que se complete cuando el componente sea destruido.
   */
  obtenerOperacionDeImportacion(): void {
    this.mercanciasDesmontadasOSinMontarService
      .obtenerOperacionDeImportacion()
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (respuesta: OperacionDeImportacion[]) => {
          this.operacionDeImportacionLista = respuesta;
        },
      });
  }

  /**
   * Establece el tipo de aviso basado en el evento proporcionado.
   *
   * @param evento - El evento que representa el tipo de aviso, puede ser una cadena o un número.
   * @returns void
   */
  setTipoDeAviso(evento: string | number): void {
    this.tipoAviso = evento;
    this.solicitud32501Store.establecerDatos({ ideGenerica1: evento });
  }
  /*
   * Establece los valores del formulario en el estado de la solicitud.
   *
   * @param formulario - El formulario del cual se obtienen los valores.
   * @param campo - El nombre del campo cuyo valor se desea establecer en el estado.
   *
   * Este método obtiene el valor del campo especificado en el formulario y lo establece
   * en el estado de la solicitud utilizando el store `solicitud32501Store`.
   */
  establecerValoresEnEstado(formulario: FormGroup, campo: string): void {
    const VALOR = formulario.get(campo)?.value;
    if (campo === 'entidadFederativa') {
      this.opcionDelegacionMunicipio = this.delegacionMunicipioLista;
    } else if (campo === 'delegacionMunicipio') {
      this.opcionColonia = this.coloniaLista;
    } 
    
    this.solicitud32501Store.establecerDatos({ [campo]: VALOR });
  }
  /**
   * Cambia el valor del campo `fechaIniExposicion` en el formulario y actualiza el estado de la solicitud.
   * @param evento - El nuevo valor de la fecha de inicio de exposición.
   */
  cambiarInputFecha(evento: string): void {
    this.formAviso.patchValue({
      fechaIniExposicion: evento,
    });
    this.establecerValoresEnEstado(this.formAviso, 'fechaIniExposicion');
  }

  /**
   * Actualiza el número de valor en el estado de la solicitud basado en el evento del input.
   * @param control - El nombre del control cuyo valor se actualizará.
   * @param evento - El evento que contiene el nuevo valor del input.
   */
  actualizarNumeroValor(control: string, evento: Event): void {
    const ELEMENTO_DE_ENTRADA = evento.target as HTMLInputElement;
    const VALOR = ELEMENTO_DE_ENTRADA.value.replace(REGEX_REEMPLAZAR, '');
    this.solicitud32501Store.establecerDatos({ [control]: VALOR });
  }
  /**
   * Muestra el modal para modificar una operación de importación.
   */
  modificarOperacionImp(): void {
    if (this.modalElement) {
      const MODAL_INSTANCE = new Modal(this.modalElement.nativeElement);
      MODAL_INSTANCE.show();
    }
  }

  /**
   * Muestra el modal para agregar una nueva operación de importación.
   */
  agregarOperacionImp(): void {
    if (this.modalElement) {
      const MODAL_INSTANCE = new Modal(this.modalElement.nativeElement);
      MODAL_INSTANCE.show();
    }
  }

  /**
   * Verifica si un campo del formulario no es válido.
   * @param id Identificador del campo en el formulario.
   * @returns true si el campo es inválido y ha sido tocado, de lo contrario undefined.
   */
  noEsValido(id: string): boolean | undefined {
    const CONTROL = this.formAviso.get(id);
    return CONTROL?.invalid && CONTROL?.touched;
  }

  /**
   * Verifica si un campo del formulario es válido.
   * @param field Nombre del campo en el formulario.
   * @returns true si el campo es inválido y ha sido tocado, de lo contrario false.
   */
  esValido(field: string): boolean {
    const CONTROL = this.formAviso.get(field);
    return CONTROL ? CONTROL.invalid && CONTROL.touched : false;
  }

  /**
    * Maneja la selección de una fila en la tabla de transportistas.
   */
  onFilaSeleccionada(datos: OperacionDeImportacion): void {
    this.selectedOperacionDeImportacion = datos;
  }

  /**
   * Elimina una operación de importación.
   */
  eliminarOperacionImp(): void {
    if (this.operacionDeImportacionLista.length === 0 || !this.selectedOperacionDeImportacion) {
      this.mensajeSeleccion = 'Debe seleccionar un elemento';
      this.mostrarModalSeleccionRequerida();
      return;
    }
    this.mostrarModalConfirmacionEliminacion();
  }

  /**
   * Muestra el modal cuando se requiere seleccionar un elemento.
   * Se usa cuando el usuario intenta realizar una acción sin seleccionar un transportista.
   */
  mostrarModalSeleccionRequerida(): void {
    const MODAL_CONFIG = {
      animated: true,
      keyboard: false,
      backdrop: true,
      ignoreBackdropClick: true,
      class: 'modal-sm'
    };

    this.modalRefabir = this.modalService.show(this.templateSeleccionRequerida, MODAL_CONFIG);
  }

  /**
   * Muestra el modal de confirmación para eliminar un transportista.
   * Requiere confirmación del usuario antes de proceder con la eliminación.
   */
  mostrarModalConfirmacionEliminacion(): void {
    const MODAL_CONFIG = {
      animated: true,
      keyboard: false,
      backdrop: true,
      ignoreBackdropClick: true,
      class: 'modal-m'
    };

    this.modalRefabir = this.modalService.show(this.templateConfirmacionEliminacion, MODAL_CONFIG);
  }

  /**
   * Cierra el modal de selección requerida.
   * Se ejecuta después de mostrar el mensaje de selección obligatoria.
   */
  cerrarModalSeleccionRequerida(): void {
    this.modalRefabir?.hide();
  }

  /**
   * Confirma y ejecuta la eliminación del transportista seleccionado.
   * Actualiza la lista y el store, resetea la selección y muestra confirmación.
   */
  confirmarEliminacionOperacionImportacion(): void {
    if (!this.selectedOperacionDeImportacion) {
      return;
    }

    this.operacionDeImportacionLista = this.operacionDeImportacionLista.filter(operacion =>
      operacion.agenteAduanal !== this.selectedOperacionDeImportacion?.agenteAduanal
    );

    this.selectedOperacionDeImportacion = null;

    this.modalRefabir?.hide();
    this.mensajeSeleccion = 'Datos eliminados correctamente';
    this.mostrarModalSeleccionRequerida();
  }

  /**
   * Cierra el modal de confirmación de eliminación sin realizar cambios.
   * Cancela el proceso de eliminación y mantiene el estado actual.
   */
  cerrarModalConfirmacionEliminacion(): void {
    this.modalRefabir?.hide();
  }

  /**
   * Método de limpieza al destruir el componente.
   * Cancela suscripciones para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
