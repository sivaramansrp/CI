import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsultadDomicilios90305Component } from './consultad-domicilios-90305.component';

import { CommonModule } from '@angular/common';

import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

import {CatalogoSelectComponent ,TituloComponent , CatalogoResponse } from '@ng-mf/data-access-user';

import { of } from 'rxjs';
import { ProsecModificacionServiceTsService } from '../../services/prosec-modificacion.service.ts.service';

describe('ConsultadDomicilios90305Component', () => {
  let component: ConsultadDomicilios90305Component;
  let fixture: ComponentFixture<ConsultadDomicilios90305Component>;
  let mockService: jest.Mocked<ProsecModificacionServiceTsService>;

  beforeEach(async () => {
    // Create a complete mock of the service
    mockService = {
      getEstadoData: jest.fn(),
      getListaDomicilios: jest.fn(),
      getPlantaComplementaria: jest.fn(),
      getMercancias: jest.fn(),
      getSector: jest.fn(),
      getTipoProducto: jest.fn(),
      getUnidadMedida: jest.fn(),
    } as unknown as jest.Mocked<ProsecModificacionServiceTsService>;

    await TestBed.configureTestingModule({
      imports: [ConsultadDomicilios90305Component, CommonModule, ReactiveFormsModule, TituloComponent, CatalogoSelectComponent],
      providers: [
        FormBuilder,
        { provide: ProsecModificacionServiceTsService, useValue: mockService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultadDomicilios90305Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.formConsulta).toBeDefined();
    expect(component.formConsulta.get('estadoControl')).toBeDefined();
    expect(component.formConsulta.get('estadoControl')?.disabled).toBe(false);
    expect(component.formConsulta.get('estadoControl')?.valid).toBe(false);
  });

  it('should call loadEstado() on init', () => {
    const SPY = jest.spyOn(component, 'loadEstado');
    component.ngOnInit();
    expect(SPY).toHaveBeenCalled();
  });

  it('should populate estadoJson when loadEstado() is called', () => {
    const MOCK_DATA: CatalogoResponse[] = [
      { id: 1, descripcion: 'Estado 1' },
      { id: 2, descripcion: 'Estado 2' },
    ];
    mockService.getEstadoData.mockReturnValue(of(MOCK_DATA));

    component.loadEstado();
    expect(mockService.getEstadoData).toHaveBeenCalled();
    expect(component.estadoJson.length).toBe(2);
    expect(component.estadoJson).toEqual(MOCK_DATA);
  });

  it('should handle empty API response correctly', () => {
    mockService.getEstadoData.mockReturnValue(of([]));

    component.loadEstado();
    expect(mockService.getEstadoData).toHaveBeenCalled();
    expect(component.estadoJson.length).toBe(0);
  });

  it('should handle form validation correctly', () => {
    const ESTADO_CONTROLL = component.formConsulta.get('estadoControl');
    
    expect(ESTADO_CONTROLL?.valid).toBeFalsy();
    
    ESTADO_CONTROLL?.setValue('Some Value');
    expect(ESTADO_CONTROLL?.valid).toBeTruthy();
  });

  it('should subscribe to getEstadoData() when loadEstado() is called', () => {
    const MOCK_DATA: CatalogoResponse[] = [{ id: 1, descripcion: 'Test' }];
    mockService.getEstadoData.mockReturnValue(of(MOCK_DATA));

    component.loadEstado();
    expect(mockService.getEstadoData).toHaveBeenCalledTimes(1);
  });
});
