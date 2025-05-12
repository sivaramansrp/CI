import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExencionImpuestosComponent } from './exencion-impuestos.component';
import { of, Subject } from 'rxjs';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ExencionImpuestosService } from '../services/exencion-impuestos.service';
import { Tramite103Store } from '../estados/tramite103.store';
import { Tramite103Query } from '../estados/tramite103.query';
import { ValidacionesFormularioService } from '@libs/shared/data-access-user/src';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Modal } from 'bootstrap';

jest.mock('bootstrap', () => ({
  Modal: jest.fn().mockImplementation(() => ({
    show: jest.fn(),
  })),
}));

describe('ExencionImpuestosComponent', () => {
  let component: ExencionImpuestosComponent;
  let fixture: ComponentFixture<ExencionImpuestosComponent>;
  let mockService: any;
  let mockStore: any;
  let mockQuery: any;

  beforeEach(async () => {
    mockService = {
      getAduana: jest.fn().mockReturnValue(of({ data: [] })),
      getDestinoMercancia: jest.fn().mockReturnValue(of({ data: [] })),
      getCondicionMercancia: jest.fn().mockReturnValue(of({ data: [] })),
      getUnidadMedida: jest.fn().mockReturnValue(of({ data: [] })),
      getAno: jest.fn().mockReturnValue(of({ data: [] })),
      getPais: jest.fn().mockReturnValue(of({ data: [] })),
      agregarMercancias: jest.fn().mockReturnValue(of({ success: true, datos: { tipoDeMercancia: 'tipo', usoEspecifico: 'uso', cantidad: 1, unidadMedida: 'kg', ano: 2022, modelo: 'modelo', marca: 'marca', serie: 'serie', condicionMercancia: 'bueno' } }))
    };

    mockStore = {
      setAduana: jest.fn(),
      setDestinoMercancia: jest.fn(),
      setCondicionMercancia: jest.fn(),
      setUnidadMedida: jest.fn(),
      setAno: jest.fn(),
      setPais: jest.fn(),
      setOrganismoPublico: jest.fn(),
      setVehiculo: jest.fn(),
      setDelMercancia: jest.fn(),
      setValorSeleccionado: jest.fn(),
      setNombre: jest.fn(),
    };

    mockQuery = {
      selectSolicitud$: of({})
    };

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [ReactiveFormsModule, ExencionImpuestosComponent],
      providers: [
        { provide: ExencionImpuestosService, useValue: mockService },
        { provide: Tramite103Store, useValue: mockStore },
        { provide: Tramite103Query, useValue: mockQuery },
        { provide: ValidacionesFormularioService, useValue: {} },
        FormBuilder
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ExencionImpuestosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize catalogs on ngOnInit', () => {
    component.ngOnInit();
    expect(mockService.getAduana).toHaveBeenCalled();
    expect(mockService.getDestinoMercancia).toHaveBeenCalled();
  });

  it('should open agregar mercancías modal', () => {
    const modalRef = { nativeElement: document.createElement('div') };
    component.modalElement = modalRef as any;
    component.abrirDialogoMercancias();
    expect(Modal).toHaveBeenCalled();
  });

  it('should open confirm modal when agregarMercanciasForm is valid', () => {
    const modalRef = { nativeElement: document.createElement('div') };
    component.confirmarModalElement = modalRef as any;
    component.modalElement = modalRef as any;

    component.agregarMercanciasForm = component.fb.group({
      datosMercancia: component.fb.group({
        tipoDeMercancia: ['tipo'],
        usoEspecifico: ['uso'],
        condicionMercancia: ['condicion'],
        unidadMedida: ['unidad'],
        vehiculo: ['vehiculo'],
        ano: [2022],
        cantidad: [5],
        marca: ['marca'],
        modelo: ['modelo'],
        serie: ['serie']
      })
    });

    component.agregarConfirmarModal();
    expect(Modal).toHaveBeenCalled();
  });

  it('should add mercancías and update table when form is valid', () => {
    const closeSpy = jest.fn();
    component.closeModal = { nativeElement: { click: closeSpy } } as any;

    component.agregarMercanciasForm = component.fb.group({
      datosMercancia: component.fb.group({
        tipoDeMercancia: ['tipo'],
        usoEspecifico: ['uso'],
        condicionMercancia: ['condicion'],
        unidadMedida: ['unidad'],
        vehiculo: ['vehiculo'],
        ano: [2022],
        cantidad: [5],
        marca: ['marca'],
        modelo: ['modelo'],
        serie: ['serie']
      })
    });

    component.agregarMercancias();

    expect(mockService.agregarMercancias).toHaveBeenCalled();
    expect(mockStore.setDelMercancia).toHaveBeenCalled();
  });

  it('should set value in store using setValoresStore', () => {
    const dummyForm = component.fb.group({ nombre: ['John'] });
    component.setValoresStore(dummyForm, 'nombre', 'setNombre');
    expect(mockStore.setNombre).toHaveBeenCalledWith('John');
  });

  it('should call correct store method when cambiarRadio is invoked', () => {
    component.cambiarRadio('sí');
    expect(mockStore.setValorSeleccionado).toHaveBeenCalledWith('sí');
  });

  it('should call OnDestroy and cleanup', () => {
    const nextSpy = jest.spyOn(component['destroyNotifier$'], 'next');
    const completeSpy = jest.spyOn(component['destroyNotifier$'], 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
