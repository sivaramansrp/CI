import { Catalogo, ConfiguracionColumna, ModeloDeFormaDinamica, TablaDinamicaComponent, TablaSeleccion } from '@libs/shared/data-access-user/src';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SolicitudDeRegistroTpl120101State, Tramite120101Store } from '../../../../estados/tramites/tramite120101.store';
import { Subject, map, takeUntil } from 'rxjs';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { ConsultaioState } from '@ng-mf/data-access-user';
import { FORMULARIO_MODAL_INSUMOS } from '../../constantes/solicitud-de-registro-tpl.enum';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { InsumosTabla } from '../../models/insumos.model';
import { ServicioDeFormularioService } from '../../services/forma-servicio/servicio-de-formulario.service';
import { SolicitudDeRegistroTplService } from '../../services/solicitud-de-registro-tpl.service';
import { Tramite120101Query } from '../../../../estados/queries/tramite120101.query';
/**
 * Componente que gestiona la funcionalidad de los insumos en el formulario.
 * Este componente incluye la lógica para manejar tablas dinámicas, formularios y datos relacionados con insumos.
 */
@Component({
  selector: 'app-insumos',
  standalone: true,
  imports: [CommonModule, TablaDinamicaComponent, ReactiveFormsModule, CatalogoSelectComponent, FormasDinamicasComponent],
  templateUrl: './insumos.component.html',
  styleUrl: './insumos.component.scss',
})
export class InsumosComponent implements OnInit, OnDestroy {

  /**
  * @property consultaState
  * @description
  * Estado actual de la consulta gestionado por el store `ConsultaioQuery`.
  */
  @Input() consultaState!: ConsultaioState;

  /**
   * Sujeto utilizado para destruir las suscripciones y evitar fugas de memoria.
   */
  private destroy$ = new Subject<void>();

  /**
   * Lista de insumos que se mostrarán en la tabla.
   */
  tablaInsumos: InsumosTabla[] = [];

  /**
   * Lista de fracciones arancelarias disponibles.
   */
  fraccionArancelaria: Catalogo[] = [];

  /**
   * Lista de países de origen disponibles.
   */
  paisDeOrigen: Catalogo[] = [];

  /**
   * Tipo de selección para la tabla de insumos.
   * Por defecto, se utiliza la selección por checkbox.
   */
  public tipoSeleccionTabla: TablaSeleccion = TablaSeleccion.CHECKBOX;

  /**
   * Configuración de las columnas para la tabla de extranjeros.
   */
  public tableHeaderExtranjeros: ConfiguracionColumna<InsumosTabla>[] = [
    { encabezado: 'Descripción del insumo', clave: (item) => item.DescripcionDelInsumo, orden: 1 },
    { encabezado: 'Fracción arancelaria', clave: (item) => item.FraccionArancelaria, orden: 2 },
    { encabezado: 'País de origen', clave: (item) => item.PaisDeOrigen, orden: 3 },
  ];

  /**
   * Formulario principal del componente.
   * Incluye un grupo de formularios para manejar los datos de los insumos.
   */
  public forma: FormGroup = new FormGroup({
    ninoFormGroup: new FormGroup({}),
  });

  /**
   * Getter para acceder al grupo de formularios de insumos.
   * Retorna el grupo de formularios correspondiente.
   */
  get ninoFormGroup(): FormGroup {
    return this.forma.get('ninoFormGroup') as FormGroup;
  }

  /**
   * Datos del formulario dinámico para los insumos.
   */
  public insumosFormData: ModeloDeFormaDinamica[] = FORMULARIO_MODAL_INSUMOS;

  /**
   * Estado actual de la solicitud de registro.
   */
  public solicitudDeRegistroState!: SolicitudDeRegistroTpl120101State;

  /**
   * Constructor del componente.
   * Inyecta los servicios necesarios para manejar los datos y formularios.
   * @param solicitudDeRegistroTplService Servicio para manejar los datos de la solicitud de registro.
   * @param fb Constructor para formularios reactivos.
   * @param servicioDeFormularioService Servicio para manejar los formularios dinámicos.
   * @param tramite120101Store Store para manejar el estado del trámite.
   * @param tramite120101Query Query para obtener datos del estado del trámite.
   */
  constructor(
    private solicitudDeRegistroTplService: SolicitudDeRegistroTplService,
    private servicioDeFormularioService: ServicioDeFormularioService,
    private tramite120101Store: Tramite120101Store,
    private tramite120101Query: Tramite120101Query,
  ) {
    // Reservado para futuras inicializaciones o configuraciones.
  }

