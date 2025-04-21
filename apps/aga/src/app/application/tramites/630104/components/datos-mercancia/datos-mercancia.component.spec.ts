import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';

import { DatosMercanciaComponent } from './datos-mercancia.component';
import { Tramite630303Store } from '../../estados/tramite630303.store';
import { Tramite630303Query } from '../../estados/tramite630303.query';

describe('DatosMercanciaComponent', () => {
  let component: DatosMercanciaComponent;
  let fixture: ComponentFixture<DatosMercanciaComponent>;
  let mockStore: jest.Mocked<Tramite630303Store>;
  let mockQuery: jest.Mocked<Tramite630303Query>;

  beforeEach(async () => {
    mockStore = {
      setTramite630303State: jest.fn(),
    } as unknown as jest.Mocked<Tramite630303Store>;

    mockQuery = {
      selectTramite630303State$: of({
        descripcionMercancia: 'Mercancía de prueba',
        motivo: 'Motivo de prueba',
        listaMercancia: 'Lista de prueba',
      }),
    } as unknown as jest.Mocked<Tramite630303Query>;

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [ReactiveFormsModule,DatosMercanciaComponent],
      providers: [
        { provide: Tramite630303Store, useValue: mockStore },
        { provide: Tramite630303Query, useValue: mockQuery },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosMercanciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    component.inicializarFormulario();
    expect(component.datosMercancia.value).toEqual({
      // Add expected default values for the form controls here
    });
  });

  it('should fetch the state from the store and set estadoSeleccionado', () => {
    component.getValorStore();
    expect(component.estadoSeleccionado).toEqual({
      descripcionMercancia: 'Mercancía de prueba',
      motivo: 'Motivo de prueba',
      listaMercancia: 'Lista de prueba',
    });
  });

  it('should call setTramite630303State when establecerCambioDeValor is called', () => {
    const event = { campo: 'descripcionMercancia', valor: 'Nueva descripción' };
    component.establecerCambioDeValor(event);

    expect(mockStore.setTramite630303State).toHaveBeenCalledWith(
      event.campo,
      event.valor
    );
  });

  it('should clean up subscriptions on ngOnDestroy', () => {
    const destroyedSpy = jest.spyOn(component['destroyed$'], 'next');
    const completeSpy = jest.spyOn(component['destroyed$'], 'complete');

    component.ngOnDestroy();

    expect(destroyedSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});