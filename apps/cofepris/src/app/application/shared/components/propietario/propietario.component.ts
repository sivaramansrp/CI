import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

import { CommonModule } from '@angular/common';

import { ConfiguracionColumna, InputRadioComponent, TablaSeleccion, TituloComponent } from '@libs/shared/data-access-user/src';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TablaDinamicaComponent } from '@ng-mf/data-access-user';

import { PropietarioModel } from '../../models/datos-de-la-solicitud.model';

import  propietarioJson  from 'libs/shared/theme/assets/json/260401/propietario.json';

import propietarioTipoPersonaJson from 'libs/shared/theme/assets/json/260401/propietarioTipoPersona.json';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-propietario',
  standalone: true,
  imports: [CommonModule, TituloComponent,InputRadioComponent ,TablaDinamicaComponent, ReactiveFormsModule,FormsModule ],
  templateUrl: './propietario.component.html',
  styleUrl: './propietario.component.scss',
})
export class PropietarioComponent implements AfterViewInit {

  @ViewChild('propietarioModal', { static: false }) propietarioModal!: ElementRef;
  formTercerosDatos!: FormGroup;
  propietarioTipoPersonaData = propietarioTipoPersonaJson;
  propietarioRadioData = propietarioJson;
modalInstance!: Modal;  
propietarioData: PropietarioModel [] = [];
selectedValue: string = '';
constructor(private fb: FormBuilder) { }


ngAfterViewInit():void {
  if (this.propietarioModal) {
    this.modalInstance = new Modal(this.propietarioModal.nativeElement);
  }
}
    /** Enum para la selección de tabla */
    TablaSeleccion = TablaSeleccion;
    ngOnInit():void{
      this.formTercerosDatos = this.fb.group({
        'terceros.nacionalidad': [{ value: null, disabled: false }, Validators.required],
        'terceros.tipoPersona': [{ value: null, disabled: true }, Validators.required],
        'terceros.rfc': [{ value: null, disabled: true }, Validators.required],
        'terceros.curp': [{ value: null, disabled: true }, Validators.required , Validators.maxLength(254)],
        'terceros.denominacionRazonSocial': [{ value: null, disabled: true }, Validators.required , Validators.maxLength(254)],
      });
    }
    
    
    /**
   * Configuración de columnas de la tabla
   * @type {ConfiguracionColumna<any>[]}
   */
    configuracionTabla: ConfiguracionColumna<PropietarioModel >[] = [
      { encabezado: 'Nombre/denominación o razón social', clave: (item: PropietarioModel ) => item.NombredenominacionORazonSocial, orden: 1 },
      { encabezado: 'R.F.C.', clave: (item: PropietarioModel ) => item.rfc, orden: 2 },
      { encabezado: 'CURP', clave: (item: PropietarioModel ) => item.curp, orden: 3 },
      { encabezado: 'Teléfono', clave: (item: PropietarioModel ) => item.telefono, orden: 4 },
      { encabezado: 'Correo electrónico', clave: (item: PropietarioModel ) => item.CorreoElectronico, orden: 5 },
      { encabezado: 'Calle', clave: (item: PropietarioModel ) => item.calle, orden: 6 },
      { encabezado: 'Número exterior', clave: (item: PropietarioModel ) => item.numeroExterior, orden: 7 },
      { encabezado: 'Número interior', clave: (item: PropietarioModel ) => item.numeroInterior, orden: 8 },
      { encabezado: 'Pais', clave: (item: PropietarioModel ) => item.pais, orden: 9 },
      { encabezado: 'Colonia', clave: (item: PropietarioModel ) => item.colonia, orden: 10 },
      { encabezado: 'Municipio o alcaldía', clave: (item: PropietarioModel ) => item.municipioOAlcaldia, orden: 11 },
      { encabezado: 'Localidad', clave: (item: PropietarioModel ) => item.localidad, orden: 12 },
      { encabezado: 'Entidad federativa', clave: (item: PropietarioModel ) => item.entidadFederativa, orden: 13 },
      { encabezado: 'Estado/localidad', clave: (item: PropietarioModel ) => item.estadoLocalidad, orden: 14 },
      { encabezado: 'Código postal', clave: (item: PropietarioModel ) => item.codigoPostal, orden: 15 }
    ];

    openPropietarioModal() :void{
      if (this.propietarioModal) {
        this.modalInstance.show();
      }
    }
    closePropietarioModal() :void{
      if (this.propietarioModal) {
        this.modalInstance.hide();
    }
}
onSelectionChange(value: string): void {
  this.selectedValue = value;
  //this.FormInputRadio.get('seleccion')?.setValue(value);
}
}