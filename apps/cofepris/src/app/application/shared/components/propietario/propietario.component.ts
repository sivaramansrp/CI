/**
 * @fileoverview Componente `PropietarioComponent`
 * Este componente gestiona el formulario relacionado con los datos del propietario,
 * incluyendo información personal, dirección, y otros datos relevantes. También permite
 * la interacción con un modal para agregar o editar propietarios, y la actualización del estado global.
 */

import { CommonModule } from '@angular/common';

import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Modal } from 'bootstrap';

import { Subject,map, takeUntil } from 'rxjs';

import {
  ConfiguracionColumna,
  InputRadioComponent,
  TablaSeleccion,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import { TablaDinamicaComponent } from '@ng-mf/data-access-user';


import { DatosDelSolicituteSeccionQuery } from '../../estados/queries/datos-del-solicitute-seccion.query';

import { DatosDelSolicituteSeccionStateStore } from '../../estados/stores/datos-del-solicitute-seccion.store';

import { PropietarioModel, PropietarioRadio, PropietarioTipoPersona } from '../../models/datos-de-la-solicitud.model';

import { EstablecimientoComponent } from '../establecimiento/establecimiento.component';
import { EstablecimientoService } from '../../services/establecimiento.service';

import { ESTABLECIMIENTO_TABLE_CONFIG } from '../../constantes/aviso-de-funcionamiento.enum';

import { ConsultaioQuery } from '@ng-mf/data-access-user';
/*
* @description
*/ 
@Component({
  selector: 'app-propietario',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    InputRadioComponent,
    TablaDinamicaComponent,
    ReactiveFormsModule,
    FormsModule,
    EstablecimientoComponent,
  ],
  templateUrl: './propietario.component.html',
  styleUrl: './propietario.component.scss',
})
export class PropietarioComponent implements AfterViewInit, OnInit, OnDestroy {
  /**
   * Referencia al modal de propietario.
   */
  @ViewChild('propietarioModal', { static: false }) propietarioModal!: ElementRef;

  /**
   * Subject utilizado para destruir las suscripciones y evitar fugas de memoria.
   */
  private destroy$ = new Subject<void>();

  /**
   * Formulario para gestionar los datos personales del propietario.
   */
  formTercerosDatos!: FormGroup;

  /**
   * Formulario para gestionar los datos del radio de propietario.
   */
  propietarioradioForm!: FormGroup;

  /**
   * Datos del catálogo de tipo de persona.
   */
  propietarioTipoPersonaData : PropietarioTipoPersona[]=[];

  /**
   * Datos del catálogo de opciones de radio.
   */
  propietarioRadioData: PropietarioRadio[] = [];

  /**
   * Instancia del modal de Bootstrap.
   */
  modalInstance!: Modal;

  /**
   * Datos de los propietarios agregados.
   */
  propietarioData: PropietarioModel[] = [];

  /**
   * Valor seleccionado en el formulario.
   */
  selectedValue: string = '';

  /**
   * Indicador para mostrar los datos personales.
   */
  showDatosPersonales = false;

  /**
   * Indicador para mostrar el botón de búsqueda.
   */
  showBuscarButton = false;

  /**
   * Valor mostrado en el formulario.
   */
  showValue: string = '';

/**
 * Indica si el formulario debe mostrarse en modo solo lectura.
 * Cuando es verdadero, los campos del formulario no pueden ser editados por el usuario.
 */
 esFormularioSoloLectura: boolean = false;

  /**
   * Constructor del componente.
   * @param fb FormBuilder para inicializar formularios reactivos.
   * @param propietarioStore Store para gestionar el estado del propietario.
   * @param propietarioQuery Query para obtener el estado inicial del propietario.
   */
  constructor(
    private fb: FormBuilder,
    private propietarioStore: DatosDelSolicituteSeccionStateStore,
    private propietarioQuery: DatosDelSolicituteSeccionQuery,
    private establecimientoService : EstablecimientoService,
    private consultaQuery: ConsultaioQuery
  ) {
    this.consultaQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroy$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe()
  }

