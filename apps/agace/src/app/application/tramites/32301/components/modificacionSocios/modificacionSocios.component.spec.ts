import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificacionSociosComponent } from './modificacionSocios.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { AvisoModifyService } from '../../services/aviso-modify.service';
import { Tramite32301Store } from '../../estados/tramite32301.store';
import { Tramite32301Query } from '../../estados/tramite32301.query';
import { Modal } from 'bootstrap';
import { AlertComponent, Catalogo, CatalogoSelectComponent, InputRadioComponent, TableComponent, TablePaginationComponent, TituloComponent, FirmaElectronicaComponent, SharedModule, WizardComponent } from "@ng-mf/data-access-user";
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

describe('ModificacionSociosComponent', () => {
  let component: ModificacionSociosComponent;
  let fixture: ComponentFixture<ModificacionSociosComponent>;
  let avisoModifyServiceMock: jest.Mocked<AvisoModifyService>;
  let tramiteStoreMock: jest.Mocked<Tramite32301Store>;
  let tramiteQueryMock: jest.Mocked<Tramite32301Query>;
  fixture = TestBed.createComponent(ModificacionSociosComponent);
  component = fixture.componentInstance;

  beforeEach(async () => {
    const avisoModifyServiceMock = {
      getAvisoModify: jest.fn(),
      cargarDatosPersonaFusion: jest.fn(),
      getSelectRangoDias: jest.fn(),
      getAdicianFraccionOption: jest.fn(),
      getCapacidadAlmacenamiento: jest.fn(),
      getEntidadFederativa: jest.fn(),
      getGridDomiciliosModificados: jest.fn(),
      getGridMostrarGridModificado: jest.fn(),
      getEnSuCaracterDe: jest.fn(),
      getNacionalidad: jest.fn(),
      getPreOperativo: jest.fn(),
      getGridMiembrosEmpresas: jest.fn(),
      getSeccionMiembrosRevocados: jest.fn(),
    } as Partial<AvisoModifyService>;

    const tramiteStoreMock: Partial<Tramite32301Store> = {
      setModalidadCertificacion: jest.fn(),
      setforeignClientsSuppliers: jest.fn(),
      setNationalSuppliers: jest.fn(),
      setModificationsMembers: jest.fn(),
      setChangesToLegalDocuments: jest.fn(),
      setMergerOrSplitNotice: jest.fn(),
      setAdditionFractions: jest.fn(),
      setAcepto253: jest.fn(),
      setArchivoExtranjero: jest.fn(),
      setRegistrosProveedoresExtranjeros: jest.fn(),
      setSnsucarácterde: jest.fn(),
      setRfc: jest.fn(),
      setObligadoaTributarenMéxico: jest.fn(),
      setNacionalidad: jest.fn(),
      setRegistroFederaldeContribuyentes: jest.fn(),
      setModificacionGoceInmueble: jest.fn(),
      SetpersonaFusionEscisionDTO: jest.fn(),
      setNombreCompleto: jest.fn(),
      limpiarFormulario: jest.fn(),
    };

    const tramiteQueryMock = {
      selectModificacionSocios$: of({}),
      selectTipoDevAviso$: of({}),
      selectProveedorExtranjero$: of({}),
      selectModificacionGoceInmueble$: of({}),
      selectpersonaFusionEscisionDTO$: of({}),
      selectFechasSeleccionadas$: of({}),
      selectDatosEmpresa$: of({}),
      setCargaTipo$: of({}),
      selectDatosQuienRecibe$: of({}),
      selectDatosMercanciaSubmanufactura$: of({}),
      selectDatosDomicilioLugar$: of({}),
    } as Partial<Tramite32301Query>;

    await TestBed.configureTestingModule({
      imports: [],
      declarations: [ModificacionSociosComponent, ReactiveFormsModule, CommonModule, TituloComponent, TableComponent, TablePaginationComponent, CatalogoSelectComponent, InputRadioComponent, AlertComponent, FirmaElectronicaComponent,
                            RouterModule,
                            FormsModule,
                            HttpClientModule,
                            WizardComponent,
                            SharedModule],
      providers: [
        FormBuilder,
        { provide: AvisoModifyService, useValue: avisoModifyServiceMock },
        { provide: Tramite32301Store, useValue: tramiteStoreMock },
        { provide: Tramite32301Query, useValue: tramiteQueryMock },
      ],
    }).compileComponents();

    fixture.detectChanges();
  });

 

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    expect(component.agregarMiembroDeLaEmpresaFrom).toBeDefined();
    expect(
      component.agregarMiembroDeLaEmpresaFrom.controls['ensucarácterde']
    ).toBeDefined();
    expect(
      component.agregarMiembroDeLaEmpresaFrom.controls[
        'obligadoaTributarenMéxico'
      ]
    ).toBeDefined();
  });

 
  it('should update pagination correctly', () => {
    component.miembroDeLaEmpresaBodyData = [1, 2, 3, 4, 5];
    component.itemsPerPage = 2;
    component.currentPage = 2;

    component.updatePagination();

    expect(component.miembroDeLaEmpresaBodyData).toEqual([3, 4]);
  });

  it('should open and close modals correctly', () => {
    const modalInstanceMock = {
      show: jest.fn(),
      hide: jest.fn(),
    } as unknown as Modal;
    component.agregarModelInstance = modalInstanceMock;

    component.openAgregarModal();
    expect(modalInstanceMock.show).toHaveBeenCalled();

    component.closeAgregarModal();
    expect(modalInstanceMock.hide).toHaveBeenCalled();
  });

  it('should destroy subscriptions on ngOnDestroy', () => {
    const destroySpy = jest.spyOn(component['destroy$'], 'next');
    const completeSpy = jest.spyOn(component['destroy$'], 'complete');

    component.ngOnDestroy();

    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

});
