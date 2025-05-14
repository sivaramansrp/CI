import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaisProcedenciaComponent } from './Pais-procedencia.component';
import { ImportacionesAgropecuariasService } from '../../services/importaciones-agropecuarias.service';
import { ImportacionesAgropecuariasStore } from '../../estados/importaciones-agropecuarias.store';
import { ImportacionesAgropecuariasQuery } from '../../estados/importaciones-agropecuarias.query';
import { ServicioDeFormularioService } from '../../services/formulario-validacion.service';
import { of, Subject } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Mock Services
const mockService = {
  datosDeLaSolicitud: jest.fn().mockReturnValue(of({ entidad: [{ id: 1, descripcion: 'Mercosur' }] })),
};

const mockStore = {
  setDynamicFieldValue: jest.fn(),
};

const mockQuery = {
  selectSolicitudDeRegistroTpl$: of({ some: 'state' }),
};

const mockFormularioService = {
  setFormValue: jest.fn(),
};

describe('PaisProcedenciaComponent', () => {
  let component: PaisProcedenciaComponent;
  let fixture: ComponentFixture<PaisProcedenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule, PaisProcedenciaComponent],
      providers: [
        { provide: ImportacionesAgropecuariasService, useValue: mockService },
        { provide: ImportacionesAgropecuariasStore, useValue: mockStore },
        { provide: ImportacionesAgropecuariasQuery, useValue: mockQuery },
        { provide: ServicioDeFormularioService, useValue: mockFormularioService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PaisProcedenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set solicitudDeRegistroState from query observable', () => {
    expect(component['solicitudDeRegistroState']).toEqual({ some: 'state' });
  });

  it('should fetch and populate bloque options', () => {
    component.datosBloque();
    const bloqueField = component.paisProcedencia.find(field => field.campo === 'bloque') as { opciones?: { id: number; descripcion: string; }[] };
    expect(bloqueField?.opciones).toEqual([{ id: 1, descripcion: 'Mercosur' }]);
  });

  it('should call store and form service on establecerCambioDeValor', () => {
    const event = { campo: 'paisOrigen', valor: 'Brasil' };
    component.establecerCambioDeValor(event);

    expect(mockStore.setDynamicFieldValue).toHaveBeenCalledWith('paisOrigen', 'Brasil');
    expect(mockFormularioService.setFormValue).toHaveBeenCalledWith('procedenciaForm', {
      paisOrigen: 'Brasil',
    });
  });

  it('should clean up on ngOnDestroy', () => {
    const destroySpy = jest.spyOn(component['destroy$'], 'next');
    const completeSpy = jest.spyOn(component['destroy$'], 'complete');

    component.ngOnDestroy();

    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
