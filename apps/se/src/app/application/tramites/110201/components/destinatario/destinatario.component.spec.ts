import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormsModule,
} from '@angular/forms';
import { of, Subject } from 'rxjs';
import { DestinatarioComponent } from './destinatario.component';
import { RegistroService } from '../../services/registro.service';
import { Tramite110201Store } from '../../state/Tramite110201.store';
import { Tramite110201Query } from '../../state/Tramite110201.query';
import { ValidacionesFormularioService } from '@libs/shared/data-access-user/src';

describe('DestinatarioComponent', () => {
  let component: DestinatarioComponent;
  let fixture: ComponentFixture<DestinatarioComponent>;
  let registroService: RegistroService;
  let tramiteStore: Tramite110201Store;
  let tramiteQuery: Tramite110201Query;
  let validacionesService: ValidacionesFormularioService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, DestinatarioComponent],
      declarations: [],
      providers: [
        FormBuilder,
        {
          provide: RegistroService,
          useValue: {
            getPaisDestino: jest
              .fn()
              .mockReturnValue(of({ code: 200, data: [] })),
            getTransporte: jest
              .fn()
              .mockReturnValue(of({ code: 200, data: [] })),
          },
        },
        {
          provide: Tramite110201Store,
          useValue: {
            setNacion: jest.fn(),
            setTransporte: jest.fn(),
          },
        },
        {
          provide: Tramite110201Query,
          useValue: {
            selectSolicitud$: of({}),
            selectNacion$: of([]),
            selectTransporte$: of([]),
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

    fixture = TestBed.createComponent(DestinatarioComponent);
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
    const getPaisDestinoSpy = jest.spyOn(component, 'getPaisDestino');
    const getTransporteSpy = jest.spyOn(component, 'getTransporte');
    const donanteDomicilioSpy = jest.spyOn(component, 'donanteDomicilio');

    component.ngOnInit();

    expect(getPaisDestinoSpy).toHaveBeenCalled();
    expect(getTransporteSpy).toHaveBeenCalled();
    expect(donanteDomicilioSpy).toHaveBeenCalled();
  });

  it('should validate destinatario formulario', () => {
    component.registroForm = component.fb.group({
      validacionForm: component.fb.group({
        nacion: [''],
      }),
    });
    component.validarDestinatarioFormulario();
    expect(component.registroForm.touched).toBe(true);
  });

  it('should call getPaisDestino and set nacion in store', () => {
    const spy = jest.spyOn(registroService, 'getPaisDestino');
    component.getPaisDestino();
    expect(spy).toHaveBeenCalled();
    expect(tramiteStore.setNacion).toHaveBeenCalled();
  });

  it('should call getTransporte and set transporte in store', () => {
    const spy = jest.spyOn(registroService, 'getTransporte');
    component.getTransporte();
    expect(spy).toHaveBeenCalled();
    expect(tramiteStore.setTransporte).toHaveBeenCalled();
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
      nacion: ['test'],
    });
    component.setValoresStore(form, 'nacion', 'setNacion');
    expect(tramiteStore.setNacion).toHaveBeenCalledWith('test');
  });

  it('should unsubscribe from all subscriptions on ngOnDestroy', () => {
    const destroyNotifierSpy = jest.spyOn(component.destroyNotifier$, 'next');
    const paisDestinoUnsubscribeSpy = jest.spyOn(
      component.getPaisDestinoSubscription,
      'unsubscribe'
    );
    const transporteUnsubscribeSpy = jest.spyOn(
      component.getTransporteSubscription,
      'unsubscribe'
    );

    component.ngOnDestroy();

    expect(destroyNotifierSpy).toHaveBeenCalled();
    expect(paisDestinoUnsubscribeSpy).toHaveBeenCalled();
    expect(transporteUnsubscribeSpy).toHaveBeenCalled();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
