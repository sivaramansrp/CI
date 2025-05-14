import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosDeLaMercanciaComponent } from './Datos-de-la-mercancia.component';
import { of, Subject } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { CommonModule } from '@angular/common';
import { DATOS_DE_LA_MERCANCIA } from '../../constantes/datos-de-la-solicitud.enum';

// Mocks
const mockStore = {
  setDynamicFieldValue: jest.fn(),
};

const mockQuery = {
  selectSolicitudDeRegistroTpl$: of({ test: 'data' }),
};

const mockService = {
  datosDeLaSolicitud: jest.fn().mockReturnValue(of({
    fraccion: [{ id: 1, descripcion: 'Fracción 1' }],
    UMT: [{ id: 2, descripcion: 'UMT 1' }]
  })),
};

const mockFormularioService = {
  setFormValue: jest.fn(),
};

describe('DatosDeLaMercanciaComponent', () => {
  let component: DatosDeLaMercanciaComponent;
  let fixture: ComponentFixture<DatosDeLaMercanciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        FormasDinamicasComponent
      ],
      providers: [
        { provide: 'ImportacionesAgropecuariasStore', useValue: mockStore },
        { provide: 'ImportacionesAgropecuariasQuery', useValue: mockQuery },
        { provide: 'ImportacionesAgropecuariasService', useValue: mockService },
        { provide: 'ServicioDeFormularioService', useValue: mockFormularioService }
      ]
    })
    .overrideComponent(DatosDeLaMercanciaComponent, {
      set: {
        providers: [
          { provide: 'ImportacionesAgropecuariasStore', useValue: mockStore },
          { provide: 'ImportacionesAgropecuariasQuery', useValue: mockQuery },
          { provide: 'ImportacionesAgropecuariasService', useValue: mockService },
          { provide: 'ServicioDeFormularioService', useValue: mockFormularioService },
        ],
      },
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatosDeLaMercanciaComponent);
    component = fixture.componentInstance;

    // Inject mock data into form config
    component['datosDelMercancia'] = [
      { campo: 'fraccion_arancelaria' },
      { campo: 'umt' },
    ] as any;

    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit and fetch data', () => {
    const datosFraccionSpy = jest.spyOn(component, 'datosFraccion');
    const datosUMTSpy = jest.spyOn(component, 'datosUMT');
    component.ngOnInit();
    expect(datosFraccionSpy).toHaveBeenCalled();
    expect(datosUMTSpy).toHaveBeenCalled();
  });

  it('should set form value on establecerCambioDeValor', () => {
    const event = { campo: 'fraccion_arancelaria', valor: 'some value' };
    component.establecerCambioDeValor(event);
    expect(mockStore.setDynamicFieldValue).toHaveBeenCalledWith('fraccion_arancelaria', 'some value');
    expect(mockFormularioService.setFormValue).toHaveBeenCalledWith('datosMercanciaForm', {
      fraccion_arancelaria: 'some value',
    });
  });

  it('should set dynamic fraccion options', () => {
    component.datosFraccion();
    fixture.detectChanges();

    const field = component['datosDelMercancia'].find(f => f.campo === 'fraccion_arancelaria');
    expect(field?.opciones?.length).toBeGreaterThan(0);
  });

  it('should set dynamic UMT options', () => {
    component.datosUMT();
    fixture.detectChanges();

    const field = component['datosDelMercancia'].find(f => f.campo === 'umt');
    expect(field?.opciones?.length).toBeGreaterThan(0);
  });

  it('should clean up subscriptions on destroy', () => {
    const nextSpy = jest.spyOn(component['destroy$'], 'next');
    const completeSpy = jest.spyOn(component['destroy$'], 'complete');

    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('should return ninoFormGroup from getter', () => {
    const group = component.ninoFormGroup;
    expect(group).toBeTruthy();
    expect(group instanceof Object).toBe(true);
  });
});
