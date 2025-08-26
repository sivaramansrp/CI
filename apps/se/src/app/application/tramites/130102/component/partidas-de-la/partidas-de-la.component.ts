/**
 * @file PartidasDeLaComponent
 * @description Componente Angular para gestionar las partidas de mercancía en un trámite específico.
 */

import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AlertComponent, Catalogo,REGEX_NUMERO_DECIMAL_ENTERO, REG_X, TablaDinamicaComponent, TablaSeleccion, TituloComponent, UppercaseDirective} from '@libs/shared/data-access-user/src';
import { MERCANCIA_TABLA, MODIFICAR_PARTIDAS_FORM } from '../../constantes/octava-temporal.enum';
import { Solicitud130102State, Tramite130102Store } from '../../../../estados/tramites/tramite130102.store';
import { Subject, map, takeUntil } from 'rxjs'; 
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';
import { CommonModule } from '@angular/common';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { FormularioRegistroService } from '../../services/octava-temporal.service';
import { Modal } from 'bootstrap';
import { OctavaTemporal } from '../../models/octava-temporal.model';
import { TEXTOS } from '@libs/shared/data-access-user/src/tramites/constantes/octava-temporal.enum';
import { Tramite130102Query } from '../../../../estados/queries/tramite130102.query';


/**
 * Clase PartidasDeLaComponent
 * @description Componente Angular para gestionar las partidas de mercancía en un trámite específico.
 */
@Component({
  selector: 'app-partidas-de-la',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TituloComponent,
    UppercaseDirective,
    AlertComponent,
    CatalogoSelectComponent,
    TablaDinamicaComponent,
    FormasDinamicasComponent
  ],
  templateUrl: './partidas-de-la.component.html',
  styleUrl: './partidas-de-la.component.scss',
})
/**
 * * Componente para gestionar las partidas de mercancía en un trámite específico.
 */

export class PartidasDeLaComponent implements OnInit, AfterViewInit, OnDestroy {

  /**
   * Referencia al modal de confirmación
   */
  @ViewChild('cargarArchivoModal', { static: false }) cargarArchivoModal!: ElementRef;

  /**
   * Instancia del modal de confirmación
   */
  private cargarArchivoInstance!: Modal;

  /**
   * compo doc
   * @type {FormGroup}
   * @memberof PartidasDeLaMercanciaComponent
   * @description
   * Este es un formulario reactivo de Angular representado por un FormGroup.
   * Se utiliza para manejar y validar los datos del formulario en el componente.
   */
  public archivoFormGroup: FormGroup = new FormGroup({
    archivo: new FormControl(''),
  });

  /**
   * compo doc
   * @property partidasSeleccionadas
   * @type {Partidas[]}
   * @description
   * Esta propiedad almacena la lista de partidas seleccionadas en la tabla dinámica.
   * Se utiliza para identificar qué partidas han sido seleccionadas por el usuario,
   * permitiendo así realizar operaciones como edición o eliminación sobre dichas partidas.
   *
   * Por ejemplo, al seleccionar una o varias filas en la tabla, estas se guardan en esta propiedad
   * y pueden ser utilizadas posteriormente en métodos como `abrirModalEditar` o `guardarEdicion`.
   *
   * @example
   * console.log(this.partidasSeleccionadas);
   * // Muestra el arreglo de partidas actualmente seleccionadas en la tabla.
   */
  public partidasSeleccionadas: OctavaTemporal[] = [];

  
  /**
   * Referencia al elemento del modal de confirmación en la plantilla.
   * Se utiliza para controlar la visualización del modal mediante código.
   *
   * @type {ElementRef}
   * @memberof DeLaMuestraComponent
   * @example
   * this.modalConfirmacionRef.nativeElement.show();
   */
  @ViewChild('modalConfirmacionRef') modalConfirmacionRef!: ElementRef;

  /**
   * Referencia al elemento del modal de confirmación en la plantilla.
   * Se utiliza para controlar la visualización del modal mediante código.
   *
   * @type {ElementRef}
   * @memberof DeLaMuestraComponent
   * @example
   * this.modalConfirmacionRef.nativeElement.show();
   */
  @ViewChild('modalEditarRef') modalEditarRef!: ElementRef;

  /**
   * @property modalEditar
   * @type {Modal}
   * @private
   * @description
   * Referencia al modal utilizado para editar registros o información en la interfaz.
   * Permite controlar la apertura y cierre del modal de edición desde el componente.
   */
  private modalEditar!: Modal;

