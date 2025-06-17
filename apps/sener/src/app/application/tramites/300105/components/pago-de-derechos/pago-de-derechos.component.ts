import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import {
  Tramite300105State,
  Tramite300105Store,
} from '../../estados/tramite300105.store';
import { AutorizacionDeRayosXService } from '../../services/autorizacion-de-rayos-x.service';
import { Catalogo } from '@libs/shared/data-access-user/src/core/models/shared/catalogos.model';
import { CatalogosSelect } from '@libs/shared/data-access-user/src/core/models/shared/components.model';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { INPUT_FECHA_CONFIG } from '../../enum/permiso.enum';
import { Tramite300105Query } from '../../estados/tramite300105.query';

/**
 * Componente para la sección de pago de derechos.
 * Este componente gestiona el formulario y la lógica relacionada con el pago de derechos en el trámite 300105.
 */
@Component({
  selector: 'app-pago-de-derechos',
  templateUrl: './pago-de-derechos.component.html',
})
export class PagoDeDerechosComponent implements OnInit, OnDestroy {
  /**
   * Formulario de la solicitud.
   * Contiene los datos relacionados con el pago de derechos.
   */
  formSolicitud!: FormGroup;

  /**
   * Estado de la solicitud de la sección 300105.
   * Representa el estado actual del trámite.
   */
  public solicitudState!: Tramite300105State;

  /**
   * Subject para notificar la destrucción del componente.
   * Se utiliza para limpiar las suscripciones activas.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Constante para configurar el input de fecha.
   * Define las propiedades del campo de entrada de fecha.
   */
  INPUT_FECHA_CONFIG = INPUT_FECHA_CONFIG;

  /**
   * Catálogo de bancos.
   * Contiene la lista de bancos disponibles para seleccionar en el formulario.
   */
  public bancoCatalogo: CatalogosSelect = {
    labelNombre: 'Banco',
    required: true,
    primerOpcion: 'Selecciona un valor',
    catalogos: [],
  };

  /**
  * Indica si el formulario está en modo solo lectura.
  * Cuando es `true`, los campos del formulario no se pueden editar.
  */
  esFormularioSoloLectura: boolean = false; 

  /**
   * Constructor del componente.
   * Inicializa los servicios y configura el formulario.
   * Parámetros:
   *   - fb: Servicio para construir formularios reactivos.
   *   - tramite300105Store: Store para gestionar el estado del trámite.
   *   - tramite300105Query: Query para consultar el estado del trámite.
   *   - autorizacionDeRayosXService: Servicio para obtener datos relacionados con rayos X.
   */
  constructor(
    private fb: FormBuilder,
    private tramite300105Store: Tramite300105Store,
    private tramite300105Query: Tramite300105Query,
    @Inject(AutorizacionDeRayosXService)
    private autorizacionDeRayosXService: AutorizacionDeRayosXService,
    private consultaioQuery: ConsultaioQuery,
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
      })
    )
    .subscribe()
    this.fetchBancoData();
  }

  /**
   * Método ngOnInit
   * Descripción: Inicializa el componente y configura el formulario con los datos del estado.
   */
  ngOnInit(): void {
    this.tramite300105Query.selectTramite300105$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();

    this.formSolicitud = this.fb.group({
      datosImportadorExportador: this.fb.group({
        claveDeReferencia: [this.solicitudState?.claveDeReferencia],
        cadenaDependencia: [this.solicitudState?.cadenaDependencia],
        banco: [this.solicitudState?.banco],
        llaveDePago: [this.solicitudState?.llaveDePago],
        fechaPago: [this.solicitudState?.fechaPago],
        importePago: [this.solicitudState?.importePago],
      }),
    });

    if(this.esFormularioSoloLectura) {
      this.formSolicitud.disable();
    } else {
      this.formSolicitud.enable();
    }
  }

  /**
   * Método fetchBancoData
   * Descripción: Obtiene los datos del catálogo de bancos desde el servicio.
   * Actualiza el catálogo de bancos en el componente.
   */
  fetchBancoData(): void {
    this.autorizacionDeRayosXService
      .getBancoData()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data): void => {
        this.bancoCatalogo.catalogos = data as Catalogo[];
      });
  }

  /**
   * Método manejarCambioLlavePago
   * Descripción: Capitaliza el valor de la llave de pago y actualiza el estado en el store.
   */
  manejarCambioLlavePago(): void {
    const VALOR_EN_MAYUSCULAS = this.datosImportadorExportador.get('llaveDePago')?.value.toUpperCase();
    this.datosImportadorExportador.get('llaveDePago')?.setValue(VALOR_EN_MAYUSCULAS);
    this.tramite300105Store.setllaveDePago(
      VALOR_EN_MAYUSCULAS
    );
  }

  /**
   * Método setValoresStore
   * Descripción: Actualiza un valor específico en el store utilizando el método correspondiente.
   * Parámetros:
   *   - form: Formulario reactivo que contiene los datos.
   *   - campo: Nombre del campo cuyo valor se actualizará en el store.
   *   - metodoNombre: Nombre del método del store que se utilizará para actualizar el valor.
   */
  setValoresStore(form: FormGroup, campo: string): void {
    const VALOR = form.get(campo)?.value;
    this.tramite300105Store.establecerDatos({[campo]: VALOR});
  }

  /**
   * Método ngOnDestroy
   * Descripción: Limpia las suscripciones activas y notifica la destrucción del componente.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

  /**
   * Getter datosImportadorExportador
   * Descripción: Devuelve el formulario anidado de datos del importador/exportador.
   */
  get datosImportadorExportador(): FormGroup {
    return this.formSolicitud.get('datosImportadorExportador') as FormGroup;
  }
}