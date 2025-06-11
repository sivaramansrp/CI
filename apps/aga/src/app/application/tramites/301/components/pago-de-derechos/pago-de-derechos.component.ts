/* eslint-disable @nx/enforce-module-boundaries */
/* eslint-disable no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ConfiguracionColumna, ConsultaioQuery, GENERAR_LINEA_CAPTURA_URL, REGEX_LINEA_CAPTURA, TablaDinamicaComponent, TablaSeleccion, TablePaginationComponent } from '@ng-mf/data-access-user';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  Solicitud301State,
  Tramite301Store,
} from '../../../../core/estados/tramites/tramite301.store';
import { Subject, Subscription, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { PAGO_DE_DERECHOS_TABLA } from '../../constantes/301.enum';
import { PagoDeDerechosTabla } from '../../models/301.models';
import { TituloComponent } from 'libs/shared/data-access-user/src/tramites/components/titulo/titulo.component';
import { Tramite301Query } from '../../../../core/queries/tramite301.query';

/**
 * Componente `PagoDeDerechosComponent`
 *
 * Este componente se encarga de gestionar un formulario para la solicitud de pago de derechos.
 * El formulario contiene campos como la línea y el monto del pago. Al inicializarse, se configura el formulario
 * y se establece un valor predeterminado para el campo 'monto', deshabilitándolo.
 *
 * @component
 * @example
 * <app-pago-de-derechos></app-pago-de-derechos>
 */
@Component({
  selector: 'app-pago-de-derechos',
  templateUrl: './pago-de-derechos.component.html',
  styleUrls: ['./pago-de-derechos.component.scss'],
  standalone: true,
  imports: [CommonModule, TituloComponent, ReactiveFormsModule, TablaDinamicaComponent, TablePaginationComponent],
})
export class PagoDeDerechosComponent implements OnInit, OnDestroy {
  /**
   * Referencia a la clase o enumeración `TablaSeleccion`.
   *
   * Esta propiedad se utiliza para acceder a las funcionalidades
   * o valores definidos en `TablaSeleccion` dentro del componente.
   */
  public TablaSeleccion = TablaSeleccion;

  /**
   * Configuración de las columnas de la tabla.
   */
  public encabezadoDeTabla: ConfiguracionColumna<PagoDeDerechosTabla>[]= PAGO_DE_DERECHOS_TABLA;

  /**
   * Define los datos que se mostrarán en la tabla dinámica.
   */
  public datosTabla: PagoDeDerechosTabla[] = [];

  private listaSeleccionadas: PagoDeDerechosTabla[] = [];

  @ViewChild('modalConfirmacionRef') modalConfirmacionRef!: ElementRef;

  /**
   * Formulario reactivo que contiene los campos de datos del importador/exportador.
   * El formulario incluye un campo 'linea' y un campo 'monto' con validaciones de 'required'.
   *
   * @type {FormGroup}
   */
  FormSolicitud!: FormGroup;

  /**
   * Suscripción a los cambios en el formulario reactivo.
   */
  private subscription: Subscription = new Subscription();

  /**
   * Estado de la solicitud de la sección 301.
   */
  public solicitudState!: Solicitud301State;

  /**
   * Subject para notificar la destrucción del componente.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
   */
  esFormularioSoloLectura: boolean = false;

  /**
   * URL utilizada para generar la línea de captura.
   * Esta constante apunta al endpoint definido por GENERAR_LINEA_CAPTURA_URL.
   */
  public generarLineaCapturaURL: string = GENERAR_LINEA_CAPTURA_URL;

