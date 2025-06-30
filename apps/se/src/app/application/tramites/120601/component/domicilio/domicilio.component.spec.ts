import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { DomicilioComponent } from './domicilio.component';
import {
  SolicitanteService,
  FormulariosService,
  TIPO_PERSONA,
  CATALOGOS_ID,
  DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL,
  DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_EXTRANJERA
} from '@ng-mf/data-access-user';

describe('DomicilioComponent', () => {
  let component: DomicilioComponent;
  let fixture: ComponentFixture<DomicilioComponent>;
  let solicitanteServiceMock: any;

  beforeEach(async () => {
    solicitanteServiceMock = {
      getDatosGenerales: jest.fn().mockReturnValue(of({
        data: JSON.stringify({
          domicilioFiscal: {
            calle: 'Calle 1',
            numero: '123',
            colonia: 'Centro'
          }
        })
      }))
    };

    jest.spyOn(FormulariosService, 'obtenerNombresCamposForm').mockReturnValue(['calle', 'numero', 'colonia']);
    jest.spyOn(FormulariosService, 'agregarValorCampoDesactivado').mockImplementation(() => {});

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule , DomicilioComponent],
      declarations: [],
      providers: [
        FormBuilder,
        { provide: SolicitanteService, useValue: solicitanteServiceMock }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(DomicilioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe inicializar tipoPersona y domicilioFiscal como nacional por defecto', () => {
    expect(component.tipoPersona).toBe(TIPO_PERSONA.FISICA_NACIONAL);
    expect(component.domicilioFiscal).toBe(DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL);
  });

  it('debe establecer domicilioFiscal a la configuración extranjera cuando tipoPersona es extranjera', () => {
    component.obtenerTipoPersona(TIPO_PERSONA.FISICA_EXTRANJERA);
    expect(component.domicilioFiscal).toBe(DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_EXTRANJERA);
  });

  it('debe llamar a getDatosGenerales en ngOnInit', () => {
    const spy = jest.spyOn(component, 'getDatosGenerales');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('debe desuscribirse en ngOnDestroy', () => {
    if (component['subscription']) {
      const spy = jest.spyOn(component['subscription'], 'unsubscribe');
      component.ngOnDestroy();
      expect(spy).toHaveBeenCalled();
    } else {
      expect(() => component.ngOnDestroy()).not.toThrow();
    }
  });

  it('debe llamar a agregarValorCampoDesactivado por cada campo en getDatosGenerales', () => {
    component.getDatosGenerales();
    expect(FormulariosService.agregarValorCampoDesactivado).toHaveBeenCalledWith(
      component.domicilioFiscalForm,
      'calle',
      'Calle 1'
    );
    expect(FormulariosService.agregarValorCampoDesactivado).toHaveBeenCalledWith(
      component.domicilioFiscalForm,
      'numero',
      '123'
    );
    expect(FormulariosService.agregarValorCampoDesactivado).toHaveBeenCalledWith(
      component.domicilioFiscalForm,
      'colonia',
      'Centro'
    );
  });

});