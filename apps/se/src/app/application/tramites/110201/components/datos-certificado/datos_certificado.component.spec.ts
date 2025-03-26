import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { DatosCertificadoComponent } from './datos_certificado.component';
import { RegistroService } from '../../services/registro.service';
import { Tramite110201Store } from '../../state/Tramite110201.store';
import { Tramite110201Query } from '../../state/Tramite110201.query';
import { ValidacionesFormularioService } from '@libs/shared/data-access-user/src';

describe('DatosCertificadoComponent', () => {
  let component: DatosCertificadoComponent;
  let fixture: ComponentFixture<DatosCertificadoComponent>;
  let registroService: RegistroService;
  let tramiteStore: Tramite110201Store;
  let tramiteQuery: Tramite110201Query;
  let validacionesService: ValidacionesFormularioService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, DatosCertificadoComponent],
      declarations: [],
      providers: [
        FormBuilder,
        {
          provide: RegistroService,
          useValue: {
            getIdioma: jest.fn().mockReturnValue(of({ code: 200, data: [] })),
            getEntidad: jest.fn().mockReturnValue(of({ code: 200, data: [] })),
            getRepresentacion: jest
              .fn()
              .mockReturnValue(of({ code: 200, data: [] })),
          },
        },
        {
          provide: Tramite110201Store,
          useValue: {
            setIdioma: jest.fn(),
            setEntidad: jest.fn(),
            setRepresentacion: jest.fn(),
          },
        },
        {
          provide: Tramite110201Query,
          useValue: {
            selectSolicitud$: of({}),
            selectIdioma$: of([]),
            selectEntidad$: of([]),
            selectRepresentacion$: of([]),
          },
        },
        {
          provide: ValidacionesFormularioService,
          useValue: {
            isValid: jest.fn().mockReturnValue(true),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosCertificadoComponent);
    component = fixture.componentInstance;
    registroService = TestBed.inject(RegistroService);
    tramiteStore = TestBed.inject(Tramite110201Store);
    tramiteQuery = TestBed.inject(Tramite110201Query);
    validacionesService = TestBed.inject(ValidacionesFormularioService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize component and call necessary methods on ngOnInit', () => {
    const getIdiomaSpy = jest.spyOn(component, 'getIdioma');
    const getEntidadSpy = jest.spyOn(component, 'getEntidad');
    const getRepresentacionSpy = jest.spyOn(component, 'getRepresentacion');
    const donanteDomicilioSpy = jest.spyOn(component, 'donanteDomicilio');

    component.ngOnInit();

    expect(getIdiomaSpy).toHaveBeenCalled();
    expect(getEntidadSpy).toHaveBeenCalled();
    expect(getRepresentacionSpy).toHaveBeenCalled();
    expect(donanteDomicilioSpy).toHaveBeenCalled();
  });

  it('should validate destinatario formulario', () => {
    component.registroForm = component.fb.group({
      validacionForm: component.fb.group({
        idioma: [''],
      }),
    });
    component.validarDestinatarioFormulario();
    expect(component.registroForm.touched).toBe(true);
  });

  it('should call getIdioma and set idioma in store', () => {
    const spy = jest.spyOn(registroService, 'getIdioma');
    component.getIdioma();
    expect(spy).toHaveBeenCalled();
    expect(tramiteStore.setIdioma).toHaveBeenCalled();
  });

  it('should call getEntidad and set entidad in store', () => {
    const spy = jest.spyOn(registroService, 'getEntidad');
    component.getEntidad();
    expect(spy).toHaveBeenCalled();
    expect(tramiteStore.setEntidad).toHaveBeenCalled();
  });

  it('should call getRepresentacion and set representacion in store', () => {
    const spy = jest.spyOn(registroService, 'getRepresentacion');
    component.getRepresentacion();
    expect(spy).toHaveBeenCalled();
    expect(tramiteStore.setRepresentacion).toHaveBeenCalled();
  });

  it('should validate form field', () => {
    const form = component.fb.group({
      field: [''],
    });
    const isValid = component.isValid(form, 'field');
    expect(isValid).toBe(true);
  });

  it('should set valores in store', () => {
    const form = component.fb.group({
      idioma: ['test'],
    });
    component.setValoresStore(form, 'idioma', 'setIdioma');
    expect(tramiteStore.setIdioma).toHaveBeenCalledWith('test');
  });

  it('should unsubscribe from all subscriptions on ngOnDestroy', () => {
    const destroyNotifierSpy = jest.spyOn(component.destroyNotifier$, 'next');
    const idiomaUnsubscribeSpy = jest.spyOn(
      component.getIdiomaSubscripcion,
      'unsubscribe'
    );
    const entidadUnsubscribeSpy = jest.spyOn(
      component.getEntidadSubscripcion,
      'unsubscribe'
    );
    const representacionUnsubscribeSpy = jest.spyOn(
      component.getRepresentacionSubscripcion,
      'unsubscribe'
    );

    component.ngOnDestroy();

    expect(destroyNotifierSpy).toHaveBeenCalled();
    expect(idiomaUnsubscribeSpy).toHaveBeenCalled();
    expect(entidadUnsubscribeSpy).toHaveBeenCalled();
    expect(representacionUnsubscribeSpy).toHaveBeenCalled();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
