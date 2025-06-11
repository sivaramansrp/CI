import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfiguracionColumna, TablaDinamicaComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PRORROGAS_TABLA, ProrrogasForma, ProrrogasInfo } from '@libs/shared/data-access-user/src/core/models/130301/solicitud-prorroga.model';
import { Solicitud130301State, Tramite130301Store } from '../../../../estados/tramites/tramite130301.store';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { SolicitudProrrogaService } from '../../services/solicitudProrroga/solicitud-prorroga.service';
import { Tramite130301Query } from '../../../../estados/queries/tramite130301.query';

/**
 * Componente para gestionar las prorrogas del trámite.
 */
@Component({
  selector: 'app-prorrogas',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    ReactiveFormsModule,
    TablaDinamicaComponent
  ],
  templateUrl: './prorrogas.component.html',
  styleUrl: './prorrogas.component.css',
})
export class ProrrogasComponent implements OnInit, OnDestroy {
  /**
   * Formulario reactivo para las prorrogas.
   */
  prorrogasForm!: FormGroup;

    /**
   * Determina si el formulario debe estar en modo solo lectura.
   */
    esFormularioSoloLectura: boolean = false;

  /**
   * Configuración de las columnas de la tabla de prorrogas.
   */
  prorrogasTabla: ConfiguracionColumna<ProrrogasInfo>[] = PRORROGAS_TABLA;

  /**
   * Datos de la tabla de prorrogas obtenidos del servicio.
   */
  prorrogasTablaDatos: ProrrogasInfo[] = [];

  /**
   * Notificador para destruir observables activos y evitar pérdidas de memoria.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Datos del formulario de prorrogas obtenidos del servicio.
   */
  prorrogasFormDatos: ProrrogasForma[] = [];

  /**
   * Estado actual de la solicitud.
   */
  public solicitudState!: Solicitud130301State;

  /**
   * Constructor del componente.
   * @param fb Constructor de formularios reactivos.
   * @param service Servicio para obtener los datos de las prorrogas.
   * @param tramite130301Store Almacén de estado para el trámite 130301.
   * @param tramite130301Query Consulta de estado para el trámite 130301.
   */
  constructor(
    private fb: FormBuilder,
    private service: SolicitudProrrogaService,
    public tramite130301Store: Tramite130301Store,
    private tramite130301Query: Tramite130301Query,
    private consultaioQuery: ConsultaioQuery,
  ) {
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe();
  }

  /**
   * Método de inicialización del componente.
   */
  ngOnInit(): void {
    
    this.obtenerFormDatos();
  }

    /**
   * Inicializa el formulario con datos del store y aplica validaciones.
   * También aplica configuración de solo lectura si es necesario.
   * @method inicializarEstadoFormulario
   */
    inicializarEstadoFormulario(): void {
      this.tramite130301Query
      .selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();
      this.crearFormulario();
      if (this.esFormularioSoloLectura) {
        Object.keys(this.prorrogasForm.controls).forEach((key) => {
          this.prorrogasForm.get(key)?.disable();
        });
      } else {
        Object.keys(this.prorrogasForm.controls).forEach((key) => {
          this.prorrogasForm.get(key)?.enable();
        });
      }
    }
  /**
   * Crea y configura un formulario reactivo para gestionar las prorrogas del trámite con campos deshabilitados y validaciones requeridas.
   */
  crearFormulario():void{
    this.prorrogasForm = this.fb.group({
      folioResolucion: [{ value: '', disabled: true }],
      cantidad: [{ value: '', disabled: true }],
      prorrogaDel: [{ value: '', disabled: true }],
      prorrogaAl: [{ value: '', disabled: true }, Validators.required],
      motivoJustificacion: [this.solicitudState?.motivoJustificacion, Validators.required],
      otrasDeclaraciones: [this.solicitudState?.otrasDeclaraciones, Validators.required],
    });
  }

  /**
   * Obtiene los datos del formulario de prorrogas desde el servicio.
   */
  obtenerFormDatos(): void {
    this.service
      .obtenerProrrogasFormDatos()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        this.prorrogasFormDatos = data?.data;
        this.prorrogasForm.patchValue({
          folioResolucion: this.prorrogasFormDatos[0].folioResolucion,
          cantidad: this.prorrogasFormDatos[0].cantidad,
          prorrogaDel: this.prorrogasFormDatos[0].prorrogaDel,
          prorrogaAl: this.prorrogasFormDatos[0].prorrogaAl,
        });
      });
  }

  /**
   * Establece valores en el store del trámite.
   * @param form Formulario reactivo.
   * @param campo Nombre del campo en el formulario.
   * @param metodoNombre Nombre del método en el store.
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite130301Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite130301Store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /**
   * Método que se ejecuta al destruir el componente.
   * Libera los recursos y destruye los observables activos.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}