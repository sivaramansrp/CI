import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MercanciasComponent } from './mercancias.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Tramite250101Store } from '../../estados/tramite250101.store';
import { Tramite250101Query } from '../../estados/tramite250101.query';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('MercanciasComponent', () => {
  let component: MercanciasComponent;
  let fixture: ComponentFixture<MercanciasComponent>;
  let mockStore: any;
  let mockQuery: any;

  const mockSolicitudState = {
    descripcion: 1,
    fraccion: 1,
    arancelaria: '1234',
    cantidad: 100,
    medida: 2,
    genero: 3,
    especie: 2,
    comun: 1,
    origen: 1,
    procedencia: 2
  };

  beforeEach(async () => {
    mockStore = {
      setDescripcion: jest.fn(),
      setFraccion: jest.fn(),
      setArancelaria: jest.fn(),
      setCantidad: jest.fn(),
      setMedida: jest.fn(),
      setGenero: jest.fn(),
      setEspecie: jest.fn(),
      setComun: jest.fn(),
      setOrigen: jest.fn(),
      setProcedencia: jest.fn()
    };

    mockQuery = {
      selectSolicitud$: of(mockSolicitudState)
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,MercanciasComponent],
      declarations: [],
      providers: [
        FormBuilder,
        { provide: Tramite250101Store, useValue: mockStore },
        { provide: Tramite250101Query, useValue: mockQuery }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(MercanciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle the mercancias modal', () => {
    expect(component.showMercanciasModal).toBe(false);
    component.mercancias();
    expect(component.showMercanciasModal).toBe(true);
  });

  it('should initialize the form with values from state', () => {
    const form = component.formMercancias;
    expect(form).toBeDefined();
    expect(form.get('descripcion')?.value).toBe(mockSolicitudState.descripcion);
    expect(form.get('arancelaria')?.disabled).toBe(true);
  });

  it('should push new detalle data on detalleData call', () => {
    component.detalleData();
    expect(component.fraccionData.length).toBeGreaterThan(0);
    expect(component.fraccionData[0].cantidad).toBe(mockSolicitudState.cantidad);
  });

  it('should update store value with setValoresStore', () => {
    const field = 'descripcion';
    component.setValoresStore(component.formMercancias, field, 'setDescripcion');
    expect(mockStore.setDescripcion).toHaveBeenCalledWith(mockSolicitudState.descripcion);
  });

  it('should toggle modal on detalleCancelar', () => {
    component.showMercanciasModal = true;
    component.detalleCancelar();
    expect(component.showMercanciasModal).toBe(false);
  });

  it('should push producto and close modal on detalleGuardar', () => {
    component.detalleGuardar();
    expect(component.producto.length).toBe(1);
    expect(component.showMercanciasModal).toBe(true);
  });

  it('should clean up on ngOnDestroy', () => {
    const spyNext = jest.spyOn(component['destroyNotifier$'], 'next');
    const spyComplete = jest.spyOn(component['destroyNotifier$'], 'complete');
    component.ngOnDestroy();
    expect(spyNext).toHaveBeenCalled();
    expect(spyComplete).toHaveBeenCalled();
  });
});
