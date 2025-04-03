import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { RepresentacionComponent } from './representacion.component';
import { Catalogo } from '@libs/shared/data-access-user/src/core/models/shared/catalogos.model';
import { EventEmitter } from '@angular/core';

describe('RepresentacionComponent', () => {
  let component: RepresentacionComponent;
  let fixture: ComponentFixture<RepresentacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [RepresentacionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RepresentacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('Inputs', () => {
    it('should accept frmRepresentacionForm as an input', () => {
      const mockForm = new FormGroup({
        campo1: new FormControl('valor1'),
      });
      component.frmRepresentacionForm = mockForm;
      expect(component.frmRepresentacionForm).toBe(mockForm);
    });

    it('should accept estado as an input', () => {
      const mockEstado: Catalogo[] = [
        { id: 1, descripcion: 'Estado 1' },
        { id: 2, descripcion: 'Estado 2' },
      ];
      component.estado = mockEstado;
      expect(component.estado).toBe(mockEstado);
    });

    it('should accept representacionFederal as an input', () => {
      const mockRepresentacionFederal: Catalogo[] = [
        { id: 1, descripcion: 'Representación 1' },
        { id: 2, descripcion: 'Representación 2' },
      ];
      component.representacionFederal = mockRepresentacionFederal;
      expect(component.representacionFederal).toBe(mockRepresentacionFederal);
    });

    it('should accept TEXTOS as an input', () => {
      const mockTextos = { key: 'value', INSTRUCCIONES_REPRESENTACION_FEDERAL: 'some instruction' };
      component.TEXTOS = mockTextos;
      expect(component.TEXTOS).toBe(mockTextos);
    });
  });

  describe('Outputs', () => {
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
});