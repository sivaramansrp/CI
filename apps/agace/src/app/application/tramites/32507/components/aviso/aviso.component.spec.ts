import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AvisoComponent } from './aviso.component';
import { of, Subject } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { EntregaActaService } from '../../services/entrega-acta.service';
import { Tramite32507Query } from '../../../../estados/queries/tramite32507.query';
import { Tramite32507Store } from '../../../../estados/tramites/tramite32507.store';
import { ValidacionesFormularioService } from '@libs/shared/data-access-user/src';

describe('AvisoComponent', () => {
  let component: AvisoComponent;
  let fixture: ComponentFixture<AvisoComponent>;
  let entregaActaServiceMock: any;
  let tramiteQueryMock: any;
  let storeMock: any;
  let validacionesServiceMock: any;

  beforeEach(async () => {
    entregaActaServiceMock = {
      obtenerLevantaActa: jest.fn().mockReturnValue(of({ datos: [{ clave: '1', descripcion: 'Mock Adace' }] })),
      obtenerUnidadMedida: jest.fn().mockReturnValue(of({ datos: [{ clave: 'kg', descripcion: 'Kilogramo' }] })),
      obtenerAvisoTabla: jest.fn().mockReturnValue(of({ datos: [] })),
    };

    tramiteQueryMock = {
      selectSolicitud$: of({
        avisoFormulario: {
          adace: 'Mock Adace',
          valorProgramaImmex: '12345',
          valorAnioProgramaImmex: '2024',
          tipoBusqueda: 'tipo',
          levantaActa: 'Acta',
          transaccionId: 'TX-001',
          cantidad: '10',
          peso: '5',
          unidadMedida: 'kg',
          descripcion: 'Descripción mock',
        }
      })
    };

    storeMock = {
      setTransaccionId: jest.fn(),
      setCantidad: jest.fn(),
      setPeso: jest.fn(),
      setUnidadMedida: jest.fn(),
      setDescripcion: jest.fn(),
    };

    validacionesServiceMock = {
      isValid: jest.fn().mockReturnValue(true),
    };

    await TestBed.configureTestingModule({
      imports: [AvisoComponent],
      providers: [
        FormBuilder,
        { provide: EntregaActaService, useValue: entregaActaServiceMock },
        { provide: Tramite32507Query, useValue: tramiteQueryMock },
        { provide: Tramite32507Store, useValue: storeMock },
        { provide: ValidacionesFormularioService, useValue: validacionesServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AvisoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize forms on ngOnInit', () => {
    expect(component.avisoFormulario).toBeDefined();
    expect(component.datosEmpresa.get('valorProgramaImmex')?.value).toBe('12345');
  });

  it('should call cargarUnidadMedida and cargarLevantaActa on init', () => {
    expect(entregaActaServiceMock.obtenerLevantaActa).toHaveBeenCalled();
    expect(entregaActaServiceMock.obtenerUnidadMedida).toHaveBeenCalled();
  });

  it('should validate field with isValid()', () => {
    const result = component.isValid(component.avisoFormulario, 'adaceForm');
    expect(result).toBe(true);
  });

  it('should sanitize alphanumeric input', () => {
    const mockEvent = { target: { value: 'text123!@#' } } as unknown as Event;
    component.sanitizeAlphanumeric(component.adaceForm, 'descripcion', mockEvent);
    expect(component.adaceForm.get('descripcion')?.value).toBe('text123');
  });

 
});
