/* eslint-disable sort-imports */
/* eslint-disable no-empty-function */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @nx/enforce-module-boundaries */
/**
 * @module AduaneroComponent
 * Componente para agregar un miembro de la empresa.
 * Maneja un formulario reactivo y la paginación de una tabla.
 */

import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subject, Subscription, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Modal } from 'bootstrap';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { Catalogo, TableComponent, TablePaginationComponent, TituloComponent } from '@ng-mf/data-access-user';
import { Solicitud31601State, Tramite31601Store } from '../../../../estados/tramites/tramite31601.store';
import { AgregarMiembroDeLaEmpresaComponent } from '../agregar-miembro-de-la-empresa/agregar-miembro-de-la-empresa.component';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import Instalaciones from 'libs/shared/theme/assets/json/31601/Instalaciones.json';
import { REGEX_RFC } from 'libs/shared/data-access-user/src/tramites/constantes/regex.constants';
import { Tramite31601Query } from '../../../../estados/queries/tramite31601.query';
import applicantRegistrados from 'libs/shared/theme/assets/json/31601/applicantRegistrados.json';
import comboBimestres from 'libs/shared/theme/assets/json/31601/comboBimestres.json';
import comboIMMEXJson from 'libs/shared/theme/assets/json/31601/comboIMMEX.json';
import controlInventarios from 'libs/shared/theme/assets/json/31601/controlInventarios.json';
import destinatarioTable from 'libs/shared/theme/assets/json/220401/destinatario-table.json';
import empleadosSubcontratacion from 'libs/shared/theme/assets/json/31601/empleadosSubcontratacion.json';
import entidadFederativa from 'libs/shared/theme/assets/json/31601/entidadFederative.json';
import establecimientoTable from 'libs/shared/theme/assets/json/220401/establecimiento-table.json';
import preOperativo from 'libs/shared/theme/assets/json/31601/preOperativo.json';
import prejson from 'libs/shared/theme/assets/json/31601/prejson.json';
import productivo from 'libs/shared/theme/assets/json/31601/productivo.json';
import serviciosAgace from 'libs/shared/theme/assets/json/31601/serviciosAgace.json';
import { InputRadioComponent } from "@libs/shared/data-access-user/src/tramites/components/input-radio/input-radio.component";
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';

