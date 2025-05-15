import {
  Catalogo,
  CatalogosSelect,
  InputFechaComponent,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  SolicitudPagoBancoState,
  TramitePagoBancoStore,
} from '../../estados/stores/pago-banco.store';
import { Subject, map, takeUntil } from 'rxjs';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';
import { CommonModule } from '@angular/common';
import { INPUT_FECHA_CONFIG } from '../../constantes/pago-banco.enum';
import { PagoBancoService } from '../../services/pago-banco.service';
import { TramitePagoBancoQuery } from '../../estados/queries/pago-banco.query';

@Component({
  selector: 'app-pago-de-derechos-banco',
  standalone: true,
  imports: [
    CommonModule,
    CatalogoSelectComponent,
    TituloComponent,
    InputFechaComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './pago-de-derechos-banco.component.html',
  styleUrl: './pago-de-derechos-banco.component.scss',
})
export class PagoDeDerechosBancoComponent implements OnInit, OnDestroy {
  /**
   * Formulario de la solicitud.
   */
  formSolicitud!: FormGroup;

  /**
   * Estado de la solicitud de la sección PagoBanco.
   */
  public solicitudState!: SolicitudPagoBancoState;

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
    private tramitePagoBancoStore: TramitePagoBancoStore,
    private tramitePagoBancoQuery: TramitePagoBancoQuery,
    @Inject(PagoBancoService)
    private service: PagoBancoService
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
    this.tramitePagoBancoQuery.selectSolicitud$
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
    this.service
      .getBancoData()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data): void => {
        this.bancoCatalogo.catalogos = data as Catalogo[];
      });
  }

  /**
   * Actualiza el campo de fecha de pago en el formulario y en el estado global.
   *
   * @param nuevo_fechaPago Nueva fecha de pago seleccionada.
   */
  cambioFechaPago(nuevo_fechaPago: string): void {
    this.datosImportadorExportador.patchValue({
      fechaPago: nuevo_fechaPago,
    });
    this.setValoresStore(this.datosImportadorExportador, 'fechaPago', 'setFechaPago');
  }

  /**
   * Método para actualizar el banco seleccionado.
   * @param e {Catalogo} Banco seleccionado.
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof TramitePagoBancoStore
  ): void {
    const VALOR = form.get(campo)?.value;
    (
      this.tramitePagoBancoStore[metodoNombre] as (
        value: string | number | null
      ) => void
    )(VALOR);
  }

  /**
  * @method borrarDatos
  * @description
  * Método que limpia los datos del formulario relacionado con el importador/exportador.
  */
  borrarDatos(): void {
    this.datosImportadorExportador.reset();
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
