import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificacionSociosComponent } from './modificacionSocios.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { AvisoModifyService } from '../../services/aviso-modify.service';
import { Tramite32301Store } from '../../estados/tramite32301.store';
import { Tramite32301Query } from '../../estados/tramite32301.query';
import { AlertComponent, CatalogoSelectComponent, ConsultaioQuery, InputRadioComponent, NotificacionesComponent, TableComponent, TablePaginationComponent, TituloComponent } from '@ng-mf/data-access-user';
import { Modal } from 'bootstrap';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';

jest.mock('bootstrap', () => ({
  Modal: jest.fn().mockImplementation(() => ({
    show: jest.fn(),
    hide: jest.fn(),
  })),
}));

describe('ModificacionSociosComponent', () => {
  let component: ModificacionSociosComponent;
  let fixture: ComponentFixture<ModificacionSociosComponent>;
  let avisoModifyServiceMock: any;
  let tramiteStoreMock: any;
  let tramiteQueryMock: any;
  let consultaioQueryMock: any;

  beforeEach(async () => {
    avisoModifyServiceMock = {
      getEnSuCaracterDe: jest.fn().mockReturnValue(of([{ id: 1, nombre: 'Socio' }])),
      getNacionalidad: jest.fn().mockReturnValue(of([{ id: 1, nombre: 'Mexicana' }])),
      getPreOperativo: jest.fn().mockReturnValue(of([{ label: 'Sí', value: '1' }])),
      getGridMiembrosEmpresas: jest.fn().mockReturnValue(of({
        tableHeader: ['Col1', 'Col2'],
        tableBody: [{ tbodyData: ['a', 'b'] }]
      })),
      getSeccionMiembrosRevocados: jest.fn().mockReturnValue(of({
        tableHeader: ['ColA', 'ColB'],
        tableBody: [{ tbodyData: ['x', 'y'] }]
      })),
    };
    tramiteStoreMock = {
      setTest: jest.fn(),
    };
    tramiteQueryMock = {
      selectModificacionSocios$: of({ campo1: 'valor1', campo2: 'valor2' }),
    };
    consultaioQueryMock = {
      selectConsultaioState$: of({ readonly: false }),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,
         CommonModule,
         ModificacionSociosComponent,
            TituloComponent,
            TableComponent,
            TablePaginationComponent,
            CatalogoSelectComponent,
            InputRadioComponent,
            AlertComponent,
            NotificacionesComponent,
            HttpClientTestingModule
      ],
      declarations: [],
      providers: [
        FormBuilder,
        { provide: AvisoModifyService, useValue: avisoModifyServiceMock },
        { provide: Tramite32301Store, useValue: tramiteStoreMock },
        { provide: Tramite32301Query, useValue: tramiteQueryMock },
        { provide: ConsultaioQuery, useValue: consultaioQueryMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ModificacionSociosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    component.initAgregarMiembroDeLaEmpresaForm();
    expect(component.agregarMiembroDeLaEmpresaFrom).toBeDefined();
    expect(component.agregarMiembroDeLaEmpresaFrom.get('ensucarácterde')?.value).toBe(1);
    expect(component.agregarMiembroDeLaEmpresaFrom.get('obligadoaTributarenMéxico')?.value).toBe(true);
  });

  it('should call setValoresStore and update store', () => {
    const fb = TestBed.inject(FormBuilder);
    const form = fb.group({ test: ['value'] });
    tramiteStoreMock.setTest = jest.fn();
    component.setValoresStore(form, 'test', 'setTest' as any);
    expect(tramiteStoreMock.setTest).toHaveBeenCalledWith('value');
  });

  it('should get EnSuCaracterDe options', () => {
    component.getEnSuCaracterDe();
    expect(avisoModifyServiceMock.getEnSuCaracterDe).toHaveBeenCalled();
    expect(component.enSuCaracterDeOptions).toEqual([{ id: 1, nombre: 'Socio' }]);
  });

  it('should get Nacionalidad options', () => {
    component.getNacionalidad();
    expect(avisoModifyServiceMock.getNacionalidad).toHaveBeenCalled();
    expect(component.nacionalidadOptions).toEqual([{ id: 1, nombre: 'Mexicana' }]);
  });

  it('should get PreOperativo options', () => {
    component.getPreOperativo();
    expect(avisoModifyServiceMock.getPreOperativo).toHaveBeenCalled();
    expect(component.radioOptions).toEqual([{ label: 'Sí', value: '1' }]);
  });

  it('should get GridMiembrosEmpresas and set tableColumns and mercanciasData', () => {
    component.getGridMiembrosEmpresas();
    expect(avisoModifyServiceMock.getGridMiembrosEmpresas).toHaveBeenCalled();
    expect(component.tableColumns).toEqual(['Col1', 'Col2']);
    expect(component.mercanciasData).toEqual([{ tbodyData: ['a', 'b'] }]);
  });

  it('should get SeccionMiembrosRevocados and set declaretableColumns', () => {
    component.getSeccionMiembrosRevocados();
    expect(avisoModifyServiceMock.getSeccionMiembrosRevocados).toHaveBeenCalled();
    expect(component.declaretableColumns).toEqual(['ColA', 'ColB']);
  });

  it('should update pagination', () => {
    component.mercanciasData = [
      { tbodyData: ['a'] },
      { tbodyData: ['b'] },
      { tbodyData: ['c'] }
    ];
    component.itemsPerPage = 2;
    component.currentPage = 2;
    component.updatePagination();
    expect(component.mercanciasData.length).toBeLessThanOrEqual(2);
  });

  it('should change items per page and reset page', () => {
    const spy = jest.spyOn(component, 'updatePagination');
    component.onItemsPerPageChange(5);
    expect(component.itemsPerPage).toBe(5);
    expect(component.currentPage).toBe(1);
    expect(spy).toHaveBeenCalled();
  });

  it('should change page and update pagination', () => {
    const spy = jest.spyOn(component, 'updatePagination');
    component.onPageChange(3);
    expect(component.currentPage).toBe(3);
    expect(spy).toHaveBeenCalled();
  });

  it('should open agregar modal if instance exists', () => {
    component.agregarModelInstance = new Modal(document.createElement('div'));
    const showSpy = jest.spyOn(component.agregarModelInstance, 'show');
    component.openAgregarModal();
    expect(showSpy).toHaveBeenCalled();
  });

  it('should set raticarNotificacion on openRaticarModal', () => {
    component.openRaticarModal();
    expect(component.raticarNotificacion).toBeDefined();
    expect(component.raticarNotificacion.mensaje).toContain('ratificado');
  });

  it('should set revocarNotificacion on openRevocarModal', () => {
    component.openRevocarModal();
    expect(component.revocarNotificacion).toBeDefined();
    expect(component.revocarNotificacion.mensaje).toContain('revocado');
  });

  it('should set correctamenteNotificacion on openCorrectamenteModel', () => {
    component.openCorrectamenteModel();
    expect(component.correctamenteNotificacion).toBeDefined();
    expect(component.correctamenteNotificacion.mensaje).toContain('guardados correctamente');
  });

  it('should close agregar modal and open confirmation', () => {
    component.agregarModelInstance = new Modal(document.createElement('div'));
    const hideSpy = jest.spyOn(component.agregarModelInstance, 'hide');
    const confirmSpy = jest.spyOn(component, 'openCorrectamenteModel');
    component.closeAgregarModal();
    expect(hideSpy).toHaveBeenCalled();
    expect(confirmSpy).toHaveBeenCalled();
  });

  it('should destroy and complete destroy$', () => {
    const nextSpy = jest.spyOn((component as any).destroy$, 'next');
    const completeSpy = jest.spyOn((component as any).destroy$, 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('should disable form if esFormularioSoloLectura is true in guardarDatosFormulario', () => {
    component.initAgregarMiembroDeLaEmpresaForm();
    component.esFormularioSoloLectura = true;
    component.guardarDatosFormulario();
    expect(component.agregarMiembroDeLaEmpresaFrom.disabled).toBe(true);
  });

  it('should enable form if esFormularioSoloLectura is false in guardarDatosFormulario', () => {
    component.initAgregarMiembroDeLaEmpresaForm();
    component.esFormularioSoloLectura = false;
    component.guardarDatosFormulario();
    expect(component.agregarMiembroDeLaEmpresaFrom.enabled).toBe(true);
  });

  it('should push declareData in getValorStore', () => {
    component.declareData = [];
    component.agregarModelInstance = new Modal(document.createElement('div'));
    jest.spyOn(component, 'closeAgregarModal');
    component.getValorStore();
    expect(component.declareData.length).toBeGreaterThan(0);
    expect(component.closeAgregarModal).toHaveBeenCalled();
  });
});