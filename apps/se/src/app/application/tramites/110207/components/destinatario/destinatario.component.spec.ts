import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { of, Subject, ReplaySubject } from 'rxjs';
import { DestinatarioComponent } from './destinatario.component';
import { RegistroService } from '../../services/registro.service';
import { Tramite110207Store } from '../../state/Tramite110207.store';
import { Tramite110207Query } from '../../state/Tramite110207.query';
import { ValidacionesFormularioService } from '@ng-mf/data-access-user';
import { Catalogo } from '@ng-mf/data-access-user';

describe('DestinatarioComponent', () => {
  let component: DestinatarioComponent;
  let fixture: ComponentFixture<DestinatarioComponent>;
  let mockRegistroService: jest.Mocked<RegistroService>;
  let mockStore: jest.Mocked<Tramite110207Store>;
  let mockQuery: jest.Mocked<Tramite110207Query>;
  let mockValidacionesService: jest.Mocked<ValidacionesFormularioService>;

  beforeEach(async () => {
    mockRegistroService = {
      getPaisDestino: jest.fn().mockReturnValue(of({ code: 200, data: [] })),
      getTransporte: jest.fn().mockReturnValue(of({ code: 200, data: [] })),
    } as unknown as jest.Mocked<RegistroService>;

    mockStore = {
      setEntidad: jest.fn(),
      setRepresentacion: jest.fn(),
      setIdioma: jest.fn(),
    } as unknown as jest.Mocked<Tramite110207Store>;

    mockQuery = {
      selectSolicitud$: of({
        nacion: 'Test Nacion',
        transporte: 'Test Transporte',
        nombre: 'Test Nombre',
        apellidoPrimer: 'Test Apellido Primer',
        apellidoSegundo: 'Test Apellido Segundo',
        numeroFiscal: 'Test Numero Fiscal',
        razonSocial: 'Test Razon Social',
        ciudad: 'Test Ciudad',
        calle: 'Test Calle',
        numeroLetra: 'Test Numero Letra',
        lada: 'Test Lada',
        telefono: '1234567890',
        fax: '0987654321',
        correoElectronico: 'test@example.com',
        rutaCompleta: 'Test Ruta Completa',
        puertoEmbarque: 'Test Puerto Embarque',
        puertoDesembarque: 'Test Puerto Desembarque',
      }),
    } as unknown as jest.Mocked<Tramite110207Query>;

    mockValidacionesService = {
      isValid: jest.fn().mockReturnValue(true),
    } as unknown as jest.Mocked<ValidacionesFormularioService>;

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [ReactiveFormsModule,DestinatarioComponent],
      providers: [
        FormBuilder,
        { provide: RegistroService, useValue: mockRegistroService },
        { provide: Tramite110207Store, useValue: mockStore },
        { provide: Tramite110207Query, useValue: mockQuery },
        { provide: ValidacionesFormularioService, useValue: mockValidacionesService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DestinatarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    component.donanteDomicilio();
    expect(component.registroForm.value.validacionForm.nacion).toBe('Test Nacion');
    expect(component.registroForm.value.validacionForm.transporte).toBe('Test Transporte');
  });

  it('should validate the destinatario form', () => {
    component.registroForm = new FormBuilder().group({
      validacionForm: new FormBuilder().group({
        nacion: [''],
      }),
    });
    component.validarDestinatarioFormulario();
    expect(component.registroForm.touched).toBe(true);
  });

  it('should fetch pais destino catalog', () => {
    component.getPaisDestino();
    expect(mockRegistroService.getPaisDestino).toHaveBeenCalled();
  });

  it('should fetch transporte catalog', () => {
    component.getTransporte();
    expect(mockRegistroService.getTransporte).toHaveBeenCalled();
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

  it('should handle form submission', () => {
    component.registroForm = new FormBuilder().group({
      validacionForm: new FormBuilder().group({
        nacion: ['Test Nacion', [Validators.required]],
      }),
    });
    component.onSubmit();
    expect(component.registroForm.valid).toBe(true);
  });

  it('should destroy subscriptions on ngOnDestroy', () => {
    const destroyNotifierSpy = jest.spyOn(component.destroyNotifier$, 'next');
    const destroyNotifierCompleteSpy = jest.spyOn(component.destroyNotifier$, 'complete');

    component.ngOnDestroy();

    expect(destroyNotifierSpy).toHaveBeenCalledWith();
    expect(destroyNotifierCompleteSpy).toHaveBeenCalled();
  });
});