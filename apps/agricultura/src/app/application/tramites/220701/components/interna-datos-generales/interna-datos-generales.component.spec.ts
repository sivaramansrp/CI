import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InternaDatosGeneralesComponent } from './interna-datos-generales.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CatalogosService } from '../../servicios/catalogos.service';
import { MercanciaDatosService } from '../../servicios/mercancia-datos.service';
import { RevisionService } from '../../servicios/revision.service';
import { TramiteStore } from '../../estados/tramite220701.store';
import { TramiteStoreQuery } from '../../estados/tramite220701.query';
import { ConsultaioQuery } from '@libs/shared/data-access-user/src';
import { SeccionLibQuery } from '@libs/shared/data-access-user/src';
import { SeccionLibStore } from '@libs/shared/data-access-user/src';
import { ValidacionesFormularioService } from '@libs/shared/data-access-user/src';

describe('InternaDatosGeneralesComponent', () => {
  let component: InternaDatosGeneralesComponent;
  let fixture: ComponentFixture<InternaDatosGeneralesComponent>;

  const mockCatalogosService = {
    obtenerAduanaDeIngreso: jest.fn().mockReturnValue(of({ data: [] })),
    obtenerSanidadAgropecuaria: jest.fn().mockReturnValue(of({ data: [] })),
    obtenerPuntoInspeccion: jest.fn().mockReturnValue(of({ data: [] })),
    obtenerEstablecimiento: jest.fn().mockReturnValue(of({ data: [] })),
    obtenerVeterinario: jest.fn().mockReturnValue(of({ data: [] })),
    obtenerRegimen: jest.fn().mockReturnValue(of({ data: [] })),
  };

  const mockRevisionService = {
    getAduanaIngreso: jest.fn().mockReturnValue(of({ code: 200, data: [] })),
    getOficianaInspeccion: jest.fn().mockReturnValue(of({ code: 200, data: [] })),
    getEstablecimiento: jest.fn().mockReturnValue(of({ code: 200, data: [] })),
    getRegimenDestinaran: jest.fn().mockReturnValue(of({ code: 200, data: [] })),
    getMovilizacionNacional: jest.fn().mockReturnValue(of({ code: 200, data: [] })),
    getPuntoVerificacion: jest.fn().mockReturnValue(of({ code: 200, data: [] })),
    getEmpresaTransportista: jest.fn().mockReturnValue(of({ code: 200, data: [] })),
  };

  const mockMercanciaDatosService = {
    getDatos: jest.fn().mockReturnValue(of({ mercanciaApiDatos: [] })),
  };

  const mockConsultaioQuery = {
    getValue: jest.fn().mockReturnValue({ readonly: false }),
    selectConsultaioState$: of({ readonly: false }),
  };

  const mockTramiteStore = {
    setInternaDatosGeneralesTramite: jest.fn(),
  };

  const mockTramiteStoreQuery = {
    selectSolicitudTramite$: of({
      InternaDatosGeneralesState: {
        datosDelaSolicitud: {},
        coordenadas: '',
        movilizacionNacional: '',
        identTransporte: '',
        puntoVerificacion: '',
        empresaTransportista: '',
      }
    })
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      declarations: [InternaDatosGeneralesComponent],
      providers: [
        FormBuilder,
        { provide: CatalogosService, useValue: mockCatalogosService },
        { provide: RevisionService, useValue: mockRevisionService },
        { provide: MercanciaDatosService, useValue: mockMercanciaDatosService },
        { provide: ConsultaioQuery, useValue: mockConsultaioQuery },
        { provide: TramiteStore, useValue: mockTramiteStore },
        { provide: TramiteStoreQuery, useValue: mockTramiteStoreQuery },
        { provide: SeccionLibQuery, useValue: { selectSeccionState$: of({}) }},
        { provide: SeccionLibStore, useValue: {} },
        { provide: ValidacionesFormularioService, useValue: { isValid: () => true } }
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InternaDatosGeneralesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with required controls', () => {
    expect(component.forma).toBeDefined();
    expect(component.movilizacionForm).toBeDefined();
    expect(component.forma.get('datosDelaSolicitud')).toBeTruthy();
  });

  it('should disable the form when readonly is true', () => {
    component.esFormularioSoloLectura = true;
    component.inicializarEstadoFormulario();
    expect(component.forma.disabled).toBe(true);
    expect(component.movilizacionForm.disabled).toBe(true);
  });

  it('should enable the form when readonly is false', () => {
    component.esFormularioSoloLectura = false;
    component.inicializarEstadoFormulario();
    expect(component.forma.enabled).toBe(true);
    expect(component.movilizacionForm.enabled).toBe(true);
  });

  it('should fetch dropdown data on init', () => {
    expect(mockCatalogosService.obtenerAduanaDeIngreso).toHaveBeenCalled();
    expect(mockRevisionService.getEmpresaTransportista).toHaveBeenCalled();
    expect(mockMercanciaDatosService.getDatos).toHaveBeenCalled();
  });
});
