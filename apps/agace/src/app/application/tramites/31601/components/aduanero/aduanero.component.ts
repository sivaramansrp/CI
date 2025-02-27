/**
 * compo doc
 * @module AduaneroComponent
 *  Componente para agregar un miembro de la empresa.
 * Maneja un formulario reactivo y la paginación de una tabla.
 */

import { CommonModule } from '@angular/common';

import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';

import preOperativo from 'libs/shared/theme/assets/json/31601/preOperativo.json';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputRadioComponent } from '@ng-mf/data-access-user';
import productivo from 'libs/shared/theme/assets/json/31601/productivo.json';
import serviciosAgace from 'libs/shared/theme/assets/json/31601/serviciosAgace.json';

import comboIMMEXJson from 'libs/shared/theme/assets/json/31601/comboIMMEX.json';

import comboBimestres from 'libs/shared/theme/assets/json/31601/comboBimestres.json';

import { Catalogo } from '@ng-mf/data-access-user';

import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import establecimientoTable from 'libs/shared/theme/assets/json/220401/establecimiento-table.json';

import empleadosSubcontratacion from 'libs/shared/theme/assets/json/31601/empleadosSubcontratacion.json';

import applicantRegistrados from 'libs/shared/theme/assets/json/31601/applicantRegistrados.json';

import destinatarioTable from 'libs/shared/theme/assets/json/220401/destinatario-table.json';
import entidadFederativa from 'libs/shared/theme/assets/json/31601/entidadFederative.json';
import prejson from 'libs/shared/theme/assets/json/31601/prejson.json';

import controlInventarios from 'libs/shared/theme/assets/json/31601/controlInventarios.json';

import Instalaciones from 'libs/shared/theme/assets/json/31601/Instalaciones.json';

import { TableComponent } from '@ng-mf/data-access-user';

import { Modal } from 'bootstrap';
import { REGEX_RFC } from 'libs/shared/data-access-user/src/tramites/constantes/regex.constants';
import { TablePaginationComponent } from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';

import { AgregarMiembroDeLaEmpresaComponent } from '../agregar-miembro-de-la-empresa/agregar-miembro-de-la-empresa.component';

/* @features
 * - Carga de datos desde archivos JSON.
 * - Paginación y filtrado de tablas.
 * - Manejo de formularios reactivos.
 * - Implementación de modales con Bootstrap.
 * - Organización y reutilización de componentes.
 */
@Component({
  selector: 'app-aduanero',
  templateUrl: './aduanero.component.html',
  styleUrl: './aduanero.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputRadioComponent,
    CatalogoSelectComponent,
    TableComponent,
    TablePaginationComponent,
    TituloComponent,
    AgregarMiembroDeLaEmpresaComponent,
  ],
})
export class AduaneroComponent implements OnInit, AfterViewInit {
  /**
   * Almacena los datos de descripción en un formato predefinido.
   */
  descriptionData = prejson;

  /**
   * Contiene la descripción en texto.
   */
  description: string = '';

  /**
   * compo doc
   * @property {ElementRef} modifyModal
   * Referencia al modal de modificación en la plantilla HTML.
   */
  @ViewChild('modifyModal', { static: false }) modifyModal!: ElementRef;

  /**
   *  compo doc
   * @property {ElementRef} instalacionesModal
   * Referencia al modal de instalaciones en la plantilla HTML.
   */
  @ViewChild('instalacionesModal', { static: false })
  instalacionesModal!: ElementRef;

  /**
   *  compo doc
   * @property {Modal} modalInstance
   * Instancia del modal de modificación.
   */
  modalInstance!: Modal;

  /**
   *  compo doc
   * @property {Modal} modalInstanceInstaciones
   * Instancia del modal de instalaciones.
   */
  modalInstanceInstaciones!: Modal;

  /**
   *  compo doc
   * @property {FormGroup} preOperativeForm
   * Formulario reactivo para datos preoperativos.
   */
  preOperativeForm!: FormGroup;

  /**
   *  compo doc
   * @property {Catalogo[]} radioOptions
   * Opciones para los radio buttons, cargadas desde un archivo JSON.
   */
  radioOptions = preOperativo;

  /**
   *  compo doc
   * @property {unknown} establecimientoBodyData
   * Contiene los datos del cuerpo de la tabla de establecimientos.
   */
  public establecimientoBodyData: any = [];

  /**
   *  compo doc
   * @property {Catalogo[]} sectorProductivoAgace
   * Lista de sectores productivos obtenidos desde un archivo JSON.
   */
  sectorProductivoAgace: Catalogo[] = productivo;

  /**
   *  compo doc
   * @property {Catalogo[]} serviciosAgace
   * Lista de servicios Agace obtenidos desde un archivo JSON.
   */
  serviciosAgace: Catalogo[] = serviciosAgace;

