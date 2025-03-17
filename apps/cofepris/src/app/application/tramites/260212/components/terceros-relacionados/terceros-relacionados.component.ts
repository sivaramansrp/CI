import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AlertComponent } from '@ng-mf/data-access-user';

import {
  TablaDinamicaComponent,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import { TableComponent } from '@ng-mf/data-access-user';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  TERCEROS_RELACIONADOS_DESTINATARIO,
  TERCEROS_RELACIONADOS_FABRICANTE,
  TERCEROS_RELACIONADOS_FACTURADOR,
  TERCEROS_RELACIONADOS_PROVEEDOR,
} from '../../constantes/permiso-maquila.enum';
import { ModalComponent } from '../modal/modal.component';
import { selectedRowData, tableData } from '../../models/permiso-maquila.models';

/**
 * Constante que contiene el texto de alerta que se mostrará cuando las tablas con asterisco sean obligatorias.
 * 
 * @constant TERCEROS_TEXTO_DE_ALERTA
 * @description Esta constante se utiliza para mostrar un mensaje de alerta que informa al usuario que las tablas marcadas con un asterisco (*) son obligatorias y debe agregar al menos un registro en ellas.
 * 
 * @example
 * console.log(TERCEROS_TEXTO_DE_ALERTA); // Imprime el mensaje de alerta.
 */
const TERCEROS_TEXTO_DE_ALERTA =
  'Las tablas con asterisco son obligatorias y debes agregar por lo menos un registro.';


/**
 * Componente para gestionar los terceros relacionados en el sistema.
 * 
 * Este componente permite gestionar los datos de los fabricantes, destinatarios, proveedores y facturadores,
 * incluyendo la visualización de tablas dinámicas y formularios para agregar información relacionada con
 * estos terceros.
 * 
 * @component TercerosRelacionadosComponent
 * @description Componente para gestionar la relación de terceros en el sistema.
 * 
 * @example
 * ```ts
 * const componente = new TercerosRelacionadosComponent(formBuilder);
 * componente.submitFabricanteForm();
 * ```
 */
@Component({
  selector: 'app-terceros-relacionados',
  standalone: true,
  templateUrl: './terceros-relacionados.component.html',
  styleUrl: './terceros-relacionados.component.scss',
  imports: [
    CommonModule,
    TablaDinamicaComponent,
    TituloComponent,
    TableComponent,
    AlertComponent,
    FormsModule,
    ReactiveFormsModule,
    ModalComponent
  ],
})

/**
 * Clase que representa el componente para gestionar los terceros relacionados en el sistema.
 * 
 * @class TercerosRelacionadosComponent
 * @description Componente para gestionar la relación de terceros en el sistema.
 */
export class TercerosRelacionadosComponent implements OnInit {

  /**
   * Variables de control para la visibilidad de las secciones de las tablas.
   * 
   * @property {boolean} showTableDiv - Controla la visibilidad de la tabla.
   * @property {boolean} showFabricante - Controla la visibilidad del formulario de fabricante.
   * @property {boolean} showDestinatario - Controla la visibilidad del formulario de destinatario.
   * @property {boolean} showProveedor - Controla la visibilidad del formulario de proveedor.
   * @property {boolean} showFacturador - Controla la visibilidad del formulario de facturador.
   * @property {boolean} showFabricanteButtons - Controla la visibilidad de los botones del fabricante.
   * @property {boolean} showDestinatarioButtons - Controla la visibilidad de los botones del destinatario.
   * @property {boolean} showProveedorButtons - Controla la visibilidad de los botones del proveedor.
   * @property {boolean} showFacturadorButtons - Controla la visibilidad de los botones del facturador.
   */
  showTableDiv = true;
  showFabricante = false;
  showDestinatario = false;
  showProveedor = false;
  showFacturador = false;
  showFabricanteButtons = false;
  showDestinatarioButtons = false;
  showProveedorButtons = false;
  showFacturadorButtons = false;

  /**
   * Formulario para agregar un fabricante.
   * 
   * @property {FormGroup} agregarFabricanteFormGroup - Formulario reactivo para agregar un fabricante.
   */
  agregarFabricanteFormGroup!: FormGroup;

  /**
   * Formulario para agregar un destinatario.
   * 
   * @property {FormGroup} agregarDestinatarioFormGroup - Formulario reactivo para agregar un destinatario.
   */
  agregarDestinatarioFormGroup!: FormGroup;

  /**
   * Formulario para agregar un proveedor.
   * 
   * @property {FormGroup} agregarProveedorFormGroup - Formulario reactivo para agregar un proveedor.
   */
  agregarProveedorFormGroup!: FormGroup;

