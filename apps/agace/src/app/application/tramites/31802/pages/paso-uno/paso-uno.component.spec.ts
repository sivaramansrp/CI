import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { of } from 'rxjs';
import { PasoUnoComponent } from './paso-uno.component';
import { Tramite31802Store } from '../../state/Tramite31802.store';
import { Tramite31802Query } from '../../state/Tramite31802.query';
import { ValidacionesFormularioService } from '@ng-mf/data-access-user';
import { SolicitanteComponent } from '@libs/shared/data-access-user/src';

describe('PasoUnoComponent', () => {
  let component: PasoUnoComponent;
  let fixture: ComponentFixture<PasoUnoComponent>;
  let store: Tramite31802Store;
  let query: Tramite31802Query;
  let validacionesService: ValidacionesFormularioService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasoUnoComponent],
      imports: [ReactiveFormsModule,SolicitanteComponent],
      providers: [
        FormBuilder,
        { provide: Tramite31802Store, useValue: { setRenovacion: jest.fn(), setHomologacion: jest.fn() } },
        { provide: Tramite31802Query, useValue: { selectSolicitud$: of({ renovacion: false, homologacion: false }) } },
        { provide: ValidacionesFormularioService, useValue: { isValid: jest.fn(() => true) } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Tramite31802Store);
    query = TestBed.inject(Tramite31802Query);
    validacionesService = TestBed.inject(ValidacionesFormularioService);

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form and state on ngOnInit', () => {
    jest.spyOn(component, 'donanteDomicilio');
    component.ngOnInit();
    expect(component.donanteDomicilio).toHaveBeenCalled();
    expect(component.solicitudState).toEqual({ renovacion: false, homologacion: false });
  });

  it('should initialize the form with donanteDomicilio', () => {
    component.solicitudState = { renovacion: true, homologacion: false } as any;
    component.donanteDomicilio();
    expect(component.registroForm.value).toEqual({
      renovacion: true,
      homologacion: false,
    });
  });

  it('should set renovacion in the store on establecerRenovacion', () => {
    const event = { target: { checked: true } } as unknown as Event;
    jest.spyOn(store, 'setRenovacion');
    component.establecerRenovacion(event);
    expect(store.setRenovacion).toHaveBeenCalledWith(true);
  });

  it('should set homologacion in the store on establecerHomologacion', () => {
    const event = { target: { checked: true } } as unknown as Event;
    jest.spyOn(store, 'setHomologacion');
    component.establecerHomologacion(event);
    expect(store.setHomologacion).toHaveBeenCalledWith(true);
  });

  it('should select a tab on seleccionaTab', () => {
    component.seleccionaTab(2);
    expect(component.indice).toBe(2);
  });

  it('should validate a form field using esValido', () => {
    const form = component.registroForm;
    const field = 'renovacion';
    jest.spyOn(validacionesService, 'isValid');
    const result = component.esValido(form, field);
    expect(validacionesService.isValid).toHaveBeenCalledWith(form, field);
    expect(result).toBe(true);
  });

  it('should mark all fields as touched if the form is invalid', () => {
    component.registroForm.patchValue({ renovacion: null, homologacion: null });
    jest.spyOn(component.registroForm, 'markAllAsTouched');
    component.validarDestinatarioFormulario();
    expect(component.registroForm.markAllAsTouched).toHaveBeenCalled();
  });

  it('should call setRenovacion when a value changes', () => {
    const form = component.registroForm;
    const field = 'renovacion';
    jest.spyOn(store, 'setRenovacion');
    form.patchValue({ renovacion: true });
    component.setValoresStore(form, field, 'setRenovacion');
    expect(store.setRenovacion).toHaveBeenCalledWith(true);
  });

  it('should destroy subscriptions on ngOnDestroy', () => {
    jest.spyOn(component.destroyed$, 'next');
    jest.spyOn(component.destroyed$, 'complete');
    component.ngOnDestroy();
    expect(component.destroyed$.next).toHaveBeenCalledWith(true);
    expect(component.destroyed$.complete).toHaveBeenCalled();
  });

  it('should configure dynamic forms on ngAfterViewInit', () => {
    jest.spyOn(component.solicitante, 'obtenerTipoPersona');
    component.ngAfterViewInit();
    expect(component.persona).toEqual(expect.any(Array));
    expect(component.domicilioFiscal).toEqual(expect.any(Array));
    expect(component.solicitante.obtenerTipoPersona).toHaveBeenCalledWith(1); // Assuming TIPO_PERSONA.MORAL_NACIONAL = 1
  });
});