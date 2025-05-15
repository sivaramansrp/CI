import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, jest, test } from '@jest/globals';
import { ImportacionExportacionPetroleoComponent } from './importacion-exportacion-petroleo.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { PermisoPetroleoService } from '../../services/permiso-petroleo.service';
import { Tramite130302Store } from '../../estados/tramite130302.store';
import { Tramite130302Query } from '../../estados/queries/tramite130302.query';

describe('ImportacionExportacionPetroleoComponent', () => {
  let component: ImportacionExportacionPetroleoComponent;
  let fixture: ComponentFixture<ImportacionExportacionPetroleoComponent>;
  let permisoPetroleoServiceMock: any;
  let tramite130302StoreMock: any;
  let tramite130302QueryMock: any;

  beforeEach(async () => {
    permisoPetroleoServiceMock = {
      obtenerTabla: jest.fn().mockReturnValue(of([{ fetchaSolicitud: '2023-01-01', fetchaInicial: '2023-01-02', fetchaFinal: '2023-01-03' }])),
      getSolicitante: jest.fn().mockReturnValue(of({ saldoDisponible: 100, prorrogaDel: '2023-01-01', prorrogaAl: '2023-12-31' })),
    };

    tramite130302StoreMock = {
      setprorrogaAl: jest.fn(),
      setDynamicFieldValue: jest.fn(),
    };

    tramite130302QueryMock = {
      selectExportarIlustraciones$: of({
        motivoJustificacion: 'Test Justification',
        otrasDeclaraciones: 'Test Declarations',
      }),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, ImportacionExportacionPetroleoComponent],
      providers: [
        { provide: PermisoPetroleoService, useValue: permisoPetroleoServiceMock },
        { provide: Tramite130302Store, useValue: tramite130302StoreMock },
        { provide: Tramite130302Query, useValue: tramite130302QueryMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ImportacionExportacionPetroleoComponent);
    component = fixture.componentInstance;

   component.form = new FormGroup({
      saldoDisponible: new FormControl(''),
      prorrogaDel: new FormControl(''),
      prorrogaAl: new FormControl(''),
      fechaPago: new FormControl(''),
      motivoJustificacion: new FormControl(''),
    });

    fixture.detectChanges();
  });

  test('should create the component', () => {
    expect(component).toBeTruthy();
  });

  test('should initialize the form and load data on ngOnInit', () => {
    component.ngOnInit();
    expect(component.form.get('saldoDisponible')?.value).toBe('');
    expect(component.form.get('motivoJustificacion')?.value).toBe('Test Justification');
    expect(component.tercerosProd.length).toBe(1);
    expect(component.tercerosProd[0].fetchaSolicitud).toBe('2023-01-01');
  });

  test('should call setprorrogaAl on onFechaCambiada', () => {
    const nuevoValor = '2023-12-31';
    component.form = new FormGroup({
      fechaPago: new FormControl(''),
    });
    component.onFechaCambiada(nuevoValor);
    expect(component.form.get('fechaPago')?.value).toBe(nuevoValor);
    expect(tramite130302StoreMock.setprorrogaAl).toHaveBeenCalledWith(nuevoValor);
  });

  test('should load solicitante data on loadAsignacionData', () => {
    component.loadAsignacionData();
    expect(component.form.get('saldoDisponible')?.value).toBe(100);
    expect(component.form.get('prorrogaDel')?.value).toBe('2023-01-01');
    expect(component.form.get('prorrogaAl')?.value).toBe('2023-12-31');
  });

  test('should load mercancias data on loadMercancias', () => {
    component.loadMercancias();
    expect(component.tercerosProd.length).toBe(1);
    expect(component.tercerosProd[0].fetchaSolicitud).toBe('2023-01-01');
  });

  test('should call setDynamicFieldValue on establecerCambioDeValor', () => {
    const event = { campo: 'testField', valor: 'testValue' };
    component.establecerCambioDeValor(event);
    expect(tramite130302StoreMock.setDynamicFieldValue).toHaveBeenCalledWith('testField', 'testValue');
  });

  test('should set values in the store on setValoresStore', () => {
    const form = new FormGroup({
      testField: new FormControl('testValue'),
    });
    const metodoNombre = 'setprorrogaAl';
    component.setValoresStore(form, 'testField', metodoNombre as keyof Tramite130302Store);
    expect(tramite130302StoreMock[metodoNombre]).toHaveBeenCalledWith('testValue');
  });

  test('should clean up subscriptions on ngOnDestroy', () => {
    const destroySpy = jest.spyOn(component['destroy$'], 'next');
    const completeSpy = jest.spyOn(component['destroy$'], 'complete');
    component.ngOnDestroy();
    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

  test('should handle empty data gracefully in loadMercancias', () => {
    permisoPetroleoServiceMock.obtenerTabla.mockReturnValue(of([]));
    component.loadMercancias();
    expect(component.tercerosProd.length).toBe(0);
  });

  test('should handle empty data gracefully in loadAsignacionData', () => {
    permisoPetroleoServiceMock.getSolicitante.mockReturnValue(of({}));
    component.loadAsignacionData();
    expect(component.form.get('saldoDisponible')?.value).toBeNull();
    expect(component.form.get('prorrogaDel')?.value).toBeNull();
    expect(component.form.get('prorrogaAl')?.value).toBeNull();
  });
});
