import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitudComponent } from './Solicitud.component';
import { FormBuilder, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Tramite570102Store } from '../state/Tramite570102.store';
import { Tramite570102Query } from '../state/Tramite570102.query';
import { ValidacionesFormularioService } from '@libs/shared/data-access-user/src';
import { ReplaySubject, of } from 'rxjs';

describe('SolicitudComponent', () => {
  let component: SolicitudComponent;
  let fixture: ComponentFixture<SolicitudComponent>;
  let store: Tramite570102Store;
  let query: Tramite570102Query;
  let validacionesService: ValidacionesFormularioService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [SolicitudComponent],
      providers: [
        FormBuilder,
        {
          provide: Tramite570102Store,
          useValue: {
            setMotivoDelDes: jest.fn(),
          },
        },
        {
          provide: Tramite570102Query,
          useValue: {
            selectSolicitud$: of({ motivoDelDes: 'Test motivo' }),
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

    fixture = TestBed.createComponent(SolicitudComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Tramite570102Store);
    query = TestBed.inject(Tramite570102Query);
    validacionesService = TestBed.inject(ValidacionesFormularioService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize solicitudForm in donanteDomicilio', () => {
    component.solicitudState = { motivoDelDes: 'Test motivo' };
    component.donanteDomicilio();
    expect(component.solicitudForm.get('motivoDelDes')?.value).toBe('Test motivo');
  });

  it('should mark all fields as touched if form is invalid in validarDestinatarioFormulario', () => {
    component.solicitudForm = new FormGroup({});
    const markAllAsTouchedSpy = jest.spyOn(component.solicitudForm, 'markAllAsTouched');
    component.validarDestinatarioFormulario();
    expect(markAllAsTouchedSpy).toHaveBeenCalled();
  });

  it('should return true if the field is valid in esValido', () => {
    const result = component.esValido(component.solicitudForm, 'motivoDelDes');
    expect(result).toBe(true);
    expect(validacionesService.isValid).toHaveBeenCalledWith(component.solicitudForm, 'motivoDelDes');
  });

  it('should update the store with the correct value in setValoresStore', () => {
    const setMotivoDelDesSpy = jest.spyOn(store, 'setMotivoDelDes');
    component.solicitudForm = new FormGroup({});
    component.solicitudForm.addControl('motivoDelDes', new FormBuilder().control('Nuevo motivo'));
    component.setValoresStore(component.solicitudForm, 'motivoDelDes', 'setMotivoDelDes');
    expect(setMotivoDelDesSpy).toHaveBeenCalledWith('Nuevo motivo');
  });

  it('should complete destroyed$ on ngOnDestroy', () => {
    const nextSpy = jest.spyOn(component.destroyed$, 'next');
    const completeSpy = jest.spyOn(component.destroyed$, 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalledWith(true);
    expect(completeSpy).toHaveBeenCalled();
  });

  it('should subscribe to query.selectSolicitud$ and set solicitudState on ngOnInit', () => {
    const solicitudState = { motivoDelDes: 'Test motivo' };
    jest.spyOn(query, 'selectSolicitud$', 'get').mockReturnValue(of(solicitudState));
    component.ngOnInit();
    expect(component.solicitudState).toEqual(solicitudState);
  });
});