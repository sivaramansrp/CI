import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AlertComponent } from '@ng-mf/data-access-user';
import {Catalogo, CatalogoSelectComponent} from '@libs/shared/data-access-user/src';

import { TituloComponent } from '@libs/shared/data-access-user/src';
import { TableComponent } from '@ng-mf/data-access-user';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TercerosService } from '../../services/terceros.service';

import { CODIGOPOSTALSELECTDATA, COLONIASELECTDATA, LOCALIDADSELECTDATA, MUNICIPIOSELECTDATA, PAISSELECTDATA, TERCEROS_RELACIONADOS_TABLE_HEADER_DATA } from '../../constantes/permiso-maquila.enum';
import { ModalComponent } from '../modal/modal.component';
import {
  selectedRowData,
  tableData,
} from '../../models/permiso-maquila.models';
import { Tramite260212Store } from '../../../../estados/tramites/tramite260212.store';


const TERCEROS_TEXTO_DE_ALERTA =
  'Las tablas con asterisco son obligatorias y debes agregar por lo menos un registro.';

@Component({
  selector: 'app-terceros-relacionados',
  standalone: true,
  templateUrl: './terceros-relacionados.component.html',
  styleUrl: './terceros-relacionados.component.scss',
  imports: [
    CommonModule,
    TituloComponent,
    TableComponent,
    AlertComponent,
    FormsModule,
    ReactiveFormsModule,
    ModalComponent,
    CatalogoSelectComponent,
  ],
})

export class TercerosRelacionadosComponent implements OnInit {
  showTableDiv = true;
  showFabricante = false;
  showDestinatario = false;
  showProveedor = false;
  showFacturador = false;
  showFabricanteButtons = false;
  showDestinatarioButtons = false;
  showProveedorButtons = false;
  showFacturadorButtons = false;


  tipoPersonaSelection! :string;

  dropdownData: Catalogo[] = [];
  paisDropdownData: Catalogo[] = PAISSELECTDATA;
  localidadDropdownData: Catalogo[] = LOCALIDADSELECTDATA;
  municipioDropdownData: Catalogo[] = MUNICIPIOSELECTDATA;
  codigoPostalDropdownData: Catalogo[] = CODIGOPOSTALSELECTDATA;
  coloniaDropdownData:Catalogo[] = COLONIASELECTDATA;

  agregarFabricanteFormGroup!: FormGroup;

  agregarDestinatarioFormGroup!: FormGroup;

  agregarProveedorFormGroup!: FormGroup;

  agregarFacturadorFormGroup!: FormGroup;

  constructor(private fb: FormBuilder,
    private tramite260212Store: Tramite260212Store,
    private tercerosService : TercerosService
  ) {}


  ngOnInit(): void {
    this.tercerosService.getData().subscribe((data) => {
      this.dropdownData = data;
    });

    this.initializeAgregarFabricanteFormGroup();
    this.initializeAgregarDestinatarioFormGroup();
    this.initializeAgregarProveedorFormGroup();
    this.initializeAgregarFacturadorFormGroup();
  }


  initializeAgregarFabricanteFormGroup() {
    this.agregarFabricanteFormGroup = this.fb.group({
      tercerosNacionalidad: new FormControl('', [Validators.required]),
      tipoPersona: new FormControl('', [Validators.required]),
      rfc: new FormControl('', [Validators.required, this.rfcValidator]),
      curp: new FormControl('', [Validators.required,this.curpValidator]),
      denominacionRazonSocial: new FormControl('', [Validators.required]),
      pais: new FormControl('', [Validators.required,this.requiredPaisValidator]),
      estadoLocalidad: new FormControl('', [Validators.required]),
      municipioAlcaldia: new FormControl('', [Validators.required]),
      localidad: new FormControl(''),
      entidadFederativa: new FormControl('', [Validators.required]),
      codigoPostaloEquivalente: new FormControl('', [Validators.required]),
      colonia: new FormControl(''),
      coloniaoEquivalente: new FormControl(''),
      calle: new FormControl('', [Validators.required]),
      numeroExterior: new FormControl('', [Validators.required]),
      numeroInterior: new FormControl(''),
      lada: new FormControl(''),
      telefono: new FormControl('',[this.telefonoValidator]),
      correoElectronico: new FormControl(''),
    });

    this.agregarFabricanteFormGroup.get('rfc')?.disable(); //disabling fields when radio buttons are not selected initially
    this.agregarFabricanteFormGroup.get('curp')?.disable();
    this.agregarFabricanteFormGroup.get('denominacionRazonSocial')?.disable();

    this.agregarFabricanteFormGroup.get('tipoPersona')?.valueChanges.subscribe(() => {
      this.agregarFabricanteFormGroup.get('rfc')?.enable();
      this.agregarFabricanteFormGroup.get('curp')?.enable();
      this.agregarFabricanteFormGroup.get('denominacionRazonSocial')?.enable();
    })
  }


