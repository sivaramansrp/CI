import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { of, Subject, ReplaySubject } from 'rxjs';
import { DatosCertificadoComponent } from './datos_certificado.component';
import { RegistroService } from '../../services/registro.service';
import { Tramite110207Store } from '../../state/Tramite110207.store';
import { Tramite110207Query } from '../../state/Tramite110207.query';
import { ValidacionesFormularioService } from '@ng-mf/data-access-user';
import { Catalogo } from '@ng-mf/data-access-user';

describe('DatosCertificadoComponent', () => {
  let component: DatosCertificadoComponent;
  let fixture: ComponentFixture<DatosCertificadoComponent>;
  let mockRegistroService: jest.Mocked<RegistroService>;
  let mockStore: jest.Mocked<Tramite110207Store>;
  let mockQuery: jest.Mocked<Tramite110207Query>;
  let mockValidacionesService: jest.Mocked<ValidacionesFormularioService>;

  beforeEach(async () => {
    mockRegistroService = {
      getIdioma: jest.fn().mockReturnValue(of({ code: 200, data: [] })),
      getEntidad: jest.fn().mockReturnValue(of({ code: 200, data: [] })),
      getRepresentacion: jest.fn().mockReturnValue(of({ code: 200, data: [] })),
    } as unknown as jest.Mocked<RegistroService>;

    mockStore = {
      setEntidad: jest.fn(),
      setRepresentacion: jest.fn(),
      setIdioma: jest.fn(),
    } as unknown as jest.Mocked<Tramite110207Store>;

    mockQuery = {
      selectSolicitud$: of({
        observaciones: 'Test Observaciones',
        presica: 'Test Presica',
        presenta: 'Test Presenta',
        idioma: 'Test Idioma',
        entidad: 'Test Entidad',
        representacion: 'Test Representacion',
        casillaVerificacion: true,
        justificacion: 'Test Justificacion',
      }),
    } as unknown as jest.Mocked<Tramite110207Query>;

    mockValidacionesService = {
      isValid: jest.fn().mockReturnValue(true),
    } as unknown as jest.Mocked<ValidacionesFormularioService>;

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [ReactiveFormsModule,DatosCertificadoComponent],
      providers: [
        FormBuilder,
        { provide: RegistroService, useValue: mockRegistroService },
        { provide: Tramite110207Store, useValue: mockStore },
        { provide: Tramite110207Query, useValue: mockQuery },
        { provide: ValidacionesFormularioService, useValue: mockValidacionesService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosCertificadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    component.donanteDomicilio();
    expect(component.registroForm.value.validacionForm.observaciones).toBe('Test Observaciones');
    expect(component.registroForm.value.validacionForm.presica).toBe('Test Presica');
    expect(component.registroForm.value.validacionForm.presenta).toBe('Test Presenta');
  });

  it('should validate the destinatario form', () => {
    component.registroForm = new FormBuilder().group({
      validacionForm: new FormBuilder().group({
        observaciones: [''],
      }),
    });
    component.validarDestinatarioFormulario();
    expect(component.registroForm.touched).toBe(true);
  });

  it('should fetch idioma catalog', () => {
    component.getIdioma();
    expect(mockRegistroService.getIdioma).toHaveBeenCalled();
  });

  it('should fetch entidad catalog', () => {
    component.getEntidad();
    expect(mockRegistroService.getEntidad).toHaveBeenCalled();
  });

  it('should fetch representacion catalog', () => {
    component.getRepresentacion();
    expect(mockRegistroService.getRepresentacion).toHaveBeenCalled();
  });

  it('should validate a form field', () => {
    const form = new FormBuilder().group({
      field: ['value'],
    });
    const isValid = component.isValid(form, 'field');
    expect(isValid).toBe(true);
    expect(mockValidacionesService.isValid).toHaveBeenCalledWith(form, 'field');
  });

  it('should set values in the store', () => {
    const form = new FormBuilder().group({
      field: ['value'],
    });
    component.setValoresStore(form, 'field', 'setEntidad');
    expect(mockStore.setEntidad).toHaveBeenCalledWith('value');
  });

  it('should destroy subscriptions on ngOnDestroy', () => {
    const destroyNotifierSpy = jest.spyOn(component.destroyNotifier$, 'next');
    const destroyNotifierCompleteSpy = jest.spyOn(component.destroyNotifier$, 'complete');

    component.ngOnDestroy();

    expect(destroyNotifierSpy).toHaveBeenCalledWith();
    expect(destroyNotifierCompleteSpy).toHaveBeenCalled();
  });
});