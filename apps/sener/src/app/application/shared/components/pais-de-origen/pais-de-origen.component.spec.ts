import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { PaisDeOrigenComponent } from './pais-de-origen.component';
import { Catalogo } from '@libs/shared/data-access-user/src/core/models/shared/catalogos.model';

describe('PaisDeOrigenComponent', () => {
  let component: PaisDeOrigenComponent;
  let fixture: ComponentFixture<PaisDeOrigenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, PaisDeOrigenComponent],
      declarations: [],
    }).compileComponents();

    fixture = TestBed.createComponent(PaisDeOrigenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('campoDeBotones', () => {
    beforeEach(() => {
      component.crosslistComponent = {
        agregar: jest.fn(),
        quitar: jest.fn(),
      } as unknown as any;
    });

    it('should call agregar method of CrosslistComponent when "Agregar" button is clicked', () => {
      component.campoDeBotones[0].funcion();
      expect(component.crosslistComponent.agregar).toHaveBeenCalledWith('');
    });

    it('should call agregar method of CrosslistComponent with "t" when "Agregar todos" button is clicked', () => {
      component.campoDeBotones[1].funcion();
      expect(component.crosslistComponent.agregar).toHaveBeenCalledWith('t');
    });

    it('should call agregar method of CrosslistComponent when "Eliminar" button is clicked', () => {
      component.campoDeBotones[2].funcion();
      expect(component.crosslistComponent.agregar).toHaveBeenCalledWith('');
    });

    it('should call quitar method of CrosslistComponent when "Eliminar todos" button is clicked', () => {
      component.campoDeBotones[3].funcion();
      expect(component.crosslistComponent.quitar).toHaveBeenCalledWith('');
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
      } as any);
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
});