  initializeAgregarDestinatarioFormGroup() {
    this.agregarDestinatarioFormGroup = this.fb.group({
      tipoPersona: new FormControl('', [Validators.required]),
      rfc: new FormControl('', [Validators.required]),
      curp: new FormControl('', [Validators.required]),
      denominacionRazonSocial: new FormControl('', [Validators.required]),
      pais: new FormControl('', [Validators.required]),
      estadoLocalidad: new FormControl('', [Validators.required]),
      municipioAlcaldia: new FormControl('', [Validators.required]),
      localidad: new FormControl(''),
      entidadFederativa: new FormControl('', [Validators.required]),
      codigoPostaloEquivalente: new FormControl('', [Validators.required]),
      colonia: new FormControl(''),
      coloniaoEquivalente: new FormControl(''),
      calle: new FormControl('', [Validators.required]),
      numeroExterior: new FormControl('', [Validators.required]),
      numeroInterior: new FormControl(''),
      lada: new FormControl(''),
      telefono: new FormControl(''),
      correoElectronico: new FormControl(''),
    });

    this.agregarDestinatarioFormGroup.get('rfc')?.disable(); //disabling fields when radio buttons are not selected initially
    this.agregarDestinatarioFormGroup.get('curp')?.disable();
    this.agregarDestinatarioFormGroup.get('denominacionRazonSocial')?.disable();

    this.agregarDestinatarioFormGroup.get('tipoPersona')?.valueChanges.subscribe(() => {
      this.agregarDestinatarioFormGroup.get('rfc')?.enable();
      this.agregarDestinatarioFormGroup.get('curp')?.enable();
      this.agregarDestinatarioFormGroup.get('denominacionRazonSocial')?.enable();

    })
  }


  initializeAgregarProveedorFormGroup() {
    this.agregarProveedorFormGroup = this.fb.group({
      tipoPersona: new FormControl('', [Validators.required]),
      nombre: new FormControl('', [Validators.required]),
      primerApellido: new FormControl('', [Validators.required]),
      denominacionRazonSocial: new FormControl('', [Validators.required]),
      segundoApellido: new FormControl(''),
      pais: new FormControl('', [Validators.required]),
      estado: new FormControl('', [Validators.required]),
      codigoPostaloEquivalente: new FormControl(''),
      coloniaoEquivalente: new FormControl(''),
      calle: new FormControl('', [Validators.required]),
      numeroExterior: new FormControl('', [Validators.required]),
      numeroInterior: new FormControl(''),
      lada: new FormControl(''),
      telefono: new FormControl(''),
      correoElectronico: new FormControl(''),
    });

    
    this.agregarProveedorFormGroup.get('nombre')?.disable(); //disabling fields when radio buttons are not selected initially
    this.agregarProveedorFormGroup.get('segundoApellido')?.disable();
    this.agregarProveedorFormGroup.get('primerApellido')?.disable();
    this.agregarProveedorFormGroup.get('denominacionRazonSocial')?.disable();


    this.agregarProveedorFormGroup.get('tipoPersona')?.valueChanges.subscribe(() => {
      this.agregarProveedorFormGroup.get('nombre')?.enable();
      this.agregarProveedorFormGroup.get('primerApellido')?.enable();
      this.agregarProveedorFormGroup.get('segundoApellido')?.enable();
      this.agregarProveedorFormGroup.get('denominacionRazonSocial')?.enable();
    })
  }


