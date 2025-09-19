import { CategoriaMensaje, ConfiguracionColumna, ConsultaioQuery, ELVALORALERTA, Notificacion, NotificacionesComponent, REGEX_SOLO_NUMEROS, TablaDinamicaComponent, TablaSeleccion, TablePaginationComponent } from '@ng-mf/data-access-user';
import { CodigoRespuesta } from '../../../../core/enum/se-core-enum';

import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DATOS_MERCANCIA_MODAL_FORM, ENVASES_TABLA, INSUMOS_TABLA, MODAL_TABLA } from '../constante110101.enum';
import { DatosMercanciaModalTabla, EnvasesTabla, InsumosTabla } from '../../models/panallas110101.model';
import { DatosMercanciaService } from '../../services/datos-mercancia.service';

import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { INTRODUZCA_NUMERO, REQUERIDO } from '@libs/shared/data-access-user/src/tramites/constantes/mensajes-error-formularios';
import { Solicitante110101State, Tramite110101Store } from '../../estados/tramites/solicitante110101.store';
import { Subject,debounceTime,distinctUntilChanged,map, takeUntil } from 'rxjs';
import { AlertComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { Modal } from 'bootstrap';
import { Solicitante110101Query } from '../../estados/queries/solicitante110101.query';
import { TituloComponent } from '@ng-mf/data-access-user';
import { ValidacionesFormularioService } from '@ng-mf/data-access-user';
import mercancia from '@libs/shared/theme/assets/json/110101/mercancia.json'


/**
* Este componente se utiliza para mostrar la forma del datosdelamercancia. - 110101
* @param formMercancia: Forma del formMercancia
* @returns Validaciones del formulario
*/
@Component({
  selector: 'app-datos-mercancia',
  templateUrl: './datos-mercancia.component.html',
  styleUrl: './datos-mercancia.component.scss',
  standalone: true,
  imports: [TituloComponent, CommonModule, AlertComponent, ReactiveFormsModule, TablaDinamicaComponent, TablePaginationComponent, FormasDinamicasComponent, NotificacionesComponent]
})
export class DatosMercanciaComponent implements OnInit, OnDestroy {
  /**
     * Notificación actual que se muestra en el componente.
     *
     * Esta propiedad almacena los datos de la notificación que se mostrará al usuario.
     * Se utiliza para configurar el tipo, categoría, mensaje y otros detalles de la notificación.
     */
  public nuevaNotificacion!: Notificacion ;
  /**
   * Referencia al elemento modal para agregar mercancías.
   */
  @ViewChild('modalAgregar', { static: false }) modalElement!: ElementRef;

   /**
   * Referencia al elemento del modal para gestionar archivos.
   *
   * Se utiliza para abrir o cerrar el modal de archivos.
   */
  @ViewChild('modalArchivo') modalArchivo!: ElementRef;

  /**
   * Referencia al elemento del modal para gestionar archivos.
   *
   * Se utiliza para abrir o cerrar el modal de archivos.
   */
  @ViewChild('modalConfirmacion') modalConfirmacion!: ElementRef;

  /**
   * Formulario para gestionar los archivos adjuntos.
   *
   * Permite capturar y validar los datos relacionados con los archivos adjuntos.
   */
  public formularioArchivo: FormGroup = new FormGroup({
    archivo: new FormControl('', [Validators.required]),
  });
  /**
     * Tipo de selección utilizado en la tabla, definido como casillas de verificación (checkbox).
     * @type {TablaSeleccion}
     */
  public tipoSeleccionTabla = TablaSeleccion.CHECKBOX;

  /** Configuración de la tabla de sectores */
  public configuracionTablaInsumos: ConfiguracionColumna<InsumosTabla>[] = INSUMOS_TABLA;

  /** Configuración de la tabla de sectores */
  public configuracionTablaEnvases: ConfiguracionColumna<EnvasesTabla>[] = ENVASES_TABLA;

  /** Configuración de la tabla de sectores */
  public configuracionTabla: ConfiguracionColumna<DatosMercanciaModalTabla>[] = MODAL_TABLA;

  /**
   * @property listaSeleccionadasInsumos
   * @type {InsumosTabla[]}
   * @private
   * @description
   * Arreglo privado que almacena las filas seleccionadas en la tabla de pago de derechos.
   * Se utiliza para realizar operaciones como la eliminación de registros seleccionados por el usuario.
   */
  private listaSeleccionadasInsumos: InsumosTabla[] = [];

  /**
   * @property listaSeleccionadasEnvases
   * @type {EnvasesTabla[]}
   * @private
   * @description
   * Arreglo privado que almacena las filas seleccionadas en la tabla de pago de derechos.
   * Se utiliza para realizar operaciones como la eliminación de registros seleccionados por el usuario.
   */
  private listaSeleccionadasEnvases: EnvasesTabla[] = [];

  /** Un array de objetos `insumosTablaDatos` que representa los datos para la tabla de solicitudes.*/
  public insumosTablaDatos: InsumosTabla[] = [
    {
      nombreTecnico: 'Producto X',
      proveedor: 'Proveedor Y',
      fabricanteOProductor: 'Fabricante Z',
      rfc: 'RFC123456',
      fraccionArancelaria: '87654321',
      valorDeTransaccion: 5000 
    } ];

  /** Un array de objetos `envasesTablaDatos` que representa los datos para la tabla de solicitudes.*/
  public envasesTablaDatos: EnvasesTabla[] = [
    {
      nombreTecnico: 'Producto A',
      proveedor: 'Proveedor X',
      fabricanteOProductor: 'Fabricante Y',
      fraccionArancelaria: '12345678',
      valorEnDolares: 1000,
      paisDeOrigen: 'México'
    }
  ];

  /** Un array de objetos `tablaDatos` que representa los datos para la tabla de solicitudes.*/
  public tablaDatos: DatosMercanciaModalTabla[] = [
    { tratado: 'Tratado de Libre Comercio México-Asociación Europea de Libre Comercio', pais: 'Asociación Europea de Libre Comercio'}
  ];

  /**
   * Configuración de los campos que se muestran en el modal para agregar o editar datos de mercancía.
   * Esta propiedad utiliza la constante `DATOS_MERCANCIA_MODAL_FORM` para definir la estructura y validaciones de los campos del formulario modal.
   *
   * @type {any[]}
   * @public
   * @memberof DatosMercanciaComponent
   * @example
   * <ng-container *ngFor="let campo of modalFormaDatos"> ... </ng-container>
   */
  public modalFormaDatos = DATOS_MERCANCIA_MODAL_FORM;
  /**
   * compo doc
   * @type {FormGroup}
   * @memberof DatosMercanciaComponent
   * @description
   * Este es un formulario reactivo de Angular representado por un FormGroup.
   * Se utiliza para manejar y validar los datos del formulario en el componente.
   */
  public forma: FormGroup = new FormGroup({
    ninoFormGroup: new FormGroup({})
  });

  /**
  * compo doc
  * @getter ninoFormGroup
  * @description
  * Este getter devuelve el grupo de formularios anidado llamado `ninoFormGroup` 
  * dentro del formulario reactivo principal `forma`. 
  * Se utiliza para acceder y manipular los controles y valores específicos de este grupo de formularios.
  * 
  * @returns {FormGroup} El grupo de formularios `ninoFormGroup` como un objeto de tipo `FormGroup`.
  * 
  * @example
  * const grupo = this.ninoFormGroup;
  * grupo.get('campo').setValue('nuevo valor');
  */
  private fraccionSuscrito = false;

get ninoFormGroup(): FormGroup {
  const GRUPO = this.forma.get('ninoFormGroup') as FormGroup;

    if (GRUPO && !this.fraccionSuscrito) {
      const FRACCIONCONTROL = GRUPO.get('fraccionArancelaria');
      if (FRACCIONCONTROL) {
        FRACCIONCONTROL.valueChanges
          .pipe(
            debounceTime(500),
            distinctUntilChanged()
          )
          .subscribe(valor => {
            if (valor && valor.length >= 15) {
              this.consultaArancelariaPartida(valor);
            }
          });
        this.fraccionSuscrito = true; 
      }
    }
  return GRUPO;
}

  /**
   * Una cadena que representa la clase CSS para una alerta de advertencia.
   * Esta clase se utiliza para aplicar estilo a los mensajes de advertencia en el componente.
   */
  public warningAlert = 'alert-warning';

  /**
   * Un objeto que contiene los textos de alerta.
   * Este objeto se utiliza para mostrar mensajes de alerta en el componente.
   */
  public TEXTOS = ELVALORALERTA;
  /**
   * Una instancia de FormGroup que representa el formulario para Mercancia (bienes).
   * Este formulario se utiliza para capturar y validar los datos relacionados con Mercancia.
   */
  public formMercancia!: FormGroup;

  /**
   * **Subject para manejar la destrucción del componente**
   * 
   * Este `Subject` se utiliza para cancelar suscripciones y evitar 
   * fugas de memoria cuando el componente es destruido.
   * Se usa comúnmente en el operador `takeUntil` dentro de los observables.
   */
  private destroy$ = new Subject<void>();
  /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
   */
  public esFormularioSoloLectura: boolean = false;
  /**
   * Una constante que contiene la cadena de mensaje requerida.
   * Este mensaje se utiliza para indicar que un campo es obligatorio.
   */
  public MENSAJE_REQUERIDO = REQUERIDO;

  /**
   * Una constante que contiene el mensaje de error para el campo de número.
   * Este mensaje se utiliza para indicar que un campo debe ser un número.
   */
  public NUMERO_REQUERIDO = INTRODUZCA_NUMERO;
  /**
   * apiDatosDeRespuesta se utiliza para obtener datos del nombre de archivo JSON ficticio como mercancia.json
   */
  public apiDatosDeRespuesta = mercancia;
  /**
   * Representa el estado actual de la solicitud para el trámite 110101.
   * Esta propiedad contiene toda la información relevante sobre la solicitud del solicitante,
   * encapsulada en la interfaz `Solicitante110101State`.
   */
  public solicitudeState!: Solicitante110101State;

  /**
   * Título que se muestra en el modal para agregar mercancías.
   * Se actualiza dinámicamente según el tipo de mercancía seleccionada (insumos o envases).
   *
   * @type {string}
   * @default 'Insumo'
   * @example
   * this.modal = 'Insumos (materias primas, partes y piezas)';
   */
  public modal: string = 'Insumo';

  /**
   * Instancia del modal de Bootstrap utilizada para abrir y cerrar el diálogo de agregar o editar mercancías.
   * Se inicializa al abrir el modal y se utiliza para controlar su visibilidad desde el componente.
   *
   * @type {Modal}
   * @private
   * @memberof DatosMercanciaComponent
   * @example
   * this.modalInstance.show();
   * this.modalInstance.hide();
   */
  private modalInstance!: Modal;

  /**
 * constructor de la clase
 * Fetch the fetchtiposDocumentos datos
 * Crea el formulario
 * @param fb: constructor de formularios
 * @param validacionesService: Validaciones comunes del formulario.
 */
  constructor(private fb: FormBuilder,
    private validacionesService: ValidacionesFormularioService,
    private tramite110101Store: Tramite110101Store,
    private solicitanteQuery: Solicitante110101Query,
    private consultaioQuery: ConsultaioQuery,
    private datosMercanciaService: DatosMercanciaService
  ) {
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroy$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
          this.createFormMercancia();
        })
      )
      .subscribe();
  }

  /**
   * Método de ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Rellena el formulario con los datos de la API.
   */

  ngOnInit(): void {
     this.solicitanteQuery.selectSolicitante$.pipe(takeUntil(this.destroy$),map((seccionState) => {
        this.solicitudeState = seccionState;
      })).subscribe();
    this.createFormMercancia();
    this.getFormDatosDeMercancia();
  }

  /**
    * Crea un grupo de formularios reactivos para "Mercancia" con los siguientes controles:
    * - nombreComercial: Un campo de texto obligatorio.
    * - nombreIngles: Un campo de texto obligatorio.
    * - fraccionArancelaria: Un campo de texto con una longitud máxima de 8 caracteres y un validador de patrones para valores numéricos.
    * - descripcion: Un campo de texto opcional.
    * - valorTransaccion: Un campo de texto con una longitud máxima de 20 caracteres.
    */
  public createFormMercancia(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario();
    } else {
      this.inicializarFormulario();
    }

  }

  /**
   * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
   * Luego reinicializa el formulario con los valores actualizados desde el store.
   */
  public guardarDatosFormulario(): void {
    this.inicializarFormulario();
    if (this.esFormularioSoloLectura) {
      this.formMercancia.disable();
    } else if (!this.esFormularioSoloLectura) {
      this.formMercancia.enable();
    }
}

  /**
   * Inicializa el formulario reactivo `formMercancia` con los valores predeterminados de `solicitudeState`.
   * Configura los controles del formulario para nombre comercial, nombre en inglés, fracción arancelaria, descripción y valor de transacción,
   * aplicando los validadores apropiados como campos requeridos, longitud máxima y coincidencia de patrones.
   * El campo descripción se inicializa como deshabilitado.
   */
  public inicializarFormulario(): void {
    this.formMercancia = this.fb.group({
      nombreComercial: [this.solicitudeState?.nombreComercial, Validators.required],
      nombreIngles: [this.solicitudeState?.nombreIngles, Validators.required],
      fraccionArancelaria: [this.solicitudeState?.fraccionArancelaria, [Validators.maxLength(8), Validators.pattern(REGEX_SOLO_NUMEROS)]],
      descripcion: [{value: this.solicitudeState?.descripcion, disabled: true}],
      valorTransaccion: [this.solicitudeState?.valorTransaccion, Validators.maxLength(20)]
    });
  }

  /**
    * Rellena los campos del formulario en 'formMercancia' con datos de 'apiDatosDeRespuesta'.
    *
    * Este método establece los valores para los siguientes controles de formulario:
    * - 'fraccionArancelaria': Establece el valor de 'apiDatosDeRespuesta.fraccionArancelaria'.
    * - 'descripcion': Establece el valor de 'apiDatosDeRespuesta.descripcion'.
    * - 'valorTransaccion': Establece el valor de 'apiDatosDeRespuesta.valorTransaccion'.
    */
  public getFormDatosDeMercancia(): void {
    this.formMercancia.get('fraccionArancelaria')?.setValue(this.apiDatosDeRespuesta.fraccionArancelaria);
    this.formMercancia.get('descripcion')?.setValue(this.apiDatosDeRespuesta.descripcion);
    this.formMercancia.get('valorTransaccion')?.setValue(this.apiDatosDeRespuesta.valorTransaccion);
  }

  /**
   * Establece el valor de un campo en el store de Tramite31601.
   * @param form - El grupo de formularios que contiene el campo.
   * @param campo - El nombre del campo cuyo valor se va a establecer.
   * @param metodoNombre - El nombre del método en el store que se utilizará para establecer el valor.
   */
  public setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite110101Store): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite110101Store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /**
 * Metodo para saber si el campo del formulario es valido.
 * @param field El nombre del campo del formulario que se va a validar.
 * @returns {boolean | null} : Regresa un booleano si el campo es valido o no o puede regresar null si no se ha tocado el campo.
 */
  isValid(field: string): boolean | null {
    return this.validacionesService.isValid(this.formMercancia, field);
  }

  /**
   * @method listaDeFilaSeleccionadaInsumos
   * @description
   * Actualiza el arreglo de filas seleccionadas en la tabla de pago de derechos.
   * Este método se utiliza para almacenar las filas seleccionadas por el usuario,
   * permitiendo realizar operaciones como la eliminación de registros.
   *
   * @param {InsumosTabla[]} event - Arreglo de filas seleccionadas.
   */
  listaDeFilaSeleccionadaInsumos(event: InsumosTabla[]): void {
    this.listaSeleccionadasInsumos = [];
    this.listaSeleccionadasInsumos = event;
  }

  /**
   * @method listaDeFilaSeleccionadaEnvases
   * @description
   * Actualiza el arreglo de filas seleccionadas en la tabla de pago de derechos.
   * Este método se utiliza para almacenar las filas seleccionadas por el usuario,
   * permitiendo realizar operaciones como la eliminación de registros.
   *
   * @param {EnvasesTabla[]} event - Arreglo de filas seleccionadas.
   */
  listaDeFilaSeleccionadaEnvases(event: EnvasesTabla[]): void {
    this.listaSeleccionadasEnvases = [];
    this.listaSeleccionadasEnvases = event;
  }

  /**
   * Abre el modal para agregar mercancías.
   */
  abrirDialogo(event: string): void {
    this.modal = event;
    if (this.modalElement) {
      this.modalInstance = new Modal(this.modalElement.nativeElement);
      this.modalInstance?.show();
    }
  }

  /**
   * Cierra el modal de agregar o editar mercancías.
   * Utiliza la instancia del modal de Bootstrap para ocultar el diálogo actualmente abierto.
   *
   * @example
   * this.cerrarDialogo();
   * // El modal se oculta.
   */
  cerrarDialogo(): void {
    this.modalInstance?.hide();
  }

  /**
   * Limpia y restablece todos los campos del formulario principal `forma` a su estado inicial.
   * Este método se utiliza para borrar los datos ingresados por el usuario y dejar el formulario listo para una nueva captura.
   *
   * @example
   * this.limpiarDialogo();
   * // El formulario se restablece a sus valores iniciales.
   */
  limpiarDialogo(): void {
    this.forma.reset();
  }
  
  /**
   * Agrega o actualiza un registro en la tabla de insumos o envases según el tipo de modal abierto.
   * Si el formulario es válido, busca si el elemento ya existe en la tabla (por nombre técnico).
   * Si existe, lo actualiza; si no, lo agrega como nuevo.
   * Para insumos, toma el valor de transacción desde el formulario principal.
   * Para envases, toma el valor en dólares desde el grupo de formulario de envases.
   * Al finalizar, cierra el diálogo. Si el formulario no es válido, marca todos los campos como tocados.
   *
   * @example
   * this.agregar();
   * // Agrega o actualiza el registro en la tabla correspondiente.
   */

  agregar(): void {
    if (this.ninoFormGroup.valid) {
      if (this.modal === 'Insumo') {
        this.insumosTablaDatos.push({
          nombreTecnico: this.ninoFormGroup.get('nombreTecnico')?.value,
          proveedor: this.ninoFormGroup.get('proveedor')?.value,
          fabricanteOProductor: this.ninoFormGroup.get('fabricanteProductor')?.value,
          fraccionArancelaria: this.ninoFormGroup.get('fraccionArancelaria')?.value,
          rfc: 'valor ficitio',
          valorDeTransaccion: this.formMercancia.get('valorTransaccion')?.value,
        });
      } else {
        this.envasesTablaDatos.push({
          nombreTecnico: this.ninoFormGroup.get('nombreTecnico')?.value,
          proveedor: this.ninoFormGroup.get('proveedor')?.value,
          fabricanteOProductor: this.ninoFormGroup.get('fabricanteProductor')?.value,
          fraccionArancelaria: this.ninoFormGroup.get('fraccionArancelaria')?.value,
          paisDeOrigen: 'valor ficitio',
          valorEnDolares: this.ninoFormGroup.get('valorDolares')?.value,
        });
      }
      this.cerrarDialogo();
    } else {
      this.ninoFormGroup.markAllAsTouched();
    }
  }

  /**
   * @method consultaArancelariaPartida
   * @description Consulta la fracción arancelaria de una partida específica. 
   * Utiliza el servicio `DatosMercanciaService` para realizar la consulta.
   * Si la respuesta es exitosa, actualiza los campos del formulario `ninoFormGroup` con los datos obtenidos.
   * En caso de error, muestra una notificación con el mensaje correspondiente.
   * 
   */
  consultaArancelariaPartida(valor: string): void {
    this.datosMercanciaService.getFraccionArancelariaPartida(valor)
    .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response.codigo === CodigoRespuesta.EXITO) {
            this.ninoFormGroup.patchValue({
            capitulo: response.datos?.cve_capitulo_fraccion,
            descripcionCapitulo: response.datos?.nombre_capitulo,
            partida: response.datos?.cve_partida_fraccion,
            descripcionPartida: response.datos?.nombre_partida,
            subpartida: response.datos?.cve_subpartida_fraccion,
            descripcionSubpartida: response.datos?.nombre_subpartida,
            descripcionFraccionArancelaria: response.datos?.descripcion,
          })
        }else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          this.nuevaNotificacion = {
            tipoNotificacion: 'toastr',
            categoria: CategoriaMensaje.ERROR,
            modo: 'action',
            titulo: response.error || 'Error en la consulta de la fracción arancelaria.',
            mensaje: response.causa || response.mensaje || 'Error en la consulta de la fracción arancelaria.',
            cerrar: false,
            txtBtnAceptar: '',
            txtBtnCancelar: '',
          };
        }
      },
      error: (error) => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        const MENSAJE = error?.error?.error || 'Error en la consulta de la fracción arancelaria.';
        this.nuevaNotificacion = {
          tipoNotificacion: 'toastr',
          categoria: CategoriaMensaje.ERROR,
          modo: 'action',
          titulo: '',
          mensaje: MENSAJE,
          cerrar: false,
          txtBtnAceptar: '',
          txtBtnCancelar: '',
        };
      }
    });
  }

  /**
   * Muestra el modal para cargar un archivo.
   *
   * Este método utiliza el modal de Bootstrap para mostrar el modal de carga de archivos.
   */
  cargaArchivo(): void {
    if (this.modalArchivo) {
      const MODAL_INSTANCE = new Modal(this.modalArchivo.nativeElement);
      MODAL_INSTANCE.show();
    }
  }

  /**
   * Verifica si un control de formulario es inválido, está tocado o ha sido modificado.
   * @param campo - El nombre del control de formulario a verificar.
   * @returns Verdadero si el control es inválido, de lo contrario, falso.
   */
  // eslint-disable-next-line class-methods-use-this
  public esInvalido(formgrupo: FormGroup, campo: string): boolean {
    const CONTROL = formgrupo.get(campo);
    return CONTROL ? CONTROL.invalid && (CONTROL.touched || CONTROL.dirty) : false;
  }
