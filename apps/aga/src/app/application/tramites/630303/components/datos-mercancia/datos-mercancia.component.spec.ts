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
    expect(component.datosMercancia.value).toEqual({
      descripcionMercancia: 'Mercancía de prueba',
      motivo: 'Motivo de prueba',
      listaMercancia: 'Lista de prueba',
    });
  });

  it('should update descripcionMercancia in the form and store when setValorStore is called', () => {
    const newValue = 'Nueva descripción';
    component.datosMercancia.patchValue({ descripcionMercancia: newValue });

    component.setValorStore(component.datosMercancia, 'descripcionMercancia');

    expect(mockStore.setTramite630303State).toHaveBeenCalledWith({
      descripcionMercancia: newValue,
    });
  });

  it('should update motivo in the form and store when setValorStore is called', () => {
    const newValue = 'Nuevo motivo';
    component.datosMercancia.patchValue({ motivo: newValue });

    component.setValorStore(component.datosMercancia, 'motivo');

    expect(mockStore.setTramite630303State).toHaveBeenCalledWith({
      motivo: newValue,
    });
  });

  it('should update listaMercancia in the form and store when setValorStore is called', () => {
    const newValue = 'Nueva lista';
    component.datosMercancia.patchValue({ listaMercancia: newValue });

    component.setValorStore(component.datosMercancia, 'listaMercancia');

    expect(mockStore.setTramite630303State).toHaveBeenCalledWith({
      listaMercancia: newValue,
    });
  });

  it('should clean up subscriptions on ngOnDestroy', () => {
    const destroyedSpy = jest.spyOn(component['destroyed$'], 'next');
    const completeSpy = jest.spyOn(component['destroyed$'], 'complete');

    component.ngOnDestroy();

    expect(destroyedSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});