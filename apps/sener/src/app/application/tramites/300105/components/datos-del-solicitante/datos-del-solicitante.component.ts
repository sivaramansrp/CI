import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import {
  Tramite300105State,
  Tramite300105Store,
} from '../../estados/tramite300105.store';
import { AutorizacionDeRayosXService } from '../../services/autorizacion-de-rayos-x.service';
import { Catalogo } from '@libs/shared/data-access-user/src/core/models/shared/catalogos.model';
import { CatalogosSelect } from '@libs/shared/data-access-user/src/core/models/shared/components.model';
import { OPCIONES_DE_BOTON_DE_RADIO } from '../../enum/botons.enum';
import { Tramite300105Query } from '../../estados/tramite300105.query';

/**
 * Componente para la sección de pago de derechos.
 */
@Component({
  selector: 'app-datos-del-solicitante',
  templateUrl: './datos-del-solicitante.component.html',
})
export class DatosDelSolicitanteComponent implements OnInit, OnDestroy {
  /**
   * Formulario de la solicitud.
   */
  formSolicitud!: FormGroup;

   /**
   * Opciones de botón de radio.
   */
   opcionDeBotonDeRadio = OPCIONES_DE_BOTON_DE_RADIO;

  /**
   * Estado de la solicitud de la sección 300105.
   */
  public solicitudState!: Tramite300105State;

  /**
   * Subject para notificar la destrucción del componente.
   */
  private destroyNotifier$: Subject<void> = new Subject();

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
    // No se realiza ninguna acción aquí.
  }

  /**
   * Catálogo de tipo de operación.
   */
  public tipoOperacionCatalogo: CatalogosSelect = {
    labelNombre: 'Tipo de Operación',
    required: true,
    primerOpcion: 'Selecciona un valor',
    catalogos: [],
  };

  /**
   * Catálogo de finalidad.
   */
  public finalidadCatalogo: CatalogosSelect = {
    labelNombre: 'Finalidad',
    required: true,
    primerOpcion: 'Selecciona un valor',
    catalogos: [],
  };

  /**
   * Inicializa el componente y obtiene formulario.
   */
  ngOnInit(): void {
    this.initializarFormulario();
    this.fetchTipoOperacionData();
    this.fetchFinalidadData();
  }

  /**
   * Método para inicializar el formulario de datos del solicitante.
   */
  initializarFormulario(): void {
    this.tramite300105Query.selectTramite300105$
    .pipe(
      takeUntil(this.destroyNotifier$),
      map((seccionState) => {
        this.solicitudState = seccionState;
      })
    )
    .subscribe();
    this.formSolicitud = this.fb.group({
      datosSolicitante: this.fb.group({
        numeroExpediente: [this.solicitudState?.numeroExpediente, Validators.required],
        tipoOperacion: [
          this.solicitudState?.tipoOperacion],
        finalidad: [this.solicitudState?.finalidad],
        isExento: [
          this.solicitudState?.isExento],
        isAutorizacion: [
          this.solicitudState?.isAutorizacion],
        numAutorizacion1: [
            this.solicitudState?.numAutorizacion1, [Validators.required]],
        numAutorizacion2: [
          this.solicitudState?.numAutorizacion2, [Validators.required]],
        numAutorizacion3: [
          this.solicitudState?.numAutorizacion3, [Validators.required]],
      }),
    });
  }

  /**
   * Método para actualizar el valor del campo en el store.
   */
  setValoresStore(form: FormGroup, campo: string): void {
    const VALOR = form.get(campo)?.value;
    this.tramite300105Store.establecerDatos({[campo]: VALOR});
  }

  /**
   * Maneja el evento de clic en un botón de radio.
   */
  onRadioClick(nombreControl: string): void {
    const CURRENT_VALUE = this.datosSolicitante.get(nombreControl)?.value;
    this.datosSolicitante.get(nombreControl)?.setValue(!CURRENT_VALUE);
    this.tramite300105Store.establecerDatos({[nombreControl]: !CURRENT_VALUE});
  }

  /**
   * Metodo para obtener el catálogo de tipo de operación.
   */
  fetchTipoOperacionData(): void {
    this.autorizacionDeRayosXService
      .getTipoOperacion()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data): void => {
        this.tipoOperacionCatalogo.catalogos = data as Catalogo[];
      });
  }

  /**
   * Método para obtener el catálogo de finalidad.
   */
  fetchFinalidadData(): void {
    this.autorizacionDeRayosXService
      .getFinalidad()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data): void => {
        this.finalidadCatalogo.catalogos = data as Catalogo[];
      });
  }

  /**
   * Método para obtener el formulario de datos del solicitante.
   */
  get datosSolicitante(): FormGroup {
    return this.formSolicitud.get('datosSolicitante') as FormGroup;
  }

  /**
  * Metodo y para destruir el componente y liberar recursos.
  */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
