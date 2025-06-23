import {
  Catalogo,
  MSG_ELIMINA_ELEMENTO,
  MSG_SELECCIONA_REGISTRO,
  Notificacion,
  NotificacionesComponent,
  SoloNumerosDirective,
  TEXTO_CERRAR,
  TipoPedimentoService,
} from '@ng-mf/data-access-user';
import {
  ColumnMode,
  NgxDatatableModule,
  SelectionType,
} from '@swimlane/ngx-datatable';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  forwardRef,
  output,
} from '@angular/core';
import {
  DatosComponentePedimento,
  Pedimento,
} from '../../../../core/models/5701/tramite5701.model';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import {
  MSG_ERROR_NO_PEDIMENTOS,
  MSG_NRO_PEDIMENTO,
  MSG_NRO_PEDIMENTO_LLENAR_DATOS,
  MSG_PEDIMENTO_EXISTE_PREVIO,
  MSG_PEDIMENTO_EXISTE_YA_PAGADO,
  MSG_PEDIMENTO_NO_VALIDO,
  MSG_PEDIMENTO_YA_CAPTURADO,
} from '../../../../core/enums/5701/mensajes-modal-5701.enum';

import {
  Solicitud5701State,
  Tramite5701Store,
} from '../../../../core/estados/tramites/tramite5701.store';
import { Subject, map, takeUntil } from 'rxjs';
import { BodyEstadoPedimento } from '../../../../core/models/5701/pedimento.model';
import { CommonModule } from '@angular/common';
import { EstadoPedimentoService } from '../../../../core/services/5701/pedimento/estado-pedimento.service';
import { TITULO_MODAL_AVISO } from '@libs/shared/data-access-user/src/tramites/constantes/terceros.enums';
import { ToastrService } from 'ngx-toastr';
import { Tramite5701Query } from '../../../../core/queries/tramite5701.query';
@Component({
  selector: 'c-pedimento',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    forwardRef(() => SoloNumerosDirective),
    NotificacionesComponent,
    NgxDatatableModule,
  ],
  templateUrl: './pedimento.component.html',
  styleUrl: './pedimento.component.scss',
  providers: [ToastrService],
})
export class PedimentoComponent implements OnInit, OnChanges, OnDestroy {
  /**
   * @description Propiedades de entrada del componente.
   * @param validacion: Indica si la validación es correcta.
   */
  @Input({ required: true }) validacion!: boolean | undefined;

  /**
   * @description Propiedades de entrada del componente.
   * @param datosNroPedimento: Datos del número de pedimento.
   * patente: numero
   * idAduanaDespacho: numero
   */
  @Input({ required: true }) datosNroPedimento!: DatosComponentePedimento;

  /**
   * @description Datos de la tabla de pedimentos.
   */
  @Input() tablaPedimento!: Pedimento[];

  /**
   * @description Emisor de eventos para la tabla de pedimentos.
   * Se utiliza para emitir los datos de la tabla de pedimentos al componente padre.
   */
  @Output() datosTablaPedimento: EventEmitter<Pedimento[]> = new EventEmitter();

  /**
   * @description Estado de la solicitud 5701.
   */
  public solicitudState!: Solicitud5701State;

  /**
   * @description Subject para manejar la destrucción del componente y limpiar las suscripciones.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * @description Emisor de eventos para validar los campos del formulario.
   * Se utiliza para emitir un evento cuando se requiere validar los campos del formulario.
   */
  validaCampos = output<void>();

  /**
   * @description Formulario reactivo para el componente de pedimento.
   * Se utiliza para manejar la validación y los valores del formulario.
   */
  pedimentoForm: FormControl = new FormControl('', [Validators.maxLength(7)]);

  /**
   * @description Array con los datos de los pedimentos.
   * Se utiliza para almacenar los pedimentos ingresados por el usuario.
   */
  pedimentos: Pedimento[] = [];

  /**
   * @descripcion Notificación para mostrar mensajes al usuario.
   */
  public nuevaNotificacion!: Notificacion;

  /**
   * @description Tipos de pedimento disponibles.
   */
  tiposPedimento: Catalogo[] = [];

  /**
   * @description Lista de pedimentos seleccionados en la tabla.
   * Se utiliza para almacenar los pedimentos que han sido seleccionados por el usuario en la tabla.
   */
  selected: Pedimento[] = [];