  initializeAgregarFacturadorFormGroup() {
    this.agregarFacturadorFormGroup = this.fb.group({
      tipoPersona: new FormControl('', [Validators.required]),
      nombre: new FormControl('', [Validators.required]),
      primerApellido: new FormControl('', [Validators.required]),
      denominacionRazonSocial: new FormControl('', [Validators.required]),
      segundoApellido: new FormControl(''),
      pais: new FormControl('', [Validators.required,this.requiredPaisValidator]),
      estado: new FormControl('', [Validators.required]),
      codigoPostaloEquivalente: new FormControl(''),
      coloniaoEquivalente: new FormControl(''),
      calle: new FormControl('', [Validators.required]),
      numeroExterior: new FormControl('', [Validators.required]),
      numeroInterior: new FormControl(''),
      lada: new FormControl(''),
      telefono: new FormControl(''),
      correoElectronico: new FormControl(''),
    });

    this.agregarFacturadorFormGroup.get('nombre')?.disable(); //disabling fields when radio buttons are not selected initially
    this.agregarFacturadorFormGroup.get('segundoApellido')?.disable();
    this.agregarFacturadorFormGroup.get('primerApellido')?.disable();
    this.agregarFacturadorFormGroup.get('denominacionRazonSocial')?.disable();


    this.agregarFacturadorFormGroup.get('tipoPersona')?.valueChanges.subscribe(() => {
      this.agregarFacturadorFormGroup.get('nombre')?.enable();
      this.agregarFacturadorFormGroup.get('primerApellido')?.enable();
      this.agregarFacturadorFormGroup.get('segundoApellido')?.enable();
      this.agregarFacturadorFormGroup.get('denominacionRazonSocial')?.enable();
    })
  }


  fabricanteHeaderData = TERCEROS_RELACIONADOS_TABLE_HEADER_DATA;
  destinatarioHeaderData = TERCEROS_RELACIONADOS_TABLE_HEADER_DATA;
  proveedorHeaderData = TERCEROS_RELACIONADOS_TABLE_HEADER_DATA;
  facturadorHeaderData = TERCEROS_RELACIONADOS_TABLE_HEADER_DATA;

  public fisica = false;
  public moral = false;

  fabricanteRowData: tableData[] = [];
  destinatarioRowData: tableData[] = [];
  proveedorRowData: tableData[] = [];
  facturadorRowData: tableData[] = [];


  public inputChecked(checkBoxName: string) {
    if (checkBoxName === 'fisica') {
      this.fisica = true;
      this.moral = false;
    } else {
      this.fisica = false;
      this.moral = true;
    }
  }

  toggleDivFabricante() {
    this.fisica = false;
    this.moral = false;
    this.showTableDiv = !this.showTableDiv;
    this.showFabricante = !this.showFabricante;
  }
 
  toggleDivDestinatario() {
    this.fisica = false;
    this.moral = false;
    this.showTableDiv = !this.showTableDiv;
    this.showDestinatario = !this.showDestinatario;
  }

  toggleDivProveedor() {
    this.fisica = false;
    this.moral = false;
    this.showTableDiv = !this.showTableDiv;
    this.showProveedor = !this.showProveedor;
  }

  toggleDivFacturador() {
    this.fisica = false;
    this.moral = false;
    this.showTableDiv = !this.showTableDiv;
    this.showFacturador = !this.showFacturador;
  }


  selectedFabricanteRows(data: selectedRowData) {
    this.showFabricanteButtons = data.checked;
  }


  selectedDestinatarioRows(data: selectedRowData) {
    this.showDestinatarioButtons = data.checked;
  }


  selectedProveedorRows(data: selectedRowData) {
    this.showProveedorButtons = data.checked;
  }


  selectedFacturadorRows(data: selectedRowData) {
    this.showFacturadorButtons = data.checked;
  }


  TEXTO_DE_ALERTA: string = TERCEROS_TEXTO_DE_ALERTA;


