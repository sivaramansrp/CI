import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitanteComponent } from './solicitante.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SolicitanteService } from '../../../../core/services/shared/solicitante/solicitante.service';
import { FormulariosService } from '../../../../core/services/shared/formularios/formularios.service';
import { of } from 'rxjs';
import { TIPO_PERSONA } from '../../../../shared/constantes/constantes';
import { DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_EXTRANJERA, DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL, PERSONA_FISICA_EXTRANJERO, PERSONA_MORAL_EXTRANJERO, PERSONA_MORAL_NACIONAL } from '../../../../shared/constantes/solicitante-constantes.enum';
import { FormularioDinamico } from '../../../../core/models/shared/forms-model';
import { JSONResponse } from '../../../../core/models/shared/catalogos.model';


// describe('SolicitanteComponent', () => {
//   let component: SolicitanteComponent;
//   let fixture: ComponentFixture<SolicitanteComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [SolicitanteComponent]
//     })
//     .compileComponents();
    
//     fixture = TestBed.createComponent(SolicitanteComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
// DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL,
// DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_EXTRANJERA,
// PERSONA_FISICA_EXTRANJERO,
// PERSONA_MORAL_EXTRANJERO,
// PERSONA_MORAL_NACIONAL,
// } from '../../../../shared/constantes/solicitante-constantes.enum';

describe('SolicitanteComponent', () => {
let component: SolicitanteComponent;
let fixture: ComponentFixture<SolicitanteComponent>;
let solicitanteService: jasmine.SpyObj<SolicitanteService>;
let formulariosService: jasmine.SpyObj<FormulariosService>;

beforeEach(async () => {
  const solicitanteServiceSpy = jasmine.createSpyObj('SolicitanteService', ['getDatosGenerales']);
  const formulariosServiceSpy = jasmine.createSpyObj('FormulariosService', ['obtenerNombresCamposForm', 'agregarValorCampoDesactivados']);

  await TestBed.configureTestingModule({
    declarations: [SolicitanteComponent],
    imports: [ReactiveFormsModule],
    providers: [
      FormBuilder,
      { provide: SolicitanteService, useValue: solicitanteServiceSpy },
      { provide: FormulariosService, useValue: formulariosServiceSpy }
    ]
  })
  .compileComponents();

  fixture = TestBed.createComponent(SolicitanteComponent);
  component = fixture.componentInstance;
  solicitanteService = TestBed.inject(SolicitanteService) as jasmine.SpyObj<SolicitanteService>;
  formulariosService = TestBed.inject(FormulariosService) as jasmine.SpyObj<FormulariosService>;
  fixture.detectChanges();
});

it('should create', () => {
  expect(component).toBeTruthy();
});

it('should set persona and domicilioFiscal for FISICA_NACIONAL', () => {
  component.obtenerTipoPersona(TIPO_PERSONA.FISICA_NACIONAL);
  expect(component.persona).toEqual(PERSONA_MORAL_NACIONAL);
  expect(component.domicilioFiscal).toEqual(DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL);
});

it('should set persona and domicilioFiscal for MORAL_NACIONAL', () => {
  component.obtenerTipoPersona(TIPO_PERSONA.MORAL_NACIONAL);
  expect(component.persona).toEqual(PERSONA_MORAL_NACIONAL);
  expect(component.domicilioFiscal).toEqual(DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL);
});

it('should set persona and domicilioFiscal for FISICA_EXTRANJERA', () => {
  component.obtenerTipoPersona(TIPO_PERSONA.FISICA_EXTRANJERA);
  expect(component.persona).toEqual(PERSONA_FISICA_EXTRANJERO);
  expect(component.domicilioFiscal).toEqual(DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_EXTRANJERA);
});

it('should set persona and domicilioFiscal for MORAL_EXTRANJERA', () => {
  component.obtenerTipoPersona(TIPO_PERSONA.MORAL_EXTRANJERA);
  expect(component.persona).toEqual(PERSONA_MORAL_EXTRANJERO);
  expect(component.domicilioFiscal).toEqual(DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_EXTRANJERA);
});

it('should create form with datosGenerales and domicilioFiscal groups', () => {
  component.crearFormulario();
  expect(component.form.contains('datosGenerales')).toBeTrue();
  expect(component.form.contains('domicilioFiscal')).toBeTrue();
});

it('should initialize form group with given config', () => {
  const config: Array<FormularioDinamico> = [
    {
      campo: 'nombre', validators: ['required'], disabled: false,
      labelNombre: '',
      class: '',
      tipo_input: ''
    },
    {
      campo: 'edad', validators: ['required', 'maxLength:3'], disabled: false,
      labelNombre: '',
      class: '',
      tipo_input: ''
    }
  ];
  component.crearFormulario();
  component.inicializarFormGroup(config, 'datosGenerales');
  const datosGeneralesForm = component.datosGeneralesForm;
  expect(datosGeneralesForm.contains('nombre')).toBeTrue();
  expect(datosGeneralesForm.contains('edad')).toBeTrue();
});

it('should get validators correctly', () => {
  const validators = component.getValidators(['required', 'maxLength:5', 'pattern:\\d+']);
  expect(validators.length).toBe(3);
});

it('should get datosGenerales correctly', () => {
  const mockResponse: JSONResponse = {
    id: 1,
    codigo: '200',
    descripcion: 'Success',
    data: JSON.stringify({
      datosSolicitante: {
        generales: { nombre: 'John', edad: '30' },
        domicilioFiscal: { direccion: '123 Street' }
      }
    })
  };
  solicitanteService.getDatosGenerales.and.returnValue(of(mockResponse));
  formulariosService.obtenerNombresCamposForm.and.returnValue(['nombre', 'edad']);
  formulariosService.obtenerNombresCamposForm.and.returnValue(['direccion']);

  component.getDatosGenerales();

  expect(solicitanteService.getDatosGenerales).toHaveBeenCalled();
  expect(formulariosService.obtenerNombresCamposForm).toHaveBeenCalled();
  expect(formulariosService.agregarValorCampoDesactivados).toHaveBeenCalledWith(component.datosGeneralesForm, 'nombre', 'John');
  expect(formulariosService.agregarValorCampoDesactivados).toHaveBeenCalledWith(component.datosGeneralesForm, 'edad', '30');
  expect(formulariosService.agregarValorCampoDesactivados).toHaveBeenCalledWith(component.domicilioFiscalForm, 'direccion', '123 Street');
});
});