  /**
   * Método que se ejecuta al inicializar el componente.
   * Configura las suscripciones y carga los datos iniciales.
   */
  ngOnInit(): void {
      const INSUMOS_GUARDADOS = this.solicitudDeRegistroTplService.obtenerTablaInsumos();

      if (INSUMOS_GUARDADOS && INSUMOS_GUARDADOS.length > 0) {
       
        const INSUMOS_VALIDOS = INSUMOS_GUARDADOS.filter(item => 
          Object.values(item).some(value => value !== null && value !== '' && value !== undefined)
        );
        
        if (INSUMOS_VALIDOS.length > 0) {
          this.tablaInsumos = INSUMOS_VALIDOS;
        } else {
          this.tablaInsumos = [];
        }
      }

      this.tramite120101Query.selectSolicitudDeRegistroTpl$
      .pipe(
        takeUntil(this.destroy$),
        map((seccionState) => {
          this.solicitudDeRegistroState = seccionState;
        })
      )
      .subscribe();

    this.obtenerDatosFraccionArancelaria();
    this.obtenerDatosEstados();
    this.servicioDeFormularioService.registerForm('insumosForm', this.ninoFormGroup);
  }

  /**
   * Método que establece un cambio de valor en el formulario dinámico.
   * Actualiza el valor en el store y en el servicio de formularios.
   * @param event Objeto que contiene el campo y el valor a actualizar.
   */
  establecerCambioDeValor(event: { campo: string; valor: object | string }): void {
    if (event) {
      this.tramite120101Store.setDynamicFieldValue(event.campo, event.valor);
      this.servicioDeFormularioService.setFormValue('insumosForm', {
        [event.campo]: event.valor,
      });
    }
  }

  /**
   * Método que obtiene los datos de la tabla de insumos desde el servicio.
   */
  obtenerDatosTablaInsumos(): void {
    this.solicitudDeRegistroTplService
      .obtenerDatosTablaInsumos()
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp: InsumosTabla[]) => {
        this.tablaInsumos = resp;
      });
  }

  /**
   * Método que obtiene los datos de las fracciones arancelarias desde el servicio.
   * Actualiza las opciones del formulario dinámico con los datos obtenidos.
   */
  public obtenerDatosFraccionArancelaria(): void {
    this.solicitudDeRegistroTplService
      .obtenerDatosFraccionArancelaria()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        const FRACCION_FIELD = this.insumosFormData.find(
          (datos: ModeloDeFormaDinamica) => datos.campo === 'descfraccion'
        ) as ModeloDeFormaDinamica;
        if (FRACCION_FIELD && !FRACCION_FIELD.opciones) {
          if (Array.isArray(data)) {
            FRACCION_FIELD.opciones = data.map(
              (item: { id: number; descripcion: string }) => ({
                descripcion: item.descripcion,
                id: item.id,
              })
            );
          }
        }
      });
  }

  /**
   * Método que obtiene los datos de los estados desde el servicio.
   * Actualiza las opciones del formulario dinámico con los datos obtenidos.
   */
  public obtenerDatosEstados(): void {
    this.solicitudDeRegistroTplService
      .obtenerDatosEstados()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        const PAIS_FIELD = this.insumosFormData.find(
          (datos: ModeloDeFormaDinamica) => datos.campo === 'Pais'
        ) as ModeloDeFormaDinamica;
        if (PAIS_FIELD && !PAIS_FIELD.opciones) {
          if (Array.isArray(data)) {
            PAIS_FIELD.opciones = data.map(
              (item: { id: number; descripcion: string }) => ({
                descripcion: item.descripcion,
                id: item.id,
              })
            );
          }
        }
      });
  }

  /**
   * Método que agrega un nuevo insumo a la tabla.
   * Valida el formulario antes de agregar los datos.
   */
  agregarInsumo(): void {
    if (this.forma.valid) {
      const VALORES_NINO = this.ninoFormGroup.value;

      const NUEVA_FILA = {
        DescripcionDelInsumo: VALORES_NINO.descripcionInsumo,
        FraccionArancelaria: VALORES_NINO.fraccion,
        PaisDeOrigen: VALORES_NINO.Pais,
      };
      this.tablaInsumos.push(NUEVA_FILA);
      this.tablaInsumos = [...this.tablaInsumos];

      this.solicitudDeRegistroTplService.establecerTablaInsumos(this.tablaInsumos);
      this.tramite120101Store.setDynamicFieldValue('tablaInsumos', this.tablaInsumos);
    }
  }

  /**
   * Método que destruye las suscripciones para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