  /**
   * Formulario para agregar un facturador.
   * 
   * @property {FormGroup} agregarFacturadorFormGroup - Formulario reactivo para agregar un facturador.
   */
  agregarFacturadorFormGroup!: FormGroup;

  /**
   * Constructor que inicializa el formulario utilizando `FormBuilder`.
   * 
   * @constructor
   * @param {FormBuilder} fb - El `FormBuilder` utilizado para crear formularios reactivos.
   */
  constructor(private fb: FormBuilder) {}

  /**
   * Método de inicialización del componente, se ejecuta al inicializar el componente.
   * Inicializa los formularios para agregar fabricante, destinatario, proveedor y facturador.
   * 
   * @method ngOnInit
   */
  ngOnInit() {
    this.initializeAgregarFabricanteFormGroup();
    this.initializeAgregarDestinatarioFormGroup();
    this.initializeAgregarProveedorFormGroup();
    this.initializeAgregarFacturadorFormGroup();
  }

  /**
   * Inicializa el formulario para agregar un fabricante.
   * 
   * @method initializeAgregarFabricanteFormGroup
   */
  initializeAgregarFabricanteFormGroup() {
    this.agregarFabricanteFormGroup = this.fb.group({
      tercerosNacionalidad: new FormControl('', [Validators.required]),
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
  }

  /**
   * Inicializa el formulario para agregar un destinatario.
   * 
   * @method initializeAgregarDestinatarioFormGroup
   */
  initializeAgregarDestinatarioFormGroup() {
    this.agregarDestinatarioFormGroup = this.fb.group({
      tipoPersona: new FormControl('', [Validators.required]),
      rfc: new FormControl('', [Validators.required]),
      denominacionRazonSocial: new FormControl('', [Validators.required]),
      pais: new FormControl('', [Validators.required]),
      estadoLocalidad: new FormControl('', [Validators.required]),
      municipioAlcaldia: new FormControl('', [Validators.required]),
      localidad: new FormControl('', [Validators.required]),
      codigoPostaloEquivalente: new FormControl('', [Validators.required]),
      colonia: new FormControl('', [Validators.required]),
      calle: new FormControl('', [Validators.required]),
      numeroExterior: new FormControl('', [Validators.required]),
      numeroInterior: new FormControl('', [Validators.required]),
      lada: new FormControl('', [Validators.required]),
      telefono: new FormControl('', [Validators.required]),
      correoElectronico: new FormControl('', [Validators.required]),
    });
  }

  /**
   * Inicializa el formulario para agregar un proveedor.
   * 
   * @method initializeAgregarProveedorFormGroup
   */
  initializeAgregarProveedorFormGroup() {
    this.agregarProveedorFormGroup = this.fb.group({
      tipoPersona: new FormControl('', [Validators.required]),
      nombre: new FormControl('', [Validators.required]),
      primerApellido: new FormControl('', [Validators.required]),
      segundoApellido: new FormControl('', [Validators.required]),
      pais: new FormControl('', [Validators.required]),
      estado: new FormControl('', [Validators.required]),
      codigoPostaloEquivalente: new FormControl('', [Validators.required]),
      coloniaoEquivalente: new FormControl('', [Validators.required]),
      calle: new FormControl('', [Validators.required]),
      numeroExterior: new FormControl('', [Validators.required]),
      numeroInterior: new FormControl('', [Validators.required]),
      lada: new FormControl('', [Validators.required]),
      telefono: new FormControl('', [Validators.required]),
      correoElectronico: new FormControl('', [Validators.required]),
    });
  }

  /**
   * Inicializa el formulario para agregar un facturador.
   * 
   * @method initializeAgregarFacturadorFormGroup
   */
  initializeAgregarFacturadorFormGroup() {
    this.agregarFacturadorFormGroup = this.fb.group({
      tipoPersona: new FormControl('', [Validators.required]),
      nombre: new FormControl('', [Validators.required]),
      primerApellido: new FormControl('', [Validators.required]),
      segundoApellido: new FormControl('', [Validators.required]),
      pais: new FormControl('', [Validators.required]),
      estado: new FormControl('', [Validators.required]),
      codigoPostaloEquivalente: new FormControl('', [Validators.required]),
      coloniaoEquivalente: new FormControl('', [Validators.required]),
      calle: new FormControl('', [Validators.required]),
      numeroExterior: new FormControl('', [Validators.required]),
      numeroInterior: new FormControl('', [Validators.required]),
      lada: new FormControl('', [Validators.required]),
      telefono: new FormControl('', [Validators.required]),
      correoElectronico: new FormControl('', [Validators.required]),
    });
  }

  /**
   * Datos de las cabeceras de las tablas para cada tipo de tercero.
   * 
   * @property {Array<string>} fabricanteHeaderData - Cabeceras de la tabla para los fabricantes.
   * @property {Array<string>} destinatarioHeaderData - Cabeceras de la tabla para los destinatarios.
   * @property {Array<string>} proveedorHeaderData - Cabeceras de la tabla para los proveedores.
   * @property {Array<string>} facturadorHeaderData - Cabeceras de la tabla para los facturadores.
   */
  fabricanteHeaderData = TERCEROS_RELACIONADOS_FABRICANTE;
  destinatarioHeaderData = TERCEROS_RELACIONADOS_DESTINATARIO;
  proveedorHeaderData = TERCEROS_RELACIONADOS_PROVEEDOR;
  facturadorHeaderData = TERCEROS_RELACIONADOS_FACTURADOR;


  /**
   * Variables para controlar los tipos de persona seleccionados.
   * 
   * @property {boolean} fisica - Indica si el tipo de persona seleccionado es física.
   * @property {boolean} moral - Indica si el tipo de persona seleccionado es moral.
   */
  public fisica= true;
  public moral= false;




  /**
   * Datos de las filas para cada tipo de tercero.
   * 
   * @property {Array<tableData>} fabricanteRowData - Datos de las filas de la tabla de fabricantes.
   * @property {Array<tableData>} destinatarioRowData - Datos de las filas de la tabla de destinatarios.
   * @property {Array<tableData>} proveedorRowData - Datos de las filas de la tabla de proveedores.
   * @property {Array<tableData>} facturadorRowData - Datos de las filas de la tabla de facturadores.
   */
  fabricanteRowData: tableData[] = [];
  destinatarioRowData: tableData[] = [];
  proveedorRowData: tableData[] = [];
  facturadorRowData: tableData[] = [];

  /**
   * Cambia el valor de los tipos de persona seleccionados (física o moral).
   * 
   * @method inputChecked
   * @param {string} checkBoxName - El nombre del checkBox seleccionado (fisica o moral).
   */
  public inputChecked(checkBoxName: string) {
    if (checkBoxName === 'fisica') {
      this.fisica = true;
      this.moral = false;
    } else {
      this.fisica = false;
      this.moral = true;
    }
  }

  /**
   * Método para alternar la visibilidad de la sección de Fabricante.
   * 
   * @method toggleDivFabricante
   */
  toggleDivFabricante() {
    this.showTableDiv = !this.showTableDiv;
    this.showFabricante = !this.showFabricante;
  }

  /**
   * Método para alternar la visibilidad de la sección de Destinatario.
   * 
   * @method toggleDivDestinatario
   */
  toggleDivDestinatario() {
    this.showTableDiv = !this.showTableDiv;
    this.showDestinatario = !this.showDestinatario;
  }

  /**
   * Método para alternar la visibilidad de la sección de Proveedor.
   * 
   * @method toggleDivProveedor
   */
  toggleDivProveedor() {
    this.showTableDiv = !this.showTableDiv;
    this.showProveedor = !this.showProveedor;
  }

  /**
   * Método para alternar la visibilidad de la sección de Facturador.
   * 
   * @method toggleDivFacturador
   */
  toggleDivFacturador() {
    this.showTableDiv = !this.showTableDiv;
    this.showFacturador = !this.showFacturador;
  }

  /**
   * Método que maneja la selección de las filas en la tabla de fabricantes.
   * 
   * @method selectedFabricanteRows
   * @param {selectedRowData} data - Datos de la fila seleccionada en la tabla de fabricantes.
   */
  selectedFabricanteRows(data: selectedRowData) {
    this.showFabricanteButtons = data.checked;
  }

  /**
   * Método que maneja la selección de las filas en la tabla de destinatarios.
   * 
   * @method selectedDestinatarioRows
   * @param {selectedRowData} data - Datos de la fila seleccionada en la tabla de destinatarios.
   */
  selectedDestinatarioRows(data: selectedRowData) {
    this.showDestinatarioButtons = data.checked;
  }

  /**
   * Método que maneja la selección de las filas en la tabla de proveedores.
   * 
   * @method selectedProveedorRows
   * @param {selectedRowData} data - Datos de la fila seleccionada en la tabla de proveedores.
   */
  selectedProveedorRows(data: selectedRowData) {
    this.showProveedorButtons = data.checked;
  }

  /**
   * Método que maneja la selección de las filas en la tabla de facturadores.
   * 
   * @method selectedFacturadorRows
   * @param {selectedRowData} data - Datos de la fila seleccionada en la tabla de facturadores.
   */
  selectedFacturadorRows(data: selectedRowData) {
    this.showFacturadorButtons = data.checked;
  }

  /**
   * Texto de alerta que se muestra cuando las tablas con asterisco no tienen registros.
   * 
   * @property {string} TEXTO_DE_ALERTA
   */
  TEXTO_DE_ALERTA: string = TERCEROS_TEXTO_DE_ALERTA;

  /**
   * Método para enviar el formulario de fabricante y agregarlo a la tabla.
   * 
   * @method submitFabricanteForm
   */
  submitFabricanteForm() {
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
        this.agregarFabricanteFormGroup.value.colonia,
        this.agregarFabricanteFormGroup.value.municipioAlcaldia,
        this.agregarFabricanteFormGroup.value.localidad,
        this.agregarFabricanteFormGroup.value.entidadFederativa,
        this.agregarFabricanteFormGroup.value.codigoPostaloEquivalente,
      ],
    };
    this.fabricanteRowData.push(fabricanteRow);
  }

