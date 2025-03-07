import { Component, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ImportanteCatalogoSeleccion } from '../../models/registro-muestras-mercancias.model';
import { OnInit } from '@angular/core';
import { PagoLineaDeCaptureQuery } from '../../estados/pago-linea-de-captura/pago-linea-de-captura.query';
import { PagoLineaDeCaptureStore } from '../../estados/pago-linea-de-captura/pago-linea-de-captura.store';
import { REGEX_REEMPLAZAR } from '@ng-mf/data-access-user';
import { RenovacionesMuestrasMercanciasService } from '../../services/renovaciones-muestras-mercancias/renovaciones-muestras-mercancias.service';
import { Subject } from 'rxjs';
import { Subscription } from 'rxjs';
import { map } from 'rxjs';
import { TableData } from '@ng-mf/data-access-user';
import { Validators } from '@angular/forms';
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
  tableData!: TableData;

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
   * Constructor de la clase PagoLcComponent.
   *
   * @param fb - Instancia de FormBuilder para la creación y manejo de formularios reactivos.
   * @param renovacionesService - Servicio para manejar las renovaciones de muestras de mercancías.
   */
  constructor(
    public fb: FormBuilder,
    private renovacionesService: RenovacionesMuestrasMercanciasService,
    public pagoLineaDeCaptureStore: PagoLineaDeCaptureStore,
    public pagoLineaDeCaptureQuery: PagoLineaDeCaptureQuery
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
      lineaCaptura: ['', [Validators.maxLength(20)]],
      valorPago: [
        { value: '4845', disabled: true },
        [Validators.maxLength(20)],
      ],
    });

    /**
     * Observable que obtiene los pagos de tarifas de la tienda.
     */
    this.pagoLineaDeCaptureQuery.obtenerPagoDeTarifas$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState: TableData) => {
          this.tableData = seccionState;
        })
      )
      .subscribe();
    this.obtenerDatosIniciales();
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
          this.pagoLineaDeCaptureStore.update({
            tableBody: res.tablaDeTarifasDePago.tableBody,
          });
        },
      });
  }

  /**
   * Valida y formatea el campo 'lineaCaptura' del formulario 'formPagoLC'.
   *
   * Este método elimina todos los caracteres no alfanuméricos de la cadena
   * y convierte todos los caracteres a mayúsculas.
   *
   * @returns {void}
   */
  validarLineaCaptura(): void {
    this.formPagoLC.patchValue({
      lineaCaptura: this.formPagoLC
        .get('lineaCaptura')
        ?.value.replace(REGEX_REEMPLAZAR, '')
        .toUpperCase(),
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
    const LINEA_CAPTURA = this.formPagoLC.get('lineaCaptura')?.value;
    const VALOR_PAGO = this.formPagoLC.get('valorPago')?.value;
    if (!LINEA_CAPTURA || !VALOR_PAGO) {
      return;
    }
    this.pagoLineaDeCaptureStore.agregarPagoDeTarifas(
      LINEA_CAPTURA,
      VALOR_PAGO
    );
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
