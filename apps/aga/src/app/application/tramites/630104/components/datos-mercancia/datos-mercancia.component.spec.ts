import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';

import { DatosMercanciaComponent } from './datos-mercancia.component';
import { Tramite630104Store } from '../../estados/tramites/tramite630104.store';
import { Tramite630104Query } from '../../estados/queries/tramite630104.query';

describe('DatosMercanciaComponent', () => {
  let component: DatosMercanciaComponent;
  let fixture: ComponentFixture<DatosMercanciaComponent>;
  let mockStore: jest.Mocked<Tramite630104Store>;
  let mockQuery: jest.Mocked<Tramite630104Query>;

  beforeEach(async () => {
    mockStore = {
      setTramite630104State: jest.fn(),
    } as unknown as jest.Mocked<Tramite630104Store>;

    mockQuery = {
      selectTramite630104State$: of({
        descripcionMercancia: 'Mercancía de prueba',
        motivo: 'Motivo de prueba',
        listaMercancia: 'Lista de prueba',
      }),
    } as unknown as jest.Mocked<Tramite630104Query>;

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [ReactiveFormsModule,DatosMercanciaComponent],
      providers: [
        { provide: Tramite630104Store, useValue: mockStore },
        { provide: Tramite630104Query, useValue: mockQuery },
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

  it('should call setTramite630104State when establecerCambioDeValor is called', () => {
    const event = { campo: 'descripcionMercancia', valor: 'Nueva descripción' };
    component.establecerCambioDeValor(event);

    expect(mockStore.setTramite630104State).toHaveBeenCalledWith(
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