import { Catalogo, ConsultaioQuery, Notificacion, RespuestaCatalogos } from '@ng-mf/data-access-user';
import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, map, takeUntil } from 'rxjs';
import { AgriculturaApiService } from '../../services/220202/agricultura-api.service';
import { FitosanitarioQuery } from '../../queries/fitosanitario.query';
import { HttpClient } from '@angular/common/http';
import { PagoDeDerecho } from '../../../../shared/models/tercerosrelacionados.model';
import { PagoDeDerechoComponent } from '../../../../shared/components/pago-de-derecho/pago-de-derecho.component';
import { PagoDeDerechos } from '../../models/220202/fitosanitario.model';
import { ReactiveFormsModule } from '@angular/forms';
import {CatalogosService} from '../../services/220202/catalogos/catalogos.service';

/**
 * Componente para el formulario de pago de derechos.
 * Este componente maneja la lógica y la presentación del formulario de pago de derechos,
 * incluyendo la gestión de los campos del formulario y la obtención de las listas de opciones.
 * @class PagoDeDerechosComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-pago-de-derechos',
  templateUrl: './pago-de-derechos.component.html',
  styleUrls: ['./pago-de-derechos.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, PagoDeDerechoComponent],
})
export class PagoDeDerechosComponent implements OnInit, OnDestroy {
  /**
   * Datos del pago de derechos.
   * @type {PagoDeDerechos}
   */
  pagoData: PagoDeDerechos = {} as PagoDeDerechos;

    /**
     * Referencia al componente hijo de pago de derechos.
     * Permite acceder a los métodos y propiedades del componente PagoDeDerechoComponent.
     * 
     * @public
     * @type {PagoDeDerechoComponent}
     * @memberof PagoDeDerechosComponent
     */
    @ViewChild('pagoDerechosRef') pagoDerechos!: PagoDeDerechoComponent;
  /**
   * Sujeto para manejar la destrucción de observables y evitar fugas de memoria.
   */
  private destroyNotifier$ = new Subject<void>();

  /**
   * Indica si el formulario debe mostrarse en modo solo lectura.
   *
   * @remarks
   * Cuando esta propiedad es `true`, los campos del formulario no serán editables por el usuario.
   *
   * @compodoc
   * @description
   * Determina si el formulario se presenta únicamente para consulta, deshabilitando la edición de los campos.
   */
  esFormularioSoloLectura: boolean = false;

  /**
   * Objeto que contiene la información relacionada con el pago de derechos.
   * Este objeto se utiliza para inicializar el formulario y manejar los datos del pago.
   */
  public pagoSelect: PagoDeDerecho = {
    bancoSelector: [],
    justificacionSelector: [],
  };

  /**
 * Representa una nueva notificación que será utilizada en el componente.
 * @type {Notificacion}
 */
  public nuevaNotificacion!: Notificacion;

  /**
* @description Referencia al componente PagoDeDerechoComponent.
* Esta referencia permite acceder a los métodos y propiedades del componente PagoDeDerechoComponent,
* @type {PagoDeDerechoComponent}
* @viewChild PagoDeDerechosComponent
*/
  @ViewChild(PagoDeDerechoComponent) pagoDeDerechoComponentRef!: PagoDeDerechoComponent;

  /**
   * Constructor del componente. Inyecta los servicios y realiza una carga inicial de catálogos.
   * @param fb Constructor de formularios reactivos.
   * @param httpServicios Cliente HTTP para peticiones.
   * @param agriculturaApiService Servicio para actualizar datos de pago.
   * @param fitosanitarioQuery Fuente de datos del estado actual de certificado.
   * @param consultaQuery Fuente de datos del estado de consulta.
   */
  constructor(
    private readonly agriculturaApiService: AgriculturaApiService,
    private readonly fitosanitarioQuery: FitosanitarioQuery,
    private readonly consultaioQuery: ConsultaioQuery,
    private readonly cdr: ChangeDetectorRef,
    public catalogosService: CatalogosService,
    private readonly httpServicios: HttpClient,
  ) {
     this.obtenerBancoSelectorList();
    this.obtenerListaDeJustificaciones();
  }
  

  /**
   * Ciclo de vida de Angular que se ejecuta al iniciar el componente.
   * Suscribe al estado del formulario para rellenar datos y verificar validez.
   */
  ngOnInit(): void {
    this.fitosanitarioQuery.seleccionarPagoDerechos$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((datosDeLaSolicitud) => {
        if (datosDeLaSolicitud) {
          this.pagoData = datosDeLaSolicitud;
        }
      });
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
        })
      )
      .subscribe();
  }

    /**
   * Realiza una petición para obtener el catálogo de bancos.
   */
      obtenerBancoSelectorList(): void {
    this.catalogosService.obtieneCatalogoBanco(220202)
      .pipe(
        takeUntil(this.destroyNotifier$)
      ).subscribe(
      (data): void => {
         this.pagoSelect.bancoSelector = data.datos ?? [];
      }
    );
    
  }

  /**
   * Realiza una petición para obtener el catálogo de justificaciones.
   */
  obtenerListaDeJustificaciones(): void {
    this.catalogosService.obtieneCatalogoJustificacion(220202)
      .pipe(
        takeUntil(this.destroyNotifier$)
      ).subscribe(
      (data): void => {
         this.pagoSelect.justificacionSelector = data.datos ?? [];
      }
    );
  }


  /**
   * Envía los valores actuales del formulario al store compartido.
   */
  onPagoChanged(event: PagoDeDerechos): void {
    this.agriculturaApiService.updatePagoDeDerechos(event as PagoDeDerechos);
  }

  /**
  * @description Valida todos los campos del formulario y marca los campos como touched
  * para mostrar los errores de validación en los componentes app-catalogo-select
  * @method validarFormulario
  * @returns { valido: boolean; mensaje?: string } true si el formulario es válido, false en caso contrario
  */
  public validarFormulario(): { valido: boolean; mensaje?: string } {
    // Marcar todos los campos como touched
    if (!this.pagoDeDerechoComponentRef.validarFormulario()) {
      return { valido: false };
    }
    return { valido: true };
  }

  /**
   * Limpia las suscripciones para evitar fugas de memoria al destruir el componente.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
