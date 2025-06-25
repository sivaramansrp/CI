import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosDeLaSolicitudComponent } from './datos-de-la-solicitud.component';
import { ImportacionesAgropecuariasService } from '../../services/importaciones-agropecuarias.service';
import { ImportacionesAgropecuariasStore } from '../../estados/importaciones-agropecuarias.store';
import { ImportacionesAgropecuariasQuery } from '../../estados/importaciones-agropecuarias.query';
import { ServicioDeFormularioService } from '../../services/formulario-validacion.service';
import { of, Subject } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('DatosDeLaSolicitudComponent', () => {
  let component: DatosDeLaSolicitudComponent;
  let fixture: ComponentFixture<DatosDeLaSolicitudComponent>;
  let mockService: any;
  let mockStore: any;
  let mockQuery: any;
  let mockFormService: any;

  beforeEach(async () => {
    mockService = {
      datosDeLaSolicitud: jest.fn().mockReturnValue(of({ regimen: [], clasificacion: [] })),
    };
    mockStore = {
      setDynamicFieldValue: jest.fn(),
    };
    mockQuery = {
      selectSolicitudDeRegistroTpl$: of({ readonly: false }),
    };
    mockFormService = {
      setFormValue: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [DatosDeLaSolicitudComponent],
      providers: [
        { provide: ImportacionesAgropecuariasService, useValue: mockService },
        { provide: ImportacionesAgropecuariasStore, useValue: mockStore },
        { provide: ImportacionesAgropecuariasQuery, useValue: mockQuery },
        { provide: ServicioDeFormularioService, useValue: mockFormService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosDeLaSolicitudComponent);
    component = fixture.componentInstance;
    component.consultaState = { readonly: false } as any;
    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe completar destroy$ al llamar ngOnDestroy', () => {
    const nextSpy = jest.spyOn<any, any>(component['destroy$'], 'next');
    const completeSpy = jest.spyOn<any, any>(component['destroy$'], 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('debe llamar a setDynamicFieldValue y setFormValue en establecerCambioDeValor', () => {
    component.establecerCambioDeValor({ campo: 'test', valor: 'value' });
    expect(mockStore.setDynamicFieldValue).toHaveBeenCalledWith('test', 'value');
    expect(mockFormService.setFormValue).toHaveBeenCalledWith('solicitudForm', { test: 'value' });
  });

  it('debe llamar a setDynamicFieldValue con el objeto como string si valor es un objeto', () => {
    const obj = { foo: 'bar' };
    component.establecerCambioDeValor({ campo: 'test', valor: obj });
    expect(mockStore.setDynamicFieldValue).toHaveBeenCalledWith('test', JSON.stringify(obj));
    expect(mockFormService.setFormValue).toHaveBeenCalledWith('solicitudForm', { test: obj });
  });
});
