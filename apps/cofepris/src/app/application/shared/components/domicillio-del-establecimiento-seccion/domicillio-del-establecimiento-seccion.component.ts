/**
 * compodoc
 * @fileoverview Componente `DomicillioDelEstablecimientoSeccionComponent`
 * Este componente gestiona el formulario relacionado con el domicilio del establecimiento,
 * incluyendo datos como el estado, código postal, municipio, localidad, colonia, calle, teléfono,
 * y otros datos relacionados. También permite la gestión de datos SCIAN y la interacción con un modal.
 */

import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  Catalogo,
  CatalogoSelectComponent,
  ConfiguracionColumna,
  TablaDinamicaComponent,
  TablaSeleccion,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import { DatosDelSolicituteSeccionQuery } from '../../estados/queries/datos-del-solicitute-seccion.query';
import { DatosDelSolicituteSeccionStateStore, DatosDelSolicituteSeccionState } from '../../estados/stores/datos-del-solicitute-seccion.store';

import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EstablecimientoService } from '../../services/establecimiento.service';

import { map, Subject, takeUntil } from 'rxjs';
import { ScianModel } from '../../models/datos-de-la-solicitud.model';

import { Modal } from 'bootstrap';
import { SCIAN_TABLE_CONFIG } from '../../constantes/aviso-de-funcionamiento.enum';