  /*
  * compo doc
  * @property modificarPartidasFormData
  */
  public modificarPartidasFormData = MODIFICAR_PARTIDAS_FORM;

    /**
     * @property {TablaSeleccion} tablaSeleccion
     * @description Tabla de selección para la tabla de cupos.
     */
    tablaSeleccion = TablaSeleccion;
  /**
   * Expresión regular para validar fracciones arancelarias.
   */ 
  configuracionTabla =MERCANCIA_TABLA;
/*
* @property {OctavaTemporal[]} datosSocios
* @description Datos de los socios obtenidos desde el store.
*/
    datosSocios: OctavaTemporal[] = [
  {
    cantidad: 10,
    unidadDeMedida: 'kg',
    fraccionArancelaria: '0101.21.01',
    descripción: 'Producto de ejemplo',
    colonia: 'Centro',
    precioUnitarioUSD: '15.50',
    totalUsd: 155
  },
];

  /**
   * Formulario reactivo utilizado para gestionar los datos de las partidas de la mercancía.
   * @type {FormGroup}
   */
  form!: FormGroup;
 
  /**
   * Formulario reactivo utilizado para gestionar los totales de cantidad y valor en USD.
   * @type {FormGroup}
   */
  formForTotalCount!: FormGroup;
 
  /**
   * Constantes de texto utilizadas en el componente.
   * @type {any}
   */
  TEXTOS = TEXTOS;
 
  /**
   * Datos del catálogo de fracciones arancelarias TIGIE.
   * @type {CatalogosSelect}
   */
  fraccionArancelariaTIGIE: Catalogo[] = [];
 
 
 
  /**
   * Datos del cuerpo de la tabla.
   * @type {Array<{ tbodyData: string[] }>}
   */
  tableBodyData: { tbodyData: string[] }[] = [];
 
 
 
    /**
     * Estado actual de la solicitud 130102, obtenido desde el store.
     */
    public solicitudState!: Solicitud130102State;
  
    /**
     * Observable utilizado para cancelar suscripciones al destruir el componente.
     */
    private destroyNotifier$: Subject<void> = new Subject();
  /* *
     * Indica si el formulario es de solo lectura.
     */
     esFormularioSoloLectura: boolean = false;

  /**
   * Constructor del formulario reactivo.
   * @param {FormBuilder} fb - Constructor del formulario reactivo.
   */

