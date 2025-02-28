/* eslint-disable dot-notation */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { DatosTratadosAcuerdosComponent } from './datos-tratados-acuerdos.component';

import { CONFIGURACION_ACCIONISTAS, TablaDinamicaComponent, TablaSeleccion } from '@ng-mf/data-access-user';
import { DatostratadosacuerdosService } from '@ng-mf/data-access-user';
import { of } from 'rxjs';

describe('DatosTratadosAcuerdosComponent', () => {
  let component: DatosTratadosAcuerdosComponent;
  let fixture: ComponentFixture<DatosTratadosAcuerdosComponent>;
  let service: DatostratadosacuerdosService;

  beforeEach(async () => {
    const SERVICE_MOCK = {
      getData: jest.fn().mockReturnValue(of({ key: 'value' })),
    };

    await TestBed.configureTestingModule({
      imports: [DatosTratadosAcuerdosComponent, CommonModule, TablaDinamicaComponent],
      providers: [{ provide: DatostratadosacuerdosService, useValue: SERVICE_MOCK }],
    }).compileComponents();

    service = TestBed.inject(DatostratadosacuerdosService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosTratadosAcuerdosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.configuracionTabla).toEqual(CONFIGURACION_ACCIONISTAS);
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