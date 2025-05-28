import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  Solicitud260215State,
  Tramite260215Store,
} from '../../estados/tramites/tramite260215.store';
import { Subject, map, takeUntil } from 'rxjs';
import { Catalogo } from '@libs/shared/data-access-user/src/core/models/shared/catalogos.model';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';
import { CatalogosSelect } from '@libs/shared/data-access-user/src/core/models/shared/components.model';
import { CommonModule } from '@angular/common';
import { ConsultaioQuery } from '@libs/shared/data-access-user/src';
import { INPUT_FECHA_CONFIG } from '../../enum/permiso.enum';
import { InputFechaComponent } from '@libs/shared/data-access-user/src/tramites/components/input-fecha/input-fecha.component';
import { ServiciosPermisoSanitarioService } from '../../services/servicios-permiso-sanitario.service';
import { TituloComponent } from '@libs/shared/data-access-user/src/tramites/components/titulo/titulo.component';
import { Tramite260215Query } from '../../estados/queries/tramite260215.query';

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
   * Estado de la solicitud de la sección 301.
   */
  public solicitudState!: Solicitud260215State;

  /**
   * Subject para notificar la destrucción del componente.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Constante para configurar el input de fecha.
   */
  INPUT_FECHA_CONFIG = INPUT_FECHA_CONFIG;

  /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
   */
  esFormularioSoloLectura: boolean = false;

 
  /**
   * Constructor del componente PagoDeDerechosComponent.
   *
   * @param fb Instancia de FormBuilder para la creación y gestión de formularios reactivos.
   * @param tramite260215Store Store para el manejo del estado relacionado al trámite 260215.
   * @param tramite260215Query Query para consultar el estado del trámite 260215.
   * @param serviciosPermisoSanitarioService Servicio inyectado para operaciones relacionadas con permisos sanitarios.
   * @param consultaioQuery Query para consultar el estado de la sección de consulta IO.
   *
   * Al inicializar el componente, se obtienen los datos bancarios y se suscribe al estado de consulta IO
   * para actualizar el modo de solo lectura y reinicializar el estado del formulario cuando sea necesario.
   */
  constructor(
    private fb: FormBuilder,
    private tramite260215Store: Tramite260215Store,
    private tramite260215Query: Tramite260215Query,
    @Inject(ServiciosPermisoSanitarioService)
    private serviciosPermisoSanitarioService: ServiciosPermisoSanitarioService,
    private consultaioQuery: ConsultaioQuery,
  ) {
    this.fetchBancoData();
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe()
  }


  /**
     * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
     * Luego reinicializa el formulario con los valores actualizados desde el store.
     */
  guardarDatosFormulario(): void {
    this.inicializarFormulario();
    if (this.esFormularioSoloLectura) {
      this.formSolicitud.disable();
    } else if (!this.esFormularioSoloLectura) {
      this.formSolicitud.enable();
    } else {
      // No se requiere ninguna acción en el formulario
    }
  }


  /**
   * Evalúa si se debe inicializar o cargar datos en el formulario.  
   * Además, obtiene la información del catálogo de mercancía.
   */
  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario();
    } else {
      this.inicializarFormulario();
    }
  }

  /**
   * Inicializa el formulario de solicitud para el trámite 260215.
   * 
   * Este método suscribe al observable `selectSolicitud$` para obtener el estado actual de la solicitud
   * y asignarlo a la propiedad `solicitudState`. Posteriormente, crea el formulario reactivo `formSolicitud`
   * utilizando los valores obtenidos de `solicitudState`, agrupando los campos relacionados con los datos
   * del importador o exportador.
   * 
   * El método utiliza `takeUntil` para gestionar la suscripción y evitar fugas de memoria.
   */
  inicializarFormulario(): void {
    this.tramite260215Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe()

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
   * Catálogo de bancos utilizado en el formulario.
   * Contiene la configuración para el campo de selección de banco.
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
    this.inicializarEstadoFormulario();
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
    metodoNombre: keyof Tramite260215Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (
      this.tramite260215Store[metodoNombre] as (
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
