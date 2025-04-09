import {
  Catalogo,
  ConfiguracionColumna,
} from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  SolicitudPermisoState,
  Tramite260703Store,
} from '../../estados/store/tramite260703.store';
import { Subject, takeUntil } from 'rxjs';
import { SolicitudPermisoService } from '../../services/solicitud-permiso.service';
import { Tramite260703Query } from '../../estados/query/tramite260703.query';
import { TramiteAsociados } from '../../../../shared/models/tramite-asociados.model';

/**
 * Componente que representa el primer paso en un proceso de múltiples pasos.
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
})
export class PasoUnoComponent implements OnInit, OnDestroy {
  /**
   * El índice de la pestaña actualmente seleccionada.
   */
  indice: number = 1;

  formularioPagoDerechos!: FormGroup;

  estadoSolicitudPermiso!: SolicitudPermisoState;

  tramiteAsociados!: TramiteAsociados[];

  /** Configuración para las columnas de la tabla */
  configuracionTabla: ConfiguracionColumna<TramiteAsociados>[] = [
    { encabezado: '', clave: (item: TramiteAsociados) => item.id, orden: 1 },
    {
      encabezado: 'Folio trámite',
      clave: (item: TramiteAsociados) => item.folioTramite,
      orden: 2,
    },
    {
      encabezado: 'Tipo  trámite',
      clave: (item: TramiteAsociados) => item.tipoTramite,
      orden: 3,
    },
    {
      encabezado: 'Estatus',
      clave: (item: TramiteAsociados) => item.estatus,
      orden: 4,
    },
    {
      encabezado: 'Fecha alta de registro',
      clave: (item: TramiteAsociados) => item.fetchaAltaDeRegistro,
      orden: 5,
    },
  ];

  banco!: Catalogo[];

  /**
   * Observable utilizado para limpiar las suscripciones al destruir el componente.
   * Esto ayuda a evitar fugas de memoria.
   */
  private notificadorDestruccion$: Subject<void> = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private solicitudPermisoService: SolicitudPermisoService,
    private tramite260703Store: Tramite260703Store,
    private tramite260703Query: Tramite260703Query
  ) {
    //
  }

  ngOnInit(): void {
    this.tramite260703Query.selectSolicitudPermiso$
      .pipe(takeUntil(this.notificadorDestruccion$))
      .subscribe((estadoSolicitudPermiso: SolicitudPermisoState) => {
        this.estadoSolicitudPermiso = estadoSolicitudPermiso;
      });

    this.solicitudPermisoService
      .getTramiteAsociados()
      .pipe(takeUntil(this.notificadorDestruccion$))
      .subscribe(tramiteAsociados => {
        this.tramiteAsociados = tramiteAsociados;
      });

    this.solicitudPermisoService.inicializaPagoDeDerechosDatosCatalogos();

  }

  /**
   * Crea el formulario reactivo para capturar los datos del pago de derechos.
   * Algunos campos, como `claveDeReferencia`, `cadenaPagoDependencia` y `impPago`,
   * están deshabilitados porque no deben ser editados por el usuario.
   */
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
      banco: new FormControl(
        this.estadoSolicitudPermiso.bancoseleccionado,
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
        Validators.required
      ),
    });
  }

  setValoresStore($event: {
    formularioPagoDerechos: FormGroup;
    campo: string;
    metodoNombre: string;
  }): void {
    const VALOR = $event.formularioPagoDerechos.get($event.campo)?.value;
    const METODO = $event.metodoNombre;
    switch (METODO) {
      case 'setClaveDeReferencia':
        this.tramite260703Store.setClaveDeReferencia(VALOR);
        break;
      case 'setCadenaPagoDependencia':
        this.tramite260703Store.setCadenaPagoDependencia(VALOR);
        break;
      case 'setBancoseleccionado':
        this.tramite260703Store.setBancoseleccionado(VALOR);
        break;
      case 'setLlaveDePago':
        this.tramite260703Store.setLlaveDePago(VALOR);
        break;
      case 'setFecPago':
        this.tramite260703Store.setFecPago(VALOR);
        break;
      case 'setImpPago':
        this.tramite260703Store.setImpPago(VALOR);
        break;
      default:
        console.error(`Método ${METODO} no existe en Tramite260703Store`);
    }
  }

  /**
   * Selecciona una pestaña estableciendo su índice.
   * El índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    if (i === 4) {
      this.banco = this.solicitudPermisoService.banco;
      this.crearformularioPagoDerechos();
    }
    this.indice = i;
  }

  /**
   * Método del ciclo de vida que se ejecuta al destruir el componente.
   * Limpia las suscripciones para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.notificadorDestruccion$.next();
    this.notificadorDestruccion$.complete();
  }
}
