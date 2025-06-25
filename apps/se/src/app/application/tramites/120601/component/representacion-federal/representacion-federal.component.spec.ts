import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RepresentacionFederalComponent } from './representacion-federal.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DatosEmpresaService } from '../../services/datos-empresa.service';
import { Tramite120601Query } from '../../estados/tramite-120601.query';
import { Tramite120601Store } from '../../estados/tramite-120601.store';
import { ConsultaioQuery } from '@ng-mf/data-access-user';

describe('RepresentacionFederalComponent', () => {
  let component: RepresentacionFederalComponent;
  let fixture: ComponentFixture<RepresentacionFederalComponent>;
  let datosEmpresaServiceMock: any;
  let tramiteQueryMock: any;
  let tramiteStoreMock: any;
  let consultaioQueryMock: any;

  beforeEach(async () => {
    datosEmpresaServiceMock = {
      obtenerEstado: jest.fn().mockReturnValue(of([{ id: 1, descripcion: 'Estado 1' }])),
      obtenerDatosDeRepresentacionFederal: jest.fn().mockReturnValue(of([{ id: 2, descripcion: 'Rep 1' }])),
      ObtenerTablaDeRepresentaciónFederal: jest.fn().mockReturnValue(of([{ id: 3, nombre: 'Socio 1' }]))
    };
    tramiteQueryMock = {
      selectEstado$: of('Estado 1'),
      selectRepresentacion$: of('Rep 1')
    };
    tramiteStoreMock = {
      setEstado: jest.fn(),
      setRepresentacion: jest.fn()
    };
    consultaioQueryMock = {
      selectConsultaioState$: of({ readonly: false })
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RepresentacionFederalComponent],
      providers: [
        FormBuilder,
        { provide: Tramite120601Query, useValue: tramiteQueryMock },
        { provide: Tramite120601Store, useValue: tramiteStoreMock },
        { provide: DatosEmpresaService, useValue: datosEmpresaServiceMock },
        { provide: ConsultaioQuery, useValue: consultaioQueryMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(RepresentacionFederalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    expect(component.formulario).toBeDefined();
    expect(component.formulario.get('estado')).toBeDefined();
    expect(component.formulario.get('representacion')).toBeDefined();
  });

  it('should patch estado and representacion from query observables', () => {
    expect(component.formulario.get('estado')?.value).toBe('Estado 1');
    expect(component.formulario.get('representacion')?.value).toBe('Rep 1');
  });

  it('should get entidad federativa from service', () => {
    component.getEntidadFederativa();
    expect(datosEmpresaServiceMock.obtenerEstado).toHaveBeenCalled();
    expect(component.estado).toEqual([{ id: 1, descripcion: 'Estado 1' }]);
  });

  it('should get representacion federal from service', () => {
    component.getRepresentacionFederal();
    expect(datosEmpresaServiceMock.obtenerDatosDeRepresentacionFederal).toHaveBeenCalled();
    expect(component.representacion).toEqual([{ id: 2, descripcion: 'Rep 1' }]);
  });

  it('should get datos socios from service', () => {
    component.getDatosSocios();
    expect(datosEmpresaServiceMock.ObtenerTablaDeRepresentaciónFederal).toHaveBeenCalled();
    expect(component.datosSocios).toEqual([{ id: 3, nombre: 'Socio 1' }]);
  });

  it('should call store.setEstado on docSeleccionado', () => {
    component.formulario.get('estado')?.setValue('Estado 1');
    component.docSeleccionado({} as any);
    expect(tramiteStoreMock.setEstado).toHaveBeenCalledWith('Estado 1');
  });

  it('should call store.setRepresentacion on validarRepresentacionFederalIDCSECEROR_', () => {
    component.formulario.get('representacion')?.setValue('Rep 1');
    component.validarRepresentacionFederalIDCSECEROR_({} as any);
    expect(tramiteStoreMock.setRepresentacion).toHaveBeenCalledWith('Rep 1');
  });

  it('should clean up subscriptions on ngOnDestroy', () => {
    const nextSpy = jest.spyOn(component['destroyed$'], 'next');
    const completeSpy = jest.spyOn(component['destroyed$'], 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});