  submitFabricanteForm() {
    const localidadValue = this.localidadDropdownData.find((item: Catalogo) => item.id == this.agregarFabricanteFormGroup.value.localidad)?.descripcion;
    const municipioValue = this.municipioDropdownData.find((item: Catalogo) => item.id == this.agregarFabricanteFormGroup.value.municipioAlcaldia)?.descripcion;
    const codigoPostalValue = this.codigoPostalDropdownData.find((item: Catalogo) => item.id == this.agregarFabricanteFormGroup.value.codigoPostaloEquivalente)?.descripcion;
    const coloniaValue = this.coloniaDropdownData.find((item: Catalogo) => item.id == this.agregarFabricanteFormGroup.value.colonia)?.descripcion;
    // const paisValue = this.paisDropdownData.find((item: Catalogo) => item.id == this.agregarFabricanteFormGroup.value.pais)?.descripcion;

    const fabricanteRow = {
      tbodyData: [
        this.agregarFabricanteFormGroup.value.denominacionRazonSocial,
        this.agregarFabricanteFormGroup.value.rfc,
        this.agregarFabricanteFormGroup.value.curp,
        this.agregarFabricanteFormGroup.value.lada +
          '-' +
          this.agregarFabricanteFormGroup.value.telefono,
        this.agregarFabricanteFormGroup.value.correoElectronico,
        this.agregarFabricanteFormGroup.value.calle,
        this.agregarFabricanteFormGroup.value.numeroExterior,
        this.agregarFabricanteFormGroup.value.numeroInterior,
        this.agregarFabricanteFormGroup.value.pais,
        coloniaValue,
        municipioValue,
        localidadValue,
        this.agregarFabricanteFormGroup.value.entidadFederativa,
        this.agregarFabricanteFormGroup.value.estadoLocalidad,
        codigoPostalValue,
        this.agregarFabricanteFormGroup.value.coloniaoEquivalente,
      ],
    };
    this.fabricanteRowData.push(fabricanteRow);
    this.tramite260212Store.setFabricante(this.fabricanteRowData);
    this.showTableDiv = !this.showTableDiv;
    this.showFabricante = !this.showFabricante;
  }


  submitDestinatarioForm() {
    const localidadValue = this.localidadDropdownData.find((item: Catalogo) => item.id == this.agregarDestinatarioFormGroup.value.localidad)?.descripcion;
    const municipioValue = this.municipioDropdownData.find((item: Catalogo) => item.id == this.agregarDestinatarioFormGroup.value.municipioAlcaldia)?.descripcion;
    const codigoPostalValue = this.codigoPostalDropdownData.find((item: Catalogo) => item.id == this.agregarDestinatarioFormGroup.value.codigoPostaloEquivalente)?.descripcion;
    const coloniaValue = this.coloniaDropdownData.find((item: Catalogo) => item.id == this.agregarDestinatarioFormGroup.value.colonia)?.descripcion;
    // const paisValue = this.paisDropdownData.find((item: Catalogo) => item.id == this.agregarFabricanteFormGroup.value.pais)?.descripcion;

    const destinatarioRow = {
      tbodyData: [
        this.agregarDestinatarioFormGroup.value.denominacionRazonSocial,
        this.agregarDestinatarioFormGroup.value.rfc,
        this.agregarDestinatarioFormGroup.value.curp,
        this.agregarDestinatarioFormGroup.value.lada +
          '-' +
          this.agregarDestinatarioFormGroup.value.telefono,
        this.agregarDestinatarioFormGroup.value.correoElectronico,
        this.agregarDestinatarioFormGroup.value.calle,
        this.agregarDestinatarioFormGroup.value.numeroExterior,
        this.agregarDestinatarioFormGroup.value.numeroInterior,
        this.agregarDestinatarioFormGroup.value.pais,
        coloniaValue,
        municipioValue,
        localidadValue,
        this.agregarDestinatarioFormGroup.value.entidadFederativa,
        this.agregarDestinatarioFormGroup.value.estadoLocalidad,
        codigoPostalValue,
        this.agregarDestinatarioFormGroup.value.coloniaoEquivalente,
      ],
    };
    this.destinatarioRowData.push(destinatarioRow);
    this.tramite260212Store.setDestinatario(this.destinatarioRowData);
    this.showTableDiv = !this.showTableDiv;
    this.showDestinatario = !this.showDestinatario;
  }


