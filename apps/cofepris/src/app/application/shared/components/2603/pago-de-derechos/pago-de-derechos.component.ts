import { Catalogo, CatalogoSelectComponent, InputFecha, InputFechaComponent, REGEX_ALFANUMERICO_CON_ESPACIOS, REGEX_PATRON_DECIMAL_2 } from '@libs/shared/data-access-user/src';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Solicitud2603State, Tramite2603Store } from '../../../estados/stores/2603/tramite2603.store';
import { Subject,map, takeUntil } from 'rxjs';
import { CertificadosLicenciasPermisosService } from '../../../services/shared2603/certificados-licencias-permisos.service';
import { CommonModule } from '@angular/common';
import { ConsultaioState } from '@ng-mf/data-access-user';

import { FECHA_PAGO, INPUT_FECHA_CONFIG } from '../../../constantes/shared2603/certificados-licencias-permisos.enum';
import { TituloComponent } from '@libs/shared/data-access-user/src/tramites/components/titulo/titulo.component';
import { Tramite2603Query } from '../../../estados/queries/2603/tramite2603.query';
/**
 * PagoDeDerechosComponent es responsable de manejar el primer paso del proceso.
 * para actualizar el componente actual que se está mostrando.
 */
@Component({
  selector: 'app-pago-de-derechos',
  standalone: true,
  imports: [CommonModule,TituloComponent,CatalogoSelectComponent,ReactiveFormsModule,InputFechaComponent],
  templateUrl: './pago-de-derechos.component.html',
  styleUrl: './pago-de-derechos.component.scss',
})
export class PagoDeDerechosComponent implements OnInit, OnDestroy {


   /**
   * Constante para configurar el input de fecha.
   * Define las propiedades del campo de entrada de fecha.
   */
    INPUT_FECHA_CONFIG = INPUT_FECHA_CONFIG;

  /**
* @property consultaState
* @description
* Estado actual de la consulta gestionado por el store `ConsultaioQuery`.
*/
  @Input() consultaState!: ConsultaioState;

  /**
   * Representa el catálogo de bancos disponibles para selección.
   * Se espera que esta propiedad sea un arreglo de objetos `Catalogo`,
   * que contienen los detalles de cada banco en el catálogo.
   */
   public bancoCatalogo!: Catalogo[];
  /**
   * Representa el grupo de formularios reactivos para gestionar el formulario de "Pago de Derechos".
   * Este grupo de formularios se utiliza para manejar y validar la entrada del usuario en el proceso de pago de derechos.
   */
   public pagoDerechosForm!: FormGroup;
  /**
   * Configuración para el input de fecha de pago.
   * @property {InputFecha} fechaInicioInput
   */
   public fechaInicioInput: InputFecha = FECHA_PAGO;
   /**
    * Notificador para destruir los observables al finalizar.
    */
   private destroyNotifier$: Subject<void> = new Subject();
  /**
   * Representa el estado del proceso de Solicitud2603.
   * Esta propiedad se utiliza para gestionar y rastrear el estado de la
   * aplicación para el componente "Pago de Derechos".
   */
   public solicitudState!: Solicitud2603State;

  /**
   * Constructor del componente PagoDeDerechosComponent.
   * 
   * @param certificadosLicenciasSvc - Servicio para manejar operaciones relacionadas con certificados, licencias y permisos.
   * @param fb - Instancia de FormBuilder para crear y gestionar formularios reactivos.
   * @param tramite2603Store - Store para gestionar el estado del proceso Tramite 2603.
   * @param tramite2603Query - Servicio de consulta para recuperar datos relacionados con el proceso Tramite 2603.
   */
  constructor(  
    private certificadosLicenciasSvc: CertificadosLicenciasPermisosService,
    private fb: FormBuilder,
    private tramite2603Store: Tramite2603Store,
    private tramite2603Query: Tramite2603Query,
  ) {
   }

  /**
   * Gancho del ciclo de vida que se llama después de que la vista del componente ha sido inicializada.
   * 
   * - Se suscribe al observable `selectSolicitud$` de `tramite2603Query` para actualizar la propiedad `solicitudState`
   *   con el estado más reciente de la sección, asegurando que la suscripción se limpie correctamente utilizando `takeUntil` con `destroyNotifier$`.
   * - Invoca `getBancoCatalogDatos` para obtener los datos del catálogo de bancos.
   * - Llama a `cerrarPagoDerechosForm` para inicializar o restablecer el formulario de pago.
   */
  ngOnInit(): void {
    this.inicializarFormulario();
    this.getBancoCatalogDatos();
    this.cerrarPagoDerechosForm();
    this.deshabilitarFormularios();
  }

  /**
   * Inicializa el formulario suscribiéndose al estado de la solicitud.
   * 
   * Este método se suscribe al observable `selectSolicitud$` del query,
   * y actualiza la propiedad `solicitudState` cada vez que hay cambios en el estado.
   * La suscripción se limpia automáticamente cuando el componente se destruye.
   */
  inicializarFormulario(): void {
    this.tramite2603Query.selectSolicitud$.pipe(
      takeUntil(this.destroyNotifier$),
      map((seccionState) => {
        // Actualiza el estado local de la solicitud con los datos más recientes
        this.solicitudState = seccionState;
      })
    )
      .subscribe();
  }

