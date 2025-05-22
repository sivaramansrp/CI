import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ConsultaioStore } from '../../../core/estados/consulta.store';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ReplaySubject, takeUntil } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { AcuseYResolucionesFolioTramite } from '../../../core/models/shared/acuse-y-resoluciones-folio-tramite.model';
import { AcuseYResolucionesFolioTramiteService } from '../../../core/services/shared/acuses-y-resolucions-folio-tramite/acuses-y-resoluciones-folio-tramite.service';
import { CommonModule } from '@angular/common';
import { ConfiguracionColumna } from '../../../core/models/shared/configuracion-columna.model';
import { InputFecha } from '../../../core/models/shared/components.model';
import { InputFechaComponent } from '../input-fecha/input-fecha.component';
import { TablaDinamicaComponent } from '../tabla-dinamica/tabla-dinamica.component';
import { ToastrService } from 'ngx-toastr';
import { TramiteDetails } from '../../../core/models/tramiteDetails';
import tramiteDetailsData from '@libs/shared/theme/assets/json/tramiteList.json';

/**
 * Configuración para el campo de fecha inicial.
 */
export const FECHA_INICIO = {
  labelNombre: 'Fecha inicial',
  required: true,
  habilitado: true,
};

/**
 * Configuración para el campo de fecha final.
 */
export const FECHA_FINAL = {
  labelNombre: 'Fecha final',
  required: true,
  habilitado: true,
};

/**
 * Componente para gestionar la búsqueda de acuses y resoluciones por folio de trámite.
 */
