import { Catalogo, CatalogosSelect } from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  Solicitud260502State,
  Tramite260502Store,
} from '../../estados/stores/tramite260502.store';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Tramite260502Query } from '../../estados/queries/tramite260502.query';

@Component({
  selector: 'app-pago-de-derechos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pago-de-derechos-banco.component.html',
  styleUrl: './pago-de-derechos-banco.component.scss',
})
export class PagoDeDerechosBancoComponent implements OnInit, OnDestroy {
  /**
   * Formulario de la solicitud.
   */
  formSolicitud!: FormGroup;

  /**
   * Estado de la solicitud de la sección 260502.
   */
  public solicitudState!: Solicitud260502State;

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
    private tramite260502Store: Tramite260502Store,
    private tramite260502Query: Tramite260502Query,
    @Inject(ServiciosPermisoSanitarioService)
    private serviciosPermisoSanitarioService: ServiciosPermisoSanitarioService
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
    this.tramite260502Query.selectSolicitud$
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
    this.serviciosPermisoSanitarioService
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
    metodoNombre: keyof Tramite260502Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (
      this.tramite260502Store[metodoNombre] as (
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
