import { BsModalService } from 'ngx-bootstrap/modal';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { GENERAR_LINEA_CAPTURA_URL } from '@libs/shared/data-access-user/src/tramites/constantes/constantes';
import { ImportanteCatalogoSeleccion } from '../../models/registro-muestras-mercancias.model';
import { InputFechaComponent } from '@ng-mf/data-access-user';
import { Notificacion } from '@ng-mf/data-access-user';
import { NotificacionesComponent } from '@ng-mf/data-access-user';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { PagoDerechosLista } from '../../models/registro-muestras-mercancias.model';
import { REGEX_LINEA_CAPTURA } from '@ng-mf/data-access-user';
import { REGEX_REEMPLAZAR } from '@ng-mf/data-access-user';
import { ReactiveFormsModule } from '@angular/forms';
import { RenovacionesMuestrasMercanciasService } from '../../services/renovaciones-muestras-mercancias/renovaciones-muestras-mercancias.service';
import { Solicitud30901Query } from '../../estados/tramites30901.query';
import { Solicitud30901State } from '../../estados/tramites30901.store';
import { Solicitud30901Store } from '../../estados/tramites30901.store';
import { Subject } from 'rxjs';
import { Subscription } from 'rxjs';
import { TablaDinamicaComponent } from '@ng-mf/data-access-user';
import { TablaSeleccion } from '@ng-mf/data-access-user';
import { TableData } from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';
import { ToastrService } from 'ngx-toastr';
import { Validators } from '@angular/forms';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';
/**
 * Componente para el manejo del pago de la línea de captura.
 *
 * @component
 * @selector 'app-pago-linea-de-captura'
 * @templateUrl './pago-linea-de-captura.component.html'
 * @styleUrl './pago-linea-de-captura.component.scss'
 */
@Component({
  selector: 'app-pago-linea-de-captura',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NotificacionesComponent,
    InputFechaComponent,
    TablaDinamicaComponent,
    TituloComponent,
  ],
  providers: [
    RenovacionesMuestrasMercanciasService,
    ToastrService,
    BsModalService,
  ],
  templateUrl: './pago-linea-de-captura.component.html',
  styleUrl: './pago-linea-de-captura.component.scss',
})
export class PagoLineaDeCapturaComponent implements OnInit, OnDestroy {
  /**
   * Formulario para el pago de la línea de captura.
   */
  formPagoLC!: FormGroup;
  /**
   * Datos de la tabla utilizados en el componente Pago LC.
   * @type {TableData}
   */
  tableData: TableData = {} as TableData;

  /**
   * Administra el ciclo de vida de la suscripción `darseDeBaja`.
   *
   * - La variable `darseDeBaja` almacena la suscripción activa,
   *   la cual puede ser `null` si no hay suscripción.
   * - El método `ngOnDestroy` se asegura de que la suscripción
   *   se cancele correctamente cuando el componente se destruya,
   *   evitando fugas de memoria.
   */
  darseDeBaja: Subscription | null = null;

  /**
   * Subject para desuscribirse de los observables.
   * @type {Subject<void>}
   */
  private destroyed$ = new Subject<void>();
  /**
   * Estado actual de la solicitud 30901.
   * Se inicializa como un objeto vacío con la estructura de `Solicitud30901State`.
   */
  solicitud30901State: Solicitud30901State = {} as Solicitud30901State;

  /**
   * Tipo de selección de la tabla.
   * En este caso, se utiliza un checkbox para la selección de elementos.
   */
  tipoSeleccionTabla = TablaSeleccion.CHECKBOX;

  /**
   * Configuración de las columnas de la tabla.
   * Define el encabezado, la clave de acceso a los datos y el orden de las columnas.
   */
  configuracionColumnas = [
    {
      encabezado: 'Línea de captura', // Título de la columna
      clave: (item: PagoDerechosLista) => item.linea, // Accede a la propiedad 'linea'
      orden: 1, // Orden en la tabla
    },
    {
      encabezado: 'Monto', // Título de la columna
      clave: (item: PagoDerechosLista) => item.monto, // Accede a la propiedad 'monto'
      orden: 2, // Orden en la tabla
    },
  ];

