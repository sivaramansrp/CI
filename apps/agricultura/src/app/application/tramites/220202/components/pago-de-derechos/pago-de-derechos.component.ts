import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import {
  Subject,
  takeUntil
} from 'rxjs';
import { AgriculturaApiService } from '../../services/220202/agricultura-api.service';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { FitosanitarioQuery } from '../../queries/fitosanitario.query';
import { PagoDeDerechoComponent } from '../../../../shared/components/pago-de-derecho/pago-de-derecho.component';
import { PagoDeDerechos } from '../../models/220202/fitosanitario.model';
import {
  ReactiveFormsModule,
} from '@angular/forms';
import { map } from 'rxjs';

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
  imports: [
    ReactiveFormsModule,
    PagoDeDerechoComponent
  ]
})
export class PagoDeDerechosComponent implements OnInit, OnDestroy {


  /**
   * Datos del pago de derechos.
   * @type {PagoDeDerechos}
   */
  pagoData: PagoDeDerechos = {} as PagoDeDerechos;
  
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
    private readonly cdr: ChangeDetectorRef
  ) {
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
               this.cdr.detectChanges();
            })
          )
          .subscribe();

  }

  /**
 * Envía los valores actuales del formulario al store compartido.
 */
  onPagoChanged(event: PagoDeDerechos): void {
    this.agriculturaApiService.updatePago(event as PagoDeDerechos);
  }

  /**
   * Limpia las suscripciones para evitar fugas de memoria al destruir el componente.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
