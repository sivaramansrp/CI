import { TestBed } from '@angular/core/testing';
import { DestinatarioComponent } from './destinatario.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Tramite110217Store } from '../../../../estados/tramites/tramite110217.store';
import { Tramite110217Query } from '../../../../estados/queries/tramite110217.query';
import { ValidacionesFormularioService } from '@ng-mf/data-access-user';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { of, Subject } from 'rxjs';

describe('DestinatarioComponent', () => {
  let component: DestinatarioComponent;
  let store: Tramite110217Store;
  let query: Tramite110217Query;
  let validacionesService: ValidacionesFormularioService;
  let consultaioQuery: ConsultaioQuery;

  beforeEach(() => {
    store = { actualizarEstado: jest.fn() } as any;
    query = { selectSolicitud$: of({}) } as any;
    validacionesService = { isValid: jest.fn().mockReturnValue(true) } as any;
    consultaioQuery = { selectConsultaioState$: of({ readonly: false }) } as any;

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [
        { provide: Tramite110217Store, useValue: store },
        { provide: Tramite110217Query, useValue: query },
        { provide: ValidacionesFormularioService, useValue: validacionesService },
        { provide: ConsultaioQuery, useValue: consultaioQuery },
        FormBuilder,
      ],
    });

    const fb = TestBed.inject(FormBuilder);
    component = new DestinatarioComponent(
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
      grupoReceptor: {},
      grupoDeDirecciones: {},
      grupoRepresentativo: {},
      grupoDeTransporte: {},
    } as any;
    component.donanteDomicilio();
    expect(component.registroFormulario).toBeTruthy();
    expect(component.registroFormulario.get('grupoReceptor')).toBeTruthy();
  });

  it('should disable form if soloLectura is true', () => {
    component.solicitudState = {
      grupoReceptor: {},
      grupoDeDirecciones: {},
      grupoRepresentativo: {},
      grupoDeTransporte: {},
    } as any;
    component.donanteDomicilio();
    component.soloLectura = true;
    component.destinatarioFormulario();
    expect(component.registroFormulario.disabled).toBe(true);
  });

  it('should enable form if soloLectura is false', () => {
    component.solicitudState = {
      grupoReceptor: {},
      grupoDeDirecciones: {},
      grupoRepresentativo: {},
      grupoDeTransporte: {},
    } as any;
    component.donanteDomicilio();
    component.soloLectura = false;
    component.destinatarioFormulario();
    expect(component.registroFormulario.enabled).toBe(true);
  });

  it('should mark all as touched on validarDestinatarioFormulario', () => {
    component.solicitudState = {
      grupoReceptor: {},
      grupoDeDirecciones: {},
      grupoRepresentativo: {},
      grupoDeTransporte: {},
    } as any;
    component.donanteDomicilio();
    const spy = jest.spyOn(component.registroFormulario, 'markAllAsTouched');
    component.validarDestinatarioFormulario();
    expect(spy).toHaveBeenCalled();
  });

  it('should set estaDeshabilitado to true on onClick', () => {
    component.estaDeshabilitado = false;
    component.onClick();
    expect(component.estaDeshabilitado).toBe(true);
  });

  it('should validate field using isValid', () => {
    component.solicitudState = {
      grupoReceptor: { nombre: 'Test' },
      grupoDeDirecciones: {},
      grupoRepresentativo: {},
      grupoDeTransporte: {},
    } as any;
    component.donanteDomicilio();
    expect(component.isValid(component.grupoReceptor, 'nombre')).toBe(true);
  });

  it('should get grupoDeTransporte', () => {
    component.solicitudState = {
      grupoReceptor: {},
      grupoDeDirecciones: {},
      grupoRepresentativo: {},
      grupoDeTransporte: {},
    } as any;
    component.donanteDomicilio();
    expect(component.grupoDeTransporte).toBeTruthy();
  });

  it('should get grupoReceptor', () => {
    component.solicitudState = {
      grupoReceptor: {},
      grupoDeDirecciones: {},
      grupoRepresentativo: {},
      grupoDeTransporte: {},
    } as any;
    component.donanteDomicilio();
    expect(component.grupoReceptor).toBeTruthy();
  });

  it('should get grupoDeDirecciones', () => {
    component.solicitudState = {
      grupoReceptor: {},
      grupoDeDirecciones: {},
      grupoRepresentativo: {},
      grupoDeTransporte: {},
    } as any;
    component.donanteDomicilio();
    expect(component.grupoDeDirecciones).toBeTruthy();
  });

  it('should get grupoRepresentativo', () => {
    component.solicitudState = {
      grupoReceptor: {},
      grupoDeDirecciones: {},
      grupoRepresentativo: {},
      grupoDeTransporte: {},
    } as any;
    component.donanteDomicilio();
    expect(component.grupoRepresentativo).toBeTruthy();
  });
});