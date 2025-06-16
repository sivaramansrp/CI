import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, jest, test } from '@jest/globals';
import { ImportacionExportacionPetroleoComponent } from './importacion-exportacion-petroleo.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { PermisoPetroleoService } from '../../services/permiso-petroleo.service';
import { Tramite130302Store } from '../../estados/tramite130302.store';
import { Tramite130302Query } from '../../estados/queries/tramite130302.query';
import { FormBuilder } from '@angular/forms';

// Mocks for dependencies
const mockService = {
  getSolicitante: jest.fn().mockReturnValue(of({
    saldoDisponible: 100,
    prorrogaDel: '2024-01-01',
    prorrogaAl: '2024-12-31'
  })),
  obtenerTabla: jest.fn().mockReturnValue(of([]))
};

const mockTramite130302Store = {
  setDynamicFieldValue: jest.fn(),
  setprorrogaAl: jest.fn(),
  setprorrogaDel: jest.fn()
};

const mockTramite130302Query = {
  selectExportarIlustraciones$: of({
    motivoJustificacion: 'Justificación',
    otrasDeclaraciones: 'Declaraciones'
  })
};

const mockConsultaioQuery = {
  selectConsultaioState$: of({ readonly: false })
};

function createComponent(overrides: any = {}) {
  return new ImportacionExportacionPetroleoComponent(
    new FormBuilder(),
    overrides.service || mockService,
    overrides.tramite130302Store || mockTramite130302Store,
    overrides.tramite130302Query || mockTramite130302Query,
    overrides.consultaioQuery || mockConsultaioQuery
  );
}

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


  it('should call setValoresStore on cambioFechaPago', async () => {
    const { fixture } = await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, ImportacionExportacionPetroleoComponent],
      providers: [
        { provide: PermisoPetroleoService, useValue: mockService },
        { provide: Tramite130302Store, useValue: mockTramite130302Store },
        { provide: Tramite130302Query, useValue: mockTramite130302Query },
        { provide: FormBuilder, useValue: new FormBuilder() },
      ],
    }).compileComponents();
    const comp = fixture.componentInstance;
    jest.spyOn(comp, 'setValoresStore');
    comp.form = new FormBuilder().group({ prorrogaAl: '' });
    comp.cambioFechaPago('2024-05-01');
    expect(comp.setValoresStore).toHaveBeenCalledWith(comp.form, 'prorrogaAl', 'setprorrogaAl');
  });

  it('should disable form if esFormularioSoloLectura is true', async () => {
    const { fixture } = await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, ImportacionExportacionPetroleoComponent],
      providers: [
        { provide: PermisoPetroleoService, useValue: mockService },
        { provide: Tramite130302Store, useValue: mockTramite130302Store },
        { provide: Tramite130302Query, useValue: mockTramite130302Query },
        { provide: FormBuilder, useValue: new FormBuilder() },
        { provide: 'ConsultaioQuery', useValue: { selectConsultaioState$: of({ readonly: true }) } }
      ],
    }).compileComponents();
    const comp = fixture.componentInstance;
    comp.configurarGrupoForm();
    expect(comp.form.disabled).toBe(true);
  });

  it('should clean up subscriptions on destroy', async () => {
    const { fixture } = await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, ImportacionExportacionPetroleoComponent],
      providers: [
        { provide: PermisoPetroleoService, useValue: mockService },
        { provide: Tramite130302Store, useValue: mockTramite130302Store },
        { provide: Tramite130302Query, useValue: mockTramite130302Query },
        { provide: FormBuilder, useValue: new FormBuilder() },
      ],
    }).compileComponents();
    const comp = fixture.componentInstance;
    const nextSpy = jest.spyOn(comp['destroyed$'], 'next');
    const completeSpy = jest.spyOn(comp['destroyed$'], 'complete');
    comp.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('should construct and subscribe to readonly state', () => {
    const comp = createComponent();
    expect(comp.esFormularioSoloLectura).toBe(false);
  });

  it('should initialize form and call load methods on ngOnInit', () => {
    const comp = createComponent();
    const configSpy = jest.spyOn(comp, 'configurarGrupoForm');
    const loadMercanciasSpy = jest.spyOn(comp, 'loadMercancias');
    const loadAsignacionDataSpy = jest.spyOn(comp, 'loadAsignacionData');
    comp.ngOnInit();
    expect(configSpy).toHaveBeenCalled();
    expect(loadMercanciasSpy).toHaveBeenCalled();
    expect(loadAsignacionDataSpy).toHaveBeenCalled();
  });

  it('should configure form and enable/disable based on readonly', () => {
    const comp = createComponent();
    comp.esFormularioSoloLectura = false;
    comp.configurarGrupoForm();
    expect(comp.form.enabled).toBe(true);

    comp.esFormularioSoloLectura = true;
    comp.configurarGrupoForm();
    expect(comp.form.disabled).toBe(true);
  });

  it('should patch form values in loadAsignacionData', () => {
    const comp = createComponent();
    comp.form = new FormBuilder().group({
      saldoDisponible: [''],
      prorrogaDel: [''],
      prorrogaAl: ['']
    });
    mockService.getSolicitante.mockReturnValueOnce(of({
      saldoDisponible: 123,
      prorrogaDel: '2023-01-01',
      prorrogaAl: '2023-12-31'
    }));
    comp.loadAsignacionData();
    expect(comp.form.get('saldoDisponible')?.value).toBe(123);
    expect(comp.form.get('prorrogaDel')?.value).toBe('2023-01-01');
    expect(comp.form.get('prorrogaAl')?.value).toBe('2023-12-31');
  });

  it('should set tercerosProd in loadMercancias', () => {
    const comp = createComponent();
    const productos = [{ id: 1 }, { id: 2 }];
    mockService.obtenerTabla.mockReturnValueOnce(of(productos));
    comp.loadMercancias();
    expect(comp.tercerosProd).toBe(productos);
  });

  it('should call setDynamicFieldValue in establecerCambioDeValor', () => {
    const comp = createComponent();
    comp.establecerCambioDeValor({ campo: 'foo', valor: 'bar' });
    expect(mockTramite130302Store.setDynamicFieldValue).toHaveBeenCalledWith('foo', 'bar');
  });

  it('should not call setDynamicFieldValue if event is falsy', () => {
    const comp = createComponent();
    comp.establecerCambioDeValor(undefined as any);
    expect(mockTramite130302Store.setDynamicFieldValue).not.toHaveBeenCalled();
  });

  it('should call tramite130302Store method in setValoresStore', () => {
    const comp = createComponent();
    const form = new FormBuilder().group({ prorrogaAl: ['2022-01-01'] });
    comp.setValoresStore(form, 'prorrogaAl', 'setprorrogaAl');
    expect(mockTramite130302Store.setprorrogaAl).toHaveBeenCalledWith('2022-01-01');
  });

  it('should patch prorrogaAl and call setValoresStore in cambioFechaPago', () => {
    const comp = createComponent();
    comp.form = new FormBuilder().group({ prorrogaAl: [''] });
    const spy = jest.spyOn(comp, 'setValoresStore');
    comp.cambioFechaPago('2022-02-02');
    expect(comp.form.get('prorrogaAl')?.value).toBe('2022-02-02');
    expect(spy).toHaveBeenCalledWith(comp.form, 'prorrogaAl', 'setprorrogaAl');
  });

  it('should patch prorrogaDel and call setValoresStore in oncambioFechaPago', () => {
    const comp = createComponent();
    comp.form = new FormBuilder().group({ prorrogaDel: [''] });
    const spy = jest.spyOn(comp, 'setValoresStore');
    comp.oncambioFechaPago('2022-03-03');
    expect(comp.form.get('prorrogaDel')?.value).toBe('2022-03-03');
    expect(spy).toHaveBeenCalledWith(comp.form, 'prorrogaDel', 'setprorrogaDel');
  });

  it('should return ninoFormGroup getter', () => {
    const comp = createComponent();
    const fg = new FormGroup({});
    comp.forma = new FormGroup({ ninoFormGroup: fg });
    expect(comp.ninoFormGroup).toBe(fg);
  });

  it('should clean up destroyed$ on ngOnDestroy', () => {
    const comp = createComponent();
    const nextSpy = jest.spyOn(comp['destroyed$'], 'next');
    const completeSpy = jest.spyOn(comp['destroyed$'], 'complete');
    comp.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('should call cambioFechaPago from onFechaCambiada', () => {
    const comp = createComponent();
    comp.form = new FormBuilder().group({ prorrogaAl: [''] });
    const spy = jest.spyOn(comp, 'cambioFechaPago');
    comp.onFechaCambiada('2022-04-04');
    expect(spy).toHaveBeenCalledWith('2022-04-04');
  });
});
