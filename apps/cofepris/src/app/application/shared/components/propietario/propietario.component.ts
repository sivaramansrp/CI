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

import { Subject, takeUntil } from 'rxjs';

import {
  ConfiguracionColumna,
  InputRadioComponent,
  TablaSeleccion,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import { TablaDinamicaComponent } from '@ng-mf/data-access-user';

// eslint-disable-next-line @nx/enforce-module-boundaries
import propietarioJson from 'libs/shared/theme/assets/json/260401/propietario.json';
// eslint-disable-next-line @nx/enforce-module-boundaries
import propietarioTipoPersonaJson from 'libs/shared/theme/assets/json/260401/propietarioTipoPersona.json';

import { DatosDelSolicituteSeccionQuery } from '../../estados/queries/datos-del-solicitute-seccion.query';
import { DatosDelSolicituteSeccionStateStore } from '../../estados/stores/datos-del-solicitute-seccion.store';
import { PropietarioModel } from '../../models/datos-de-la-solicitud.model';

import { EstablecimientoComponent } from '../establecimiento/establecimiento.component';
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
  propietarioTipoPersonaData = propietarioTipoPersonaJson;

  /**
   * Datos del catálogo de opciones de radio.
   */
  propietarioRadioData = propietarioJson;

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
   * Constructor del componente.
   * @param fb FormBuilder para inicializar formularios reactivos.
   * @param propietarioStore Store para gestionar el estado del propietario.
   * @param propietarioQuery Query para obtener el estado inicial del propietario.
   */
  constructor(
    private fb: FormBuilder,
    private propietarioStore: DatosDelSolicituteSeccionStateStore,
    private propietarioQuery: DatosDelSolicituteSeccionQuery
  ) {}

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

    // Suscribirse al store para obtener los datos del propietario
    this.propietarioQuery
      .select('propietarioData')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.propietarioData = data;
      });
  }

  /**
   * Configuración de columnas de la tabla.
   */
  configuracionTabla: ConfiguracionColumna<PropietarioModel>[] = [
    {
      encabezado: 'Nombre/denominación o razón social',
      clave: (item: PropietarioModel) => item.NombredenominacionORazonSocial,
      orden: 1,
    },
    {
      encabezado: 'R.F.C.',
      clave: (item: PropietarioModel) => item.rfc,
      orden: 2,
    },
    {
      encabezado: 'CURP',
      clave: (item: PropietarioModel) => item.curp,
      orden: 3,
    },
    {
      encabezado: 'Teléfono',
      clave: (item: PropietarioModel) => item.telefono,
      orden: 4,
    },
    {
      encabezado: 'Correo electrónico',
      clave: (item: PropietarioModel) => item.CorreoElectronico,
      orden: 5,
    },
    {
      encabezado: 'Calle',
      clave: (item: PropietarioModel) => item.calle,
      orden: 6,
    },
    {
      encabezado: 'Número exterior',
      clave: (item: PropietarioModel) => item.numeroExterior,
      orden: 7,
    },
    {
      encabezado: 'Número interior',
      clave: (item: PropietarioModel) => item.numeroInterior,
      orden: 8,
    },
    {
      encabezado: 'País',
      clave: (item: PropietarioModel) => item.pais,
      orden: 9,
    },
    {
      encabezado: 'Colonia',
      clave: (item: PropietarioModel) => item.colonia,
      orden: 10,
    },
    {
      encabezado: 'Municipio o alcaldía',
      clave: (item: PropietarioModel) => item.municipioOAlcaldia,
      orden: 11,
    },
    {
      encabezado: 'Localidad',
      clave: (item: PropietarioModel) => item.localidad,
      orden: 12,
    },
    {
      encabezado: 'Entidad federativa',
      clave: (item: PropietarioModel) => item.entidadFederativa,
      orden: 13,
    },
    {
      encabezado: 'Estado/localidad',
      clave: (item: PropietarioModel) => item.estadoLocalidad,
      orden: 14,
    },
    {
      encabezado: 'Código postal',
      clave: (item: PropietarioModel) => item.codigoPostal,
      orden: 15,
    },
  ];

  /**
   * Guarda un nuevo propietario y actualiza el estado global.
   */
  guardarPropietario(): void {
    const PROPIETARIO: PropietarioModel = {
      NombredenominacionORazonSocial:
        this.formTercerosDatos.get('tercerosDenominacionRazonSocial')?.value,
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
    const RFC = this.propietarioradioForm.get('tercerosRfc')?.value;
    if (RFC) {
      this.propietarioradioForm.patchValue({
        tercerosCurp: 'GAPM920519HDFNRL02',
      });
      this.formTercerosDatos.patchValue({
        tercerosNombre: 'MIGUEL ANGEL',
        tercerosPrimerApellido: 'PEREZ',
        tercerosSegundoApellido: 'AHOME',
        tercerosDenominacionRazonSocial: 'INTEGRADORA DE URBANIZACIONES SIGNUM S DE RL DE CV',
        tercerosPais: 'ESTADOS UNIDOS MEXICANOS',
        tercerosEstadoLocalidad: 'SINALOA',
        tercerosMunicipioAlcaldia: 'CUAUHTEMOC',
        tercerosLocalidad: 'LOS MOCHIS',
        tercerosCodigoPostal: '81210',
        tercerosColonia: 'MIGUEL HIDALGO',
        tercerosCalle: 'CAMINO VIEJO',
        tercerosNumeroExterior: '1353',
        tercerosNumeroInterior: 'A',
        tercerosLada: '55',
        tercerosTelefono: '12345678',
        tercerosCorreoElectronico: 'brpomskyldi@etllpqhpyrpks.zgi',
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