  /**
   * Restablece e inicializa el grupo de formularios `pagoDerechosForm` con valores
   * del objeto `solicitudState`. Cada control del formulario se llena
   * con la propiedad correspondiente de `solicitudState`.
   *
   * @notas
   * Este método se utiliza para garantizar que el formulario se reinicialice con
   * los valores más recientes del estado, proporcionando una experiencia de usuario consistente.
   *
   * Controles del formulario inicializados:
   * - `claveDeReferencia`: Clave de referencia para el pago.
   * - `cadenaDaLaDependencia`: Información de la cadena de la dependencia.
   * - `banco`: Banco asociado con el pago.
   * - `laveDePago`: Clave de pago (nota: posible error tipográfico en el nombre de la propiedad).
   * - `fechaDePago`: Fecha del pago.
   * - `importeDePago`: Importe del pago.
   */
  public cerrarPagoDerechosForm(): void {
    this.pagoDerechosForm = this.fb.group({
      claveDeReferencia: [this.solicitudState.claveDeReferencia, [Validators.maxLength(9)]],
      cadenaDaLaDependencia: [this.solicitudState.cadenaDaLaDependencia, [Validators.maxLength(14)]],
      banco: [this.solicitudState.banco],
      laveDePago: [this.solicitudState.laveDePago, [Validators.pattern(REGEX_ALFANUMERICO_CON_ESPACIOS), Validators.maxLength(30)]],
      fechaDePago: [this.solicitudState.fechaDePago],
      importeDePago: [this.solicitudState.importeDePago, [Validators.required, Validators.pattern(REGEX_PATRON_DECIMAL_2), Validators.maxLength(16)]],
    });
  }

  /**
   * Obtiene los datos del catálogo de bancos desde el servicio y los asigna a la propiedad `bancoCatalogo`.
   * 
   * Este método llama a la función `getBancoDatos` del servicio `certificadosLicenciasSvc`,
   * se suscribe al observable y procesa la respuesta para extraer la propiedad `data`,
   * que luego se asigna a la propiedad `bancoCatalogo`.
   */
  public getBancoCatalogDatos(): void {
    this.certificadosLicenciasSvc.getBancoDatos().pipe(takeUntil(this.destroyNotifier$)).subscribe((response) => {
      const API_DATOS = JSON.parse(JSON.stringify(response));
      this.bancoCatalogo = API_DATOS.data;
    });
  }

/**
 * Método para cambiar la fecha final.
 * @param nuevo_valor Nuevo valor de la fecha final.
 */
fechaFuturaSeleccionada = false;
  cambioFechaFinal(nuevo_valor: string): void {
    this.pagoDerechosForm.patchValue({
      fechaDePago: nuevo_valor,
    });
    this.tramite2603Store.setFechaDePago(nuevo_valor);
    this.pagoDerechosForm.get('fechaDePago')?.setValue(nuevo_valor);

    let seleccionada: Date | null = null;
    if (nuevo_valor && nuevo_valor.includes('/')) {
      const [DAY, MONTH, YEAR] = nuevo_valor.split('/').map(Number);
      seleccionada = new Date(YEAR, MONTH - 1, DAY);
    } else {
      seleccionada = new Date(nuevo_valor); 
    }

    const HOY = new Date();
    HOY.setHours(0, 0, 0, 0);

  if (seleccionada && seleccionada > HOY) {
    this.fechaFuturaSeleccionada = true;
    this.pagoDerechosForm.get('fechaDePago')?.setErrors({ futureDate: true });
  } else {
    this.fechaFuturaSeleccionada = false;
    this.pagoDerechosForm.get('fechaDePago')?.setErrors(null);
  }
  }

  /**
   * Establece el valor de un campo en el store de Tramite31601.
   * @param form - El grupo de formularios que contiene el campo.
   * @param campo - El nombre del campo cuyo valor se va a establecer.
   * @param metodoNombre - El nombre del método en el store que se utilizará para establecer el valor.
   */
  public setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite2603Store): void {
      const VALOR = form.get(campo)?.value;
      (this.tramite2603Store[metodoNombre] as (value: unknown) => void)(VALOR);
  }
  /**
   * Habilita o deshabilita los controles del formulario según el estado de solo lectura.
   * 
   * Si `consultaState.readonly` es verdadero, deshabilita todos los controles del formulario para evitar modificaciones.
   * Si es falso, habilita los controles para permitir la edición.
   */
  deshabilitarFormularios(): void {
    if (this.consultaState?.readonly) {
      // Si el formulario está en modo solo lectura, deshabilita todos los controles.
      this.pagoDerechosForm.disable();
    } else {
      // Si el formulario es editable, habilita todos los controles.
      this.pagoDerechosForm.enable();
    }
  }

  /**
 * Restablece el formulario de pago de derechos.
 *
 * @description
 * Este método reinicia todos los valores del formulario `pagoDerechosForm`,
 * eliminando cualquier dato ingresado previamente.
 */
  public borrarDatosDelPago(): void {
    this.pagoDerechosForm.reset();
  }
  /**
   * Utilice mayúsculas automáticas en el campo 'laveDePago' a medida que el usuario escribe.
   */
  public onLaveDePagoInput(): void {
    const CONTROL_LAVE_DE_PAGO = this.pagoDerechosForm.get('laveDePago');
    if (CONTROL_LAVE_DE_PAGO) {
      const VALUE = CONTROL_LAVE_DE_PAGO.value;
      if (typeof VALUE === 'string') {
        const SUPERIOR = VALUE.toUpperCase();
        if (VALUE !== SUPERIOR) {
          CONTROL_LAVE_DE_PAGO.setValue(SUPERIOR, { emitEvent: false });
        }
      }
    }
  }
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