  /**
   * Método para enviar el formulario de destinatario y agregarlo a la tabla.
   * 
   * @method submitDestinatarioForm
   */
  submitDestinatarioForm() {
    const destinatarioRow = {
      tbodyData: [
        this.agregarDestinatarioFormGroup.value.denominacionRazonSocial,
        this.agregarDestinatarioFormGroup.value.rfc,
        this.agregarDestinatarioFormGroup.value.lada +
          '-' +
          this.agregarDestinatarioFormGroup.value.telefono,
        this.agregarDestinatarioFormGroup.value.correoElectronico,
        this.agregarDestinatarioFormGroup.value.calle,
        this.agregarDestinatarioFormGroup.value.numeroExterior,
        this.agregarDestinatarioFormGroup.value.numeroInterior,
        this.agregarDestinatarioFormGroup.value.pais,
        this.agregarDestinatarioFormGroup.value.colonia,
        this.agregarDestinatarioFormGroup.value.municipioAlcaldia,
        this.agregarDestinatarioFormGroup.value.localidad,
        this.agregarDestinatarioFormGroup.value.codigoPostaloEquivalente,
      ],
    };
    this.destinatarioRowData.push(destinatarioRow);
  }

  /**
   * Método para enviar el formulario de proveedor y agregarlo a la tabla.
   * 
   * @method submitProveedorForm
   */
  submitProveedorForm() {
    const proveedorRow = {
      tbodyData: [
        this.agregarProveedorFormGroup.value.nombre +
          ' ' +
          this.agregarProveedorFormGroup.value.primerApellido +
          ' ' +
          this.agregarProveedorFormGroup.value.segundoApellido,
        this.agregarProveedorFormGroup.value.telefono,
        this.agregarProveedorFormGroup.value.correoElectronico,
        this.agregarProveedorFormGroup.value.calle,
        this.agregarProveedorFormGroup.value.numeroExterior,
        this.agregarProveedorFormGroup.value.numeroInterior,
        this.agregarProveedorFormGroup.value.pais,
        this.agregarProveedorFormGroup.value.colonia,
        this.agregarProveedorFormGroup.value.codigoPostaloEquivalente,
      ],
    };
    this.proveedorRowData.push(proveedorRow);
  }

  /**
   * Método para enviar el formulario de facturador y agregarlo a la tabla.
   * 
   * @method submitFacturadorForm
   */
  submitFacturadorForm() {
    const facturadorRow = {
      tbodyData: [
        this.agregarFacturadorFormGroup.value.nombre +
          ' ' +
          this.agregarFacturadorFormGroup.value.primerApellido +
          ' ' +
          this.agregarFacturadorFormGroup.value.segundoApellido,
        this.agregarFacturadorFormGroup.value.telefono,
        this.agregarFacturadorFormGroup.value.correoElectronico,
        this.agregarFacturadorFormGroup.value.calle,
        this.agregarFacturadorFormGroup.value.numeroExterior,
        this.agregarFacturadorFormGroup.value.numeroInterior,
        this.agregarFacturadorFormGroup.value.pais,
        this.agregarFacturadorFormGroup.value.colonia,
        this.agregarFacturadorFormGroup.value.codigoPostaloEquivalente,
      ],
    };
    this.facturadorRowData.push(facturadorRow);
  }
}
