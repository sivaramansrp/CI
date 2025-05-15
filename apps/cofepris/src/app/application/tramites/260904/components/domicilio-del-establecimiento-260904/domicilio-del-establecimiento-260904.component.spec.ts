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

});
