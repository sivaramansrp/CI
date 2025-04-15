import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { AlertComponent } from "@ng-mf/data-access-user";
import { Catalogo } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { InputRadioComponent } from '@ng-mf/data-access-user';
import { Modal } from 'bootstrap';
import { ModificacionSocios } from '../../models/avisomodify.model';
import { TableComponent } from '@ng-mf/data-access-user';
import { TablePaginationComponent } from '@ng-mf/data-access-user';
import { TituloComponent } from "@ng-mf/data-access-user";
import { Tramite32301Query } from '../../estados/tramite32301.query';
import { Tramite32301Store } from '../../estados/tramite32301.store';
import enSuCaracterDe from 'libs/shared/theme/assets/json/31601/enSuCaracterDe.json';
import gridMiembrosEmpresas from 'libs/shared/theme/assets/json/32301/gridMiembrosEmpresas.json';
import nacionalidad from 'libs/shared/theme/assets/json/31601/nacionalidad.json';
import preOperativo from 'libs/shared/theme/assets/json/31601/preOperativo.json';
import seccionMiembrosRevocados from 'libs/shared/theme/assets/json/32301/seccionMiembrosRevocados.json';

@Component({
  selector: 'app-modificacion-socios',
  standalone: true,
  imports: [CommonModule, TituloComponent, TableComponent, TablePaginationComponent, ReactiveFormsModule, CatalogoSelectComponent, InputRadioComponent, AlertComponent],
  templateUrl: './modificacionSocios.component.html',
})
export class ModificacionSociosComponent implements OnInit, AfterViewInit, OnDestroy {
  tableColumns: string[] = [];
  declaretableColumns: string[] = [];

  mercanciasData = [
    {
      tbodyData: [],
    },
  ];
  declareData: { tbodyData: string[] }[] = [{ tbodyData: [],},];
  
  totalItems: number = 0;
  itemsPerPage: number = 1;
  currentPage: number = 1;

  public seccionMiembrosRevocados = seccionMiembrosRevocados

  public gridMiembrosEmpresas = gridMiembrosEmpresas

  public miembroDeLaEmpresaBodyData: unknown[] = [];

  AgregarModelInstance!: Modal;

  RaticarModelnstance!: Modal;

  RevocarModelnstance!: Modal;

  Correctamentelnstance!:Modal;
  
  modificacionSocios!:ModificacionSocios

  nacionalidadOptions: Catalogo[] = nacionalidad;

  radioOptions = preOperativo;

  enSuCaracterDeOptions: Catalogo[] = enSuCaracterDe;

  @ViewChild('Agregar', { static: false }) AgregarMOdel!: ElementRef;

  @ViewChild('Raticar', { static: false }) RaticarMOdel!: ElementRef;

  @ViewChild('Revocar', { static: false }) RevocarMOdel!: ElementRef;

  @ViewChild('CorrectamenteModel', { static: false }) CorrectamenteModel!: ElementRef;
  
  agregarMiembroDeLaEmpresaFrom!: FormGroup;

  messageNac: string = `- Tratándose de socios o accionistas, deberá presentar el documento
				denominado <b>"Relación de los socios, accionistas o asociados, residentes en el extranjero"</b>, conforme la norma oficial
				aprobada número 96, del Apartado A del Anexo 1 de la RMF para 2017.
				<br><br>
				- Tratándose de representante legal, administrador único y/o miembros del consejo de administración, 
				de forma enunciativa, más no limitativa, podrá presentar documentos que acrediten que dichas personas no
				se encuentran obligadas a tributar en MÉXICO, tales como, Opinión del cumplimiento de obligaciones fiscales con la 
				leyenda "Sin obligaciones fiscales", constancia de residencia para efectos fiscales del país donde tributa, declaraciones
				fiscales del país donde se encuentren obligados a tributar, pasaporte expedido por su país de origen, etc. Deberá presentar 
				el documento denominado <b>"documento que acredite no tributar en MÉXICO"</b>.`


        private destroy$: Subject<void> = new Subject<void>();

        
  constructor(private fb: FormBuilder, private store: Tramite32301Store,
    private Tramite32301Query:Tramite32301Query) {
    //constructor
  }

  ngOnInit(): void {
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

    this.getSeccionMiembrosRevocados();
    this.getgridMiembrosEmpresas();

  }
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite32301Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  getValorStore():void{
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


  updatePagination(): void {
    const START_INDEX = (this.currentPage - 1) * this.itemsPerPage;
    this.miembroDeLaEmpresaBodyData = this.miembroDeLaEmpresaBodyData.slice(
      START_INDEX,
      START_INDEX + this.itemsPerPage
    );
  }
  public getSeccionMiembrosRevocados():void {
    this.tableColumns = this.seccionMiembrosRevocados.tableHeader;
    // this.declareData = this.seccionMiembrosRevocados.tableBody;
  }

  public getgridMiembrosEmpresas():void {
    this.declaretableColumns = this.gridMiembrosEmpresas.tableHeader;
    this.declareData = this.gridMiembrosEmpresas.tableBody;
  }

  onItemsPerPageChange(itemsPerPage: number): void {
    this.itemsPerPage = itemsPerPage;
    this.currentPage = 1;
    this.updatePagination();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.updatePagination();
  }

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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