  submitProveedorForm() {
    const proveedorRow = {
      tbodyData: [
        this.agregarProveedorFormGroup.value.denominacionRazonSocial,
        this.agregarProveedorFormGroup.value.rfc,
        this.agregarProveedorFormGroup.value.curp,
        this.agregarProveedorFormGroup.value.lada +
          '-' +
          this.agregarProveedorFormGroup.value.telefono,
        this.agregarProveedorFormGroup.value.correoElectronico,
        this.agregarProveedorFormGroup.value.calle,
        this.agregarProveedorFormGroup.value.numeroExterior,
        this.agregarProveedorFormGroup.value.numeroInterior,
        this.agregarProveedorFormGroup.value.pais,
        this.agregarProveedorFormGroup.value.colonia,
        this.agregarProveedorFormGroup.value.municipioAlcaldia,
        this.agregarProveedorFormGroup.value.localidad,
        this.agregarProveedorFormGroup.value.entidadFederativa,
        this.agregarProveedorFormGroup.value.estadoLocalidad,
        this.agregarProveedorFormGroup.value.codigoPostaloEquivalente,
        this.agregarProveedorFormGroup.value.coloniaoEquivalente,
      ],
    };
    this.proveedorRowData.push(proveedorRow);
    this.tramite260212Store.setProveedor(this.proveedorRowData);
    this.showTableDiv = !this.showTableDiv;
    this.showProveedor = !this.showProveedor;
  }


  submitFacturadorForm() {
    const facturadorRow = {
      tbodyData: [
        this.agregarFacturadorFormGroup.value.denominacionRazonSocial,
        this.agregarFacturadorFormGroup.value.rfc,
        this.agregarFacturadorFormGroup.value.curp,
        this.agregarFacturadorFormGroup.value.lada +
          '-' +
          this.agregarFacturadorFormGroup.value.telefono,
        this.agregarFacturadorFormGroup.value.correoElectronico,
        this.agregarFacturadorFormGroup.value.calle,
        this.agregarFacturadorFormGroup.value.numeroExterior,
        this.agregarFacturadorFormGroup.value.numeroInterior,
        this.agregarFacturadorFormGroup.value.pais,
        this.agregarFacturadorFormGroup.value.colonia,
        this.agregarFacturadorFormGroup.value.municipioAlcaldia,
        this.agregarFacturadorFormGroup.value.localidad,
        this.agregarFacturadorFormGroup.value.entidadFederativa,
        this.agregarFacturadorFormGroup.value.estadoLocalidad,
        this.agregarFacturadorFormGroup.value.codigoPostaloEquivalente,
        this.agregarFacturadorFormGroup.value.coloniaoEquivalente,
      ],
    };
    this.facturadorRowData.push(facturadorRow);
    this.tramite260212Store.setFacturador(this.facturadorRowData);
    this.showTableDiv = !this.showTableDiv;
    this.showFacturador = !this.showFacturador;
  }


  // Custom Required Validator for Pais
requiredPaisValidator(control: AbstractControl) {
  return control.value !== '' && control.value !== '-1' ? null : { requiredPais: true };
}

// RFC Validator
rfcValidator(control: AbstractControl) {
  const rfcFisica = /^([a-zñA-ZÑ]{4})(\d{6})(([a-zA-Z]|\d){3})$/;
  const rfcMoral = /^([a-zñA-ZÑ&]{3})(\d{6})(([a-zA-Z]|\d){3})$/;
  return rfcFisica.test(control.value) || rfcMoral.test(control.value) ? null : { invalidRFC: true };
}

// CURP Validator
curpValidator(control: AbstractControl) {
  const pattern = /^([a-zA-Z]{4})([0-9]{6})([HhMm][a-zA-Z]{5})([0-9]{2})$/;
  return pattern.test(control.value) ? null : { invalidCURP: true };
}

// Phone Validator
telefonoValidator(control: AbstractControl) {
  const pattern = /^([0-9A-Za-z\-() ])*$/;
  return pattern.test(control.value) ? null : { invalidTelefono: true };
}
}
