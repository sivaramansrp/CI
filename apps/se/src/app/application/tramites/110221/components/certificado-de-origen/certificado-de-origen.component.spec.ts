import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CertificadoDeOrigenComponent } from './certificado-de-origen.component';
import { Tramite110221Store } from '../../estados/tramite110221.store';
import { Tramite110221Query } from '../../estados/tramite110221.query';
import { ValidacionesFormularioService } from '@libs/shared/data-access-user/src';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { of } from 'rxjs';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ValidarInicialmenteCertificadoService } from '../../services/validar-inicialmente-certificado.service';

describe('CertificadoDeOrigenComponent', () => {
  let component: CertificadoDeOrigenComponent;
  let fixture: ComponentFixture<CertificadoDeOrigenComponent>;

  const mockTramiteStore = {
    actualizarEstado: jest.fn(),
  };

  const mockTramiteQuery = {
    selectSolicitud$: of({
      mercanciaSeleccionadasTablaData: [],
      mercanciaDisponsiblesTablaDatos: [],
    }),
  };

  const mockConsultaioQuery = {
    selectConsultaioState$: of({
      readonly: false,
    }),
  };

  const mockValidacionesService = {
    isValid: jest.fn().mockReturnValue(true),
  };

  const mockCertificadoService = {
    getTratado: jest.fn().mockReturnValue(of({ code: 200, data: [] })),
    getPaisDestino: jest.fn().mockReturnValue(of({ code: 200, data: [] })),
    getUMC: jest.fn().mockReturnValue(of({ code: 200, data: [] })),
    getUnidadMedida: jest.fn().mockReturnValue(of({ code: 200, data: [] })),
    getTipoFactura: jest.fn().mockReturnValue(of({ code: 200, data: [] })),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CertificadoDeOrigenComponent, ReactiveFormsModule, FormsModule],
      providers: [
        { provide: Tramite110221Store, useValue: mockTramiteStore },
        { provide: Tramite110221Query, useValue: mockTramiteQuery },
        { provide: ConsultaioQuery, useValue: mockConsultaioQuery },
        { provide: ValidacionesFormularioService, useValue: mockValidacionesService },
        { provide: ValidarInicialmenteCertificadoService, useValue: mockCertificadoService },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(CertificadoDeOrigenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize forms on ngOnInit', () => {
    component.ngOnInit();
    expect(component.registroForm).toBeDefined();
    expect(component.mercanciaForm).toBeDefined();
  });

  it('should call agregar and update data when form is valid', () => {
    component.donanteDomicilio();
    component.mercanciaForm.get('validacionMercanciaForm')?.patchValue({
      fraccionMercanciaArancelaria: 'ABC123',
      nombreTecnico: 'Test',
      nombreComercialDelaMercancia: 'Comercial',
      criterioParaConferir: 'Criterio',
      nombreEnIngles: 'EnglishName',
      cantidad: '10',
      umc: 'KG',
      valorDelaMercancia: '100.00',
      complementoDelaDescripcion: 'Desc',
      tipoFactura: 'TypeA',
      fecha: '2023-01-01',
      numeroFactura: '12345'
    });

    component.agregar();

    expect(component.esFormulario).toBe(false);
    expect(component.esMercanciaEnEdicion).toBe(true);
    expect(component.mercanciaSeleccionadasTablaData.length).toBe(1);
  });

  it('should modify the form state correctly', () => {
    component.modificar();
    expect(component.esFormulario).toBe(true);
    expect(component.esMercanciaEnEdicion).toBe(false);
  });

  it('should disable editing when cancelar is called', () => {
    component.cancelar();
    expect(component.esFormulario).toBe(false);
    expect(component.esMercanciaEnEdicion).toBe(true);
  });

  it('should call cargaArchivo and enable upload', () => {
    component.cargaArchivo();
    expect(component.cargarArchivo).toBe(true);
  });

  it('should show error on darError()', () => {
    component.darError();
    expect(component.mostrarErrores).toBe(true);
    expect(component.cargarArchivo).toBe(false);
  });

  it('should update archivo name on file selection', () => {
    const file = new File([''], 'testfile.pdf', { type: 'application/pdf' });
    const event = {
      target: {
        files: [file]
      }
    } as unknown as Event;

    component.alSeleccionarArchivo(event);
    expect(component.nombreArchivo).toBe('testfile.pdf');
  });

  it('should validate a form field with isValid()', () => {
    const isValid = component.isValid(component.registroForm, 'validacionForm');
    expect(isValid).toBe(true);
  });

  it('should set values in store', () => {
    component.donanteDomicilio();
    const controlName = 'nombres';
    const form = component.validacionForm;
    form.get(controlName)?.setValue('Juan');
    component.setValoresStore(form, controlName);
    expect(mockTramiteStore.actualizarEstado).toHaveBeenCalledWith({
      [controlName]: 'Juan'
    });
  });

});
