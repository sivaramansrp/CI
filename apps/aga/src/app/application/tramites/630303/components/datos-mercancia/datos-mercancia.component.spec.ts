import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { DatosMercanciaComponent } from './datos-mercancia.component';
import { Tramite630303Store } from '../../estados/tramite630303.store';
import { Tramite630303Query } from '../../estados/tramite630303.query';
import { of } from 'rxjs';

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
        campo: 'valor',
      }),
    } as unknown as jest.Mocked<Tramite630303Query>;

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,DatosMercanciaComponent],
      declarations: [],
      providers: [
        FormBuilder,
        { provide: Tramite630303Store, useValue: mockStore },
        { provide: Tramite630303Query, useValue: mockQuery },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosMercanciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    const inicializarFormularioSpy = jest.spyOn(component, 'inicializarFormulario');
    const getValorStoreSpy = jest.spyOn(component, 'getValorStore');

    component.ngOnInit();

    expect(inicializarFormularioSpy).toHaveBeenCalled();
    expect(getValorStoreSpy).toHaveBeenCalled();
  });

  it('should initialize the form with default values', () => {
    component.inicializarFormulario();
    expect(component.datosMercancia).toBeTruthy();
  });

  it('should fetch the current state from the store', () => {
    component.getValorStore();
    expect(component.estadoSeleccionado).toEqual({ campo: 'valor' });
  });

  it('should update the store when establecerCambioDeValor is called', () => {
    const mockEvent = { campo: 'campoPrueba', valor: 'valorPrueba' };

    component.establecerCambioDeValor(mockEvent);

    expect(mockStore.setTramite630303State).toHaveBeenCalledWith('campoPrueba', 'valorPrueba');
  });

  it('should clean up subscriptions on ngOnDestroy', () => {
    const destroyedSpy = jest.spyOn((component as any).destroyed$, 'next');
    const completeSpy = jest.spyOn((component as any).destroyed$, 'complete');

    component.ngOnDestroy();

    expect(destroyedSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});