/**
 * @class AduaneroComponent
 * @implements {OnInit, AfterViewInit,OnDestroy}
 * Componente para manejar el formulario reactivo y la paginación de una tabla.
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
  providers: [BsModalService]
})
export class AduaneroComponent implements OnInit, AfterViewInit, OnDestroy {
  /**
   * Almacena los datos de descripción en un formato predefinido.
   */
  descriptionData = prejson;

  /**
   * Contiene la descripción en texto.
   */
  description: string = '';

  /**
   * Referencia al modal de modificación en la plantilla HTML.
   */
  @ViewChild('modifyModal', { static: false }) modifyModal!: ElementRef;

  /**
   * Referencia al modal de instalaciones en la plantilla HTML.
   */
  @ViewChild('instalacionesModal', { static: false })
  instalacionesModal!: ElementRef;

  /**
   * Instancia del modal de modificación.
   */
  modalInstance!: Modal;

  /**
   * Instancia del modal de instalaciones.
   */
  modalInstanceInstalaciones!: Modal;

  /**
   * Formulario reactivo para datos preoperativos.
   */
  preOperativeForm!: FormGroup;

  /**
   * Opciones para los radio buttons, cargadas desde un archivo JSON.
   */
  radioOptions = preOperativo;

  /**
   * Contiene los datos del cuerpo de la tabla de establecimientos.
   */
  public establecimientoBodyData: any = [];

  /**
   * Lista de sectores productivos obtenidos desde un archivo JSON.
   */
  sectorProductivoAgace: Catalogo[] = productivo;

  /**
   * Lista de servicios Agace obtenidos desde un archivo JSON.
   */
  serviciosAgace: Catalogo[] = serviciosAgace;

  /**
   * Lista de bimestres para selección.
   */
  comboBimestresIDC: Catalogo[] = comboBimestres;

  /**
   * Lista de entidades federativas cargadas desde un archivo JSON.
   */
  entidadFederativa: Catalogo[] = entidadFederativa;

  /**
   * Indica si todos los elementos de una tabla están seleccionados.
   */
  selectAll: boolean = false;

  /**
   * Datos de control de inventarios obtenidos desde un JSON.
   */
  controlInventarios: any = controlInventarios;

  /**
   * Lista de opciones IMMEX cargadas desde un archivo JSON.
   */
  comboIMMEX: Catalogo[] = comboIMMEXJson;

  /**
   * Encabezados de la tabla de establecimientos.
   */
  public establecimientoHeaderData: string[] = [];

  /**
   * Datos completos de los establecimientos.
   */
  public fullEstablecimientoBodyData: any[] = [];

  /**
   * Datos de la tabla de establecimientos obtenidos desde un JSON.
   */
  public getEstablecimientoTableData = establecimientoTable;

  /**
   * Datos de la tabla de destinatarios obtenidos desde un JSON.
   */
  public getDestinatarioTableData = destinatarioTable;

  /**
   * Datos de empleados bajo subcontratación.
   */
  public empleadosSubcontratacion = empleadosSubcontratacion;

  /**
   * Lista de aplicantes registrados.
   */
  public applicantRegistrados = applicantRegistrados;

  /**
   * Información sobre instalaciones obtenidas desde un JSON.
   */
  public Instalaciones = Instalaciones;

  /**
   * Datos paginados de los establecimientos.
   */
  public paginatedEstablecimientoBodyData: any[] = [];

  /**
   * Ruta base para peticiones al servidor.
   */
  contextPath: string = '';

  /**
   * Número total de elementos en la tabla.
   */
  totalItems: number = 0;

  /**
   * Página actual de la paginación.
   */
  currentPage: number = 1;

  /**
   * Cantidad de elementos por página en la paginación.
   */
  itemsPerPage: number = 5;

  /**
   * Encabezados de la tabla de empleados.
   */
  public empleadosHeaderData: string[] = [];

  /**
   * Datos del cuerpo de la tabla de empleados.
   */
  public empleadosBodyData: any[] = [];

  /**
   * Encabezados de la tabla de domicilios.
   */
  public domiciliosHeaderData: string[] = [];

  /**
   * Datos del cuerpo de la tabla de domicilios.
   */
  public domiciliosBodyData: any[] = [];

  /**
   * Encabezados de la tabla de instalaciones.
   */
  public InstalacionesHeaderData: string[] = [];

  /**
   * Datos del cuerpo de la tabla de instalaciones.
   */
  public InstalacionesBodyData: any[] = [];

  /**
   * Estado de la solicitud.
   */
  public solicitudState!: Solicitud31601State;

  /**
   * Notificador para destruir observables.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  public noSeHaSubidoNingunArchivo: boolean = false;

  modalRef?: BsModalRef;
    
  /**
  * Indica si el formulario está en modo solo lectura.
  * Cuando es `true`, los campos del formulario no se pueden editar.
  */
  esFormularioSoloLectura: boolean = false; 
   /**
   * Suscripción a los cambios en el formulario react
   */
   private subscription: Subscription = new Subscription();

  /**
   * Constructor del componente.
   * @param fb - FormBuilder para crear formularios reactivos.
   * @param tramite31601Store - Store para manejar el estado del trámite.
   * @param tramite31601Query - Query para obtener datos del trámite.
   */
  constructor(
    private fb: FormBuilder,
    private tramite31601Store: Tramite31601Store,
    private tramite31601Query: Tramite31601Query,
    private modalService: BsModalService,
    private consultaioQuery: ConsultaioQuery,
  ) {
    /**
     * Se suscribe al estado de `Consultaio` para obtener información actualizada del estado del formulario.
     *
     * - Asigna el valor de solo lectura (`readonly`) a la propiedad `esFormularioSoloLectura`.
     * - Llama a `inicializarEstadoFormulario()` para aplicar configuraciones basadas en el estado recibido.
     * - La suscripción se cancela automáticamente cuando `destroyNotifier$` emite un valor (para evitar fugas de memoria).
     */
    this.consultaioQuery.selectConsultaioState$
    .pipe(
      takeUntil(this.destroyNotifier$),
      map((seccionState)=>{
        this.esFormularioSoloLectura = seccionState.readonly; 
        this.inicializarEstadoFormulario();
      })
    )
    .subscribe()
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Llama a los métodos para obtener datos de establecimientos, empleados, domicilios e instalaciones.
   */
  ngOnInit() {
    this.inicializarEstadoFormulario();
    this.getEstablecimiento();
    this.getEmpleadosData();
    this.getDomiciliosData();
    this.getInstalaciones();
  }

  /**
   * Evalúa si se debe inicializar o cargar datos en el formulario.  
   * Además, obtiene la información del catálogo de mercancía.
   */
  inicializarEstadoFormulario(): void {
    this.tramite31601Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe()
      
      this.preOperativeForm = this.fb.group({
        autorizacionIVAIEPS: [this.solicitudState?.autorizacionIVAIEPS, Validators.required],
        regimen_0:[this.solicitudState?.regimen_0],
        regimen_1:[this.solicitudState?.regimen_1],
        regimen_2:[this.solicitudState?.regimen_2],
        regimen_3:[this.solicitudState?.regimen_3],
        sectorProductivo:[this.solicitudState?.sectorProductivo],
        servicio:[this.solicitudState?.servicio],
        preOperativo: [this.solicitudState?.preOperativo, Validators.required],
        indiqueSi: [this.solicitudState?.indiqueSi, Validators.required],
        senale: [this.solicitudState?.senale, Validators.required],
        empPropios:[this.solicitudState?.empPropios],
        bimestre:[this.solicitudState?.bimestre],
        senaleSi: [this.solicitudState?.senaleSi, Validators.required],
        seMomento: [this.solicitudState?.seMomento, Validators.required],
        cumplir: [this.solicitudState?.cumplir, Validators.required],
        indique: [this.solicitudState?.indique, Validators.required],
        encuentra: [this.solicitudState?.encuentra, Validators.required],
        delMismo: [this.solicitudState?.delMismo, Validators.required],
        senaleMomento: [this.solicitudState?.senaleMomento, Validators.required],
        enCaso: [this.solicitudState?.enCaso, Validators.required],
        comboBimestresIDCSeleccione:[this.solicitudState?.comboBimestresIDCSeleccione],
        ingresar: [this.solicitudState?.ingresar, Validators.required],
        encuentraSus: [this.solicitudState?.encuentraSus, Validators.required],
        registrosQue:[this.solicitudState?.registrosQue],
        registrosQue2:[this.solicitudState?.registrosQue2],
        momentoIngresar: [this.solicitudState?.momentoIngresar, Validators.required],
        indiqueCuenta: [this.solicitudState?.indiqueCuenta, Validators.required],
        indiqueCheck:[this.solicitudState?.indiqueCheck],
        nombreDel: [
          this.solicitudState?.nombreDel,
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(250),
          ],
        ],
        lugarDeRadicacion: [
          this.solicitudState?.lugarDeRadicacion,
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(250),
          ],
        ],
        contabilidad: [this.solicitudState?.contabilidad, Validators.required],
        rmfRadio: [this.solicitudState?.rmfRadio, Validators.required],
        vinculacionRegistroCancelado: [this.solicitudState?.vinculacionRegistroCancelado, Validators.required],
        proveedoresListadoSAT: [this.solicitudState?.proveedoresListadoSAT, Validators.required],
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
        archivoNacionales: ['']
      });
    

    if (this.esFormularioSoloLectura) {
      Object.keys(this.preOperativeForm.controls).forEach((key) => {
        this.preOperativeForm.get(key)?.disable();
      })
    } else {
      Object.keys(this.preOperativeForm.controls).forEach((key) => {
        this.preOperativeForm.get(key)?.enable();
      })
    }  
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
      this.modalInstanceInstalaciones = new Modal(
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
  openInstalacionesModal() {
    if (this.modalInstanceInstalaciones) {
      this.modalInstanceInstalaciones.show();
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

  /**
   * Establece el valor de un campo en el store de Tramite31601.
   * @param form - El grupo de formularios que contiene el campo.
   * @param campo - El nombre del campo cuyo valor se va a establecer.
   * @param metodoNombre - El nombre del método en el store que se utilizará para establecer el valor.
   */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite31601Store): void {
    const valor = form.get(campo)?.value;
    (this.tramite31601Store[metodoNombre] as (value: any) => void)(valor);
  }

  subirArchivo(template: TemplateRef<void>): void {
    this.modalRef = this.modalService.show(template);
    if(this.preOperativeForm.get('archivoNacionales')?.value === '') {
      this.noSeHaSubidoNingunArchivo = true;
    }
  }

  cerrar(): void {
    this.modalRef?.hide();
    this.noSeHaSubidoNingunArchivo = false;
  }

  /**
   * Método del ciclo de vida de Angular que se llama cuando el componente se destruye.
   * Este método completa el observable destroyNotifier$ para cancelar las suscripciones activas.
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}