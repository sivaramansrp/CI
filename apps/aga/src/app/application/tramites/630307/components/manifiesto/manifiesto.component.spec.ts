import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ManifiestoComponent } from './manifiesto.component';
import { Tramite630307Store } from '../../estados/tramite630307.store';
import { Tramite630307Query } from '../../estados/tramite630307.query';
import { of, Subject } from 'rxjs';

describe('ManifiestoComponent', () => {
  let component: ManifiestoComponent;
  let fixture: ComponentFixture<ManifiestoComponent>;
  let mockStore: jest.Mocked<Tramite630307Store>;
  let mockQuery: jest.Mocked<Tramite630307Query>;

  beforeEach(async () => {
    mockStore = {
      setTramite630307State: jest.fn(),
    } as any;

    mockQuery = {
      selectTramite630307State$: of({
        declaracion: 'Acepto los términos',
      }),
    } as any;

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ManifiestoComponent],
      providers: [
        FormBuilder,
        { provide: Tramite630307Store, useValue: mockStore },
        { provide: Tramite630307Query, useValue: mockQuery },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ManifiestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('debería llamar a getValorStore e inizializarFormulario', () => {
      jest.spyOn(component, 'getValorStore');
      jest.spyOn(component, 'inizializarFormulario');

      component.ngOnInit();

      expect(component.getValorStore).toHaveBeenCalled();
      expect(component.inizializarFormulario).toHaveBeenCalled();
    });
  });

  describe('inizializarFormulario', () => {
    it('debería inicializar el formulario con valores y validaciones', () => {
      component.inizializarFormulario();

      expect(component.manifiestoFormulario.get('declaracion')?.value).toBe('Acepto los términos');
      expect(component.manifiestoFormulario.get('declaracion')?.validator).toBeTruthy();
    });
  });

  describe('setValorStore', () => {
    it('debería actualizar el estado del store con el valor del formulario', () => {
      component.inizializarFormulario();
      component.manifiestoFormulario.get('declaracion')?.setValue('Nueva declaración');

      component.setValorStore(component.manifiestoFormulario, 'declaracion');

      expect(mockStore.setTramite630307State).toHaveBeenCalledWith({
        declaracion: 'Nueva declaración',
      });
    });
  });

  describe('getValorStore', () => {
    it('debería obtener el estado del store y asignarlo a estadoSeleccionado', () => {
      component.getValorStore();

      expect(component.estadoSeleccionado).toEqual({
        declaracion: 'Acepto los términos',
      });
    });
  });

  describe('ngOnDestroy', () => {
    it('debería completar el observable destroyed$', () => {
      const destroyedSpy = jest.spyOn(component['destroyed$'], 'next');
      const completeSpy = jest.spyOn(component['destroyed$'], 'complete');

      component.ngOnDestroy();

      expect(destroyedSpy).toHaveBeenCalled();
      expect(completeSpy).toHaveBeenCalled();
    });
  });
});
