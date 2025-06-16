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
  ERR_VALIDACION_PEDIMENTO,
  MSG_ELIMINA_ELEMENTO,
  MSG_NRO_PEDIMENTO,
} from '../../../../core/enums/5701/tramite5701.enum';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  Catalogo,
  Notificacion,
  NotificacionesComponent,
  SoloNumerosDirective,
  TipoPedimentoService,
} from '@ng-mf/data-access-user';
import {
  Solicitud5701State,
  Tramite5701Store,
} from '../../../../core/estados/tramites/tramite5701.store';
import { Subject, map, takeUntil } from 'rxjs';
import { BodyEstadoPedimento } from '../../../../core/models/5701/pedimento.model';
import { CommonModule } from '@angular/common';
import { EstadoPedimentoService } from '../../../../core/services/5701/pedimento/estado-pedimento.service';
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
   * @description Array con los encabezados de la tabla de pedimentos.
   * Se utiliza para mostrar los encabezados de las columnas en la tabla de pedimentos.
   */
  hTabla: Array<string> = [
    'Patente',
    'Pedimento',
    'Aduana',
    'Tipo de pedimento',
    'Número(s)',
    'Comprobante de valor',
    'Pedimento validado',
  ];

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

  //Checkbox para editar
  selected: Pedimento[] = [];
  SelectionType = SelectionType;

  editar: { [key: string]: boolean } = {};
  ColumnMode = ColumnMode;

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
                      mensaje: ERR_VALIDACION_PEDIMENTO,
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
  abrirModalEliminar(i: number = 0): void {
    this.pedimentos.splice(i, 1);
    this.datosTablaPedimento.emit(this.pedimentos);
    this.nuevaNotificacion = {
      tipoNotificacion: 'alert',
      categoria: 'danger',
      modo: 'action',
      titulo: 'Avisos',
      mensaje: MSG_ELIMINA_ELEMENTO,
      cerrar: false,
      txtBtnAceptar: 'Cerrar',
      txtBtnCancelar: '',
    };
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
  onActivate(event: any): void {
    console.log('Activate Event', event);
  }

  onSelect({ selected }: { selected: Pedimento[] }): void {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  actualizarValor(event: Event, cell: string, rowIndex: number): void {
    const target = event.target as HTMLInputElement;
    console.log('inline editing rowIndex', rowIndex);
    this.editar[`${rowIndex}-${cell}`] = false;

    // console.log(this.pedimentos[rowIndex][cell]);

    // this.pedimentos[rowIndex][cell] = target.value;

    this.pedimentos = [...this.pedimentos];
    // console.log('UPDATED!', this.pedimentos[rowIndex][cell]);
  }
}
