import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DomicilioComponent } from './domicilio-establecimiento.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Tramite260215Store } from '../../estados/tramites/tramite260215.store';
import { Tramite260215Query } from '../../estados/queries/tramite260215.query';
import { of, Subject } from 'rxjs';
import { CrosslistComponent } from '@libs/shared/data-access-user/src';
import { QueryList } from '@angular/core';
import { fakeAsync, tick } from '@angular/core/testing';

type MockHttpServicios = {
  get: jest.Mock;
};

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
    });

    fixture = TestBed.createComponent(DomicilioComponent);
    component = fixture.componentInstance;
    // Mock the httpServicios property
    (component as any).httpServicios = { get: jest.fn() } as MockHttpServicios;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar el formulario con valores predeterminados del store', () => {
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
    });
  });

  it('debería alternar el estado de colapsable cuando se llama mostrar_colapsable', () => {
    expect(component.colapsable).toBe(false);
    component.mostrar_colapsable();
    expect(component.colapsable).toBe(true);
  });

  it('debería alternar el estado de colapsableDuos cuando se llama mostrar_colapsableDuos', () => {
    expect(component.colapsableDuos).toBe(false);
    component.mostrar_colapsableDuos();
    expect(component.colapsableDuos).toBe(true);
  });

  it('debería alternar el estado de colapsableTres cuando se llama mostrar_colapsableTres', () => {
    expect(component.colapsableTres).toBe(false);
    component.mostrar_colapsableTres();
    expect(component.colapsableTres).toBe(true);
  });

  it('debería deshabilitar licenciaSanitaria cuando avisoCheckbox está marcado', () => {
    const checkboxEvent = { target: { checked: true } } as unknown as Event;
    component.onAvisoCheckboxChange(checkboxEvent);
    expect(component.domicilio.get('licenciaSanitaria')?.disabled).toBe(true);
  });

  it('debería habilitar licenciaSanitaria cuando avisoCheckbox está desmarcado', () => {
    const checkboxEvent = { target: { checked: false } } as unknown as Event;
    component.onAvisoCheckboxChange(checkboxEvent);
    expect(component.domicilio.get('licenciaSanitaria')?.enabled).toBe(true);
  });

  it('debería llamar setValoresStore con los argumentos correctos', () => {
    component.setValoresStore(
      component.domicilio,
      'codigoPostal',
      'setCodigoPostal'
    );
    expect(tramite260215Store.setCodigoPostal).toHaveBeenCalledWith('12345');
  });

  it('debería completar destroyNotifier$ al llamar ngOnDestroy', () => {
    const destroyNotifierSpy = jest.spyOn(
      component['destroyNotifier$'],
      'complete'
    );
    component.ngOnDestroy();
    expect(destroyNotifierSpy).toHaveBeenCalled();
  });

  it('debería llamar al método agregar de CrosslistComponent en paisDeProcedenciaBotones[0].funcion', () => {
    const crossListSpy = {
      agregar: jest.fn(),
    } as unknown as CrosslistComponent;
    component.crossList = new QueryList<CrosslistComponent>();
    component.crossList.reset([crossListSpy]);
    component.paisDeProcedenciaBotones[0].funcion();
    expect(crossListSpy.agregar).toHaveBeenCalledWith('t');
  });

  it('debería llamar agregar("t") en paisDeProcedenciaBotonesTres[0].funcion', () => {
    const crossListSpy = {
      agregar: jest.fn(),
      quitar: jest.fn(),
    } as any;
    component.crossList = new QueryList<any>();
    component.crossList.reset([{}, {}, crossListSpy]);
    component.paisDeProcedenciaBotonesTres[0].funcion();
    expect(crossListSpy.agregar).toHaveBeenCalledWith('t');
  });

  it('debería llamar agregar("") en paisDeProcedenciaBotonesTres[1].funcion', () => {
    const crossListSpy = {
      agregar: jest.fn(),
      quitar: jest.fn(),
    } as any;
    component.crossList = new QueryList<any>();
    component.crossList.reset([{}, {}, crossListSpy]);
    component.paisDeProcedenciaBotonesTres[1].funcion();
    expect(crossListSpy.agregar).toHaveBeenCalledWith('');
  });

  it('debería llamar quitar("") en paisDeProcedenciaBotonesTres[2].funcion', () => {
    const crossListSpy = {
      agregar: jest.fn(),
      quitar: jest.fn(),
    } as any;
    component.crossList = new QueryList<any>();
    component.crossList.reset([{}, {}, crossListSpy]);
    component.paisDeProcedenciaBotonesTres[2].funcion();
    expect(crossListSpy.quitar).toHaveBeenCalledWith('');
  });

  it('debería llamar quitar("t") en paisDeProcedenciaBotonesTres[3].funcion', () => {
    const crossListSpy = {
      agregar: jest.fn(),
      quitar: jest.fn(),
    } as any;
    component.crossList = new QueryList<any>();
    component.crossList.reset([{}, {}, crossListSpy]);
    component.paisDeProcedenciaBotonesTres[3].funcion();
    expect(crossListSpy.quitar).toHaveBeenCalledWith('t');
  });
});
