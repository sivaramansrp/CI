import { Catalogo, ConfiguracionColumna, ModeloDeFormaDinamica, TablaDinamicaComponent, TablaSeleccion, } from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, OnInit, } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SolicitudDeRegistroTpl120101State, Tramite120101Store } from '../../../../estados/tramites/tramite120101.store';
import { Subject, takeUntil } from 'rxjs';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { FORMULARIO_MODAL_INSUMOS } from '../../constantes/solicitud-de-registro-tpl.enum';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { InsumosTabla } from '../../models/insumos.model';
import { ServicioDeFormularioService } from '../../services/forma-servicio/servicio-de-formulario.service';
import { SolicitudDeRegistroTplService } from '../../services/solicitud-de-registro-tpl.service';
import { Tramite120101Query } from '../../../../estados/queries/tramite120101.query';

@Component({
  selector: 'app-insumos',
  standalone: true,
  imports: [CommonModule, TablaDinamicaComponent, ReactiveFormsModule, CatalogoSelectComponent, FormasDinamicasComponent],
  templateUrl: './insumos.component.html',
  styleUrl: './insumos.component.scss',
})
export class InsumosComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  tablaInsumos: InsumosTabla[] = [];
  fraccionArancelaria: Catalogo[] = [];
  paisDeOrigen: Catalogo[] = [];
  /**
   * La propiedad pública 'tipoSeleccionTabla' es de tipo 'TablaSeleccion'.
   * Se inicializa con el valor 'TablaSeleccion.CHECKBOX'.
   */

  public tipoSeleccionTabla: TablaSeleccion = TablaSeleccion.CHECKBOX;

  /**
   * Configuración de columnas para la tabla de extranjeros.
   */

  public tableHeaderExtranjeros: ConfiguracionColumna<InsumosTabla>[] = [
    { encabezado: 'Descripción del insumo', clave: (item) => item.DescripcionDelInsumo, orden: 1 },
    { encabezado: 'Fracción arancelaria', clave: (item) => item.FraccionArancelaria, orden: 2 },
    { encabezado: 'País de origen', clave: (item) => item.PaisDeOrigen, orden: 3 },
  ];

  public forma: FormGroup = new FormGroup({
    ninoFormGroup: new FormGroup({}),
  });
  get ninoFormGroup(): FormGroup {
    return this.forma.get('ninoFormGroup') as FormGroup;
  }

  public insumosFormData: ModeloDeFormaDinamica[] = FORMULARIO_MODAL_INSUMOS;
  public solicitudDeRegistroState!: SolicitudDeRegistroTpl120101State;


  constructor(
    private solicitudDeRegistroTplService: SolicitudDeRegistroTplService,
    private fb: FormBuilder,
    private servicioDeFormularioService: ServicioDeFormularioService,
    private tramite120101Store: Tramite120101Store,
    private tramite120101Query: Tramite120101Query,
  ) {
    //Reservado para futuras inyecciones de dependencias o inicializaciones.

  }
  ngOnInit(): void {
    // Lógica de inicialización del componente.
    this.obtenerDatosTablaInsumos();
    this.obtenerDatosFraccionArancelaria();
    this.obtenerDatosEstados();

  }

  establecerCambioDeValor(event: { campo: string; valor: object | string }): void {
    if (event) {
      this.tramite120101Store.setDynamicFieldValue(event.campo, event.valor);
      this.servicioDeFormularioService.setFormValue('consultarCupoForm', {
        [event.campo]: event.valor,
      });
    }
  }
  /**
    * Obtiene los datos de cancelación de autorizaciones del servicio.
    */
  obtenerDatosTablaInsumos(): void {
    this.solicitudDeRegistroTplService
      .obtenerDatosTablaInsumos()
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp: InsumosTabla[]) => {
        this.tablaInsumos = resp;
      });
  }

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

  agregarInsumo(): void {
    if (this.forma.valid) {
      const VALORES_NINO = this.ninoFormGroup.value;

      const NUEVA_FILA = {
        DescripcionDelInsumo: VALORES_NINO.descripcion,
        FraccionArancelaria: VALORES_NINO.fraccion,
        PaisDeOrigen: VALORES_NINO.paisOrigen
      };

      this.tablaInsumos.push(NUEVA_FILA);
      this.tablaInsumos = [...this.tablaInsumos];

      this.forma.reset();
    }
  }
  /**
   * Destruye las suscripciones para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
