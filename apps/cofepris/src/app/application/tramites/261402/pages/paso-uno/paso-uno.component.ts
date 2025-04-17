/**
 * Componente que representa el primer paso del proceso de modificación de permiso de salida del territorio.
 * Este componente gestiona la configuración de trámites asociados, el formulario de pago de derechos y la navegación entre pestañas.
 */
import { Catalogo, ConfiguracionColumna } from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Solicitud261402State, Tramite261402Store } from '../../../../estados/tramites/tramite261402.store';
import { Subject, takeUntil } from 'rxjs';
import { CONFIGURACIONCOLUMNA } from '../../enums/tramite-asociados.enum';
import { SolicitudModificacionPermisoInternacionService } from '../../services/solicitud-modificacion-permiso-internacion.service';
import { Tramite261402Query } from '../../../../estados/queries/tramite261402.query';
import { TramiteAsociados } from '../../../../shared/models/tramite-asociados.model';

/**
 * Decorador que define el componente Angular para el primer paso del proceso.
 * Incluye el selector del componente y la ruta de su plantilla HTML.
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
})
/**
 * Clase que representa el componente Angular para el primer paso del proceso.
 * Implementa las interfaces OnInit y OnDestroy para gestionar el ciclo de vida del componente.
 */
export class PasoUnoComponent implements OnInit, OnDestroy {
  /**
   * Índice de la pestaña seleccionada.
   */
  indice: number = 1;

  /**
   * Subject utilizado para manejar la destrucción de suscripciones.
   */
  private notificadorDestruccion$: Subject<void> = new Subject();
  formularioPagoDerechos!: FormGroup;
  estadoSolicitudPermiso!: Solicitud261402State;
  tramiteAsociados!: TramiteAsociados[];
  banco!: Catalogo[];
  configuracionTabla: ConfiguracionColumna<TramiteAsociados>[] = CONFIGURACIONCOLUMNA;
  /**
   * Constructor del componente.
   * Param formBuilder Constructor para formularios reactivos.
   * Param solicitudPermisoService Servicio para manejar datos relacionados con la solicitud de permiso.
   * Param tramite261401Store Store para gestionar el estado del trámite.
   * Param tramite261401Query Query para obtener datos del estado del trámite.
   */
  constructor(private formBuilder: FormBuilder,
    private solicitudPermisoService: SolicitudModificacionPermisoInternacionService,
    private tramite261402Store: Tramite261402Store,
    private tramite261402Query: Tramite261402Query,) {
    // Constructor
  }

  ngOnInit(): void {
    this.inicializarDatosSolicitud();
  }

  inicializarDatosSolicitud(): void {
    this.tramite261402Query.selectSolicitud$
      .pipe(takeUntil(this.notificadorDestruccion$))
      .subscribe((estadoSolicitudPermiso: Solicitud261402State) => {
        this.estadoSolicitudPermiso = estadoSolicitudPermiso;
      });

    this.solicitudPermisoService
      .obtenerTramitesAsociados()
      .pipe(takeUntil(this.notificadorDestruccion$))
      .subscribe(tramiteAsociados => {
        this.tramiteAsociados = tramiteAsociados;
      });

    this.solicitudPermisoService.inicializaPagoDeDerechosDatosCatalogos();
  }
  /**
   * Cambia la pestaña seleccionada y, si es la pestaña de pago, inicializa el formulario de pago.
   * Param i Índice de la pestaña seleccionada.
   */
  seleccionaTab(i: number): void {
    if (i === 4) {
      this.banco = this.solicitudPermisoService.banco;
      this.crearformularioPagoDerechos();
    }
    this.indice = i;
  }

  crearformularioPagoDerechos(): void {
    this.formularioPagoDerechos = this.formBuilder.group({
      claveDeReferencia: new FormControl(
        this.estadoSolicitudPermiso.claveDeReferencia,
        Validators.required
      ),
      cadenaPagoDependencia: new FormControl(
        this.estadoSolicitudPermiso.cadenaPagoDependencia,
        Validators.required
      ),
      bancoClave: new FormControl(
        this.estadoSolicitudPermiso.bancoClave,
        Validators.required
      ),
      llaveDePago: new FormControl(
        this.estadoSolicitudPermiso.llaveDePago,
        Validators.required
      ),
      fecPago: new FormControl(
        this.estadoSolicitudPermiso.fecPago,
        Validators.required
      ),
      impPago: new FormControl(
        this.estadoSolicitudPermiso.impPago,
        [Validators.required, Validators.min(0)]
      ),
    });
  }

  setValoresStore($event: {
    formularioPagoDerechos: FormGroup;
    campo: string;
  }): void {
    const VALOR = $event.formularioPagoDerechos.get($event.campo)?.value;
    this.tramite261402Store.actualizarEstado({ [$event.campo]: VALOR });
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
   * Completa el Subject para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.notificadorDestruccion$.next();
    this.notificadorDestruccion$.complete();
  }
}