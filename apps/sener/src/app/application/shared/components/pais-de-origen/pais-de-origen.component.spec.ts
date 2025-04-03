import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { PaisDeOrigenComponent } from './pais-de-origen.component';
import { Catalogo } from '@libs/shared/data-access-user/src/core/models/shared/catalogos.model';
import { EventEmitter } from '@angular/core';

describe('PaisDeOrigenComponent', () => { 
  let component: PaisDeOrigenComponent;
  let fixture: ComponentFixture<PaisDeOrigenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [PaisDeOrigenComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PaisDeOrigenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('Inputs', () => {
    it('should accept paisForm as an input', () => {
      const mockForm = new FormGroup({
        campo1: new FormControl('valor1'),
      });
      component.paisForm = mockForm;
      expect(component.paisForm).toBe(mockForm);
    });

    it('should accept elementosDeBloque as an input', () => {
      const mockElementosDeBloque: Catalogo[] = [
        { id: 1, descripcion: 'País 1' },
        { id: 2, descripcion: 'País 2' },
      ];
      component.elementosDeBloque = mockElementosDeBloque;
      expect(component.elementosDeBloque).toBe(mockElementosDeBloque);
    });

    it('should accept paisesPorBloque as an input', () => {
      const mockPaisesPorBloque: Catalogo[] = [
        { id: 1, descripcion: 'País 1' },
        { id: 2, descripcion: 'País 2' },
      ];
      component.paisesPorBloque = mockPaisesPorBloque;
      expect(component.paisesPorBloque).toBe(mockPaisesPorBloque);
    });

    it('should accept selectRangoDias as an input', () => {
      const mockSelectRangoDias = ['Día 1', 'Día 2'];
      component.selectRangoDias = mockSelectRangoDias;
      expect(component.selectRangoDias).toBe(mockSelectRangoDias);
    });
  });

  describe('Outputs', () => {
    it('should emit bloqueCambiar with the correct value', () => {
      jest.spyOn(component.bloqueCambiar, 'emit');
      const mockEvent = {
        target: { value: '2' },
      } as unknown as Event;

      component.enCambioDeBloque(mockEvent);

      expect(component.bloqueCambiar.emit).toHaveBeenCalledWith(2);
    });

    it('should emit setValoresStoreEvent with the correct payload', () => {
      jest.spyOn(component.setValoresStoreEvent, 'emit');
      const mockForm = new FormGroup({
        campo1: new FormControl('valor1'),
      });
      const mockCampo = 'campo1';
      const mockMetodoNombre = 'metodo1';

      component.setValoresStore(mockForm, mockCampo, mockMetodoNombre);

      expect(component.setValoresStoreEvent.emit).toHaveBeenCalledWith({
        form: mockForm,
        campo: mockCampo,
        metodoNombre: mockMetodoNombre,
      });
    });
  });

  describe('ngOnChanges', () => {
    it('should update selectRangoDias when paisesPorBloque changes', () => {
      const mockPaisesPorBloque: Catalogo[] = [
        { id: 1, descripcion: 'País 1' },
        { id: 2, descripcion: 'País 2' },
      ];
      component.paisesPorBloque = mockPaisesPorBloque;

      component.ngOnChanges({
        paisesPorBloque: {
          currentValue: mockPaisesPorBloque,
          previousValue: [],
          firstChange: true,
          isFirstChange: () => true,
        },
      });

      expect(component.selectRangoDias).toEqual(['País 1', 'País 2']);
    });
  });

  describe('campoDeBotones', () => {
    it('should call agregar method of CrosslistComponent when "Agregar" button is clicked', () => {
      component.crosslistComponent = {
        agregar: jest.fn(),
        quitar: jest.fn(),
      } as unknown as any;

      component.campoDeBotones[0].funcion();

      expect(component.crosslistComponent.agregar).toHaveBeenCalledWith('');
    });

    it('should call agregar method of CrosslistComponent with "t" when "Agregar todos" button is clicked', () => {
      component.crosslistComponent = {
        agregar: jest.fn(),
        quitar: jest.fn(),
      } as unknown as any;

      component.campoDeBotones[1].funcion();

      expect(component.crosslistComponent.agregar).toHaveBeenCalledWith('t');
    });

    it('should call agregar method of CrosslistComponent when "Eliminar" button is clicked', () => {
      component.crosslistComponent = {
        agregar: jest.fn(),
        quitar: jest.fn(),
      } as unknown as any;

      component.campoDeBotones[2].funcion();

      expect(component.crosslistComponent.agregar).toHaveBeenCalledWith('');
    });

    it('should call quitar method of CrosslistComponent when "Eliminar todos" button is clicked', () => {
      component.crosslistComponent = {
        agregar: jest.fn(),
        quitar: jest.fn(),
      } as unknown as any;

      component.campoDeBotones[3].funcion();

      expect(component.crosslistComponent.quitar).toHaveBeenCalledWith('');
    });
  });
});