  /**
   *  compo doc
   * @property {Catalogo[]} comboBimestresIDC
   * Lista de bimestres para selección.
   */
  comboBimestresIDC: Catalogo[] = comboBimestres;

  /**
   *  compo doc
   * @property {Catalogo[]} entidadFederativa
   * Lista de entidades federativas cargadas desde un archivo JSON.
   */
  entidadFederativa: Catalogo[] = entidadFederativa;

  /**
   *  compo doc
   * @property {boolean} selectAll
   * Indica si todos los elementos de una tabla están seleccionados.
   */
  selectAll: boolean = false;

  /**
   *  compo doc
   * @property {any} controlInventarios
   * Datos de control de inventarios obtenidos desde un JSON.
   */
  controlInventarios: any = controlInventarios;

  /**
   *  compo doc
   * @property {Catalogo[]} comboIMMEX
   * Lista de opciones IMMEX cargadas desde un archivo JSON.
   */
  comboIMMEX: Catalogo[] = comboIMMEXJson;

  /**
   *  compo doc
   * @property {string[]} establecimientoHeaderData
   * Encabezados de la tabla de establecimientos.
   */
  public establecimientoHeaderData: string[] = [];

  /**
   *  compo doc
   * @property {any[]} fullEstablecimientoBodyData
   * Datos completos de los establecimientos.
   */
  public fullEstablecimientoBodyData: any[] = [];

  /**
   *  compo doc
   * @property {any} getEstablecimientoTableData
   * Datos de la tabla de establecimientos obtenidos desde un JSON.
   */
  public getEstablecimientoTableData = establecimientoTable;

  /**
   *  compo doc
   * @property {any} getDestinatarioTableData
   * Datos de la tabla de destinatarios obtenidos desde un JSON.
   */
  public getDestinatarioTableData = destinatarioTable;

  /**
   *  compo doc
   * @property {any} empleadosSubcontratacion
   * Datos de empleados bajo subcontratación.
   */
  public empleadosSubcontratacion = empleadosSubcontratacion;

  /**
   *  compo doc
   * @property {any} applicantRegistrados
   * Lista de aplicantes registrados.
   */
  public applicantRegistrados = applicantRegistrados;

  /**
   *  compo doc
   * @property {any} Instalaciones
   * Información sobre instalaciones obtenidas desde un JSON.
   */
  public Instalaciones = Instalaciones;

  /**
   *  compo doc
   * @property {any[]} paginatedEstablecimientoBodyData
   * Datos paginados de los establecimientos.
   */
  public paginatedEstablecimientoBodyData: any[] = [];

  /**
   *  compo doc
   * @property {string} contextPath
   * Ruta base para peticiones al servidor.
   */
  contextPath: string = 'https://your-server.com';

  /**
   *  compo doc
   * @property {number} totalItems
   * Número total de elementos en la tabla.
   */
  totalItems: number = 0;

  /**
   *  compo doc
   * @property {number} currentPage
   * Página actual de la paginación.
   */
  currentPage: number = 1;

  /**
   *  compo doc
   * @property {number} itemsPerPage
   * Cantidad de elementos por página en la paginación.
   */
  itemsPerPage: number = 5;

  /**
   *  compo doc
   * @property {string[]} empleadosHeaderData
   * Encabezados de la tabla de empleados.
   */
  public empleadosHeaderData: string[] = [];

  /**
   *  compo doc
   * @property {any[]} empleadosBodyData
   * Datos del cuerpo de la tabla de empleados.
   */
  public empleadosBodyData: any[] = [];

  /**
   *  compo doc
   * @property {string[]} domiciliosHeaderData
   * Encabezados de la tabla de domicilios.
   */
  public domiciliosHeaderData: string[] = [];

  /**
   *  compo doc
   * @property {any[]} domiciliosBodyData
   * Datos del cuerpo de la tabla de domicilios.
   */
  public domiciliosBodyData: any[] = [];

  /**
   *  compo doc
   * @property {string[]} InstalacionesHeaderData
   * Encabezados de la tabla de instalaciones.
   */
  public InstalacionesHeaderData: string[] = [];

