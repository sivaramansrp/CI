import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,ReactiveFormsModule,Validators} from '@angular/forms';
import { PagoData ,TableData} from '@libs/shared/data-access-user/src/core/models/31601/servicios-pantallas.model';
import { REGEX_LLAVE_DE_PAGO, REGEX_RFC, TituloComponent } from '@ng-mf/data-access-user';
import { Solicitud31601State,Tramite31601Store } from '../../../../estados/tramites/tramite31601.store';
import { Subject, map, takeUntil } from 'rxjs';
import { Catalogo } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { InputRadioComponent } from '@ng-mf/data-access-user';
import { TableComponent } from '@ng-mf/data-access-user';
import { Tramite31601Query } from '../../../../estados/queries/tramite31601.query'
import { ValidacionesFormularioService } from '@ng-mf/data-access-user';
import dropDown from '@libs/shared/theme/assets/json/31601/catalog-select-tipo.json';
import mockData from '@libs/shared/theme/assets/json/31601/mockdata-capturar.json';
import radio_si_no from '@libs/shared/theme/assets/json/31601/radio_si_no.json';
import table from '@libs/shared/theme/assets/json/31601/table.json';
import tableDetos from '@libs/shared/theme/assets/json/31601/table-datos.json';
/**
 * @Component - CapturarIvaeiepsComponent
 *
 * Este componente proporciona funcionalidad para capturar datos de IVA e IEPS.
 * Incluye formularios para IVA y detalles de pago, y varios elementos de la interfaz de usuario.
 * como tablas y menús desplegables para la selección y visualización de datos.
 */
@Component({
  selector: 'app-capturar-ivaeieps',
  standalone: true,
  imports: [
    TituloComponent,
    TableComponent,
    ReactiveFormsModule,
    CatalogoSelectComponent,
    CommonModule,
    InputRadioComponent,
  ],
  templateUrl: './capturar-ivaeieps.component.html',
  styleUrl: './capturar-ivaeieps.component.scss',
})
export class CapturarIvaeiepsComponent implements OnInit,OnDestroy {
  /**
   * Grupo de formularios para formulario IVA
   */
  ivaForm!: FormGroup;

  /**
   * Grupo de formularios para formulario de pago
   */
  formularioDePago!: FormGroup;

  /**
   *Marcar para mostrar u ocultar contenido
   */
  mostrarContenido = false;

  /**
   * Valor seleccionado para alguna funcionalidad
   */
  valorSeleccionado = 'Si';

  /**
   *Valor seleccionado predeterminado
   */
  predeterminadoSeleccionar = 'Si';

  /**
   * Marcar para mostrar u ocultar modal
   */
  mostrarModal: boolean = false;
  /**
   * Una variable que contiene el estado de un grupo de botones de opción.
   * A la variable `radioBtn` se le asigna el valor de `radio_si_no`.
   */
  radioBtn = radio_si_no;

  /**
   * Contiene los datos del encabezado de la tabla de destinatarios.
   * Estos datos se utilizan para completar la tabla de destinatarios en la interfaz de usuario.
   */
  destinatarioHeaderData: TableData = table;

  /**
   * Representa los datos de LE (presumiblemente una entidad o proceso específico).
   * Esta variable contiene los datos de la tabla para LE.
   */
  datosDeInversion = tableDetos;

  /**
   * Representa el catálogo de tipos.
   * Esta variable contiene los datos de las opciones del menú desplegable.
   */
  tipoDeInversion: Catalogo[] = dropDown.tipoDe;

  /**
   * Estado de la solicitud.
   */
  public solicitudState!: Solicitud31601State;

  /**
   * Notificador para destruir las suscripciones.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Construye una instancia de CapturarIvaeiepsComponent.
   *
   * @param fb: una instancia de FormBuilder utilizada para crear controles de formulario.
   * @param validacionesService - Un servicio para validación de formularios.
   * @param {Tramite31601Store} tramite31601Store - Store para gestionar el estado del trámite.
   * @param {Tramite31601Query} tramite31601Query - Query para obtener el estado del trámite.
   */
 
