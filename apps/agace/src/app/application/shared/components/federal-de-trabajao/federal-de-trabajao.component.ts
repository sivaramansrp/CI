import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Catalogo, CatalogoSelectComponent, ConfiguracionColumna, REGEX_RFC, TablaDinamicaComponent, TablaSeleccion } from '@libs/shared/data-access-user/src';
import { Component, Inject, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MENCIONE_TABLA,Mencione } from '../../models/datos-comunes.model';
import { Subject,map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DatosComunesService } from '../../services/datos-comunes.service';

/**
 * Componente que representa la funcionalidad de Federal De Trabajao.
 * Este componente es autónomo e incluye varias características como tablas dinámicas,
 * manejo de formularios e interacciones con modales.
 */
@Component({
  selector: 'app-federal-de-trabajao',
  standalone: true,
  providers: [BsModalService],
  imports: [CommonModule, TablaDinamicaComponent, CatalogoSelectComponent, ReactiveFormsModule],
  templateUrl: './federal-de-trabajao.component.html',
  styleUrl: './federal-de-trabajao.component.scss',
})
export class FederalDeTrabajaoComponent implements OnInit, OnDestroy {

  /**
   * Formulario reactivo para gestionar datos relacionados con empleados.
   */
  public numeroDeEmpleadosForm!: FormGroup;

  /**
   * Configuración para el tipo de selección de la tabla.
   */
  public tablaSeleccionCheckbox: TablaSeleccion = TablaSeleccion.CHECKBOX;

  /**
   * Fuente de datos para la tabla dinámica.
   */
  public mencioneTablaDatos: Mencione[] = [];

  /**
   * Configuración para las columnas de la tabla.
   */
  public configuracionTabla: ConfiguracionColumna<Mencione>[] = MENCIONE_TABLA;

  /**
   * Subject utilizado para gestionar el ciclo de vida de las suscripciones y prevenir fugas de memoria.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Referencia al modal actualmente abierto, si existe.
   */
  modalRef?: BsModalRef;

  /**
   * Datos del catálogo para el tercer bimestre.
   */
  public bimestreTresCatalogo: Catalogo[] = [];
  public esFormularioSoloLectura: boolean = false;

  /**
   * Constructor del componente.
   * 
   * @param datosComunesSvc - Servicio para obtener datos comunes.
   * @param fb - Instancia de FormBuilder para crear formularios reactivos.
   * @param modalService - Servicio para gestionar modales.
   */
  constructor(
    private datosComunesSvc: DatosComunesService,
    private fb: FormBuilder,
    @Inject(BsModalService)
    private modalService: BsModalService,
    private consultaQuery: ConsultaioQuery
  ) {
      this.consultaQuery.selectConsultaioState$.pipe(takeUntil(this.destroyNotifier$),map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
      })).subscribe();
  }

  /**
   * Hook del ciclo de vida que se llama después de inicializar el componente.
   * Obtiene datos iniciales y configura el formulario reactivo.
   */
  ngOnInit(): void {
    this.getMencioneDatos();
    this.getBancoCatalogDatos();
    this.cerearFormulario();
    this.inicializarEstadoFormulario();
  }

    public inicializarFormulario(): void {
        this.cerearFormulario();
    }

  /**
   * Inicializa el formulario reactivo con reglas de validación.
   */
  public cerearFormulario(): void {
    this.numeroDeEmpleadosForm = this.fb.group({
      rfc: ['', [Validators.required, Validators.pattern(REGEX_RFC)]],
      razonSocial: ['', [Validators.required, Validators.minLength(3)]],
      numeroEmpleados: ['', [Validators.required]],
      empleadosPropios: ['', [Validators.required, Validators.maxLength(8)]],
      archivoNacionales: ['', [Validators.required]],
      comboBimestresTres: [''],
    });
  }

    public inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarFormulario();
    } else {
      this.inicializarFormulario();
    }
  }

  /**
   * Obtiene datos para la tabla dinámica y los asigna al estado del componente.
   */
  public getMencioneDatos(): void {
    this.datosComunesSvc.getTablaDatos().pipe(takeUntil(this.destroyNotifier$)).subscribe((response) => {
      const DATOS = JSON.parse(JSON.stringify(response));
      this.mencioneTablaDatos = DATOS.data;
    });
  }

  /**
   * Abre un cuadro de diálogo modal con la plantilla especificada.
   * 
   * @param template - Referencia de la plantilla para el contenido del modal.
   */
  public abrirModal(template: TemplateRef<unknown>): void {
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }

  /**
   * Obtiene datos del catálogo para el tercer bimestre y los asigna al estado del componente.
   */
  public getBancoCatalogDatos(): void {
    this.datosComunesSvc.getBancoDatos().pipe(takeUntil(this.destroyNotifier$)).subscribe((response) => {
      const API_DATOS = JSON.parse(JSON.stringify(response));
      this.bimestreTresCatalogo = API_DATOS.data;
    });
  }

  public guardarFormulario(): void {
    this.inicializarFormulario();
    if (this.esFormularioSoloLectura) {
      this.numeroDeEmpleadosForm.disable();
    } else {
      this.numeroDeEmpleadosForm.enable();
    }
  }

  /**
   * Hook del ciclo de vida que se llama cuando el componente es destruido.
   * Limpia las suscripciones para prevenir fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
