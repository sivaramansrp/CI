import { AVISO, ERROR_FORMA_ALERT, ListaPasosWizard, PASOS, esValidObject, getValidDatos} from '@libs/shared/data-access-user/src';
import { AutorizacionProsecStore, ProsecState } from '../../estados/autorizacion-prosec.store';
import { Component, EventEmitter, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { Subject, map, takeUntil } from 'rxjs';

import { DatosPasos } from '@libs/shared/data-access-user/src/core/models/shared/components.model';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { ToastrService } from 'ngx-toastr';

import { AUtorizacionProsecQuery } from '../../estados/autorizacion-prosec.query';
import { GuardarMappingAdapter } from '../../adapters/guardar-mapping.adapter';
import { RegistroSolicitudService } from '@libs/shared/data-access-user/src';

import { WizardComponent } from '@libs/shared/data-access-user/src/tramites/components/wizard/wizard.component';

/**
 * Interfaz para definir la estructura de los botones de acción.
 * Contiene la acción y el valor del botón.
 */
interface AccionBoton {
  accion: string;
  valor: number;
}

/**
 * Componente principal para la gestión de prosec.
 * Contiene la lógica y la estructura del asistente de prosec.
 */
@Component({
  selector: 'app-prosec',
  templateUrl: './prosec.component.html',
})
export class ProsecComponent implements OnInit, OnDestroy {
  pasos: ListaPasosWizard[] = PASOS;
  indice: number = 1;
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };
  idSolicitudState: number | null = 90202; 
  cargarArchivosEvento = new EventEmitter<void>();
  activarBotonCargaArchivos: boolean = false;
  seccionCargarDocumentos: boolean = true;
  idSolicitud: number = 0;
  public solicitudState!: ProsecState;
  cargaEnProgreso: boolean = true;
  tramiteId: string = '90102';
  destroyNotifier$: Subject<void> = new Subject();
  TEXTOS = AVISO;
  @ViewChild('pasoUnoRef') pasoUnoComponent!: PasoUnoComponent;
  public formErrorAlert = ERROR_FORMA_ALERT;
  esFormaValido: boolean = false;
  infoError = 'alert-danger text-center';

  constructor(
    private toastrService: ToastrService,
    private registroSolicitudService: RegistroSolicitudService,
    private store: AutorizacionProsecStore,
    public tramiteQuery: AUtorizacionProsecQuery
  ) {}

  ngOnInit(): void {
    this.tramiteQuery.selectProsec$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      ).subscribe();
  }

  getValorIndice(e: AccionBoton): void {
    if (e.accion === 'cont') {
      let isValid = true;
      if (this.indice === 1 && this.pasoUnoComponent) {
        isValid = this.pasoUnoComponent.validarFormularios();
      }
      if (!isValid) {
        this.formErrorAlert = ERROR_FORMA_ALERT;
        this.esFormaValido = true;
        this.datosPasos.indice = this.indice;
        setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 0);
        return;
      }
      const PAYLOAD = GuardarMappingAdapter.toFormPayload(this.solicitudState);
      this.registroSolicitudService.postGuardarDatos(this.tramiteId, PAYLOAD).subscribe(response => {
        const SHOULD_NAVIGATE = response.codigo === '00';
        if (!SHOULD_NAVIGATE) {
          this.esFormaValido = true;
          this.indice = 1;
          this.datosPasos.indice = 1;
          this.wizardComponent.indiceActual = 1;
          setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 0);
          return;
        }
        this.esFormaValido = false;
        if (esValidObject(response) && esValidObject(response.datos)) {
          const DATOS = response.datos as { id_solicitud?: number };
          const ID_SOLICITUD = getValidDatos(DATOS.id_solicitud) ? (DATOS.id_solicitud ?? 0) : 0;
          this.solicitudState.idSolicitud = ID_SOLICITUD;
          this.store.setIdSolicitud(ID_SOLICITUD);
        }
        this.toastrService.success(response.mensaje);
        this.indice = 2;
        this.datosPasos.indice = 2;
        this.wizardComponent.siguiente();
      });
    } else {
      this.indice = e.valor;
      this.datosPasos.indice = this.indice;
      this.wizardComponent.atras();
    }
  }

  manejaEventoCargaDocumentos(carga: boolean): void {
    this.activarBotonCargaArchivos = carga;
  }

  cargaRealizada(cargaRealizada: boolean): void {
    this.seccionCargarDocumentos = cargaRealizada ? false : true;
  }

  siguiente(): void {
    this.wizardComponent.siguiente();
    this.indice = this.wizardComponent.indiceActual + 1;
    this.datosPasos.indice = this.wizardComponent.indiceActual + 1;
  }

  anterior(): void {
    this.wizardComponent.atras();
    this.indice = this.wizardComponent.indiceActual + 1;
    this.datosPasos.indice = this.wizardComponent.indiceActual + 1;
  }

  onClickCargaArchivos(): void {
    this.cargarArchivosEvento.emit();
  }

  onCargaEnProgreso(carga: boolean): void {
    this.cargaEnProgreso = carga;
  }

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