  /**
   *  compo doc
   * @property {any[]} InstalacionesBodyData
   * Datos del cuerpo de la tabla de instalaciones.
   */
  public InstalacionesBodyData: any[] = [];
  /*
   *constructor
   */
  constructor(private fb: FormBuilder) {}

  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Llama a los métodos para obtener datos de establecimientos, empleados, domicilios e instalaciones.
   */
  ngOnInit() {
    this.preOperativeForm = this.fb.group({
      authorizationIVAIEPS: ['', Validators.required],
      preOperativo: ['', Validators.required],
      IndiqueSi: ['', Validators.required],
      Senale: ['', Validators.required],
      SenaleSi: ['', Validators.required],
      seMomento: ['', Validators.required],
      cumplir: ['', Validators.required],
      indique: ['', Validators.required],
      encuentra: ['', Validators.required],
      delMismo: ['', Validators.required],
      senaleMomento: ['', Validators.required],
      enCaso: ['', Validators.required],
      ingresar: ['', Validators.required],
      encuentraSus: ['', Validators.required],
      momentoIngresar: ['', Validators.required],
      indiqueCuenta: ['', Validators.required],
      nombredel: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(250),
        ],
      ],
      lugarDeRadicacion: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(250),
        ],
      ],
      contabilidad: ['', Validators.required],
      rmfRadio: ['', Validators.required],
      vinculacionRegistroCancelado: ['', Validators.required],
      proveedoresListadoSAT: ['', Validators.required],
      numeroAutorizacionCITES: [
        '',
        [
          Validators.required, // Required field
          Validators.pattern(REGEX_RFC),
        ],
      ],
      rfc: [
        '',
        [
          Validators.required, // Required field
          Validators.pattern(REGEX_RFC),
        ],
      ],
      razonSocial: [
        '',
        [
          Validators.required, // Required field
          Validators.minLength(3), // Minimum length of 3 characters
        ],
      ],
      numeroEmpleados: [
        '',
        [
          Validators.required, // Required field
          Validators.pattern(/^[0-9]+$/), // Only allows numbers
        ],
      ],
      empleadosPropios: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]+$'), // Only allows numbers
          Validators.min(1), // Minimum value 1
          Validators.max(99999999), // Maximum value 8 digits
          Validators.maxLength(8), // Ensures a maximum of 8 characters
        ],
      ],
    });
    this.getEstablecimiento();
    this.getEmpleadosData();
    this.getDomiciliosData();
    this.getInstalaciones();
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta después de que la vista se ha inicializado.
   * Inicializa los modales de modificación e instalaciones.
   */
  ngAfterViewInit() {
    // Inicializa el modal de modificación
    if (this.modifyModal) {
      this.modalInstance = new Modal(this.modifyModal.nativeElement);
    }

    // Inicializa el modal de instalaciones
    if (this.instalacionesModal) {
      this.modalInstanceInstaciones = new Modal(
        this.instalacionesModal.nativeElement
      );
    }
  }

  /**
   * Método para abrir el modal de modificación.
   */
  openModifyModal() {
    if (this.modalInstance) {
      this.modalInstance.show();
    }
  }

  /**
   * Método para cerrar el modal de modificación.
   */
  closeModifyModal() {
    if (this.modalInstance) {
      this.modalInstance.hide();
    }
  }

  /**
   * Método para abrir el modal de instalaciones.
   */
  openInstacionesModal() {
    if (this.modalInstanceInstaciones) {
      this.modalInstanceInstaciones.show();
    }
  }

  /**
   * Obtiene y asigna los datos de empleados desde el JSON.
   */
  public getEmpleadosData() {
    this.empleadosHeaderData = this.empleadosSubcontratacion.tableHeader;
    this.empleadosBodyData = this.empleadosSubcontratacion.tableBody;
  }

  /**
   * Obtiene y asigna los datos de domicilios desde el JSON.
   */
  public getDomiciliosData() {
    this.domiciliosHeaderData = this.applicantRegistrados.tableHeader;
    this.domiciliosBodyData = this.applicantRegistrados.tableBody;
  }

  /**
   * Obtiene y asigna los datos de instalaciones desde el JSON.
   */
  public getInstalaciones() {
    this.InstalacionesHeaderData = this.Instalaciones.tableHeader;
    this.InstalacionesBodyData = this.Instalaciones.tableBody;
  }

  /**
   * Obtiene y asigna los datos de establecimientos desde el JSON.
   */
  public getEstablecimiento() {
    this.establecimientoHeaderData =
      this.getEstablecimientoTableData.tableHeader;
    this.establecimientoBodyData = this.getEstablecimientoTableData.tableBody;
  }

  /**
   * Actualiza la paginación de la tabla de establecimientos.
   * Corta los datos de la tabla según la página actual y el número de elementos por página.
   */
  updatePagination() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.establecimientoBodyData = this.fullEstablecimientoBodyData.slice(
      startIndex,
      startIndex + this.itemsPerPage
    );
  }

  /**
   * Método que se ejecuta cuando se cambia de página en la paginación.
   * @param {number} page - Número de la página seleccionada.
   */
  onPageChange(page: number) {
    this.currentPage = page;
    this.updatePagination();
  }

  /**
   * Método que se ejecuta cuando cambia el número de elementos por página.
   * @param {number} itemsPerPage - Número de elementos a mostrar por página.
   */
  onItemsPerPageChange(itemsPerPage: number) {
    this.itemsPerPage = itemsPerPage;
    this.currentPage = 1;
    this.updatePagination();
  }
}
