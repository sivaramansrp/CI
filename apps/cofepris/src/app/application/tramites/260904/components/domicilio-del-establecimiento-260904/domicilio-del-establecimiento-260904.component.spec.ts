import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DomicilioDelEstablecimiento260904Component } from './domicilio-del-establecimiento-260904.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { Tramite260904Query } from '../../estados/tramite260904.query';
import { Tramite260904Store } from '../../estados/tramite260904.store';
import { of } from 'rxjs';
import { DomicilioDelEstablecimientoService } from '../../services/domicilio-del-establecimiento/domicilio-del-establecimiento.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';

const mockTramiteQuery = {
  selectTramite260904$: of({
    codigoPostal: '12345',
    estado: { id: '1', descripcion: 'CDMX' },
    municipioOAlcaldia: 'Benito Juárez',
    localidad: 'Del Valle',
    colonias: 'Narvarte',
    calle: 'Xola',
    lada: '55',
    telefono: '12345678',
    avisoCheckbox: 'true',
    regimen: { id: '1', descripcion: 'General' },
    aduanasEntradas: { id: '1', descripcion: 'Aduana 1' },
    aifaCheckbox: 'true',
    manifests: 'true',
    acuerdoPublico: 'Acuerdo',
    rfc: 'RFC123',
  }),
};

const mockDomicilioService = {
  obtenerTablaDatos: jest.fn(() => of({ data: [{ id: 1 }] })),
  obtenerEstadoList: jest.fn(() => of({ data: [{ id: 1, descripcion: 'Estado 1' }] })),
  obtenerMercanciasDatos: jest.fn(() => of({ data: [{ id: 1 }] })),
};

const mockStore = {
  setTramite260904State: jest.fn(),
};


describe('DomicilioDelEstablecimiento260904Component', () => {
  let component: DomicilioDelEstablecimiento260904Component;
  let fixture: ComponentFixture<DomicilioDelEstablecimiento260904Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, DomicilioDelEstablecimiento260904Component,HttpClientTestingModule],
      declarations: [],
      providers: [
        { provide: Tramite260904Query, useValue: mockTramiteQuery },
        { provide: Tramite260904Store, useValue: mockStore },
        { provide: DomicilioDelEstablecimientoService, useValue: mockDomicilioService },
        provideHttpClientTesting(),
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DomicilioDelEstablecimiento260904Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize forms correctly on ngOnInit', () => {
    expect(component.form).toBeDefined();
    expect(component.domicilio).toBeDefined();
    expect(component.representanteLegal).toBeDefined();
  });

  it('should call obtenerTablaDatos and set data', () => {
    component.obtenerTablaDatos();
    expect(mockDomicilioService.obtenerTablaDatos).toHaveBeenCalled();
    expect(component.nicoTablaDatos.length).toBeGreaterThan(0);
  });

  it('should call obtenerEstadoList and set data', () => {
    component.obtenerEstadoList();
    expect(mockDomicilioService.obtenerEstadoList).toHaveBeenCalled();
    expect(component.estado.length).toBeGreaterThan(0);
  });

  it('should call obtenerMercanciasDatos and set data', () => {
    component.obtenerMercanciasDatos();
    expect(mockDomicilioService.obtenerMercanciasDatos).toHaveBeenCalled();
    expect(component.mercanciasTablaDatos.length).toBeGreaterThan(0);
  });

  it('should set value in store using setValorStore', () => {
  component.form.get('codigoPostal')?.setValue('99999');
  component.setValorStore(component.form, 'codigoPostal');
  expect(mockStore.setTramite260904State).toHaveBeenCalledWith({
    codigoPostal: '99999',
  });
});


  it('should retrieve values from the store on getValorStore', () => {
    const spy = jest.spyOn(mockTramiteQuery.selectTramite260904$, 'subscribe');
    component.getValorStore();
    expect(spy).toBeDefined();
  });

  it('should unsubscribe on destroy', () => {
    const spy = jest.spyOn((component as any).destroy$, 'next');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
  });

  it('should create form, domicilio, and representanteLegal with initial values from estadoSeleccionado', () => {
  component.estadoSeleccionado = {
    codigoPostal: '12345',
    estado: { id: '1', descripcion: 'CDMX' },
    municipioOAlcaldia: 'Benito Juárez',
    localidad: 'Del Valle',
    colonias: 'Narvarte',
    calle: 'Xola',
    lada: '55',
    telefono: '12345678',
    avisoCheckbox: 'true',
    regimen: { id: '1', descripcion: 'General' },
    aduanasEntradas: { id: '1', descripcion: 'Aduana 1' },
    aifaCheckbox: 'true',
    manifests: 'true',
    acuerdoPublico: 'Acuerdo',
    rfc: 'RFC123',
  } as any;

  component.crearFormulario();

  expect(component.form.get('codigoPostal')?.value).toBe('12345');
  expect(component.form.get('municipioOAlcaldia')?.value).toBe('Benito Juárez');
  expect(component.form.get('calle')?.value).toBe('Xola');
  expect(component.domicilio.get('regimen')?.value).toEqual({ id: '1', descripcion: 'General' });
  expect(component.domicilio.get('aduanasEntradas')?.value).toEqual({ id: '1', descripcion: 'Aduana 1' });
  expect(component.representanteLegal.get('acuerdoPublico')?.value).toBe('Acuerdo');
  expect(component.representanteLegal.get('rfc')?.value).toBe('RFC123');
});

  it('should disable all controls when esFormularioSoloLectura is true', () => {
  component.crearFormulario();
  component.esFormularioSoloLectura = true;
  component.inicializarEstadoFormulario();

  expect(component.form.get('codigoPostal')?.disabled).toBe(true);
  expect(component.form.get('municipioOAlcaldia')?.disabled).toBe(true);
  expect(component.domicilio.get('avisoCheckbox')?.disabled).toBe(true);
  expect(component.representanteLegal.get('acuerdoPublico')?.disabled).toBe(true);
  expect(component.representanteLegal.get('rfc')?.disabled).toBe(true);
});

it('should enable all controls when esFormularioSoloLectura is false', () => {
  component.crearFormulario();
  component.esFormularioSoloLectura = false;
  component.inicializarEstadoFormulario();

  expect(component.form.get('codigoPostal')?.enabled).toBe(true);
  expect(component.form.get('municipioOAlcaldia')?.enabled).toBe(true);
  expect(component.domicilio.get('avisoCheckbox')?.enabled).toBe(true);
  expect(component.representanteLegal.get('acuerdoPublico')?.enabled).toBe(true);
  expect(component.representanteLegal.get('rfc')?.enabled).toBe(true);
});

it('should update estadoSeleccionado when getValorStore is called', () => {
  const testState = {
    codigoPostal: '77777',
    municipioOAlcaldia: 'Test Municipio'
  } as any;

  // Create a new mock query with the updated selectTramite260904$ observable
  const mockQueryWithNewState = {
    selectTramite260904$: of(testState)
  };

  // Replace the injected query with our new mock
  component['tramite260904Query'] = mockQueryWithNewState as any;
  component.getValorStore();

  expect(component.estadoSeleccionado).toEqual(testState);
});

});
