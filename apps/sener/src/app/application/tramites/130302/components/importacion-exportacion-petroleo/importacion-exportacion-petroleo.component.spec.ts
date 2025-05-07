import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImportacionExportacionPetroleoComponent } from './importacion-exportacion-petroleo.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';
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
      imports: [ReactiveFormsModule, ImportacionExportacionPetroleoComponent], // Move the component to imports
      providers: [
        { provide: PermisoPetroleoService, useValue: permisoPetroleoServiceMock },
        { provide: Tramite130302Store, useValue: tramite130302StoreMock },
        { provide: Tramite130302Query, useValue: tramite130302QueryMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ImportacionExportacionPetroleoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form and load data on ngOnInit', () => {
    component.ngOnInit();
    expect(component.form.get('saldoDisponible')?.value).toBe('');
    expect(component.form.get('motivoJustificacion')?.value).toBe('Test Justification');
    expect(component.tercerosProd.length).toBe(1);
    expect(component.tercerosProd[0].fetchaSolicitud).toBe('2023-01-01');
  });

  it('should call setprorrogaAl on onFechaCambiada', () => {
    const nuevoValor = '2023-12-31';
    component.form = component.form = new FormGroup({
      fechaPago: new FormControl(''),
    });
    component.onFechaCambiada(nuevoValor);
    expect(component.form.get('fechaPago')?.value).toBe(nuevoValor);
    expect(tramite130302StoreMock.setprorrogaAl).toHaveBeenCalledWith(nuevoValor);
  });

  it('should load solicitante data on loadAsignacionData', () => {
    component.loadAsignacionData();
    expect(component.form.get('saldoDisponible')?.value).toBe(100);
    expect(component.form.get('prorrogaDel')?.value).toBe('2023-01-01');
    expect(component.form.get('prorrogaAl')?.value).toBe('2023-12-31');
  });

  it('should load mercancias data on loadMercancias', () => {
    component.loadMercancias();
    expect(component.tercerosProd.length).toBe(1);
    expect(component.tercerosProd[0].fetchaSolicitud).toBe('2023-01-01');
  });

  it('should call setDynamicFieldValue on establecerCambioDeValor', () => {
    const event = { campo: 'testField', valor: 'testValue' };
    component.establecerCambioDeValor(event);
    expect(tramite130302StoreMock.setDynamicFieldValue).toHaveBeenCalledWith('testField', 'testValue');
  });

  it('should set values in the store on setValoresStore', () => {
    const form = new FormGroup({
      testField: new FormControl('testValue'),
    });
    const metodoNombre = 'setprorrogaAl';
    component.setValoresStore(form, 'testField', metodoNombre as keyof Tramite130302Store);
    expect(tramite130302StoreMock[metodoNombre]).toHaveBeenCalledWith('testValue');
  });

  it('should clean up subscriptions on ngOnDestroy', () => {
    const destroySpy = jest.spyOn(component.getDestroyed$(), 'next');
    const completeSpy = jest.spyOn(component.getDestroyed$(), 'complete');
    component.ngOnDestroy();
    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