/**
   * Abre el formulario de edición para insumos o envases según el evento recibido.
   * Si no hay elementos seleccionados en la tabla correspondiente, muestra un modal de confirmación.
   * Si hay selección, llena el formulario `ninoFormGroup` con los datos del primer elemento seleccionado
   * y abre el diálogo de edición.
   *
   * @param {string} event - Indica si se va a modificar un "Insumo" o un "Envase".
   */
  modificar(event: string): void {
    this.modal = event;
    if (event === 'Insumo') {
      if (!this.listaSeleccionadasInsumos.length) {
        const MODAL_INSTANCE = new Modal(this.modalConfirmacion.nativeElement);
        MODAL_INSTANCE.show();
        return;
      }
      this.ninoFormGroup.patchValue({
        nombreTecnico: this.listaSeleccionadasInsumos?.[0]?.nombreTecnico,
        fraccionArancelaria: this.listaSeleccionadasInsumos?.[0]?.fraccionArancelaria,
        proveedor: this.listaSeleccionadasInsumos?.[0]?.proveedor,
        fabricanteProductor: this.listaSeleccionadasInsumos?.[0]?.fabricanteOProductor,
        valorDolares: this.listaSeleccionadasInsumos?.[0]?.valorDeTransaccion,
      })
    } else {
      if (!this.listaSeleccionadasEnvases.length) {
        const MODAL_INSTANCE = new Modal(this.modalConfirmacion.nativeElement);
        MODAL_INSTANCE.show();
        return;
      }
      this.ninoFormGroup.patchValue({
        nombreTecnico: this.listaSeleccionadasEnvases?.[0]?.nombreTecnico,
        fraccionArancelaria: this.listaSeleccionadasEnvases?.[0]?.fraccionArancelaria,
        proveedor: this.listaSeleccionadasEnvases?.[0]?.proveedor,
        fabricanteProductor: this.listaSeleccionadasEnvases?.[0]?.fabricanteOProductor,
        valorDolares: this.listaSeleccionadasEnvases?.[0]?.valorEnDolares,
      })
    }
    if (event) {
      this.abrirDialogo(event);
    }
  }

  /**
   * Elimina los elementos seleccionados de la tabla de insumos o envases según el evento recibido.
   * Si no hay elementos seleccionados, muestra un modal de confirmación.
   * Si hay selección, elimina cada elemento seleccionado del arreglo correspondiente.
   *
   * @param {string} event - Indica si se va a eliminar un "Insumo" o un "Envase".
   */
  eliminar(event: string): void {
    this.modal = event;
    if (event === 'Insumo') {
      if (!this.listaSeleccionadasInsumos.length) {
        const MODAL_INSTANCE = new Modal(this.modalConfirmacion.nativeElement);
        MODAL_INSTANCE.show();
        return;
      }
      this.listaSeleccionadasInsumos.forEach((ele: InsumosTabla) => {
        const INDICE = this.insumosTablaDatos.findIndex((item: InsumosTabla) => item.nombreTecnico === ele.nombreTecnico);
        if (INDICE !== -1) {
          this.insumosTablaDatos.splice(INDICE, 1);
        }
      })
    } else {
      if (!this.listaSeleccionadasEnvases.length) {
        const MODAL_INSTANCE = new Modal(this.modalConfirmacion.nativeElement);
        MODAL_INSTANCE.show();
        return;
      }
      this.listaSeleccionadasEnvases.forEach((ele: EnvasesTabla) => {
        const INDICE = this.envasesTablaDatos.findIndex((item: EnvasesTabla) => item.nombreTecnico === ele.nombreTecnico);
        if (INDICE !== -1) {
          this.envasesTablaDatos.splice(INDICE, 1);
        }
      })
    }
  }

  /**
   * **Limpia los recursos y finaliza las suscripciones al destruir el componente**
   * 
   * - `this.destroy$.next();` emite un valor para notificar a los observables dependientes que deben completarse.
   * - `this.destroy$.complete();` finaliza el `Subject` para liberar memoria y evitar fugas de memoria.
   * - Este método se ejecuta automáticamente cuando el componente se destruye, asegurando una gestión eficiente de las suscripciones.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
