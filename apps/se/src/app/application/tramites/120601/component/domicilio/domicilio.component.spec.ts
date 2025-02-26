import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DomicilioComponent } from './Domicilio.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';

import { SolicitanteService } from '@ng-mf/data-access-user';
import { FormulariosService } from '@ng-mf/data-access-user';

import { TIPO_PERSONA } from '@ng-mf/data-access-user';
import { DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL, DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_EXTRANJERA } from 'libs/shared/data-access-user/src/tramites/constantes/solicitante-constantes.enum';

describe('DomicilioComponent', () => {
  let component: DomicilioComponent;
  let fixture: ComponentFixture<DomicilioComponent>;
  let solicitanteServiceSpy: jasmine.SpyObj<SolicitanteService>;
  let formulariosServiceSpy: jasmine.SpyObj<FormulariosService>;

  beforeEach(async () => {
    const solicitanteSpy = jasmine.createSpyObj('SolicitanteService', ['getDatosGenerales']);
    const formulariosSpy = jasmine.createSpyObj('FormulariosService', ['obtenerNombresCamposForm', 'agregarValorCampoDesactivados']);

    await TestBed.configureTestingModule({
      declarations: [DomicilioComponent],
      imports: [CommonModule, ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: SolicitanteService, useValue: solicitanteSpy },
        { provide: FormulariosService, useValue: formulariosSpy },
      ]
    }).compileComponents();

    solicitanteServiceSpy = TestBed.inject(SolicitanteService) as jasmine.SpyObj<SolicitanteService>;
    formulariosServiceSpy = TestBed.inject(FormulariosService) as jasmine.SpyObj<FormulariosService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DomicilioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form correctly', () => {
    expect(component.form).toBeDefined();
    expect(component.form.get('domicilioFiscal')).toBeDefined();
  });

  it('should set tipoPersona and domicilioFiscal correctly', () => {
    component.obtenerTipoPersona(TIPO_PERSONA.FISICA_NACIONAL);
    expect(component.tipoPersona).toBe(TIPO_PERSONA.FISICA_NACIONAL);
    expect(component.domicilioFiscal).toBe(DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL);
  });

  it('should set domicilioFiscal for foreign persons', () => {
    component.obtenerTipoPersona(TIPO_PERSONA.EXTRANJERA);
    expect(component.tipoPersona).toBe(TIPO_PERSONA.EXTRANJERA);
    expect(component.domicilioFiscal).toBe(DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_EXTRANJERA);
  });

  it('should return FormGroup for domicilioFiscalForm', () => {
    expect(component.domicilioFiscalForm).toBeDefined();
    expect(component.domicilioFiscalForm instanceof Object).toBeTrue();
  });

  it('should initialize form controls dynamically', () => {
    const mockConfig = [{ campo: 'direccion', validators: ['required'], disabled: false }];
    component.inicializarFormGroup(mockConfig, 'domicilioFiscal');

    expect(component.form.get('domicilioFiscal.direccion')).toBeDefined();
    expect(component.form.get('domicilioFiscal.direccion')?.validator).toBeTruthy();
  });

  it('should call getDatosGenerales on initialization', () => {
    solicitanteServiceSpy.getDatosGenerales.and.returnValue(of({ data: JSON.stringify({ domicilioFiscal: { direccion: 'Test Address' } }) }));
    component.getDatosGenerales();
    
    expect(solicitanteServiceSpy.getDatosGenerales).toHaveBeenCalled();
  });

  it('should map string validators correctly', () => {
    const validators = component.getValidators(['required', 'maxLength:50', 'pattern:^[a-zA-Z]+$']);
    
    expect(validators.length).toBe(3);
  });
});