  constructor(
    private fb: FormBuilder,
    private validacionesService: ValidacionesFormularioService,
    private tramite31601Store: Tramite31601Store,
    private tramite31601Query: Tramite31601Query
  ) {}

  /**
   * Gancho de ciclo de vida angular que se llama después de que la vista del componente se haya inicializado por completo.
   * Este método inicializa los formularios y completa el formulario de pago con datos simulados.
   *
   * @returns {void}
   */

  ngOnInit(): void {
    this.inicializarForms();
    this.poblarPagoForm(mockData);
  }

  /**
   *Inicializa los formularios utilizados en el componente.
   *
   * Este método configura dos formularios: `ivaForm` y `formularioDePago`.
   *
   * `ivaForm` incluye los siguientes controles:
   * - `empleados`:Un control booleano.
   * - `infraestructura`: Un control booleano.
   * - `monto`: Un control booleano..
   * - `antiguedad`: Un control booleano..
   * - `tipoDe`: Un control de cadena.
   * - `valorPesos`: Un control de cadena.
   * - `descripcion`: Un control de cadena.
   * - `rfc`: Un control de cadena requerido con un validador de patrones..
   * - `denominacion`: Un control de cadena deshabilitado.
   * - `domicilio`: Un control de cadena deshabilitado.
   *
   * `formularioDePago` incluye los siguientes controles:
   * - `claveReferencia`: Un control de cadena deshabilitado with a maximum length validator.
   * - `numeroOperacion`: Un control de cadena.
   * - `cadenaDependencia`: Un control de cadena deshabilitado with a maximum length validator.
   * - `banco`: Un control de cadena requerido.
   * - `llavePago`:Un control de cadena requerido con un patrón y un validador de longitud máxima.
   * - `fechaPago`: Un control de cadena deshabilitado.
   * - `importePago`: Un control de cadena deshabilitado.
   *  @returns {void}
   */
  inicializarForms(): void {
    this.tramite31601Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();
    this.ivaForm = this.fb.group({
      manifieste:[this.solicitudState?.manifieste],
      indiqueIva:[this.solicitudState?.indiqueIva],
      empleados: [this.solicitudState?.empleados],
      infraestructura: [this.solicitudState?.infraestructura],
      monto: [this.solicitudState?.monto],
      antiguedad: [this.solicitudState?.antiguedad],
      tipoDe: [this.solicitudState?.tipoDe],
      valorPesos: [this.solicitudState?.valorPesos],
      descripcion: [this.solicitudState?.descripcion],
      haContado:[this.solicitudState?.haContado],
      enCasoIva:[this.solicitudState?.enCasoIva],
      rfc: [
        '',
        [
          Validators.required,
          Validators.pattern(REGEX_RFC),
        ],
      ],
      denominacion: [{ value: '', disabled: true }],
      domicilio: [{ value: '', disabled: true }],
    });

    this.formularioDePago = this.fb.group({
      claveReferencia: [
        { value: '', disabled: true },
        Validators.maxLength(50),
      ],
      numeroOperacion: [this.solicitudState?.numeroOperacion],
      cadenaDependencia: [
        { value: '', disabled: true },
        Validators.maxLength(50),
      ],
      banco: [this.solicitudState?.banco, Validators.required],
      llavePago: [
        this.solicitudState?.llavePago,
        [
          Validators.required,
          Validators.pattern(REGEX_LLAVE_DE_PAGO),
          Validators.maxLength(20),
        ],
      ],
      fechaPago: [{ value: '', disabled: true }],
      importePago: [{ value: '', disabled: true }],
    });
  }

