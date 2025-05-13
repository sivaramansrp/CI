import { BooleanoSiNoPipe, Notificacion, NotificacionesComponent, SoloNumerosDirective, } from '@ng-mf/data-access-user';
import { Component, ElementRef, forwardRef, Input, OnChanges, OnDestroy, OnInit, output, SimpleChanges, ViewChild, } from '@angular/core';
import { DatosComponentePedimento, Pedimento } from '../../../../core/models/5701/tramite5701.model';
import { ERR_VALIDACION_PEDIMENTO, MSG_ADUANA_PEDIMENTO, MSG_ELIMINA_ELEMENTO, MSG_NRO_PEDIMENTO } from '../../../../core/enums/5701/tramite5701.enum';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { map, Subject, takeUntil } from 'rxjs';
import { Solicitud5701State, Tramite5701Store } from '../../../../core/estados/tramites/tramite5701.store';
import { BodyEstadoPedimento } from '../../../../core/models/5701/pedimento.model';
import { CommonModule } from '@angular/common';
import { EstadoPedimentoService } from '../../../../core/services/5701/pedimento/estado-pedimento.service';
import { ToastrService } from 'ngx-toastr';
import { Tramite5701Query } from '../../../../core/queries/tramite5701.query';

@Component({
  selector: 'c-pedimento',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, forwardRef(() => BooleanoSiNoPipe), forwardRef(() => SoloNumerosDirective), NotificacionesComponent],
  templateUrl: './pedimento.component.html',
  styleUrl: './pedimento.component.scss',
  providers: [
    ToastrService,
  ]
})
export class PedimentoComponent implements OnInit, OnChanges, OnDestroy {
  /**
   * @description Propiedades de entrada del componente.
   * @param validacion: Indica si la validación es correcta.
   */
  @Input({ required: true }) validacion!: boolean;

  /**
   * @description Propiedades de entrada del componente.
   * @param datosNroPedimento: Datos del número de pedimento.
   * patente: numero
   * idAduanaDespacho: numero
   */
  @Input({ required: true }) datosNroPedimento!: DatosComponentePedimento;


  @ViewChild('aviso') AvisoModal!: ElementRef;
  @ViewChild('closeModal') closeModal!: ElementRef;

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
    'Comprobante Valor',
    'Pedimento Validado',
    'Accion',
  ];

  /**
   * @description Array con los datos de los pedimentos.
   * Se utiliza para almacenar los pedimentos ingresados por el usuario.
   */
  pedimentos: Array<Pedimento> = [];

  tituloModal!: string;
  mensajeModal!: string;

  /**
   * @description Elemento a eliminar de la tabla de pedimentos.
   */
  elementoParaEliminar!: number;

  /**
   * @descripcion Notificación para mostrar mensajes al usuario.
   */
  public nuevaNotificacion!: Notificacion;

  constructor(
    private tramite5701Query: Tramite5701Query,
    private tramite5701Store: Tramite5701Store,
    private estadoPedimentoService: EstadoPedimentoService,
  ) { }

  ngOnInit(): void {
    this.tramite5701Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((solicitudState) => {
          this.solicitudState = solicitudState;
        })
      ).subscribe();
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
   * 
   * @param changes - Un objeto de tipo `SimpleChanges` que contiene los cambios en las propiedades de entrada. Cada clave es el nombre de una propiedad de entrada y su valor es un objeto `SimpleChange` que contiene las propiedades `currentValue` y `previousValue`.
   * 
   * - `validacion`: Si esta propiedad cambia, se actualiza el valor de `this.validacion` con el valor actual.
   * - `datosNroPedimento`: Si esta propiedad cambia, se actualiza el valor de `this.datosNroPedimento` con el valor actual.
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['validacion']) {
      this.validacion = changes['validacion'].currentValue;
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
    console.log('prueba de la api');
    
    const BODY : BodyEstadoPedimento = {
      aduana: 1234,
      patente: 4567,
      pedimento: 7890
    }
    this.estadoPedimentoService.postEstadoPedimento(BODY).pipe(
      takeUntil(this.destroyNotifier$),
      map((response) => {
        console.log(response);
      })
    ).subscribe();


    // this.validaCampos.emit();
    // if (this.validacion) {
    //   this.acciones();
    // }

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
   * - Si `this.validacion` es falso:
   *   - Muestra un modal con un mensaje de aviso indicando que la aduana del pedimento no es válida.
   * 
   * @returns {void}
   */
  acciones(): void {
    if (this.validacion) {
      const NUMERO_PEDIMENTO = this.pedimentoForm.value
        ? parseInt(this.pedimentoForm.value, 10)
        : 0;
      if (NUMERO_PEDIMENTO !== 0) {
        const PEDIMENTO = {
          patente: this.datosNroPedimento.patente,
          pedimento: NUMERO_PEDIMENTO,
          aduana: this.datosNroPedimento.idAduanaDespacho,
          idTipoPedimento: 0,
          descTipoPedimento: 'Por evaluar',
          numero: '',
          comprobanteValor: '',
          pedimentoValidado: false,
        };

        // Aqui se debe validar el pedimento a un endpoint, si no se encuentra se manda un aviso con modal y se agrega el pedimento a la tabla.
        this.tituloModal = 'Aviso';
        this.mensajeModal = ERR_VALIDACION_PEDIMENTO;
        this.abrirModal();
        this.pedimentos.push(PEDIMENTO);
      } else {
        this.tituloModal = 'Aviso';
        this.mensajeModal = MSG_NRO_PEDIMENTO;
        this.abrirModal();
      }

    } else {
      this.tituloModal = 'Aviso';
      this.mensajeModal = MSG_ADUANA_PEDIMENTO;
      this.abrirModal();
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
  abrirModal(i: number = 0): void {
    this.nuevaNotificacion = {
      tipoNotificacion: 'alert',
      categoria: 'danger',
      modo: 'action',
      titulo: 'Avisos',
      mensaje: '¿Desea eliminar este item?',
      cerrar: false,
      tiempoDeEspera: 2000,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: '',
    }

    this.elementoParaEliminar = i;
  }

  /**
   * Elimina un elemento de la tabla de pedimento, si se confirma la acción.
   * @param borrar Indica si se debe proceder con la eliminación.
   * @returns {void}
   */
  eliminarPedimento(borrar: boolean): void {
    if (borrar) {
      this.pedimentos.splice(this.elementoParaEliminar, 1);
    }
  }

  /**
   * Método para establecer valores en el store de Tramite5701.
   * @param form - Formulario del componente.
   * @param campo - Campo del formulario cuyo valor se desea establecer.
   * @param metodoNombre - Nombre del método en el store que se utilizará para establecer el valor.
   * @returns {void}
   */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite5701Store): void {
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
}
