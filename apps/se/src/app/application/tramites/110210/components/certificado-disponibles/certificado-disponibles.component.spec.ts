/* eslint-disable dot-notation */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { CertificadoDisponiblesComponent } from './certificado-disponibles.component';

import { CERTIFICADO_DISPONIBLES_COLUMNAS, TablaDinamicaComponent, TablaSeleccion } from '@ng-mf/data-access-user';
import { CertificadoDisponiblesService } from '@ng-mf/data-access-user';
import { of } from 'rxjs';

describe('CertificadoDisponiblesComponent', () => {
  let component: CertificadoDisponiblesComponent;
  let fixture: ComponentFixture<CertificadoDisponiblesComponent>;
  let service: CertificadoDisponiblesService;

  beforeEach(async () => {
    const SERVICE_MOCK = {
      getData: jest.fn().mockReturnValue(of({ key: 'value' })),
    };

    await TestBed.configureTestingModule({
      imports: [CertificadoDisponiblesComponent, CommonModule, TablaDinamicaComponent],
      providers: [{ provide: CertificadoDisponiblesService, useValue: SERVICE_MOCK }],
    }).compileComponents();

    service = TestBed.inject(CertificadoDisponiblesService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificadoDisponiblesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.configuracionTabla).toEqual(CERTIFICADO_DISPONIBLES_COLUMNAS);
    expect(component.seleccionTabla).toEqual(TablaSeleccion.UNDEFINED);
  });

  it('should fetch data on init', () => {
    component.ngOnInit();
    expect(service.getData).toHaveBeenCalled();
    expect(component.datosTabla).toEqual({ key: 'value' });
  });

  it('should complete destroyed$ subject on destroy', () => {
    const NEXT_SPY = jest.spyOn(component['destroyed$'], 'next');
    const COMPLETE_SPY = jest.spyOn(component['destroyed$'], 'complete');
    component.ngOnDestroy();
    expect(NEXT_SPY).toHaveBeenCalled();
    expect(COMPLETE_SPY).toHaveBeenCalled();
  });
});