import { TestBed } from '@angular/core/testing';
import { DestinatarioComponent } from './destinatario.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Tramite110221Store } from '../../estados/tramite110221.store';
import { Tramite110221Query } from '../../estados/tramite110221.query';
import { ValidacionesFormularioService } from '@ng-mf/data-access-user';
import { ValidarInicialmenteCertificadoService } from '../../services/validar-inicialmente-certificado.service';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { of, Subject } from 'rxjs';

describe('DestinatarioComponent', () => {
  let component: DestinatarioComponent;
  let store: Tramite110221Store;
  let query: Tramite110221Query;
  let validacionesService: ValidacionesFormularioService;
  let consultaioQuery: ConsultaioQuery;
  let certificadoService: ValidarInicialmenteCertificadoService;

  beforeEach(() => {
    store = { actualizarEstado: jest.fn() } as any;
    query = { selectSolicitud$: of({}) } as any;
    validacionesService = { isValid: jest.fn().mockReturnValue(true) } as any;
    consultaioQuery = { selectConsultaioState$: of({ readonly: false }) } as any;
    certificadoService = { getPaisDestino: jest.fn().mockReturnValue(of({ code: 200, data: [{ id: 1, nombre: 'Perú' }] })) } as any;

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [
        { provide: Tramite110221Store, useValue: store },
        { provide: Tramite110221Query, useValue: query },
        { provide: ValidacionesFormularioService, useValue: validacionesService },
        { provide: ConsultaioQuery, useValue: consultaioQuery },
        { provide: ValidarInicialmenteCertificadoService, useValue: certificadoService },
        FormBuilder,
      ],
    });

    const fb = TestBed.inject(FormBuilder);
    component = new DestinatarioComponent(
      certificadoService,
      fb,
      store,
      query,
      validacionesService,
      consultaioQuery
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form on donanteDomicilio', () => {
    component.solicitudState = {
      nombre: 'Juan',
      apellidoPrimer: 'Perez',
      apellidoSegundo: 'Lopez',
      numeroFiscal: '123',
      razonSocial: 'Empresa',
      ciudad: 'Lima',
      calle: 'Av. Siempre Viva',
      numeroLetra: '123A',
      paisDestino: 1,
      lada: '51',
      telefono: '999999999',
      fax: '1234567',
      correoElectronico: 'test@mail.com'
    } as any;
    component.donanteDomicilio();
    expect(component.registroForm).toBeTruthy();
    expect(component.validacionForm).toBeTruthy();
    expect(component.validacionForm.get('nombre')?.value).toBe('Juan');
  });

  it('should disable form if soloLectura is true', () => {
    component.solicitudState = {} as any;
    component.donanteDomicilio();
    component.soloLectura = true;
    component.inicializarEstadoFormulario();
    expect(component.registroForm.disabled).toBe(true);
  });

  it('should enable form if soloLectura is false', () => {
    component.solicitudState = {} as any;
    component.donanteDomicilio();
    component.soloLectura = false;
    component.inicializarEstadoFormulario();
    expect(component.registroForm.enabled).toBe(true);
  });

  it('should mark all as touched on validarDestinatarioFormulario', () => {
    component.solicitudState = {} as any;
    component.donanteDomicilio();
    const spy = jest.spyOn(component.registroForm, 'markAllAsTouched');
    component.validarDestinatarioFormulario();
    expect(spy).toHaveBeenCalled();
  });

  it('should set isDisabled to true on onClick', () => {
    component.isDisabled = false;
    component.onClick();
    expect(component.isDisabled).toBe(true);
  });

  it('should call store.actualizarEstado in setValoresStore', () => {
    component.solicitudState = { nombre: 'Juan' } as any;
    component.donanteDomicilio();
    const spy = jest.spyOn(store, 'actualizarEstado');
    component.setValoresStore(component.validacionForm, 'nombre');
    expect(spy).toHaveBeenCalledWith({ nombre: 'Juan' });
  });

  it('should validate field using isValid', () => {
    component.solicitudState = { nombre: 'Juan' } as any;
    component.donanteDomicilio();
    expect(component.isValid(component.validacionForm, 'nombre')).toBe(true);
  });

  it('should complete destroyNotifier$ on ngOnDestroy', () => {
    const spy = jest.spyOn(component.destroyNotifier$, 'complete');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
  });
});