  /**
   * Lista de líneas de captura seleccionadas por el usuario.
   * Se inicializa como un arreglo vacío del tipo PagoDerechosLista.
   */
  seleccionadaLineaCapturaLista: PagoDerechosLista[] =
    [] as PagoDerechosLista[];

  /**
   * @descripcion Notificación para mostrar mensajes al usuario.
   */
  public nuevaNotificacion!: Notificacion;

  /**
   * Lista de pagos de derechos asociados a la solicitud.
   * Se inicializa como un array vacío con la estructura de `PagoDerechosLista`.
   */
  pagoDerechosLista: PagoDerechosLista[] = [] as PagoDerechosLista[];

  /**
   * URL utilizada para generar la línea de captura.
   * Esta constante apunta al endpoint definido por GENERAR_LINEA_CAPTURA_URL.
   */
  generarLineaCapturaURL: string = GENERAR_LINEA_CAPTURA_URL;

  /**
   * Constructor de la clase PagoLcComponent.
   *
   * @param fb - Instancia de FormBuilder para la creación y manejo de formularios reactivos.
   * @param renovacionesService - Servicio para manejar las renovaciones de muestras de mercancías.
   */
  constructor(
    public fb: FormBuilder,
    private renovacionesService: RenovacionesMuestrasMercanciasService,
    public solicitud30901Store: Solicitud30901Store,
    public solicitud30901Query: Solicitud30901Query
  ) {
    // Si es necesario, se puede agregar aquí la lógica de inicialización
  }