import { ConsultaioQuery } from '@ng-mf/data-access-user';
/* 
* @description
* Componente que gestiona el domicilio del establecimiento.
*/
@Component({
  selector: 'app-domicillio-del-establecimiento-seccion',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    ReactiveFormsModule,
    FormsModule,
    CatalogoSelectComponent,
    TablaDinamicaComponent,
  ],
  templateUrl: './domicillio-del-establecimiento-seccion.component.html',
  styleUrl: './domicillio-del-establecimiento-seccion.component.scss',
})
export class DomicillioDelEstablecimientoSeccionComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  /**
   * Referencia al modal del establecimiento.
   */
  /**
   * Referencia al elemento del modal del establecimiento.
   */
  @ViewChild('establecimientoModal', { static: false })
  establecimientoModal!: ElementRef;

  /**
   * Formulario para gestionar los datos SCIAN.
   */
  scianForm!: FormGroup;

  /**
   * Enumeración para la selección de tablas.
   */
  TablaSeleccion = TablaSeleccion;

  /**
   * Indica si el formulario debe estar deshabilitado.
   */
  formularioDeshabilitado: boolean = false;

  /**
  * Estado de la solicitud de la sección .
  */
    public solicitudState!: DatosDelSolicituteSeccionState;
  /**
   * Constructor del componente.
   * @param fb FormBuilder para inicializar formularios reactivos.
   * @param establecimientoService Servicio para obtener datos relacionados con el establecimiento.
   * @param domicilioEstablecimientoStore Store para gestionar el estado del domicilio del establecimiento.
   * @param domicilioEstablecimientoQuery Query para obtener el estado inicial del domicilio del establecimiento.
   */
  constructor(
    private fb: FormBuilder,
    private establecimientoService: EstablecimientoService,
    private domicilioEstablecimientoStore: DatosDelSolicituteSeccionStateStore,
    private domicilioEstablecimientoQuery: DatosDelSolicituteSeccionQuery,
    private consultaioQuery: ConsultaioQuery,
  ) {
       this.consultaioQuery.selectConsultaioState$
        .pipe(
          takeUntil(this.destroy$),
          map((seccionState)=>{
            this.formularioDeshabilitado = seccionState.readonly; 
            this.inicializarEstadoFormulario();
          })
        )
        .subscribe()
  }

  /**
   * Subject utilizado para destruir las suscripciones y evitar fugas de memoria.
   */
  private destroy$ = new Subject<void>();

  /**
   * Instancia del modal de Bootstrap.
   */
  modalInstance!: Modal;

  /**
   * Datos del catálogo de régimen al que se destinará la mercancía.
   */
  regimenQueDestinara: Catalogo[] = [];

  /**
   * Datos del catálogo de aduanas de salida.
   */
  aduanaDeSalida: Catalogo[] = [];

  /**
   * Formulario para gestionar los datos del domicilio del establecimiento.
   */
  domicilioEstablecimiento!: FormGroup;

  /**
   * Datos del catálogo de estados.
   */
  estadoJson: Catalogo[] = [];

  /**
   * Datos SCIAN agregados por el usuario.
   */
  personaparas: ScianModel[] = [];

  /**
   * Datos del catálogo SCIAN.
   */
  scianJson: Catalogo[] = [];

  /**
   * Configuración de las columnas de la tabla dinámica para los datos SCIAN.
   */
  configuracionTabla: ConfiguracionColumna<ScianModel>[] = SCIAN_TABLE_CONFIG;

  /**
   * Ciclo de vida `AfterViewInit`.
   * Inicializa la instancia del modal de Bootstrap.
   */
  ngAfterViewInit(): void {
    if (this.establecimientoModal) {
      this.modalInstance = new Modal(this.establecimientoModal.nativeElement);
    }
  }

  /**
   * Ciclo de vida `OnInit`.
   * Inicializa los formularios y carga los datos iniciales.
   */
  ngOnInit(): void {
    this.loadAduanaDeSalida();
    this.loadRegimen();
    this.loadEstado();
    this.loadScian();
    this.inicializarEstadoFormulario();
        // Cargar el estado inicial en el formulario


    this.establecimientoService.getScianDatos().pipe(takeUntil(this.destroy$))
      .subscribe((response: ScianModel[]) => {
        this.personaparas = response;
      });
  }
  /**
   * Maneja el cambio de valor en un control del formulario.
   * @param controlName Nombre del control que cambió.
   */
  onControlChange(controlName: string): void {
    const UPDATED_VALUE = { [controlName]: this.domicilioEstablecimiento.get(controlName)?.value };
    this.domicilioEstablecimientoStore.update(UPDATED_VALUE);
  }
  /**
   * Carga los datos del catálogo de régimen.
   */
  loadRegimen(): void {
    this.establecimientoService
      .getRegimenData()
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp: Catalogo[]) => {
        this.regimenQueDestinara = resp;
      });
  }

  /**
   * Carga los datos del catálogo de aduanas de salida.
   */
  loadAduanaDeSalida(): void {
    this.establecimientoService
      .getAduanaDeSalidaData()
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp: Catalogo[]) => {
        this.aduanaDeSalida = resp;
      });
  }

  /**
   * Carga los datos del catálogo de estados.
   */
  loadEstado(): void {
    this.establecimientoService
      .getEstadoData()
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp: Catalogo[]) => {
        this.estadoJson = resp;
      });
  }

  /**
   * Carga los datos del catálogo SCIAN.
   */
  loadScian(): void {
    this.establecimientoService
      .getSciandata()
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp: Catalogo[]) => {
        this.scianJson = resp;
      });
  }

  /**
   * Abre el modal SCIAN.
   */
  openScianModal(): void {
    this.modalInstance.show();
  }

  /**
   * Cierra el modal SCIAN.
   */
  closeScianModal(): void {
    this.modalInstance.hide();
  }

  /**
   * Limpia el formulario SCIAN.
   */
  limpiarScianForm(): void {
    this.scianForm.reset();
  }

  /**
   * Guarda un nuevo dato SCIAN y lo agrega a la tabla.
   */
  guardarScian(): void {
    if (this.scianForm.valid) {
      const SCIAN_DATA: ScianModel = {
        claveScian: this.scianForm.get('scian')?.value,
        descripcionScian: this.scianForm.get('descripcionScian')?.value,
      };

      // Agregar el nuevo dato a la tabla
      this.personaparas.push(SCIAN_DATA);

      // Limpiar el formulario
      this.scianForm.reset();

      // Cerrar el modal
      this.closeScianModal();
    }
  }

  /**
   * Verifica si el checkbox de aviso de funcionamiento está marcado.
   * @returns `true` si está marcado, de lo contrario `false`.
   */
  isCheckboxChecked(): boolean {
    return this.domicilioEstablecimiento.get('avisoDeFuncionamiento')?.value;
  }

   /**
   * Evalúa si se debe inicializar o cargar datos en el formulario.  
   * Además, obtiene la información del catálogo de mercancía.
   */
  inicializarEstadoFormulario(): void {
    if (this.formularioDeshabilitado) {
      this.guardarDatosFormulario();
    } else {
      this.inicializarFormulario();
    }  
  }

  
  /**
   * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
   * Luego reinicializa el formulario con los valores actualizados desde el store.
   */
  guardarDatosFormulario(): void {
      this.inicializarFormulario();
      if (this.formularioDeshabilitado) {
        this.domicilioEstablecimiento.disable();
      } else{
        this.domicilioEstablecimiento.enable();
      } 
  }

    /**
   * Inicializa el formulario reactivo para el domicilio del establecimiento y el formulario SCIAN.
   * También carga el estado inicial del formulario desde el store.
   */
  inicializarFormulario(): void {
    this.domicilioEstablecimiento = this.fb.group({
      establecimientoDomicilioEstado: ['', Validators.required],
      establecimientoDomicilioCodigoPostal: ['', Validators.required],
      establecimientoMunicipioYAlcaldia: ['', Validators.required],
      establecimientoDomicilioLocalidad: ['', Validators.required],
      establecimientoDomicilioColonia: ['', Validators.required],
      establecimientoDomicilioCalle: ['', Validators.required],
      establecimientoDomicilioTelefono: ['', Validators.required],
      establecimientoDomicilioLada: ['', Validators.required],
      nombreDelProfesionalResponsable: [''],
      rfcDelProfesionalResponsable: [''],
      noDeLicenciaSanitaria: [''],
      regimenAlQueSeDestinaraLaMercancía: [''],
      aduanaDeSalida: [''],
      avisoDeFuncionamiento: [false],
      noDeLicenciaSanitariaObservaciones: [''],
    });

    this.scianForm = this.fb.group({
      scian: ['', Validators.required],
      descripcionScian: ['', Validators.required],
    });

        this.domicilioEstablecimientoQuery
      .select()
      .pipe(takeUntil(this.destroy$))
      .subscribe((state) => {
        this.domicilioEstablecimiento.patchValue(state, { emitEvent: false });
      });

  }


  /**
   * Ciclo de vida `OnDestroy`.
   * Limpia las suscripciones para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}