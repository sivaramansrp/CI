import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { AlertComponent, Catalogo, CatalogoSelectComponent, InputRadioComponent, TableComponent, TablePaginationComponent, TituloComponent } from "@ng-mf/data-access-user";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ModificacionSocios, TableDataNgTable } from '../../models/avisomodify.model';
import { Subject, takeUntil } from 'rxjs';
import { AvisoModifyService } from '../../services/aviso-modify.service';
import { CommonModule } from '@angular/common';
import { Modal } from 'bootstrap';
import { Tramite32301Query } from '../../estados/tramite32301.query';
import { Tramite32301Store } from '../../estados/tramite32301.store';

interface PreOperativoIn{
    label: string,
    value: string
}@Component({
  selector: 'app-modificacion-socios',
  standalone: true,
  imports: [CommonModule, TituloComponent, TableComponent, TablePaginationComponent, ReactiveFormsModule, CatalogoSelectComponent, InputRadioComponent, AlertComponent],
  templateUrl: './modificacionSocios.component.html',
})
export class ModificacionSociosComponent implements OnInit, AfterViewInit, OnDestroy {
  
  // Definición de las columnas de la tabla
  tableColumns: string[] = [];
  declaretableColumns: string[] = [];

  // Datos para las tablas
  mercanciasData: { tbodyData: string[] }[] = [{ tbodyData: [],},];
  declareData: { tbodyData: string[] }[] = [{ tbodyData: [],},];
  
  // Variables para la paginación de los datos
  totalItems: number = 0;
  itemsPerPage: number = 1;
  currentPage: number = 1;

  // Datos de la sección de miembros revocados
  public seccionMiembrosRevocados:{ tbodyData: string[] }[] = [{ tbodyData: [],},];

  // Datos de los miembros de la empresa
  public gridMiembrosEmpresas:{ tbodyData: string[] }[] = [{ tbodyData: [],},];

  // Datos de los miembros de la empresa para mostrar en la tabla
  public miembroDeLaEmpresaBodyData: unknown[] = [];

  // Instancias de los modales para mostrar
  AgregarModelInstance!: Modal;
  RaticarModelnstance!: Modal;
  RevocarModelnstance!: Modal;
  Correctamentelnstance!:Modal;
  
  // Modelo de datos para la modificación de socios
  modificacionSocios!:ModificacionSocios;

  // Opciones para los catálogos de nacionalidad, radio y tipo de miembro
  nacionalidadOptions!: Catalogo[];
  radioOptions!:PreOperativoIn[];
  enSuCaracterDeOptions!: Catalogo[];

  // Referencias a los elementos del DOM de los modales
  @ViewChild('Agregar', { static: false }) AgregarMOdel!: ElementRef;
  @ViewChild('Raticar', { static: false }) RaticarMOdel!: ElementRef;
  @ViewChild('Revocar', { static: false }) RevocarMOdel!: ElementRef;
  @ViewChild('CorrectamenteModel', { static: false }) CorrectamenteModel!: ElementRef;
  
  // Formulario reactivo para agregar miembros
  agregarMiembroDeLaEmpresaFrom!: FormGroup;

  // Mensaje sobre la nacionalidad y tributo en México
  messageNac: string = `- Tratándose de socios o accionistas, deberá presentar el documento
    denominado <b>"Relación de los socios, accionistas o asociados, residentes en el extranjero"</b>, conforme la norma oficial
    aprobada número 96, del Apartado A del Anexo 1 de la RMF para 2017.
    <br><br>
    - Tratándose de representante legal, administrador único y/o miembros del consejo de administración, 
    de forma enunciativa, más no limitativa, podrá presentar documentos que acrediten que dichas personas no
    se encuentran obligadas a tributar en MÉXICO, tales como, Opinión del cumplimiento de obligaciones fiscales con la 
    leyenda "Sin obligaciones fiscales", constancia de residencia para efectos fiscales del país donde tributa, declaraciones
    fiscales del país donde se encuentren obligados a tributar, pasaporte expedido por su país de origen, etc. Deberá presentar 
    el documento denominado <b>"documento que acredite no tributar en MÉXICO"</b>.`;

