import { Catalogo, CatalogoSelectComponent,InputFecha, InputFechaComponent } from '@libs/shared/data-access-user/src';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Solicitud260303State, Tramite260303Store } from '../../../../estados/tramites/260303/tramite260303.store';
import { Subject,map, takeUntil } from 'rxjs';
import { CertificadosLicenciasPermisosService } from '../../services/certificados-licencias-permisos.service';
import { CommonModule } from '@angular/common';
import { ConsultaioState } from '@ng-mf/data-access-user';
import { FECHA_PAGO } from '../../services/certificados-licencias-permisos.enum';
import { TituloComponent } from '@libs/shared/data-access-user/src/tramites/components/titulo/titulo.component';
import { Tramite260303Query } from '../../../../estados/queries/260303/tramite260303.query';
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
   * Representa el estado del proceso de Solicitud260303.
   * Esta propiedad se utiliza para gestionar y rastrear el estado de la
   * aplicación para el componente "Pago de Derechos".
   */
   public solicitudState!: Solicitud260303State;

  /**
   * Constructor del componente PagoDeDerechosComponent.
   * 
   * @param certificadosLicenciasSvc - Servicio para manejar operaciones relacionadas con certificados, licencias y permisos.
   * @param fb - Instancia de FormBuilder para crear y gestionar formularios reactivos.
   * @param tramite260303Store - Store para gestionar el estado del proceso Tramite 260303.
   * @param tramite260303Query - Servicio de consulta para recuperar datos relacionados con el proceso Tramite 260303.
   */
  constructor(  
    private certificadosLicenciasSvc: CertificadosLicenciasPermisosService,
    private fb: FormBuilder,
    private tramite260303Store: Tramite260303Store,
    private tramite260303Query: Tramite260303Query,
  ) {
   }

  /**
   * Gancho del ciclo de vida que se llama después de que la vista del componente ha sido inicializada.
   * 
   * - Se suscribe al observable `selectSolicitud$` de `tramite260303Query` para actualizar la propiedad `solicitudState`
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
    this.tramite260303Query.selectSolicitud$.pipe(
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
      claveDeReferencia: [this.solicitudState.claveDeReferencia],
      cadenaDaLaDependencia: [this.solicitudState.cadenaDaLaDependencia],
      banco: [this.solicitudState.banco],
      laveDePago: [this.solicitudState.laveDePago],
      fechaDePago: [this.solicitudState.fechaDePago],
      importeDePago: [this.solicitudState.importeDePago],
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
   * Actualiza la fecha final de pago en el formulario y en el store.
   *
   * Este método establece el valor de fecha proporcionado en el campo 'fechaDePago'
   * del `pagoDerechosForm`, marca el campo como no tocado y actualiza
   * la fecha de pago en el `tramite260303Store`.
   *
   * @param nuevoValor - El nuevo valor de fecha a establecer para la fecha de pago.
   */
  public cambioFechaFinal(nuevoValor: string): void {
    this.pagoDerechosForm.get('fechaDePago')?.setValue(nuevoValor);
    this.pagoDerechosForm.get('fechaDePago')?.markAsUntouched();
    this.tramite260303Store.setFechaDePago(nuevoValor);
  }

  /**
   * Establece el valor de un campo en el store de Tramite31601.
   * @param form - El grupo de formularios que contiene el campo.
   * @param campo - El nombre del campo cuyo valor se va a establecer.
   * @param metodoNombre - El nombre del método en el store que se utilizará para establecer el valor.
   */
  public setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite260303Store): void {
      const VALOR = form.get(campo)?.value;
      (this.tramite260303Store[metodoNombre] as (value: unknown) => void)(VALOR);
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
   * Método del ciclo de vida de Angular que se llama cuando el componente se destruye.
   * Este método completa el observable destroyNotifier$ para cancelar las suscripciones activas.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