  /**
   * Método de ciclo de vida de Angular que se ejecuta al inicializar el componente.
   *
   * En este método se inicializa el formulario `formPagoLC` con dos campos:
   * - `lineaCaptura`: Campo de texto con una longitud máxima de 20 caracteres.
   * - `valorPago`: Campo de texto con un valor predeterminado de '4845' que está deshabilitado y tiene una longitud máxima de 20 caracteres.
   *
   * Además, se llama al método `obtenerDatosIniciales` para cargar los datos necesarios al iniciar el componente.
   */
  ngOnInit(): void {
    this.formPagoLC = this.fb.group({
      lineaCaptura: [
        this.solicitud30901State.lineaCaptura,
        [
          Validators.required,
          Validators.maxLength(20),
          Validators.pattern(REGEX_LINEA_CAPTURA),
        ],
      ],
      valorPago: [
        { value: this.solicitud30901State.valorPago, disabled: true },
        [Validators.required, Validators.maxLength(20)],
      ],
    });

    this.solicitud30901Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyed$),
        map((response: Solicitud30901State) => {
          this.solicitud30901State = response;
          this.pagoDerechosLista = response.pagoDerechosLista;
          this.formPagoLC.patchValue({
            lineaCaptura: this.solicitud30901State.lineaCaptura,
            valorPago: this.solicitud30901State.valorPago,
          });
        })
      )
      .subscribe();
    this.obtenerDatosIniciales();
  }

  /**
   * Actualiza el valor de la línea de captura en el estado.
   */
  setLineaCaptura(evento: Event): void {
    const VALUE = (evento.target as HTMLInputElement).value;
    const CLEANED = VALUE.replace(REGEX_REEMPLAZAR, '').toUpperCase();

    this.formPagoLC.patchValue({
      lineaCaptura: CLEANED,
    });

    this.solicitud30901Store.setLineaCaptura(CLEANED);
  }

  /**
   * Método para obtener los datos iniciales necesarios para el componente.
   * Realiza una llamada al servicio de renovaciones para obtener las opciones desplegables
   * y asigna los datos de la tabla de tarifas de pago a la propiedad `tableData`.
   *
   * @returns {void}
   */
  obtenerDatosIniciales(): void {
    this.darseDeBaja = this.renovacionesService
      .obtenerOpcionesDesplegables()
      .subscribe({
        next: (res: ImportanteCatalogoSeleccion) => {
          this.solicitud30901Store.setValorPago(res.pagoDerechosLista[0].monto);
        },
      });
  }

  /**
   * Limpia los campos del formulario de pago LC.
   *
   * Este método restablece el campo 'lineaCaptura' del formulario 'formPagoLC' a su estado inicial.
   *
   * @returns {void} No retorna ningún valor.
   */
  limpiarCampos(): void {
    this.formPagoLC.get('lineaCaptura')?.reset();
  }

  /**
   * Agrega tarifas de pago obteniendo los valores del formulario y actualizando la tabla.
   */
  anadirTarifasDePago(): void {
    if (this.formPagoLC.invalid) {
      this.formPagoLC.markAllAsTouched();
      return;
    }

    const JSON_OBJECT = [
      {
        linea: this.formPagoLC.get('lineaCaptura')?.value,
        monto: this.formPagoLC.get('valorPago')?.value,
      },
    ];

    for (const INDEX in this.pagoDerechosLista) {
      if (
        this.pagoDerechosLista[INDEX].linea ===
        this.formPagoLC.get('lineaCaptura')?.value
      ) {
        return;
      }
    }
    this.solicitud30901Store.setPagoDerechosLista(JSON_OBJECT);
  }

  /**
   * Método que se ejecuta cuando se selecciona una fila en la lista de pagos de derechos.
   * Asigna la fila seleccionada (o filas) a la variable `seleccionadaLineaCapturaLista`.
   *
   * @param evento - Arreglo de objetos de tipo `PagoDerechosLista` que representa las filas seleccionadas.
   */
  onFilaSeleccionada(evento: PagoDerechosLista[]): void {
    this.seleccionadaLineaCapturaLista = evento;
  }

  /**
   * Elimina las filas seleccionadas de la lista de pagos de derechos.
   *
   * - Si no hay ninguna fila seleccionada, muestra una notificación de advertencia al usuario.
   * - Si hay filas seleccionadas, obtiene sus líneas, filtra la lista original eliminando esas líneas
   *   y actualiza el store con la nueva lista.
   * - Finalmente, limpia la selección actual.
   */
  eliminarSeleccion(): void {
    if (this.seleccionadaLineaCapturaLista.length === 0) {
      this.nuevaNotificacion = {
        tipoNotificacion: 'alert',
        categoria: 'danger',
        modo: 'action',
        titulo: 'Avisos',
        mensaje: 'Selecciona por lo menos un registro',
        cerrar: false,
        txtBtnAceptar: 'Aceptar',
        txtBtnCancelar: '',
      };
      return;
    }
    const LINEAS_A_ELIMINAR = this.seleccionadaLineaCapturaLista.map(
      (item) => item.linea
    );

    const NUEVA_LISTA = this.pagoDerechosLista.filter(
      (elemento) => !LINEAS_A_ELIMINAR.includes(elemento.linea)
    );
    this.seleccionadaLineaCapturaLista = [];
    this.solicitud30901Store.setPagoDerechosLista(NUEVA_LISTA);
  }

  /**
   * Método para validar el formulario.
   * @returns boolean
   */
  validarFormulario(): boolean {
    if (this.formPagoLC.invalid) {
      this.formPagoLC.markAllAsTouched();
    }
    return this.formPagoLC.valid;
  }

  /**
   * Hook del ciclo de vida que se invoca cuando se destruye el componente.
   * - Verifica si la suscripción `darseDeBaja` está activa.
   * - Si existe, se da de baja (unsubscribe) del observable para liberar recursos.
   * - Establece `darseDeBaja` a `null` como parte del proceso de limpieza.
   */
  ngOnDestroy(): void {
    if (this.darseDeBaja) {
      this.darseDeBaja.unsubscribe();
      this.darseDeBaja = null;
    }
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