@Component({
  selector: 'acuses-y-resoluciones-folio-del-tramite-busqueda',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputFechaComponent,
    RouterModule,
    TablaDinamicaComponent,
  ],
  templateUrl:
    './acuses-y-resoluciones-folio-del-tramite-busqueda.component.html',
  styleUrl: './acuses-y-resoluciones-folio-del-tramite-busqueda.component.scss',
})
export class AcusesYResolucionesFolioDelTramiteBusquedaComponent
  implements OnInit, OnDestroy
{
  @Input()
  public procedureUrl!: string;
  public tramiteData: TramiteDetails[] = [];
  /**
   * Formulario para la búsqueda de acuses y resoluciones.
   */
  public formBusqueda!: FormGroup;

  /**
   * Configuración del campo de fecha inicial.
   */
  public fechaInicioInput: InputFecha = FECHA_INICIO;

  /**
   * Configuración del campo de fecha final.
   */
  public fechaFinalInput: InputFecha = FECHA_FINAL;

  /**
   * Datos configurados para la tabla.
   */
  public configuracionTablaDatos: AcuseYResolucionesFolioTramite[] = [];

  /**
   * Notificador para destruir las suscripciones.
   */
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  /**
   * Servicio para mostrar notificaciones.
   */
  public toasterService!: ToastrService;

  /**
   * Indica si se deben mostrar los datos de acuses y resoluciones.
   */
  public espectaculoAcuseYResolucionesFolioTramiteDatos = false;

  /**
   * Ruta para la navegación.
   */
  public ruta: string = '';

  /**
   * Constructor de la clase.
   * @param formBuilder Servicio para construir formularios reactivos.
   * @param acuseYResolucionesFolioTramiteService Servicio para obtener datos de acuses y resoluciones.
   * @param router Servicio para la navegación entre rutas.
   */
  public constructor(
    protected readonly formBuilder: FormBuilder,
    public acuseYResolucionesFolioTramiteService: AcuseYResolucionesFolioTramiteService,
    public router: Router,
    private consultaioStore: ConsultaioStore
  ) {
    // El constructor se utiliza para la inyección de dependencias.
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   *
   * - Llama al método `getAucesYResolucionesFolioTramiteDatos` para obtener los datos iniciales.
   * - Configura el formulario reactivo `formBusqueda` con los campos:
   *   - `solicitante`: Campo de texto vacío.
   *   - `rfc`: Campo de texto vacío.
   *   - `folio`: Campo prellenado con un valor predeterminado y habilitado.
   *   - `fechaInicial`: Campo vacío y habilitado.
   *   - `fechaFinal`: Campo vacío y habilitado.
   */
  ngOnInit(): void {
    this.getAucesYResolucionesFolioTramiteDatos();
    this.formBusqueda = this.formBuilder.group({
      solicitante: '',
      rfc: '',
      folio: [{ value: '0100001000320251005000002', disabled: false }],
      fechaInicial: [{ value: '', disabled: false }],
      fechaFinal: [{ value: '', disabled: false }],
    });
  }

  /**
   * Maneja el cambio en el campo de fecha inicial.
   * @param nuevo_valor Nuevo valor para la fecha inicial.
   */
  public cambioFechaInicio(nuevo_valor: string): void {
    this.formBusqueda.get('fechaInicio')?.setValue(nuevo_valor);
    this.formBusqueda.get('fechaInicio')?.markAsUntouched();
  }

  /**
   * Maneja el cambio en el campo de fecha final.
   * @param nuevo_valor Nuevo valor para la fecha final.
   */
  public cambioFechaFinal(nuevo_valor: string): void {
    this.formBusqueda.get('fechaFinal')?.setValue(nuevo_valor);
    this.formBusqueda.get('fechaFinal')?.markAsUntouched();
  }

  /**
   * Configuración de las columnas de la tabla.
   */
  configuracionTabla: ConfiguracionColumna<AcuseYResolucionesFolioTramite>[] = [
    {
      encabezado: 'Folio trámite',
      clave: (artículo) => artículo.folioTramite,
      orden: 1,
    },
    {
      encabezado: 'Tipo de trámite',
      clave: (artículo) => artículo.tipoDeTramite,
      orden: 2,
    },
    {
      encabezado: 'Dependencia',
      clave: (artículo) => artículo.dependencia,
      orden: 3,
    },
    {
      encabezado: 'Fecha inicio trámite',
      clave: (artículo) => artículo.fechInicioTramite,
      orden: 4,
    },
  ];

  /**
   * Obtiene los datos de acuses y resoluciones por folio de trámite.
   */
  getAucesYResolucionesFolioTramiteDatos(): void {
    this.acuseYResolucionesFolioTramiteService
      .getAcuseYResolucionesFolioTramite()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((datos: AcuseYResolucionesFolioTramite[]) => {
        this.configuracionTablaDatos = datos;
      });
  }

  /**
   * Método que se ejecuta al destruir el componente.
   * Libera los recursos y completa las suscripciones.
   */
  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  /**
   * Maneja el evento de clic en una fila de la tabla.
   * Navega a la URL del procedimiento.
   */
  onFilaClic(event: any): void {
    const ROW_OBJETO = event;
    const PROCEDURE: unknown | number = Number(
      ROW_OBJETO.numeroDeProcedimiento
    );

    const ORIGIN: string = 'SUBSECUENTES'; // Inicializar ORIGEN con un valor predeterminado
    this.tramiteData = tramiteDetailsData.filter(
      (v) => v.tramite === PROCEDURE
    );
    this.procedureUrl = this.tramiteData[0].linkDashboard;
    this.consultaioStore.establecerConsultaio(
      String(PROCEDURE),
      ORIGIN,
      this.tramiteData[0].department,
      ROW_OBJETO.folioTramite,
      ROW_OBJETO.tipoDeTramite,
      ROW_OBJETO.estadoDeTramite,
      true,
      false,
      true
    );
    if (ORIGIN === 'SUBSECUENTES') {
      this.router.navigate([`/${this.tramiteData[0].department}/subsecuentes`]);
    }
  }

  /**
   * Muestra los datos de acuses y resoluciones por folio de trámite.
   */
  folioTramite(): void {
    this.espectaculoAcuseYResolucionesFolioTramiteDatos = true;
  }
}
