import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosDeLaSolicitudComponent } from './datos-de-la-solicitud.component';
import { of, Subject } from 'rxjs';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ImportacionesAgropecuariasService } from '../../services/importaciones-agropecuarias.service';
import { ImportacionesAgropecuariasStore } from '../../estados/importaciones-agropecuarias.store';
import { ImportacionesAgropecuariasQuery } from '../../estados/importaciones-agropecuarias.query';
import { ServicioDeFormularioService } from '../../services/formulario-validacion.service';

const mockService = {
  datosDeLaSolicitud: jest.fn()
};

const mockStore = {
  setDynamicFieldValue: jest.fn()
};

const mockQuery = {
  selectSolicitudDeRegistroTpl$: of({ someState: true })
};

const mockFormService = {
  setFormValue: jest.fn()
};

describe('DatosDeLaSolicitudComponent (Jest)', () => {
  let component: DatosDeLaSolicitudComponent;
  let fixture: ComponentFixture<DatosDeLaSolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,DatosDeLaSolicitudComponent],
      declarations: [],
      providers: [
        { provide: ImportacionesAgropecuariasService, useValue: mockService },
        { provide: ImportacionesAgropecuariasStore, useValue: mockStore },
        { provide: ImportacionesAgropecuariasQuery, useValue: mockQuery },
        { provide: ServicioDeFormularioService, useValue: mockFormService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosDeLaSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call datosRegimen and datosClasificacion on ngOnInit', () => {
    const datosRegimenSpy = jest.spyOn(component, 'datosRegimen');
    const datosClasificacionSpy = jest.spyOn(component, 'datosClasificacion');

    component.ngOnInit();

    expect(datosRegimenSpy).toHaveBeenCalled();
    expect(datosClasificacionSpy).toHaveBeenCalled();
  });

  it('should set dynamic field value on establecerCambioDeValor', () => {
    const event = { campo: 'testField', valor: 'testValue' };
    component.establecerCambioDeValor(event);

    expect(mockStore.setDynamicFieldValue).toHaveBeenCalledWith('testField', 'testValue');
    expect(mockFormService.setFormValue).toHaveBeenCalledWith('solicitudForm', {
      testField: 'testValue',
    });
  });

  it('should fetch and map datosRegimen correctly', () => {
    const regimenData = [{ id: 1, descripcion: 'Temporal' }];
    mockService.datosDeLaSolicitud.mockReturnValueOnce(of({ regimen: regimenData }));

    component.datosRegimen();

    fixture.detectChanges();
    const field = component.datosDelTramite.find(f => f.campo === 'regimen');
    expect(field?.opciones).toEqual([{ id: 1, descripcion: 'Temporal' }]);
  });

  it('should fetch and map datosClasificacion correctly', () => {
    const clasificacionData = [{ id: 2, descripcion: 'Importación' }];
    mockService.datosDeLaSolicitud.mockReturnValueOnce(of({ clasificacion: clasificacionData }));

    component.datosClasificacion();

    fixture.detectChanges();
    const field = component.datosDelTramite.find(f => f.campo === 'clasificacion');
    expect(field?.opciones).toEqual([{ id: 2, descripcion: 'Importación' }]);
  });

  it('should complete destroy$ on ngOnDestroy', () => {
    const destroySpy = jest.spyOn(component['destroy$'], 'complete');
    component.ngOnDestroy();
    expect(destroySpy).toHaveBeenCalled();
  });
});