  /**
   * Rellena el formulario de pago con los datos proporcionados.
   *
   * @param data: el objeto de datos que contiene información de pago.
   * @param data.claveReferencia - La clave de referencia para el pago.
   * @param data.numeroOperacion - El número de operación para el pago.
   * @param data.cadenaDependencia - La cadena de dependencia para el pago.
   * @param data.tipoDe - El tipo de banco para el pago.
   * @param data.llavePago - La clave de pago.
   * @param data.fechaPago - La fecha de pago.
   * @param data.importePago - El monto del pago.
   */
  poblarPagoForm(data: PagoData): void {
    this.formularioDePago.patchValue({
      claveReferencia: data.claveReferencia,
      numeroOperacion: this.solicitudState?.numeroOperacion && this.solicitudState?.numeroOperacion !== '' ? this.solicitudState?.numeroOperacion : data.numeroOperacion,
      cadenaDependencia: data.cadenaDependencia,
      llavePago: this.solicitudState?.llavePago && this.solicitudState?.llavePago !== ''?this.solicitudState?.llavePago : data.llavePago,
      fechaPago: data.fechaPago,
      importePago: data.importePago,
    });
  }

  /**
   * Maneja el evento de cambio de valor.
   *
   * Valor @param: el nuevo valor que se establecerá.
   */
  cambioDeValor(value: string | number): void {
    this.valorSeleccionado = value.toString();
  }

  /**
   * Actualiza el valor de `predeterminadoSeleccionar` con el valor proporcionado.
   *
   * @param value - El nuevo valor a establecer para `predeterminadoSeleccionar`.
   * @retornos nulos
   */

  cambioDeValorIndique(value: string | number): void {
    this.predeterminadoSeleccionar = value.toString();
  }

  /**
   * Agrega datos a la tabla destinatarioHeaderData si el ivaForm es válido.
   * Extrae los valores `rfc`, `denominacion` y `domicilio` del formulario,
   * y los agrega como una nueva fila a la matriz `tbodyData` del primer elemento
   * en el array `tableBody` de `destinatarioHeaderData`.
   * Restablece el ivaForm después de agregar los datos.
   *
   * @returns {nulo}
   */
  agregarDatos(): void {
    if (this.ivaForm.valid) {
      const {RFC, DENOMINACION, DOMICILIO } = this.ivaForm.value;
      this.destinatarioHeaderData.tableBody[0].tbodyData.push(...[
        RFC,
        DENOMINACION,
        DOMICILIO,
      ]);
      this.ivaForm.reset();
    }
  }

  /**
   * Alterna la visibilidad del contenido invirtiendo el valor de `mostrarContenido`.
   * Cuando se llama, si `mostrarContenido` es verdadero, se establecerá en falso y viceversa.
   */
  alternarContenido(): void {
    this.mostrarContenido = !this.mostrarContenido;
  }

  /**
   * Actualiza el campo 'tipoDe' en el ivaForm con el valor actual de tipoDe.
   *
   * @returns {nulo}
   */
  tipoDeInver(event?: Event): void {
    const SELECTED_VALUE = event ? (event.target as HTMLSelectElement).value : '';
    this.ivaForm.get('tipoDe')?.setValue(SELECTED_VALUE);
  }

  /**
   * Abre el modal estableciendo `mostrarModal` en verdadero.
   *
   * Este método se utiliza para mostrar el cuadro de diálogo modal en la interfaz de usuario.
   * Cuando se llama, establece el indicador `mostrarModal` en verdadero, haciendo que el modal sea visible.
   *
   * @returns {nulo}
   */
  agregarOpenModal(): void {
    this.mostrarModal = true;
  }

  /**
   * Cierra el modal estableciendo la propiedad `mostrarModal` en `false`.
   * Este método normalmente se llama cuando el usuario desea cerrar el cuadro de diálogo modal.
   */

  cerrarModal(): void {
    this.mostrarModal = false;
  }
  /**
   * Establece el valor de un campo en el store de Tramite31601.
   *
   * @param {FormGroup} form - El grupo de formularios que contiene el campo.
   * @param {string} campo - El nombre del campo cuyo valor se va a establecer.
   * @param {keyof Tramite31601Store} metodoNombre - El nombre del método en el store que se utilizará para establecer el valor.
   */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite31601Store): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite31601Store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /**
   * Método del ciclo de vida de Angular que se llama cuando el componente se destruye.
   * Este método completa el observable destroyNotifier$ para cancelar las suscripciones activas.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
