/* eslint-disable dot-notation */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { DomicilioTablaComponent } from './domicilio-tabla.component';

import { DOMICILIO_TABLA_COLUMNAS, TablaDinamicaComponent, TablaSeleccion } from '@ng-mf/data-access-user';
import { DomicilioTablaService } from '@ng-mf/data-access-user';
import { of } from 'rxjs';

describe('DomicilioTablaComponent', () => {
  let component: DomicilioTablaComponent;
  let fixture: ComponentFixture<DomicilioTablaComponent>;
  let service: DomicilioTablaService;

  beforeEach(async () => {
    const SERVICE_MOCK = {
      getData: jest.fn().mockReturnValue(of({ key: 'value' })),
    };

    await TestBed.configureTestingModule({
      imports: [DomicilioTablaComponent, CommonModule, TablaDinamicaComponent],
      providers: [{ provide: DomicilioTablaService, useValue: SERVICE_MOCK }],
    }).compileComponents();

    service = TestBed.inject(DomicilioTablaService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DomicilioTablaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.configuracionTabla).toEqual(DOMICILIO_TABLA_COLUMNAS);
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