import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ConfiguracionColumna, TablaDinamicaComponent, TablaSeleccion, TituloComponent } from '@libs/shared/data-access-user/src';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { INSTALACIONES_PRINCIPALES_TABLA, InstalacionesPrincipalesTablaInfo, formaDatosInfo } from '@libs/shared/data-access-user/src/core/models/6502/dato-comunes.model';
import { Solicitud6502State, Tramite6502Store } from '../../../../core/estados/tramites/tramite6502.store';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import Modal from 'bootstrap/js/dist/modal';
import { RegistroPoblacionalService } from '../../service/registro-poblacional.service';
import { Tramite6502Query } from '../../../../core/queries/tramite6502.query';
import modal from 'bootstrap/js/dist/modal';

/**
 * Componente para gestionar el aviso de cambio en el trámite 6502.
 * 
 * Este componente maneja:
 * - Visualización y selección de instalaciones principales mediante tabla dinámica
 * - Formulario modal para actualización de datos CURP
 * - Integración con el estado global del trámite mediante NgRx
 * - Gestión de modal con Bootstrap
 * 
 * @example
 * // Uso básico en template:
 * <app-aviso-de-cambio></app-aviso-de-cambio>
 * 
 * // Para manejar eventos personalizados:
 * <app-aviso-de-cambio 
 *   (modalCerrado)="onModalCerrado($event)">
 * </app-aviso-de-cambio>
 */
@Component({
  selector: 'app-aviso-de-cambio',
  standalone: true,
  imports: [
    CommonModule,
    TablaDinamicaComponent,
    TituloComponent,
    ReactiveFormsModule
  ],
  templateUrl: './aviso-de-cambio.component.html',
  styleUrl: './aviso-de-cambio.component.scss',
})
export class AvisoDeCambioComponent implements OnDestroy, OnInit, AfterViewInit {
  /**
   * Tipo de selección para la tabla dinámica (CHECKBOX)
   */
  tablaSeleccionCheckbox: TablaSeleccion = TablaSeleccion.CHECKBOX;

  /**
   * Instancia del modal de Bootstrap
   */
  modalInstance!: modal;

  /**
   * Formulario reactivo para el modal de actualización
   */
  modalForma!: FormGroup;

  /**
   * Estado actual de la solicitud del trámite
   */
  public solicitudState!: Solicitud6502State;

  /**
   * Referencia al elemento modal en el template
   */
  @ViewChild('modal', { static: false }) modal!: ElementRef;

  /**
 * Constructor del componente AvisoDeCambio
 * 
 * @param fb Servicio FormBuilder para crear formularios reactivos
 * @param service Servicio para obtener datos del registro poblacional
 * @param tramite6502Store Store NgRx para gestionar el estado del trámite 6502
 * @param tramite6502Query Query NgRx para acceder a datos del estado del trámite
 * 
 * @example
 * // Ejemplo de inyección de dependencias alternativas para testing
 * constructor(
 *   fb: MockFormBuilder,
 *   service: MockRegistroService,
 *   store: MockTramiteStore  
 * ) {}
 */
  constructor(
    private fb: FormBuilder,
    private service: RegistroPoblacionalService,
    private tramite6502Store: Tramite6502Store,
    private tramite6502Query: Tramite6502Query,
  ) {
    // Inicialización de dependencias
    // No se requiere lógica adicional en este caso
  }

  /**
   * Subject para manejar la destrucción de suscripciones
   */
  public destroyNotifier$: Subject<void> = new Subject();

  /**
   * Configuración de columnas para la tabla de instalaciones
   */
  instalacionesPrincipalesTabla: ConfiguracionColumna<InstalacionesPrincipalesTablaInfo>[] = INSTALACIONES_PRINCIPALES_TABLA;

  /**
   * Datos para poblar la tabla de instalaciones
   */
  instalacionesPrincipalesTablaDatos: InstalacionesPrincipalesTablaInfo[] = [];

  /**
   * Datos del formulario principal
   */
  formaDatos: formaDatosInfo[] = [];

  /**
   * Inicialización del componente
   */
  ngOnInit(): void {
    this.cargarEstadoTramite();
    this.obtenerFormaDatos();
    this.obtenerInstalacionesPrincipalesTablaDatos();
  }

  /**
   * Carga el estado actual del trámite desde el store
   */
  public cargarEstadoTramite(): void {
    this.tramite6502Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();
  }

  /**
   * Inicialización posterior a la renderización de la vista
   */
  ngAfterViewInit(): void {
    this.inicializarModal();
  }

  /**
   * Inicializa la instancia del modal Bootstrap
   */
  private inicializarModal(): void {
    if (this.modal) {
      this.modalInstance = new Modal(this.modal.nativeElement);
    }
  }

  /**
   * Crea el formulario reactivo para el modal
   */
  crearFormulario(): void {
    this.modalForma = this.fb.group({
      nombre: [{ value: this.formaDatos[0]?.nombre, disabled: true }],
      registroFederal: [{ value: this.formaDatos[0]?.registroFederal, disabled: true }],
      curp: [{ value: this.formaDatos[0]?.curp, disabled: true }],
      curpActualizada: [
        this.solicitudState?.curpActualizada, 
        Validators.required
      ],
      confirmacioCurpActualizada: [
        this.solicitudState?.confirmacioCurpActualizada, 
        Validators.required
      ],
    });
  }

  /**
   * Obtiene datos de instalaciones principales desde el servicio
   */
  obtenerInstalacionesPrincipalesTablaDatos(): void {
    this.service.obtenerInstalacionesPrincipalesTablaDatos()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (data) => {
          const DATOS = data?.data;
          this.instalacionesPrincipalesTablaDatos = DATOS ? [DATOS[0]] : [];
        },
        error: (err) => console.error('Error al cargar instalaciones', err)
      });
  }

  /**
   * Obtiene datos del formulario desde el servicio
   */
  obtenerFormaDatos(): void {
    this.service.obtenerFromaDatos()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (data) => {
          const DATOS = data?.data;
          this.formaDatos = DATOS ? [DATOS[0]] : [];
          this.crearFormulario();
        },
        error: (err) => console.error('Error al cargar datos del formulario', err)
      });
  }

  /**
   * Abre el modal de actualización
   */
  openModal(): void {
    this.modalInstance?.show();
  }

  /**
   * Cierra el modal de actualización
   */
  hideModal(): void {
    this.modalInstance?.hide();
  }

  /**
   * Actualiza valores en el store del trámite
   * 
   * @param form Formulario reactivo con los datos
   * @param campo Nombre del campo a actualizar
   * @param metodoNombre Nombre del método del store a invocar
   */
  public setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite6502Store): void {
    if (form.valid) {
      const VALOR = form.get(campo)?.value;
      (this.tramite6502Store[metodoNombre] as (value: string) => void)(VALOR);
    }
  }

  /**
   * Limpieza al destruir el componente
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}