  constructor(private fb: FormBuilder,
      private tramite130102Store: Tramite130102Store,
      private tramite130102Query: Tramite130102Query,
      private formularioRegistroService: FormularioRegistroService,
       private consultaioQuery: ConsultaioQuery
  ) {
      this.consultaioQuery.selectConsultaioState$
         .pipe(
           takeUntil(this.destroyNotifier$),
           map((seccionState) => {
             this.esFormularioSoloLectura = seccionState.readonly;
            
             this.inicializarEstadoFormulario();
           })
         )
         .subscribe();
  }
  /**
   * Método para inicializar el estado del formulario.
   * Si el formulario es de solo lectura, se guardan los datos; de lo contrario, se crea el formulario.
   */
  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario();
    } else {
      this.crearFormulario();
    }
   
  }
  /**
   * Método para guardar los datos del formulario y ajustar su estado según si es de solo lectura o no.
   */
  guardarDatosFormulario(): void {
      this.crearFormulario();
      if (this.esFormularioSoloLectura) {
        this.form.disable();
        
      } else if (!this.esFormularioSoloLectura) {
        this.form.enable();
      } 
  }
  
  /**
   * Método de inicialización del componente.
   */
  ngOnInit(): void {
    this.formularioRegistroService.getFraccionArancelariaTIGIE().pipe(takeUntil(this.destroyNotifier$)).subscribe(data => {
      this.fraccionArancelariaTIGIE = data;
    });
  
    this.inicializarEstadoFormulario();
    this.formularioTotalCount();
  
    this.calculateTotals();
    const PARTIDAS_TABLA = this.solicitudState?.['partidas_tabla'];
    if ((!Array.isArray(PARTIDAS_TABLA) || PARTIDAS_TABLA.length === 0) && this.esFormularioSoloLectura) {
      this.formularioRegistroService.getPartidasFromJson().pipe(takeUntil(this.destroyNotifier$)).subscribe(partidas => {
        this.datosSocios = partidas;
        this.tramite130102Store.setPartidasTabla('partidas_tabla', this.datosSocios);
      });
    }

    this.formForTotalCount.controls['cantidadTotal'].disable();
    this.formForTotalCount.controls['valorTotalUSD'].disable();
    this.formularioRegistroService.registrarFormulario('form', this.form);
    this.formularioRegistroService.registrarFormulario('formForTotalCount', this.formForTotalCount);
  }
 
    /**
   * Asigna un valor del formulario al store.
   *
   * @param {FormGroup} form - Formulario reactivo.
   * @param {string} campo - Campo del formulario a obtener.
   * @param {keyof Tramite130102Store} metodoNombre - Método del store donde se guardará el valor.
   */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite130102Store): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite130102Store[metodoNombre] as (value: string | number) => void)(VALOR);
  }
  /**
   * Método para crear el formulario reactivo.
   */
  crearFormulario(): void {
    this.tramite130102Query.selectSolicitud$
    .pipe(
      takeUntil(this.destroyNotifier$),
      map((seccionState) => {  
        this.solicitudState = seccionState;
        if (
            this.solicitudState &&
            typeof this.solicitudState === 'object' &&
            this.solicitudState !== null &&
            'partidas_tabla' in this.solicitudState
          ) {
            const PRODUCTO = this.solicitudState['partidas_tabla'] as OctavaTemporal[];
            PRODUCTO.forEach((productoItem: OctavaTemporal) => {
              const IS_ALREADY_ADDED = this.datosSocios.some(
              (item: OctavaTemporal) => item.fraccionArancelaria === productoItem.fraccionArancelaria
            );

            if (!IS_ALREADY_ADDED) {
              this.datosSocios.push(productoItem);
            }
            });
          }
      })
    )
    .subscribe();

    this.form = this.fb.group({
      cantidad: [
        this.solicitudState?.cantidadPartidas,
        [
          Validators.required,
          Validators.pattern('^[0-9]+$'),
          Validators.maxLength(18),
          PartidasDeLaComponent.noLeadingSpacesValidator,
        ],
      ],
      fraccionArancelariaTIGIE: [ this.solicitudState?.fraccionArancelariaTIGIE, [Validators.required,Validators.pattern(REG_X.REGEX_FRACCION_ARANCELARIA),PartidasDeLaComponent.noLeadingSpacesValidator]],
      fraccionArancelariaTIGIE_TIGIE: [ this.solicitudState?.fraccionArancelariaTIGIE_TIGIE, [Validators.required]],
      descripcion: [ this.solicitudState?.descripcionPartidas, [Validators.required, Validators.maxLength(255),PartidasDeLaComponent.noLeadingSpacesValidator,]],
      valorPartidaUSD: [
        this.solicitudState?.valorPartidaUSD,
        [
          Validators.required,
          Validators.min(0),
          Validators.pattern(REGEX_NUMERO_DECIMAL_ENTERO),
          Validators.maxLength(20)
        ],
      ],
      modificarPartidaForm: this.fb.group({
      modificar_cantidad: [''],
      modificar_descripcion: [''],
      valor_partidas_usd: [''],
      fraccion_partidas: [''],
    }),
    });
     if (this.esFormularioSoloLectura) {
    this.form.disable();
  }
  }

  /**
   * Getter para el formulario de modificación de partida.
   * Retorna el FormGroup asociado a 'modificarPartidaForm' dentro del formulario principal.
   *
   * @returns {FormGroup} El formulario reactivo para modificar la partida.
   *
   * @example
   * const form = this.modificarPartidaForm;
   * // Accede a los controles del formulario de modificación de partida.
   */
  get modificarPartidaForm(): FormGroup {
    return this.form.get('modificarPartidaForm') as FormGroup;
  }

  /**
   * compo doc
   * @method ngAfterViewInit
   * @description
   * Método que se ejecuta después de que la vista ha sido inicializada
   */
  ngAfterViewInit(): void {
    if (this.cargarArchivoModal) {
      this.cargarArchivoInstance = new Modal(
        this.cargarArchivoModal.nativeElement
      );
    }
  }
 
  /**
   * @method onPartidasSeleccion
   * @description
   * Maneja la selección de partidas en la tabla dinámica.
   * Se ejecuta cuando el usuario selecciona o deselecciona filas en la tabla.
   * @param {OctavaTemporal[]} lista - Array de partidas seleccionadas
   */
  onPartidasSeleccion(lista: OctavaTemporal[]): void {
    this.partidasSeleccionadas = [...lista]; // Create new array reference
    
    if (!this.partidasSeleccionadas.length) {
      return;
    }
    
    // If there's a selected row, populate the edit form with its data
    const FILA_SELECCIONADA = this.partidasSeleccionadas[0];
    if (FILA_SELECCIONADA) {
      this.modificarPartidaForm?.patchValue({
        modificar_cantidad: FILA_SELECCIONADA.cantidad,
        modificar_descripcion: FILA_SELECCIONADA.descripción,
        valor_partidas_usd: FILA_SELECCIONADA.totalUsd,
        fraccion_partidas: FILA_SELECCIONADA.fraccionArancelaria,
      });
    }
  }

  /**
   * Método para calcular los totales de cantidad y valor en USD.
   */
  calculateTotals(): void {
    const CANTIDAD_TOTAL = this.datosSocios.reduce(
      (sum: number, item: OctavaTemporal) => sum + Number(item.cantidad || 0), 0
    );
    const VALOR_TOTAL_USD = this.datosSocios.reduce(
      (sum: number, item: OctavaTemporal) => sum + Number(item.totalUsd || 0), 0
    );

    this.formForTotalCount.patchValue({
      cantidadTotal: CANTIDAD_TOTAL,
      valorTotalUSD: VALOR_TOTAL_USD
    });
  }
 
  /**
   * Método para crear el formulario de totales.
   */
  formularioTotalCount(): void {
    this.formForTotalCount = this.fb.group({
      cantidadTotal:[
        this.solicitudState?.cantidadTotal,
     { disabled: true }],
      valorTotalUSD: [this.solicitudState?.valorTotalUSD, { disabled: true }],
    });
  }
   
  /**
   * Método para manejar la selección de fracción arancelaria TIGIE.
   * @param {Catalogo} aduana - Datos del catálogo seleccionado.
   */
   // eslint-disable-next-line class-methods-use-this
   fraccionArancelariaTIGIESelection() : void{
    // Implementar el método o eliminarlo si no es necesario
  }
 
  
 
  /**
   * Método para validar el formulario al hacer clic en el botón
   */
  validarYEnviarFormulario(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
    } else {
      this.agregar();
    }
  }

  /**
   * compo doc
   * @method agregar
   * @description
   * Este método se utiliza para agregar una nueva partida de mercancía a la tabla dinámica.
   * Verifica si el formulario `form` es válido antes de crear un objeto con los datos
   * de la partida. Luego, agrega este objeto a la lista de datos de la tabla y actualiza el
   * estado dinámico del trámite con la nueva partida. Finalmente, reinicia el formulario.
   */
  public agregar(): void {
    if (this.form.valid) {
      const VALOR_PARTIDA = Number(this.form.get('valorPartidaUSD')?.value || 0);
      const CANTIDAD = Number(this.form.get('cantidad')?.value || 0);

      const PRODUCTOS = {
        cantidad: CANTIDAD,
        unidadDeMedida: 'kg',
        fraccionArancelaria: this.form.get('fraccionArancelariaTIGIE')?.value,
        descripción: this.form.get('descripcion')?.value,
        colonia: 'Centro',
        precioUnitarioUSD: VALOR_PARTIDA.toString(),
        totalUsd: VALOR_PARTIDA * CANTIDAD
      };
      this.datosSocios = [...this.datosSocios, PRODUCTOS];
      this.tramite130102Store.setPartidasTabla('partidas_tabla', this.datosSocios);
      this.calculateTotals();
      this.form.reset();      
    }
  }
 
  /**
   * @method guardarEdicion
   * @description
   * Guarda los cambios realizados en el modal de edición
   */
  guardarEdicion(): void {
    if (this.partidasSeleccionadas.length) {
      const INDEX = this.datosSocios.findIndex((item) => 
        item.fraccionArancelaria === this.partidasSeleccionadas[0].fraccionArancelaria &&
        item.cantidad === this.partidasSeleccionadas[0].cantidad &&
        item.descripción === this.partidasSeleccionadas[0].descripción &&
        item.totalUsd === this.partidasSeleccionadas[0].totalUsd
      );
      
      if (INDEX !== -1) {
        const VALOR_PARTIDA = Number(this.modificarPartidaForm.get('valor_partidas_usd')?.value || 0);
        const CANTIDAD = Number(this.modificarPartidaForm.get('modificar_cantidad')?.value || 0);
       this.datosSocios = this.datosSocios.map((item, index) => {
          if (index === INDEX) {
            return {
              ...item,
              cantidad: CANTIDAD,
              descripción: this.modificarPartidaForm.get('modificar_descripcion')?.value,
              totalUsd: VALOR_PARTIDA,
              fraccionArancelaria: this.modificarPartidaForm.get('fraccion_partidas')?.value,
              precioUnitarioUSD: CANTIDAD > 0 ? (VALOR_PARTIDA / CANTIDAD).toString() : '0'
            };
          }
          return item;
        });
        
        this.tramite130102Store.setPartidasTabla('partidas_tabla', this.datosSocios);
        this.calculateTotals();
      }
      this.modalEditar?.hide();
      this.partidasSeleccionadas = [];
    }
  }

  /**
   * compo doc
   * @method establecerCambioDeValor
   * @description
   * Este método se utiliza para manejar los cambios en los valores de los campos del formulario dinámico.
   * Si el valor del evento es un objeto que contiene un identificador (`id`), actualiza el estado dinámico
   * del campo correspondiente en el store con dicho identificador. Si el valor no es un objeto, actualiza
   * el estado dinámico del campo con el valor proporcionado.
   * @param {Object} event - Objeto que contiene el campo modificado y su nuevo valor.
   * @param {string} event.campo - Nombre del campo modificado.
   * @param {string} event.valor - Nuevo valor del campo, que puede ser un objeto con un identificador o un valor directo.
   */
  establecerCambioDeValor(event: { campo: string; valor: string }): void {
    this.tramite130102Store.setDynamicFieldValue(event.campo, event.valor);
  }

  /**
 * Método del ciclo de vida que se ejecuta al destruir el componente.
 * Emite y completa el observable para evitar fugas de memoria.
 */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

  /**
   * Validador personalizado para verificar que no haya espacios al inicio del campo.
   * @param control - Control del formulario a validar
   * @returns Error de validación si hay espacios al inicio, null si es válido
   */
  static noLeadingSpacesValidator(control: AbstractControl): ValidationErrors | null {
    const VALUE = control.value;
    if (VALUE && typeof VALUE === 'string' && VALUE.startsWith(' ')) {
      return { leadingSpaces: true };
    }
    return null;
  }

  /**
   * Método para verificar si un campo del formulario es inválido.
   * @param campo - Nombre del campo a verificar
   * @returns true si el campo es inválido y ha sido tocado, false en caso contrario
   */
  esInvalido(campo: string): boolean {
    const CONTROL = this.form.get(campo);
    return Boolean(CONTROL && CONTROL.invalid && (CONTROL.dirty || CONTROL.touched));
  }

  /**
   * @method eliminar
   * @description
   * Elimina las partidas seleccionadas de la tabla dinámica (`datosSocios`).
   * Recorre el arreglo de partidas seleccionadas y elimina cada una de ellas de la tabla,
   * actualizando el estado dinámico del trámite en el store después de cada eliminación.
   */
  eliminar(): void {
    if (this.partidasSeleccionadas.length) {
      
      const PARTIDAS_A_ELIMINAR = [...this.partidasSeleccionadas];

      PARTIDAS_A_ELIMINAR.forEach((elementoAEliminar: OctavaTemporal) => {
        const INDICE = this.datosSocios.findIndex((item) =>
          item.fraccionArancelaria === elementoAEliminar.fraccionArancelaria &&
          item.cantidad === elementoAEliminar.cantidad &&
          item.descripción === elementoAEliminar.descripción &&
          item.totalUsd === elementoAEliminar.totalUsd
        );
        if (INDICE !== -1) {
          this.datosSocios.splice(INDICE, 1);
        }
      });
      
      
      this.datosSocios = [...this.datosSocios];
      
    
      this.tramite130102Store.setPartidasTabla('partidas_tabla', this.datosSocios);
      this.calculateTotals();
      
    
      this.partidasSeleccionadas = [];
    } else {
      const MODAL = new Modal(this.modalConfirmacionRef.nativeElement);
      MODAL.show();
    }
  }

  /**
   * @method abrirModalEditar
   * @description
   * Abre el modal para editar una partida seleccionada.
   * Verifica que haya una partida seleccionada antes de abrir el modal.
   */
  abrirModalEditar(): void {
    if (this.partidasSeleccionadas.length) {
      if (this.modalEditarRef) {
        this.modalEditar = new Modal(this.modalEditarRef.nativeElement);
        this.modalEditar.show();
      }
    } else {
      const MODAL = new Modal(this.modalConfirmacionRef.nativeElement);
      MODAL.show();
    }
  }

  /**
   * @method cargarArchivo
   * @description
   * Abre el modal para cargar un archivo.
   */
  cargarArchivo(): void {
    if (this.cargarArchivoInstance) {
      this.cargarArchivoInstance.show();
    }
  }

  /**
   * @method cerrar
   * @description
   * Cierra el modal de carga de archivo.
   */
  cerrar(): void {
    if (this.cargarArchivoInstance) {
      this.cargarArchivoInstance.hide();
    }
  }
}