  /**
   * Ciclo de vida `AfterViewInit`.
   * Inicializa la instancia del modal de Bootstrap.
   */
  ngAfterViewInit(): void {
    if (this.propietarioModal) {
      this.modalInstance = new Modal(this.propietarioModal.nativeElement);
    }
  }

  /**
   * Enum para la selección de tabla.
   */
  TablaSeleccion = TablaSeleccion;

  /**
   * Ciclo de vida `OnInit`.
   * Inicializa los formularios y carga los datos iniciales.
   */
  ngOnInit(): void {
    this.propietarioradioForm = this.fb.group({
      tercerosTipoPersona: [null, Validators.required],
      tercerosCurp: [null, [Validators.required, Validators.maxLength(254)]],
      tercerosNacionalidad: [null, Validators.required],
      tercerosRfc: [null, Validators.required],
    });

    this.formTercerosDatos = this.fb.group({
      tercerosDenominacionRazonSocial: [
        { value: null, disabled: true },
        Validators.required,
      ],
      tercerosPais: ['', Validators.required],
      tercerosEstadoLocalidad: ['', Validators.required],
      tercerosMunicipioAlcaldia: ['', Validators.required],
      tercerosLocalidad: ['', Validators.required],
      tercerosColonia: ['', Validators.required],
      tercerosCodigoPostal: ['', Validators.required],
      tercerosCalle: ['', Validators.required],
      tercerosNumeroExterior: ['', Validators.required],
      tercerosNumeroInterior: [''],
      tercerosTelefono: [''],
      tercerosCorreoElectronico: [''],
      tercerosLada: [''],
      tercerosNombre: ['', Validators.required],
      tercerosSegundoApellido: [''],
      tercerosPrimerApellido: ['', Validators.required],
    });

     this.establecimientoService.getPropietario()
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: PropietarioModel[]) => {
        this.propietarioData= response;
     });

     this.inicializarFormulario();
  }

  /**
   * Inicializa el estado del formulario según el modo de solo lectura.
   */
  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario();
    }
  }

    /**
     * Guarda los datos del formulario y ajusta el estado de solo lectura.
     */
    guardarDatosFormulario(): void {
      if (this.esFormularioSoloLectura) {
        this.propietarioradioForm?.disable();
      } else {
        this.propietarioradioForm.enable();
      } 
    }

    /**
     * Inicializa los formularios y carga los datos iniciales de propietario, tipo de persona y radio.
     */
    inicializarFormulario() {
      this.propietarioQuery
      .select('propietarioData')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.propietarioData = data;
      });

      this.establecimientoService
      .getPropietarioRadioData()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: PropietarioRadio[]) => {
        this.propietarioRadioData = data; // Asigna los datos obtenidos
      });

      this.establecimientoService
      .getPropietarioTipoPersonaData()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: PropietarioTipoPersona[]) => {
        this.propietarioTipoPersonaData = data; // Asigna los datos obtenidos
      });
    }

  /**
   * Configuración de columnas de la tabla.
   */
  configuracionTabla: ConfiguracionColumna<PropietarioModel>[] =ESTABLECIMIENTO_TABLE_CONFIG;

  /**
   * Guarda un nuevo propietario y actualiza el estado global.
   */
  guardarPropietario(): void {
    const PROPIETARIO: PropietarioModel = {
      NombredenominacionORazonSocial:
        this.formTercerosDatos?.get('tercerosDenominacionRazonSocial')?.value,
      rfc: this.propietarioradioForm.get('tercerosRfc')?.value,
      curp: this.propietarioradioForm.get('tercerosCurp')?.value,
      telefono: this.formTercerosDatos.get('tercerosTelefono')?.value,
      CorreoElectronico:
        this.formTercerosDatos.get('tercerosCorreoElectronico')?.value,
      calle: this.formTercerosDatos.get('tercerosCalle')?.value,
      numeroExterior:
        this.formTercerosDatos.get('tercerosNumeroExterior')?.value,
      numeroInterior:
        this.formTercerosDatos.get('tercerosNumeroInterior')?.value,
      pais: this.formTercerosDatos.get('tercerosPais')?.value,
      colonia: this.formTercerosDatos.get('tercerosColonia')?.value,
      municipioOAlcaldia:
        this.formTercerosDatos.get('tercerosMunicipioAlcaldia')?.value,
      localidad: this.formTercerosDatos.get('tercerosLocalidad')?.value,
      entidadFederativa:
        this.formTercerosDatos.get('tercerosEstadoLocalidad')?.value,
      estadoLocalidad:
        this.formTercerosDatos.get('tercerosEstadoLocalidad')?.value,
      codigoPostal:
        this.formTercerosDatos.get('tercerosCodigoPostal')?.value,
    };

    // Verificar si todos los campos están vacíos
    const IS_EMPTY = Object.values(PROPIETARIO).every((value) => !value);

    if (IS_EMPTY) {
      return;
    }

    // Crear un nuevo array con el nuevo propietario
    const UPDATED_DATA = [...this.propietarioData, PROPIETARIO];

    // Actualizar el store con los nuevos datos del propietario
    this.propietarioStore.update({ propietarioData: UPDATED_DATA });

    // Limpiar los formularios
    this.formTercerosDatos.reset();
    this.propietarioradioForm.reset();
    this.closePropietarioModal();
  }

  /**
   * Abre el modal de propietario.
   */
  openPropietarioModal(): void {
    if (this.propietarioModal) {
      this.modalInstance.show();
    }
    this.formTercerosDatos.disable();
  }

  /**
   * Cierra el modal de propietario.
   */
  closePropietarioModal(): void {
    if (this.propietarioModal) {
      this.modalInstance.hide();
    }
  }

  /**
   * Maneja el cambio de selección en el formulario.
   * @param value Valor seleccionado.
   */
  onSelectionChange(value: string): void {
    this.showBuscarButton = value !== '';
    this.showValue = value;

    if (this.showBuscarButton) {
      this.propietarioradioForm.get('tercerosCurp')?.disable();
    } else {
      this.propietarioradioForm.get('tercerosCurp')?.enable();
    }
  }

  /**
   * Maneja el cambio de radio en el formulario.
   * @param value Valor seleccionado.
   */
  onRadioChange(value: string | number): void {
    this.showDatosPersonales = value === 'Nacional';
  }

  /**
   * Limpia todos los campos del formulario.
   */
  limpiarFormulario(): void {
    this.formTercerosDatos.reset();
  }

  /**
   * Busca los datos del representante por RFC y los actualiza en el formulario.
   */
  buscarRepresentanteRfc(): void {
    const RFC = this.propietarioradioForm.get('tercerosRfc')?.value; // Get the RFC entered by the user
  
    if (RFC) {
      // Fetch the data from the JSON file or API
      this.establecimientoService
        .getRepresentanteByRfc(RFC) // Service method to fetch data
        .pipe(takeUntil(this.destroy$))
        .subscribe((representante) => {
          if (representante) {
            // Patch the form with the fetched data
            this.propietarioradioForm.patchValue({
              tercerosCurp: representante.curp,
            });
            this.formTercerosDatos.patchValue({
              tercerosNombre: representante.nombre,
              tercerosPrimerApellido: representante.primerApellido,
              tercerosSegundoApellido: representante.segundoApellido,
              tercerosDenominacionRazonSocial: representante.denominacionRazonSocial,
              tercerosPais: representante.pais,
              tercerosEstadoLocalidad: representante.estadoLocalidad,
              tercerosMunicipioAlcaldia: representante.municipioAlcaldia,
              tercerosLocalidad: representante.localidad,
              tercerosCodigoPostal: representante.codigoPostal,
              tercerosColonia: representante.colonia,
              tercerosCalle: representante.calle,
              tercerosNumeroExterior: representante.numeroExterior,
              tercerosNumeroInterior: representante.numeroInterior,
              tercerosLada: representante.lada,
              tercerosTelefono: representante.telefono,
              tercerosCorreoElectronico: representante.correoElectronico,
            });
          } 
        });
    } 
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