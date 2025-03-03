import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CambioModalidadService } from 'libs/shared/data-access-user/src/core/services/80208/cambio-modalidad.service';
import { Catalogo } from 'libs/shared/data-access-user/src/core/models/shared/catalogos.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CambioModalidad, CONFIGURACION_SERVICIO, ServicioInfo } from 'libs/shared/data-access-user/src/core/models/80208/cambio-de-modalidad.model';
import { ConfiguracionColumna } from 'libs/shared/data-access-user/src/core/models/shared/configuracion-columna.model';
import { TablaSeleccion } from 'libs/shared/data-access-user/src/core/enums/tabla-seleccion.enum';
import { TablaDinamicaComponent } from 'libs/shared/data-access-user/src/tramites/components/tabla-dinamica/tabla-dinamica.component';
import { CatalogoSelectComponent } from 'libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';
import { TituloComponent } from 'libs/shared/data-access-user/src/tramites/components/titulo/titulo.component';
import { CommonModule } from '@angular/common';

/**
 * Componente para gestionar el cambio de modalidad.
 * 
 * @export
 * @class CombioDeModalidadComponent
 * @implements {OnInit, OnDestroy}
 */
@Component({
  selector: 'app-cambio-de-modalidad',
  templateUrl: './cambio-de-modalidad.component.html',
  styleUrls: ['./cambio-de-modalidad.component.scss'],
  standalone: true,
  imports: [
    TablaDinamicaComponent,
    ReactiveFormsModule,
    CommonModule,
    CatalogoSelectComponent,
    TituloComponent
  ]
})
export class CambioDeModalidadComponent implements OnInit, OnDestroy {
  /**
   * Tipo de selección de la tabla.
   * @type {TablaSeleccion}
   */
  tablaSeleccion: TablaSeleccion = TablaSeleccion.RADIO;

  /**
   * Configuración de las columnas de la tabla.
   * @type {ConfiguracionColumna<ServicioInfo>[]}
   */
  configuracionTabla: ConfiguracionColumna<ServicioInfo>[] = CONFIGURACION_SERVICIO;

  /**
   * Datos de los servicios.
   * @type {ServicioInfo[]}
   */
  ServiciosDatos: ServicioInfo[] = [
    {
      descripcionDelServicio: 'BLINDAJE, MODIFICACION ADAPTACION DE VEHICULO AUTOMOTOR',
      tipoDeServicio: 'TANGIBLE',
      estatus: true
    }
  ];

  /**
   * Datos de los servicios autorizados.
   * @type {ServicioInfo[]}
   */
  autorizadosDatos: ServicioInfo[] = [
    {
      descripcionDelServicio: 'BLINDAJE, MODIFICACION ADAPTACION DE VEHICULO AUTOMOTOR',
      tipoDeServicio: 'TANGIBLE',
      estatus: true
    }
  ];

  /**
   * Subject para manejar la desuscripción de observables.
   * @type {Subject<void>}
   */
  private unsubscribe$ = new Subject<void>();

  /**
   * Formulario para el cambio de modalidad.
   * @type {FormGroup}
   */
  cambioDeModalidadForm!: FormGroup;

  /**
   * Formulario para los servicios IMMX.
   * @type {FormGroup}
   */
  serviciosImmxForm!: FormGroup;

  /**
   * Lista de servicios IMMX disponibles.
   * @type {Catalogo[]}
   */
  serviciosImmx!: Catalogo[];

  /**
   * Lista de cambios de modalidad disponibles.
   * @type {CambioModalidad[]}
   */
  cambioDeModalidad!: CambioModalidad[];

  /**
   * Indica si se deben mostrar los servicios IMMX.
   * @type {boolean}
   */
  espectaculoServiciosImmx: boolean = false;


  /**
   * Constructor del componente.
   * 
   * @param {FormBuilder} fb - Constructor de formularios.
   * @param {CambioModalidadService} modalidadService - Servicio para gestionar los cambios de modalidad.
   */
  constructor(
    private fb: FormBuilder,
    private modalidadService: CambioModalidadService
  ) { }

  /**
   * Método de inicialización del componente.
   * 
   * @returns {void}
   */
  ngOnInit(): void {
    this.inicializarForm();
    this.getCargarDatos();
    this.disableFormControls();
    this.getCambioDeModalidad();
    this.getServiciosImmx();
  }

  /**
   * Inicializa los formularios del componente.
   * 
   * @returns {void}
   */
  inicializarForm(): void {
    this.cambioDeModalidadForm = this.fb.group({
      seleccionaLaModalidad: ['', Validators.required],
      folio: ['', [Validators.required, Validators.min(1)]],
      ano: ['', [Validators.required, Validators.min(2000), Validators.max(2100)]],
      seleccionaModalidad: ['', Validators.required],
      cambioDeModalidad: ['', Validators.required]
    });

    this.serviciosImmxForm = this.fb.group({
      serviciosImmx: ['', Validators.required]
    });
  }

  /**
   * Carga los datos simulados en el formulario de cambio de modalidad.
   * 
   * @returns {void}
   */
  getCargarDatos(): void {
    this.modalidadService.getDatosSimulados()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: any) => {
        this.cambioDeModalidadForm.patchValue(data);
      });
  }

  /**
   * Obtiene los servicios IMMX disponibles.
   * 
   * @returns {void}
   */
  getServiciosImmx(): void {
    this.modalidadService.getServiciosImmx().subscribe((data) => {
      this.serviciosImmx = data.data;
    });
  }

  /**
   * Obtiene los cambios de modalidad disponibles.
   * 
   * @returns {void}
   */
  getCambioDeModalidad(): void {
    this.modalidadService.getCambioDeModalidad().subscribe((data) => {
      this.cambioDeModalidad = data.cambioModalidad.data;
      const seleccionadaId = this.cambioDeModalidadForm.get('cambioDeModalidad')?.value;
      if (seleccionadaId) {
        this.toggleServiciosImmx(seleccionadaId);
      }
    });
  }

  /**
   * Deshabilita los controles del formulario de cambio de modalidad.
   * 
   * @returns {void}
   */
  disableFormControls(): void {
    this.cambioDeModalidadForm.get('seleccionaLaModalidad')?.disable();
    this.cambioDeModalidadForm.get('folio')?.disable();
    this.cambioDeModalidadForm.get('ano')?.disable();
    this.cambioDeModalidadForm.get('seleccionaModalidad')?.disable();
    this.cambioDeModalidadForm.get('cambioDeModalidad')?.disable();
  }

  /**
   * Alterna la visibilidad de los servicios IMMX según la modalidad seleccionada.
   * 
   * @param {number} seleccionadaId - ID de la modalidad seleccionada.
   * @returns {void}
   */
  toggleServiciosImmx(seleccionadaId: number): void {
    if (!seleccionadaId || !this.cambioDeModalidad.length) {
      this.espectaculoServiciosImmx = false;
      return;
    }
    const opcionSeleccionada = this.cambioDeModalidad.find(item => item.id === seleccionadaId);
    this.espectaculoServiciosImmx = opcionSeleccionada?.descripcion?.toUpperCase() === 'SERVICIOS';
  }

  /**
   * Maneja el evento de selección del dropdown.
   * 
   * @param {any} event - Evento de selección del dropdown.
   * @returns {void}
   */
  onDropdownSelect(event: any): void {
    if (event?.id) {
      this.toggleServiciosImmx(event.id);
    }
  }

  /**
   * Método que se ejecuta cuando el componente se destruye.
   * 
   * @returns {void}
   */
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}