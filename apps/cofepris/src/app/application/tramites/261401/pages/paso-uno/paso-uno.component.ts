import { Catalogo, ConfiguracionColumna } from '@libs/shared/data-access-user/src';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CONFIGURACIONCOLUMNA } from '../../enums/tramite-asociados.enum';
import { Solicitud261401State } from '../../../../estados/tramites/tramite261401.store';
import { SolicitudModificacionPermisoSalidaTerritorioService } from '../../services/solicitud-modificacion-permiso-salida-territorio.service';
import { Subject } from 'rxjs';
import { Tramite261401Query } from '../../../../estados/queries/tramite261401.query';
import { Tramite261401Store } from '../../../../estados/tramites/tramite261401.store';
import { TramiteAsociados } from '../../../../shared/models/tramite-asociados.model';
import { takeUntil } from 'rxjs';
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
})
export class PasoUnoComponent implements OnInit {
  indice: number = 1;

  configuracionTabla: ConfiguracionColumna<TramiteAsociados>[] = CONFIGURACIONCOLUMNA;

  tramiteAsociados!: TramiteAsociados[];
  private notificadorDestruccion$: Subject<void> = new Subject();
  formularioPagoDerechos!: FormGroup;
  banco!: Catalogo[];
  estadoSolicitudPermiso!: Solicitud261401State;
  constructor(
    private formBuilder: FormBuilder,
    private solicitudPermisoService: SolicitudModificacionPermisoSalidaTerritorioService,
    private tramite261401Store: Tramite261401Store,
    private tramite261401Query: Tramite261401Query,
  ) {
    // Constructor
  }
  ngOnInit(): void {
    this.tramite261401Query.selectSolicitud$
    .pipe(takeUntil(this.notificadorDestruccion$))
    .subscribe((estadoSolicitudPermiso: Solicitud261401State) => {
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
    this.tramite261401Store.actualizarEstado({[$event.campo]: VALOR});
  }
}
