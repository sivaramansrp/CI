import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DomicilioComponent } from './domicilio-establecimiento.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Tramite260215Store } from '../../estados/tramites/tramite260215.store';
import { Tramite260215Query } from '../../estados/queries/tramite260215.query';
import { of, Subject } from 'rxjs';
import { CrosslistComponent } from '@libs/shared/data-access-user/src';
import { QueryList } from '@angular/core';

describe('DomicilioComponent', () => {
  let component: DomicilioComponent;
  let fixture: ComponentFixture<DomicilioComponent>;
  let tramite260215Store: jest.Mocked<Tramite260215Store>;
  let tramite260215Query: jest.Mocked<Tramite260215Query>;

  beforeEach(async () => {
    tramite260215Store = {
      setCodigoPostal: jest.fn(),
      setEstado: jest.fn(),
      setMunicipio: jest.fn(),
    } as unknown as jest.Mocked<Tramite260215Store>;

    tramite260215Query = {
      selectSolicitud$: of({
        codigoPostal: '12345',
        estado: 'Estado1',
        muncipio: 'Municipio1',
        localidad: 'Localidad1',
        colonia: 'Colonia1',
        calle: 'Calle1',
        lada: '123',
        telefono: '5555555555',
        avisoCheckbox: false,
        licenciaSanitaria: 'Licencia1',
        regimen: 'Regimen1',
        aduanasEntradas: ['Aduana1'],
        numeroPermiso: 'Permiso1',
      }),
    } as unknown as jest.Mocked<Tramite260215Query>;

    await TestBed.configureTestingModule({
      imports: [
        DomicilioComponent,
        ReactiveFormsModule,
        HttpClientTestingModule,
      ], // Fixed: Moved DomicilioComponent to imports
      providers: [
        { provide: Tramite260215Store, useValue: tramite260215Store },
        { provide: Tramite260215Query, useValue: tramite260215Query },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DomicilioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values from the store', () => {
    expect(component.domicilio.value).toEqual({
      codigoPostal: '12345',
      estado: 'Estado1',
      muncipio: 'Municipio1',
      localidad: 'Localidad1',
      colonia: 'Colonia1',
      calle: 'Calle1',
      lada: '123',
      telefono: '5555555555',
      avisoCheckbox: false,
      licenciaSanitaria: 'Licencia1',
      regimen: 'Regimen1',
      aduanasEntradas: ['Aduana1'],
      numeroPermiso: 'Permiso1',
    });
  });

  it('should toggle colapsable state when mostrar_colapsable is called', () => {
    expect(component.colapsable).toBe(false);
    component.mostrar_colapsable();
    expect(component.colapsable).toBe(true);
  });

  it('should toggle colapsableDuos state when mostrar_colapsableDuos is called', () => {
    expect(component.colapsableDuos).toBe(false);
    component.mostrar_colapsableDuos();
    expect(component.colapsableDuos).toBe(true);
  });

  it('should toggle colapsableTres state when mostrar_colapsableTres is called', () => {
    expect(component.colapsableTres).toBe(false);
    component.mostrar_colapsableTres();
    expect(component.colapsableTres).toBe(true);
  });

  it('should disable licenciaSanitaria when avisoCheckbox is checked', () => {
    const checkboxEvent = { target: { checked: true } } as unknown as Event;
    component.onAvisoCheckboxChange(checkboxEvent);
    expect(component.domicilio.get('licenciaSanitaria')?.disabled).toBe(true);
  });

  it('should enable licenciaSanitaria when avisoCheckbox is unchecked', () => {
    const checkboxEvent = { target: { checked: false } } as unknown as Event;
    component.onAvisoCheckboxChange(checkboxEvent);
    expect(component.domicilio.get('licenciaSanitaria')?.enabled).toBe(true);
  });

  it('should call setValoresStore with correct arguments', () => {
    component.setValoresStore(
      component.domicilio,
      'codigoPostal',
      'setCodigoPostal'
    );
    expect(tramite260215Store.setCodigoPostal).toHaveBeenCalledWith('12345');
  });

  it('should fetch estado list on obtenerEstadoList', () => {
    jest
      .spyOn(component['httpServicios'], 'get')
      .mockReturnValue(of({ data: [{ id: 1, nombre: 'Estado1' }] }));
    component.obtenerEstadoList();
    expect(component.estado).toEqual([{ id: 1, nombre: 'Estado1' }]);
  });

  it('should fetch nicoTablaDatos on obtenerTablaDatos', () => {
    jest
      .spyOn(component['httpServicios'], 'get')
      .mockReturnValue(of({ data: [{ id: 1, nombre: 'Nico1' }] }));
    component.obtenerTablaDatos();
    expect(component.nicoTablaDatos).toEqual([{ id: 1, nombre: 'Nico1' }]);
  });

  it('should fetch mercanciasTablaDatos on obtenerMercanciasDatos', () => {
    jest
      .spyOn(component['httpServicios'], 'get')
      .mockReturnValue(of({ data: [{ id: 1, nombre: 'Mercancia1' }] }));
    component.obtenerMercanciasDatos();
    expect(component.mercanciasTablaDatos).toEqual([
      { id: 1, nombre: 'Mercancia1' },
    ]);
  });

  it('should complete destroyNotifier$ on ngOnDestroy', () => {
    const destroyNotifierSpy = jest.spyOn(
      component['destroyNotifier$'],
      'complete'
    );
    component.ngOnDestroy();
    expect(destroyNotifierSpy).toHaveBeenCalled();
  });

  it('should call agregar method of CrosslistComponent on paisDeProcedenciaBotones[0].funcion', () => {
    const crossListSpy = {
      agregar: jest.fn(),
    } as unknown as CrosslistComponent;
    component.crossList = new QueryList<CrosslistComponent>();
    component.crossList.reset([crossListSpy]);
    component.paisDeProcedenciaBotones[0].funcion();
    expect(crossListSpy.agregar).toHaveBeenCalledWith('t');
  });
});
