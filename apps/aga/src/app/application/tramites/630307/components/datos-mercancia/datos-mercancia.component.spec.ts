import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { DatosMercanciaComponent } from './datos-mercancia.component';
import { Tramite630307Store } from '../../estados/tramite630307.store';
import { Tramite630307Query } from '../../estados/tramite630307.query';
import { of, Subject } from 'rxjs';

describe('DatosMercanciaComponent', () => {
  let component: DatosMercanciaComponent;
  let fixture: ComponentFixture<DatosMercanciaComponent>;
  let mockStore: jest.Mocked<Tramite630307Store>;
  let mockQuery: jest.Mocked<Tramite630307Query>;

  beforeEach(async () => {
    mockStore = {
      setTramite630307State: jest.fn(),
    } as any;

    mockQuery = {
      selectTramite630307State$: of({
        marca: 'Toyota',
        modelo: 'Corolla',
        numeroDeSerie: '123456',
        numeroDeMotor: '78910',
        descripcionMercancia: 'Vehículo',
        motivo: 'Importación temporal',
      }),
    } as any;

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [DatosMercanciaComponent],
      providers: [
        FormBuilder,
        { provide: Tramite630307Store, useValue: mockStore },
        { provide: Tramite630307Query, useValue: mockQuery },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosMercanciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call getValorStore and inicializarFormulario', () => {
      jest.spyOn(component, 'getValorStore');
      jest.spyOn(component, 'inicializarFormulario');

      component.ngOnInit();

      expect(component.getValorStore).toHaveBeenCalled();
      expect(component.inicializarFormulario).toHaveBeenCalled();
    });
  });

  describe('inicializarFormulario', () => {
    it('should initialize the form with default values and validations', () => {
      component.inicializarFormulario();

      expect(component.datosMercancia.get('marca')?.value).toBe('Toyota');
      expect(component.datosMercancia.get('modelo')?.value).toBe('Corolla');
      expect(component.datosMercancia.get('numeroDeSerie')?.value).toBe('123456');
      expect(component.datosMercancia.get('numeroDeMotor')?.value).toBe('78910');
      expect(component.datosMercancia.get('descripcionMercancia')?.value).toBe('Vehículo');
      expect(component.datosMercancia.get('motivo')?.value).toBe('Importación temporal');
    });
  });

  describe('setValorStore', () => {
    it('should update the store with the form control value', () => {
      component.inicializarFormulario();
      component.datosMercancia.get('marca')?.setValue('Honda');

      component.setValorStore(component.datosMercancia, 'marca');

      expect(mockStore.setTramite630307State).toHaveBeenCalledWith({
        marca: 'Honda',
      });
    });
  });

  describe('getValorStore', () => {
    it('should subscribe to the store and set estadoSeleccionado', () => {
      component.getValorStore();

      expect(component.estadoSeleccionado).toEqual({
        marca: 'Toyota',
        modelo: 'Corolla',
        numeroDeSerie: '123456',
        numeroDeMotor: '78910',
        descripcionMercancia: 'Vehículo',
        motivo: 'Importación temporal',
      });
    });
  });

  describe('ngOnDestroy', () => {
    it('should complete the destroyed$ subject', () => {
      const destroyedSpy = jest.spyOn(component['destroyed$'], 'next');
      const completeSpy = jest.spyOn(component['destroyed$'], 'complete');

      component.ngOnDestroy();

      expect(destroyedSpy).toHaveBeenCalled();
      expect(completeSpy).toHaveBeenCalled();
    });
  });
});
