import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CambioModalidadService } from '../../../../core/services/80208/cambio-modalidad.service';
import serviciosImmsTable from '../../../../../assets/json/80208/servicios-immx-table.json';
import serviciosAutorizados from '../../../../../assets/json/80208/servicios-autorizados.json';
import { Catalogo } from '../../../../core/models/shared/catalogos.model';
import { CambioModalidad } from '../../../../core/models/80208/cambio-de-modalidad.modal';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-cambio-de-modalidad',
  templateUrl: './cambio-de-modalidad.component.html',
  styleUrl: './cambio-de-modalidad.component.scss'
})

export class CambioDeModalidadComponent implements OnInit {

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
   * Encabezados comunes de la tabla de servicios IMMX.
   * @type {any}
   */
  encabezadosComunesTabla = (serviciosImmsTable as any).tableHeader;

  /**
   * Cuerpo de la tabla de servicios IMMX.
   * @type {any}
   */
  cuerpoTabla = (serviciosImmsTable as any).tableBody;

  /**
   * Encabezados de la tabla de servicios autorizados.
   * @type {any}
   */
  autorizadosEncabezadosTabla = (serviciosAutorizados as any).tableHeader;

  /**
   * Cuerpo de la tabla de servicios autorizados.
   * @type {any}
   */
  autorizadosCuerpoTabla = (serviciosAutorizados as any).tableBody;

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
    this.getcargarDatos();
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
      año: ['', [Validators.required, Validators.min(2000), Validators.max(2100)]],
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
  getcargarDatos(): void {
    this.modalidadService.getDatosSimulados()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
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
    this.cambioDeModalidadForm.get('año')?.disable();
    this.cambioDeModalidadForm.get('seleccionaModalidad')?.disable();
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
