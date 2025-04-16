import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { DatosRetornoAutorizacionComponent } from './datos-retorno-autorizacion.component';
import { RetornoImportacionTemporalService } from '../../services/retorno-importacion-temporal.service';
import { of, Subject } from 'rxjs';

describe('DatosRetornoAutorizacionComponent', () => {
  let component: DatosRetornoAutorizacionComponent;
  let fixture: ComponentFixture<DatosRetornoAutorizacionComponent>;
  let mockService: jest.Mocked<RetornoImportacionTemporalService>;

  beforeEach(async () => {
    mockService = {
      getAduanaDeIngreso: jest.fn().mockReturnValue(of([{ id: 1, descripcion: 'Aduana 1' }])),
      getSeccionAduanera: jest.fn().mockReturnValue(of([{ id: 1, descripcion: 'Sección 1' }])),
    } as any;

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [DatosRetornoAutorizacionComponent],
      providers: [
        FormBuilder,
        { provide: RetornoImportacionTemporalService, useValue: mockService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosRetornoAutorizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('debería llamar a getAduanaDeIngreso y getSeccionAduanera', () => {
      jest.spyOn(component, 'getAduanaDeIngreso');
      jest.spyOn(component, 'getSeccionAduanera');

      component.ngOnInit();

      expect(component.getAduanaDeIngreso).toHaveBeenCalled();
      expect(component.getSeccionAduanera).toHaveBeenCalled();
    });
  });

  describe('getAduanaDeIngreso', () => {
    it('debería obtener las opciones de aduana de ingreso desde el servicio', () => {
      component.getAduanaDeIngreso();

      expect(mockService.getAduanaDeIngreso).toHaveBeenCalled();
      expect(component.aduanaDeingresOpciones).toEqual([{ id: 1, descripcion: 'Aduana 1' }]);
    });
  });

  describe('getSeccionAduanera', () => {
    it('debería obtener las opciones de sección aduanera desde el servicio', () => {
      component.getSeccionAduanera();

      expect(mockService.getSeccionAduanera).toHaveBeenCalled();
      expect(component.seccionAduaneraOpciones).toEqual([{ id: 1, descripcion: 'Sección 1' }]);
    });
  });

  describe('cambioFechaIngreso', () => {
    it('debería actualizar el valor de fechaVencimientoProrroga en el formulario', () => {
      component.cambioFechaIngreso('2023-10-01');

      expect(component.datosImportacionRetornoAutorizacionGeneralFormulario.get('fechaVencimientoProrroga')?.value).toBe('2023-10-01');
    });
  });

  describe('cambioFechaVencimiento', () => {
    it('debería actualizar el valor de fechaVencimiento en el formulario', () => {
      component.cambioFechaVencimiento('2023-10-15');

      expect(component.datosImportacionRetornoAutorizacionGeneralFormulario.get('fechaVencimiento')?.value).toBe('2023-10-15');
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