  /**
   * Constructor del componente `PagoDeDerechosComponent`.
   *
   * Inicializa la instancia de `FormBuilder` para crear formularios reactivos.
   *
   * @param {FormBuilder} fb - Instancia de FormBuilder utilizada para construir formularios reactivos.
   */
  constructor(
    private fb: FormBuilder,
    private tramite301Store: Tramite301Store,
    private tramite301Query: Tramite301Query,
    private consultaioQuery: ConsultaioQuery,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    /**
     * Se suscribe al estado de `Consultaio` para obtener información actualizada del estado del formulario.
     *
     * - Asigna el valor de solo lectura (`readonly`) a la propiedad `esFormularioSoloLectura`.
     * - Llama a `inicializarEstadoFormulario()` para aplicar configuraciones basadas en el estado recibido.
     * - La suscripción se cancela automáticamente cuando `destroyNotifier$` emite un valor (para evitar fugas de memoria).
     */
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
   * Método del ciclo de vida que se ejecuta al iniciar el componente.
   * Llama a la función para inicializar el estado del formulario.
   */
  ngOnInit(): void {
    this.inicializarEstadoFormulario();
  }

  /**
   * Evalúa si se debe inicializar o cargar datos en el formulario.
   */
  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario(); // Llama al método para cargar los datos del formulario
    } else {
      this.inicializarFormulario();
    }
  }

  /**
   * Inicializa el formulario reactivo para capturar el valor de 'registro'.
   * Suscribe al estado almacenado en el store mediante el query `tramite301Query.selectSolicitud$`
   * y lo asigna a la variable local `solicitudState`. Luego, crea el formulario
   * con el valor inicial obtenido del store.
   */

  inicializarFormulario(): void {
    // Inicializa el formulario con validaciones requeridas
    this.subscription.add(
      this.tramite301Query.selectSolicitud$
        .pipe(
          takeUntil(this.destroyNotifier$),
          map((seccionState) => {
            this.solicitudState = seccionState;
            if (
            this.solicitudState &&
            typeof this.solicitudState === 'object' &&
            this.solicitudState !== null &&
            'pagoDerechosTabla' in this.solicitudState
          ) {
            const PAGO_DERECHOS = this.solicitudState['pagoDerechosTabla'] as Array<{ lineaDeCaptura: string; monto?: number }>;
            PAGO_DERECHOS.forEach((productoItem: { lineaDeCaptura: string; monto?: number }) => {
              const IS_ALREADY_ADDED = this.datosTabla.some(
              (item: { lineaDeCaptura: string }) => item.lineaDeCaptura === productoItem.lineaDeCaptura
            );

            if (!IS_ALREADY_ADDED) {
              this.datosTabla.push({
                lineaDeCaptura: productoItem.lineaDeCaptura,
                monto: 4845
              });
            }
            });
          }
          })
        )
        .subscribe()
    );

    this.FormSolicitud = this.fb.group({
      pagodederechos: this.fb.group({
        linea: [this.solicitudState?.linea, [Validators.required, Validators.maxLength(20),
                  Validators.pattern(REGEX_LINEA_CAPTURA)]],
        monto: ['', Validators.required]
      }),
    });
    // Llama al método para actualizar el campo 'monto'
    this.updateformfied();
  }

  /**
   * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
   * Luego reinicializa el formulario con los valores actualizados desde el store.
   */
  /**
   * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
   * Luego reinicializa el formulario con los valores actualizados desde el store.
   */
  guardarDatosFormulario(): void {
    this.inicializarFormulario();
    if (this.esFormularioSoloLectura) {
      this.FormSolicitud.disable();
    } else if (!this.esFormularioSoloLectura) {
      this.FormSolicitud.enable();
    } else {
      // No se requiere ninguna acción en el formulario
    }
}

  /**
   * Método `updateformfied()`.
   * Este método se encarga de actualizar el campo 'monto' dentro del formulario:
   * - Deshabilita el campo 'monto'.
   * - Establece el valor predeterminado de 'monto' a '4845'.
   *
   * @memberof PagoDeDerechosComponent
   */
  updateformfied(): void {
    // Deshabilita el campo 'monto' y asigna el valor '4845'
    this.FormSolicitud.get('pagodederechos.monto')?.disable();
    this.FormSolicitud.get('pagodederechos.monto')?.setValue('4845');
  }

  /**
   * Método `onSubmit()`.
   * Este método se ejecuta cuando se envía el formulario y realiza las siguientes acciones:
   * - Valida si el formulario es válido.
   * - Llama al método `setValoresStore()` para guardar los valores del formulario en el estado.
   *
   * @param {FormGroup} form - Formulario reactivo que contiene los campos de datos del importador/exportador.
   * @memberof PagoDeDerechosComponent
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite301Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite301Store[metodoNombre] as (value: any) => void)(VALOR);
  }

  /**
   * Verifica si el control del formulario es inválido y ha sido tocado.
   * @returns {boolean | null} `true` si el control es inválido y tocado, `null` si no existe el control.
   */
  isInvalid(): boolean | null {
    const CONTROL = this.lineaControl;
    return CONTROL ? CONTROL.invalid && CONTROL.touched : null;
  }

  get lineaControl(): import('@angular/forms').AbstractControl | null {
    return this.FormSolicitud.get('pagodederechos.linea');
  }

  agregar(): void {
    const LINEA = this.lineaControl?.value ?? '';
    const YA_EXISTE = this.datosTabla.some(d => d.lineaDeCaptura === LINEA);
    if (YA_EXISTE) {
      const MODAL = new bootstrap.Modal(this.modalConfirmacionRef.nativeElement);
      MODAL.show();
      return;
    }

    if (this.FormSolicitud.get('pagodederechos')?.valid) {
      const DATOS = {
        lineaDeCaptura: this.lineaControl?.value ?? '',
        monto: this.FormSolicitud.get('pagodederechos.monto')?.value ?? ''
      };
      this.datosTabla.push(DATOS);
      this.tramite301Store.setPagoDerechosTabla('pagoDerechosTabla', this.datosTabla);
      this.limpiar();
    } else {
      this.FormSolicitud.get('pagodederechos')?.markAllAsTouched();
      this.changeDetectorRef.detectChanges();
    }
  }

  limpiar(): void {
    this.lineaControl?.reset();
  }

  eliminar(): void {
    if (this.listaSeleccionadas.length) {
      this.listaSeleccionadas.forEach((ele: PagoDeDerechosTabla) => {
        const INDICE = this.datosTabla.findIndex((item) => item.lineaDeCaptura === ele.lineaDeCaptura);
        if (INDICE !== -1) {
          this.datosTabla.splice(INDICE, 1);
          this.tramite301Store.setPagoDerechosTabla('pagoDerechosTabla', this.datosTabla);
        }
      });
    }
  }

  listaDeFilaSeleccionada(event: PagoDeDerechosTabla[]): void {
    this.listaSeleccionadas = [];
    this.listaSeleccionadas = event;
  }

  /**
   * Método `ngOnDestroy()`.
   * Este método se ejecuta cuando el componente se destruye y realiza las siguientes acciones:
   * - Desuscribe la suscripción a los cambios en el formulario reactivo.
   *
   * @memberof PagoDeDerechosComponent
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}