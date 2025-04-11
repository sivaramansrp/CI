import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  Tramite300105State,
  Tramite300105Store,
} from '../../estados/tramite300105.store';
import { Subject, map, takeUntil } from 'rxjs';
import { Catalogo } from '@libs/shared/data-access-user/src/core/models/shared/catalogos.model';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';
import { CatalogosSelect } from '@libs/shared/data-access-user/src/core/models/shared/components.model';
import { CommonModule } from '@angular/common';
import { INPUT_FECHA_CONFIG } from '../../enum/permiso.enum';
import { InputFechaComponent } from '@libs/shared/data-access-user/src/tramites/components/input-fecha/input-fecha.component';
import { AutorizacionDeRayosXService } from '../../services/autorizacion-de-rayos-x.service';
import { TituloComponent } from '@libs/shared/data-access-user/src/tramites/components/titulo/titulo.component';
import { Tramite300105Query } from '../../estados/tramite300105.query';

/**
 * Componente para la sección de pago de derechos.
 */
@Component({
  selector: 'app-pago-de-derechos',
  standalone: true,
  templateUrl: './pago-de-derechos.component.html',
  styleUrls: ['./pago-de-derechos.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputFechaComponent,
    TituloComponent,
    CatalogoSelectComponent,
  ],
})
export class PagoDeDerechosComponent implements OnInit, OnDestroy {
  /**
   * Formulario de la solicitud.
   */
  formSolicitud!: FormGroup;

  /**
   * Estado de la solicitud de la sección 300105.
   */
  public solicitudState!: Tramite300105State;

  /**
   * Subject para notificar la destrucción del componente.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Constante para configurar el input de fecha.
   */
  INPUT_FECHA_CONFIG = INPUT_FECHA_CONFIG;
  /**
   * Constructor del componente.
   */
  constructor(
    private fb: FormBuilder,
    private tramite300105Store: Tramite300105Store,
    private tramite300105Query: Tramite300105Query,
    @Inject(AutorizacionDeRayosXService)
    private autorizacionDeRayosXService: AutorizacionDeRayosXService
  ) {
    this.fetchBancoData();
  }

  /**
   * Catálogo de bancos.
   */
  public bancoCatalogo: CatalogosSelect = {
    labelNombre: 'Banco',
    required: true,
    primerOpcion: 'Selecciona un valor',
    catalogos: [],
  };

  /**
   * Método para actualizar el banco seleccionado.
   * @param e {Catalogo} Banco seleccionado.
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
  }

  /**
   * Método para actualizar el banco seleccionado.
   * @param e {Catalogo} Banco seleccionado.
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
   * Método para actualizar el banco seleccionado.
   * @param e {Catalogo} Banco seleccionado.
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite300105Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (
      this.tramite300105Store[metodoNombre] as (
        value: string | number | null
      ) => void
    )(VALOR);
  }

  /**
   * Método para actualizar el banco seleccionado.
   * @param e {Catalogo} Banco seleccionado.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

  /**
   * Método para actualizar el banco seleccionado.
   * @param e {Catalogo} Banco seleccionado.
   */
  get datosImportadorExportador(): FormGroup {
    return this.formSolicitud.get('datosImportadorExportador') as FormGroup;
  }
}