  // Subject para controlar la destrucción del componente
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private fb: FormBuilder, private AvisoModifyService: AvisoModifyService, private store: Tramite32301Store,
    private Tramite32301Query:Tramite32301Query) {
    // Constructor
  }

  ngOnInit(): void {
    // Inicialización del formulario con los controles y validadores
    this.agregarMiembroDeLaEmpresaFrom = this.fb.group({
      ensucarácterde: [1, Validators.required],
      obligadoaTributarenMéxico: [true, Validators.required],
      nacionalidad: [1, Validators.required],
      registroFederaldeContribuyentes: [
        { value: 'HEJE780514BVA', disabled: true },
        Validators.required,
      ],
      rfc: ['HEJE780514BVA', [Validators.required]],
      nombreCompleto: [
        { value: 'ERNESTO HERNÁNDEZ URI', disabled: true },
        Validators.required,
      ],
    });

    // Llamadas a servicios para obtener los datos de la aplicación
    this.getSeccionMiembrosRevocados();
    this.getEnSuCaracterDe();
    this.getNacionalidad();
    this.getPreOperativo();
    this.getGridMiembrosEmpresas();
  }

  // Método para actualizar el valor en el store
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite32301Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  // Método para obtener valores del store
  getValorStore(): void {
    this.Tramite32301Query.selectModificacionSocios$
      .pipe(takeUntil(this.destroy$))
      .subscribe(state => {
        this.modificacionSocios = state as unknown as ModificacionSocios;
        const NEW_DATU = Object.values(this.modificacionSocios)
        const TBODY_DATA = { tbodyData: NEW_DATU.map(String) }
        this.declareData.push(TBODY_DATA)
      });
    this.closeAgregarModal();
  }

  // Obtener las opciones de "En su carácter de"
  getEnSuCaracterDe(): void {
    this.AvisoModifyService.getEnSuCaracterDe()
      .subscribe((resp) => {
        this.enSuCaracterDeOptions = Object.assign([], resp);
      });
  }

  // Obtener las opciones de nacionalidad
  getNacionalidad(): void {
    this.AvisoModifyService.getNacionalidad()
      .subscribe((resp) => {
        this.nacionalidadOptions = Object.assign([], resp);
      });
  }

  // Obtener las opciones del "Pre Operativo"
  getPreOperativo(): void {
    this.AvisoModifyService.getPreOperativo().subscribe((resp) => {
      this.radioOptions = Object.assign([], resp);
    });
  }

  // Obtener los datos de la tabla de miembros de la empresa
  getGridMiembrosEmpresas(): void {
    this.AvisoModifyService.getGridMiembrosEmpresas().subscribe((resp: TableDataNgTable) => {
      this.tableColumns = resp.tableHeader;
      this.mercanciasData = resp.tableBody;
    });
  }

  // Obtener la sección de miembros revocados
  getSeccionMiembrosRevocados(): void {
    this.AvisoModifyService.getSeccionMiembrosRevocados().subscribe((resp: TableDataNgTable) => {
      this.declaretableColumns = resp.tableHeader;
    });
  }

  // Actualizar la paginación de la tabla
  updatePagination(): void {
    const START_INDEX = (this.currentPage - 1) * this.itemsPerPage;
    this.miembroDeLaEmpresaBodyData = this.miembroDeLaEmpresaBodyData.slice(
      START_INDEX,
      START_INDEX + this.itemsPerPage
    );
  }

  // Cambiar el número de elementos por página
  onItemsPerPageChange(itemsPerPage: number): void {
    this.itemsPerPage = itemsPerPage;
    this.currentPage = 1;
    this.updatePagination();
  }

  // Cambiar la página de la tabla
  onPageChange(page: number): void {
    this.currentPage = page;
    this.updatePagination();
  }

  // Inicialización de los modales después de que la vista se carga
  ngAfterViewInit(): void {
    if (this.AgregarMOdel?.nativeElement) {
      this.AgregarModelInstance = new Modal(this.AgregarMOdel.nativeElement);
    }

    if (this.RaticarMOdel?.nativeElement) {
      this.RaticarModelnstance = new Modal(this.RaticarMOdel.nativeElement);
    }
    if (this.RevocarMOdel?.nativeElement) {
      this.RevocarModelnstance = new Modal(this.RevocarMOdel.nativeElement);
    }

    if (this.CorrectamenteModel?.nativeElement) {
      this.Correctamentelnstance = new Modal(this.CorrectamenteModel.nativeElement);
    }
  }

  // Métodos para abrir los modales
  openAgregarModal(): void {
    if (this.AgregarModelInstance) {
      this.AgregarModelInstance.show();
    }
  }
  openRaticarModal(): void {
    if (this.RaticarModelnstance) {
      this.RaticarModelnstance.show();
    }
  }
  openRevocarModal(): void {
    if (this.RevocarModelnstance) {
      this.RevocarModelnstance.show();
    }
  }
  openCorrectamenteModel(): void {
    if (this.Correctamentelnstance) {
      this.Correctamentelnstance.show();
    }
  }

  // Métodos para cerrar los modales
  closeCorrectamenteModel(): void {
    if (this.Correctamentelnstance) {
      this.Correctamentelnstance.hide();
    }
  }

  closeAgregarModal(): void {
    if (this.AgregarModelInstance) {
      this.AgregarModelInstance.hide();
      this.openCorrectamenteModel();
    }
  }

  closeRaticarModal(): void {
    if (this.RaticarModelnstance) {
      this.RaticarModelnstance.hide();
    }
  }
  closeRevocarModal(): void {
    if (this.RevocarModelnstance) {
      this.RevocarModelnstance.hide();
    }
  }

  // Método de destrucción del componente para evitar fugas de memoria
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

