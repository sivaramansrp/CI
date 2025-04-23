import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';

import { DatosMercanciaComponent } from './datos-mercancia.component';
import { Tramite630307Store } from '../../estados/tramite630307.store';
import { Tramite630307Query } from '../../estados/tramite630307.query';

describe('DatosMercanciaComponent', () => {
  let component: DatosMercanciaComponent;
  let fixture: ComponentFixture<DatosMercanciaComponent>;
  let mockStore: jest.Mocked<Tramite630307Store>;
  let mockQuery: jest.Mocked<Tramite630307Query>;

  beforeEach(async () => {
    mockStore = {
      setTramite630307State: jest.fn(),
    } as unknown as jest.Mocked<Tramite630307Store>;

    mockQuery = {
      selectTramite630307State$: of({
        descripcionMercancia: 'Mercancía de prueba',
        motivo: 'Motivo de prueba',
        listaMercancia: 'Lista de prueba',
      }),
    } as unknown as jest.Mocked<Tramite630307Query>;

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [ReactiveFormsModule,DatosMercanciaComponent],
      providers: [
        { provide: Tramite630307Store, useValue: mockStore },
        { provide: Tramite630307Query, useValue: mockQuery },
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
     // Agregue aquí los valores predeterminados esperados para los controles de formulario
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

  it('should call setTramite630307State when establecerCambioDeValor is called', () => {
    const event = { campo: 'descripcionMercancia', valor: 'Nueva descripción' };
    component.establecerCambioDeValor(event);

    expect(mockStore.setTramite630307State).toHaveBeenCalledWith(
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