import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  ConfiguracionColumna,
  InputRadioComponent,
  TablaSeleccion,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TablaDinamicaComponent } from '@ng-mf/data-access-user';

import { PropietarioModel } from '../../models/datos-de-la-solicitud.model';

import propietarioJson from 'libs/shared/theme/assets/json/260401/propietario.json';

import propietarioTipoPersonaJson from 'libs/shared/theme/assets/json/260401/propietarioTipoPersona.json';
import { Modal } from 'bootstrap';
import { EstablecimientoComponent } from '../establecimiento/establecimiento.component';

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
export class PropietarioComponent implements AfterViewInit, OnInit {
  @ViewChild('propietarioModal', { static: false })
  propietarioModal!: ElementRef;
  formTercerosDatos!: FormGroup;
  propietarioradioForm!: FormGroup;
  propietarioTipoPersonaData = propietarioTipoPersonaJson;
  propietarioRadioData = propietarioJson;
  modalInstance!: Modal;
  propietarioData: PropietarioModel[] = [];
  selectedValue: string = '';
  showDatosPersonales = false;
  showBuscarButton = false;
  showValue: string = '';
  constructor(private fb: FormBuilder) {}

  ngAfterViewInit(): void {
    if (this.propietarioModal) {
      this.modalInstance = new Modal(this.propietarioModal.nativeElement);
    }
  }
  /** Enum para la selección de tabla */
  TablaSeleccion = TablaSeleccion;
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
  }

  /**
   * Configuración de columnas de la tabla
   * @type {ConfiguracionColumna<any>[]}
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
      encabezado: 'Pais',
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
  logInvalidControls(form: FormGroup): void {
    Object.keys(form.controls).forEach((controlName) => {
      const control = form.get(controlName);
      if (control && control.invalid) {
        console.log(`Control: ${controlName}, Errors:`, control.errors);
      }
    });
  }guardarPropietario(): void {
    console.log('Form Controls:', this.formTercerosDatos.controls); // Debugging log
  
    const PROPIETARIO: PropietarioModel = {
      NombredenominacionORazonSocial:
        this.formTercerosDatos.get('tercerosDenominacionRazonSocial')?.value || '',
      rfc: this.propietarioradioForm.get('tercerosRfc')?.value || '',
      curp: this.propietarioradioForm.get('tercerosCurp')?.value || '',
      telefono: this.formTercerosDatos.get('tercerosTelefono')?.value || '',
      CorreoElectronico:
        this.formTercerosDatos.get('tercerosCorreoElectronico')?.value || '',
      calle: this.formTercerosDatos.get('tercerosCalle')?.value || '',
      numeroExterior:
        this.formTercerosDatos.get('tercerosNumeroExterior')?.value || '',
      numeroInterior:
        this.formTercerosDatos.get('tercerosNumeroInterior')?.value || '',
      pais: this.formTercerosDatos.get('tercerosPais')?.value || '',
      colonia: this.formTercerosDatos.get('tercerosColonia')?.value || '',
      municipioOAlcaldia:
        this.formTercerosDatos.get('tercerosMunicipioAlcaldia')?.value || '',
      localidad: this.formTercerosDatos.get('tercerosLocalidad')?.value || '',
      entidadFederativa:
        this.formTercerosDatos.get('tercerosEstadoLocalidad')?.value || '',
      estadoLocalidad:
        this.formTercerosDatos.get('tercerosEstadoLocalidad')?.value || '',
      codigoPostal:
        this.formTercerosDatos.get('tercerosCodigoPostal')?.value || '',
    };
  
    // Check if all fields in the PROPIETARIO object are empty
    const isEmpty = Object.values(PROPIETARIO).every((value) => value === '');
  
    if (isEmpty) {
      console.log('Empty data, not adding to the table.');
      return; // Exit the method without adding to the table
    }
  
    // Add the new propietario to the table data
    this.propietarioData.push(PROPIETARIO);
    console.log('Propietario saved:', this.propietarioData);
  
    // Reset the form
    this.formTercerosDatos.reset();
    this.propietarioradioForm.reset();
    this.closePropietarioModal();
  }
  openPropietarioModal(): void {
    if (this.propietarioModal) {
      this.modalInstance.show();
    }
    this.formTercerosDatos.disable();
  }
  closePropietarioModal(): void {
    if (this.propietarioModal) {
      this.modalInstance.hide();
    }
  }
  onSelectionChange(value: string): void {
    this.showBuscarButton = value !== ''; // Update the showBuscarButton flag
    this.showValue = value;

    // Enable or disable the 'tercerosCurp' form control based on the flag
    if (this.showBuscarButton) {
      this.propietarioradioForm.get('tercerosCurp')?.disable();
    } else {
      this.propietarioradioForm.get('tercerosCurp')?.enable();
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onRadioChange(value: string | number): void {
    this.showDatosPersonales = value === 'Nacional';
  }
  limpiarFormulario(): void {
    this.formTercerosDatos.reset(); // Clear all form fields
  }
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
}
