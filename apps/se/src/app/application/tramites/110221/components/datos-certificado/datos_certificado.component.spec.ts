import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosCertificadoComponent } from './datos_certificado.component';
import { ReactiveFormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { RegistroService } from '../../services/registro.service';
import { ValidacionesFormularioService } from '@libs/shared/data-access-user/src';
import { Tramite110221Query } from '../../../../estados/queries/Tramite110221.query';
import { Tramite110221Store } from '../../../../estados/tramites/Tramite110221.store';

describe('DatosCertificadoComponent', () => {
  let component: DatosCertificadoComponent;
  let fixture: ComponentFixture<DatosCertificadoComponent>;
  let registroServiceMock: any;
  let storeMock: any;
  let queryMock: any;
  let validacionesServiceMock: any;

  beforeEach(async () => {
    registroServiceMock = {
      getIdioma: jest.fn().mockReturnValue(of({ code: 200, data: [] })),
      getEntidad: jest.fn().mockReturnValue(of({ code: 200, data: [] })),
      getRepresentacion: jest.fn().mockReturnValue(of({ code: 200, data: [] })),
    };

    storeMock = {
      setEntidad: jest.fn(),
      setIdioma: jest.fn(),
      setRepresentacion: jest.fn(),
    };

    queryMock = {
      selectSolicitud$: of({}),
    };

    validacionesServiceMock = {
      isValid: jest.fn().mockReturnValue(true),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, DatosCertificadoComponent],
      providers: [
        { provide: RegistroService, useValue: registroServiceMock },
        { provide: Tramite110221Store, useValue: storeMock },
        { provide: Tramite110221Query, useValue: queryMock },
        { provide: ValidacionesFormularioService, useValue: validacionesServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosCertificadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize catalogs on ngOnInit', () => {
    const getIdiomaSpy = jest.spyOn(component, 'getIdioma');
    const getEntidadSpy = jest.spyOn(component, 'getEntidad');
    const getRepresentacionSpy = jest.spyOn(component, 'getRepresentacion');

    component.ngOnInit();

    expect(getIdiomaSpy).toHaveBeenCalled();
    expect(getEntidadSpy).toHaveBeenCalled();
    expect(getRepresentacionSpy).toHaveBeenCalled();
  });

  it('should validate the form and mark all fields as touched if invalid', () => {
    component.registroForm = component.fb.group({
      validacionForm: component.fb.group({
        observaciones: [''],
        idioma: [''],
        entidad: [''],
        representacion: [''],
        casillaVerificacion: [''],
        justificacion: [''],
      }),
    });

    component.validarDestinatarioFormulario();

    expect(component.registroForm.touched).toBeTruthy();
  });

  it('should call registroService.getIdioma and set optionsIdioma', () => {
    component.getIdioma();
    expect(registroServiceMock.getIdioma).toHaveBeenCalled();
    expect(component.optionsIdioma).toEqual([]);
  });

  it('should call registroService.getEntidad and set optionsEntidad', () => {
    component.getEntidad();
    expect(registroServiceMock.getEntidad).toHaveBeenCalled();
    expect(component.optionsEntidad).toEqual([]);
  });

  it('should call registroService.getRepresentacion and set optionsRepresentacion', () => {
    component.getRepresentacion();
    expect(registroServiceMock.getRepresentacion).toHaveBeenCalled();
    expect(component.optionsRepresentacion).toEqual([]);
  });

  it('should set isJustificacion to true if conditions are met in setValoresStore', () => {
    component.entidadFederativaData = 'DURANGO';
    component.setValoresStore(component.fb.group({ entidad: ['8'] }), 'entidad', 'setEntidad');
    expect(component.isJustificacion).toBe(true);
  });

  it('should set isJustificacion to false if conditions are not met in setValoresStore', () => {
    component.entidadFederativaData = 'OTHER';
    component.setValoresStore(component.fb.group({ entidad: ['1'] }), 'entidad', 'setEntidad');
    expect(component.isJustificacion).toBe(false);
  });

  it('should destroy subscriptions on ngOnDestroy', () => {
    const destroyNotifierSpy = jest.spyOn(component.destroyNotifier$, 'next');
    const destroyNotifierCompleteSpy = jest.spyOn(component.destroyNotifier$, 'complete');

    component.ngOnDestroy();

    expect(destroyNotifierSpy).toHaveBeenCalled();
    expect(destroyNotifierCompleteSpy).toHaveBeenCalled();
  });

  it('should validate a form field using isValid', () => {
    const form = component.fb.group({ field: ['value'] });
    const result = component.isValid(form, 'field');
    expect(validacionesServiceMock.isValid).toHaveBeenCalledWith(form, 'field');
    expect(result).toBe(true);
  });
});