  /**
   * @description Tipo de selección para la tabla de pedimentos.
   * Se utiliza para definir el tipo de selección en la tabla de pedimentos.
   */
  SelectionType = SelectionType;

  /**
   * @description Objeto para manejar la edición de celdas en la tabla de pedimentos.
   * Se utiliza para determinar si una celda está en modo de edición.
   */
  editar: { [key: string]: boolean } = {};

  /**
   * @description Modo de visualización de columnas en la tabla de pedimentos.
   * Se utiliza para definir el modo de visualización de las columnas en la tabla de pedimentos.
   */
  ColumnMode = ColumnMode;

  mensajes = {
    emptyMessage: 'No hay datos disponibles',
  };
  constructor(
    private tramite5701Query: Tramite5701Query,
    private tramite5701Store: Tramite5701Store,
    private estadoPedimentoService: EstadoPedimentoService,
    private tipoPedimentoService: TipoPedimentoService
  ) {}

  ngOnInit(): void {
    this.getTiposPedimento();
    this.tramite5701Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((solicitudState) => {
          this.solicitudState = solicitudState;
        })
      )
      .subscribe();
  }

  /**
   * Obtiene los tipos de pedimento disponibles y los almacena en una variable.
   */
  getTiposPedimento(): void {
    this.tipoPedimentoService
      .getListaTipoPedimento()
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((response) => {
          if (response.datos.length > 0) {
            this.tiposPedimento = response.datos;
          } else {
            this.tiposPedimento = [];
          }
        })
      )
      .subscribe();
  }

  /**
   * Verifica si el formulario de pedimento es válido.
   *
   * @returns {boolean | null} - Devuelve `true` si el formulario tiene errores y ha sido tocado,
   *                             `false` si no tiene errores o no ha sido tocado,
   *                             o `null` si no se puede determinar.
   */
  get isValid(): boolean | null {
    return this.pedimentoForm.errors && this.pedimentoForm.touched;
  }

  /**
   * Método del ciclo de vida de Angular que se llama cuando uno o más valores de las propiedades de entrada de un componente cambian.
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tablaPedimento'] && changes['tablaPedimento'].currentValue) {
      this.pedimentos = [...changes['tablaPedimento'].currentValue];
    }

    if (changes['validacion']) {
      this.validacion = changes['validacion'].currentValue;
      this.acciones();
    }

    if (changes['datosNroPedimento']) {
      this.datosNroPedimento = changes['datosNroPedimento'].currentValue;
    }
  }

  /**
   * Agrega un nuevo pedimento.
   *
   * Esta función emite un evento para validar los campos y luego ejecuta las acciones correspondientes.
   *
   * @returns {void} No retorna ningún valor.
   */
  agregaPedimento(): void {
    this.validaCampos.emit();
    if (this.validacion) {
      this.acciones();
    }
  }

  /**
   * Realiza las acciones necesarias para validar y agregar un pedimento.
   *
   * - Si `this.validacion` es verdadero:
   *   - Obtiene el número de pedimento desde el formulario.
   *   - Si el número de pedimento es diferente de 0:
   *     - Crea un objeto `PEDIMENTO` con los datos necesarios.
   *     - Muestra un modal con un mensaje de aviso y agrega el pedimento a la tabla.
   *   - Si el número de pedimento es 0:
   *     - Muestra un modal con un mensaje de aviso indicando que el número de pedimento no es válido.
   * @returns {void}
   */
  acciones(): void {
    if (this.validacion) {
      const NUMERO_PEDIMENTO = this.pedimentoForm.value
        ? parseInt(this.pedimentoForm.value, 10)
        : 0;

      switch (NUMERO_PEDIMENTO) {
        case 0:
          this.nuevaNotificacion = {
            tipoNotificacion: 'alert',
            categoria: 'danger',
            modo: 'action',
            titulo: 'Avisos',
            mensaje: MSG_NRO_PEDIMENTO,
            cerrar: false,
            txtBtnAceptar: 'Cerrar',
            txtBtnCancelar: '',
          };
          break;

        default: {
          const PEDIMENTOS_VALIDOS = this.pedimentos.every(
            (item) => item.tipoPedimento !== 0 && item.numero !== ''
          );
          const PEDIMENTO_EXISTE = this.pedimentos.some(
            (item) => item.pedimento === NUMERO_PEDIMENTO
          );

          if (this.pedimentos.length > 0 && !PEDIMENTOS_VALIDOS) {
            this.nuevaNotificacion = {
              tipoNotificacion: 'alert',
              categoria: 'danger',
              modo: 'action',
              titulo: TITULO_MODAL_AVISO,
              mensaje: MSG_NRO_PEDIMENTO_LLENAR_DATOS,
              cerrar: false,
              txtBtnAceptar: TEXTO_CERRAR,
              txtBtnCancelar: '',
            };
            return;
          }

          if (this.pedimentos.length > 0 && PEDIMENTO_EXISTE) {
            this.nuevaNotificacion = {
              tipoNotificacion: 'alert',
              categoria: 'danger',
              modo: 'action',
              titulo: TITULO_MODAL_AVISO,
              mensaje: MSG_PEDIMENTO_YA_CAPTURADO,
              cerrar: false,
              txtBtnAceptar: TEXTO_CERRAR,
              txtBtnCancelar: '',
            };
          }

          const BODY: BodyEstadoPedimento = {
            aduana: parseInt(this.solicitudState.idAduanaDespacho, 10),
            patente: 23424,
            pedimento: parseInt(this.pedimentoForm.value, 10),
          };

          this.estadoPedimentoService
            .postEstadoPedimento(BODY)
            .pipe(
              takeUntil(this.destroyNotifier$),
              map((response) => {
                switch (response.codigo) {
                  case '00':
                    {
                      const PEDIMENTO: Pedimento = {
                        idPedimento: 0,
                        patente: response.datos.patente,
                        pedimento: response.datos.pedimento,
                        aduana: response.datos.aduana,
                        tipoPedimento: 0,
                        estadoPedimento: response.datos.estado_pedimento,
                        subEstadoPedimento: response.datos.sub_estado_pedimento,
                        descTipoPedimento: 'Por evaluar',
                        numero: '',
                        comprobanteValor: '',
                        pedimentoValidado: response.datos.pedimento_valido,
                      };

                      this.nuevaNotificacion = {
                        tipoNotificacion: 'alert',
                        categoria: 'success',
                        modo: 'action',
                        titulo: TITULO_MODAL_AVISO,
                        mensaje: MSG_PEDIMENTO_NO_VALIDO,
                        cerrar: false,
                        txtBtnAceptar: TEXTO_CERRAR,
                        txtBtnCancelar: '',
                      };

                      this.pedimentos.push(PEDIMENTO);
                      this.pedimentoForm.reset();
                      this.datosTablaPedimento.emit(this.pedimentos);
                    }
                    break;
                  default:
                    this.nuevaNotificacion = {
                      tipoNotificacion: 'alert',
                      categoria: 'danger',
                      modo: 'action',
                      titulo: 'Avisos',
                      mensaje: MSG_PEDIMENTO_NO_VALIDO,
                      cerrar: false,
                      txtBtnAceptar: 'Aceptar',
                      txtBtnCancelar: '',
                    };
                    break;
                }
              })
            )
            .subscribe();
          break;
        }
      }
    }
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
  abrirModalEliminar(): void {
    if (this.pedimentos.length === 0) {
      this.nuevaNotificacion = {
        tipoNotificacion: 'alert',
        categoria: 'danger',
        modo: 'action',
        titulo: TITULO_MODAL_AVISO,
        mensaje: MSG_ERROR_NO_PEDIMENTOS,
        cerrar: false,
        txtBtnAceptar: TEXTO_CERRAR,
        txtBtnCancelar: '',
      };
      return;
    }
    
    if (this.selected.length === 0) {
      this.nuevaNotificacion = {
        tipoNotificacion: 'alert',
        categoria: 'danger',
        modo: 'action',
        titulo: TITULO_MODAL_AVISO,
        mensaje: MSG_SELECCIONA_REGISTRO,
        cerrar: false,
        txtBtnAceptar: TEXTO_CERRAR,
        txtBtnCancelar: '',
      };
      return;
    }

    this.pedimentos = this.pedimentos.filter(
      (pedimento) => !this.selected.includes(pedimento)
    );

    this.nuevaNotificacion = {
      tipoNotificacion: 'alert',
      categoria: '',
      modo: 'action',
      titulo: TITULO_MODAL_AVISO,
      mensaje: MSG_ELIMINA_ELEMENTO,
      cerrar: false,
      txtBtnAceptar: 'Cerrar',
      txtBtnCancelar: '',
    };

    this.datosTablaPedimento.emit(this.pedimentos);
  }

  /**
   * Método para establecer valores en el store de Tramite5701.
   * @param form - Formulario del componente.
   * @param campo - Campo del formulario cuyo valor se desea establecer.
   * @param metodoNombre - Nombre del método en el store que se utilizará para establecer el valor.
   * @returns {void}
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite5701Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite5701Store[metodoNombre] as (value: string) => void)(VALOR);
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
   * Notifica y completa el observable `destroyNotifier$` para limpiar suscripciones.
   * @returns {void}
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

  //Metodos para el checkbox
  /**
   * Método que se ejecuta cuando se selecciona un pedimento en la tabla.
   * Actualiza la lista de pedimentos seleccionados.
   * @param { selected } - Objeto que contiene los pedimentos seleccionados.
   * @returns {void}
   */
  onSelect({ selected }: { selected: Pedimento[] }): void {
    if (selected && selected.length > 0) {
      this.selected.splice(0, this.selected.length);
      this.selected.push(...selected);
    }
  }

  /**
   * Método para actualizar el valor de una celda en la tabla de pedimentos.
   * Este método se ejecuta cuando se edita una celda en la tabla.
   * @param {Event} event - El evento que se dispara al editar la celda.
   * @param { string } cell - El nombre de la celda que se está editando.
   * @param { number } rowIndex - El índice de la fila que contiene la celda que se está editando.
   * @returns {void}
   */
  actualizarValor(event: Event, cell: string, rowIndex: number): void {
    const TARGET = event.target as HTMLInputElement;
    
    this.editar[`${rowIndex}-${cell}`] = false;

    if (cell === 'descTipoPedimento' || cell === 'numero' || cell === 'comprobanteValor') {
      this.pedimentos[rowIndex][cell] = TARGET.value;
      if (cell === 'descTipoPedimento') {
        const TIPO_PEDIMENTO = this.tiposPedimento.find(
          (tipo) => tipo.descripcion === TARGET.value
        );

        if (TIPO_PEDIMENTO) {
          this.pedimentos[rowIndex].tipoPedimento = TIPO_PEDIMENTO.id;
          this.pedimentos[rowIndex].numero = '';
          this.pedimentos[rowIndex].comprobanteValor = '';

          if (TIPO_PEDIMENTO.id) {
            if (TIPO_PEDIMENTO.id !== 4) {
              this.nuevaNotificacion = {
                tipoNotificacion: 'alert',
                categoria: 'success',
                modo: 'action',
                titulo: TITULO_MODAL_AVISO,
                mensaje: MSG_PEDIMENTO_EXISTE_YA_PAGADO,
                cerrar: false,
                txtBtnAceptar: TEXTO_CERRAR,
                txtBtnCancelar: '',
              };
            } else {
              this.nuevaNotificacion = {
                tipoNotificacion: 'alert',
                categoria: 'danger',
                modo: 'action',
                titulo: TITULO_MODAL_AVISO,
                mensaje: MSG_PEDIMENTO_EXISTE_PREVIO,
                cerrar: false,
                txtBtnAceptar: TEXTO_CERRAR,
                txtBtnCancelar: '',
              };
            }
          }
        }
      }
    }

    this.pedimentos = [...this.pedimentos];
  }

  /**
   * @description Método para editar una celda en la tabla de pedimentos.
   * @param rowIndex - El índice de la fila que contiene el pedimento a editar.
   * @returns {void}
   */
  editarCelda(rowIndex: number): void {
    const TIPO_PEDIMENTO = this.pedimentos[rowIndex].tipoPedimento;
    switch (TIPO_PEDIMENTO) {
      case 4:
        this.editar[rowIndex + `-comprobanteValor`] = true;

        break;
      case 0:
        this.editar[rowIndex + `-numero`] = false;
        break;
      default:
        this.editar[rowIndex + `-numero`] = true;

        break;
    }
  }
}
