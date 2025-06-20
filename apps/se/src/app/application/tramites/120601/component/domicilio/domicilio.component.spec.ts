import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DomicilioComponent } from './domicilio.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of, Subscription } from 'rxjs';
import { SolicitanteService } from '@ng-mf/data-access-user';
import { FormulariosService } from '@ng-mf/data-access-user';
import { TIPO_PERSONA, CATALOGOS_ID, DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL, DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_EXTRANJERA } from '@ng-mf/data-access-user';

jest.mock('@ng-mf/data-access-user', () => ({
  ...jest.requireActual('@ng-mf/data-access-user'),
  FormulariosService: {
    obtenerNombresCamposForm: jest.fn(),
    agregarValorCampoDesactivado: jest.fn(),
  }
}));

describe('DomicilioComponent', () => {
  let component: DomicilioComponent;
  let fixture: ComponentFixture<DomicilioComponent>;
  let mockSolicitanteService: any;

  beforeEach(async () => {
    mockSolicitanteService = {
      getDatosGenerales: jest.fn().mockReturnValue(of({
        data: JSON.stringify({
          domicilioFiscal: { campo1: 'valor1', campo2: 'valor2' }
        })
      }))
    };

    (FormulariosService.obtenerNombresCamposForm as jest.Mock).mockReturnValue(['campo1', 'campo2']);
    (FormulariosService.agregarValorCampoDesactivado as jest.Mock).mockImplementation(() => {});

    await TestBed.configureTestingModule({
      imports: [DomicilioComponent, ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: SolicitanteService, useValue: mockSolicitanteService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(DomicilioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe inicializar tipoPersona y domicilioFiscal para FISICA_NACIONAL', () => {
    expect(component.tipoPersona).toBe(TIPO_PERSONA.FISICA_NACIONAL);
    expect(component.domicilioFiscal).toBe(DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL);
  });

  it('debe crear el formulario con el grupo domicilioFiscal', () => {
    expect(component.form).toBeDefined();
    expect(component.form.get('domicilioFiscal')).toBeDefined();
  });

  it('debe inicializar los controles del formulario dinámicamente', () => {
    const config = [
      { campo: 'campoA', validators: ['required'], disabled: false, labelNombre: '', class: '', tipo_input: '' },
      { campo: 'campoB', validators: ['maxLength:10'], disabled: true, labelNombre: '', class: '', tipo_input: '' }
    ];
    component.form = new FormBuilder().group({ domicilioFiscal: new FormBuilder().group({}) });
    component.inicializarFormGroup(config, 'domicilioFiscal');
    const group = component.form.get('domicilioFiscal');
    expect(group?.get('campoA')).toBeDefined();
    expect(group?.get('campoB')).toBeDefined();
    expect(group?.get('campoA')?.enabled).toBe(true);
    expect(group?.get('campoB')?.disabled).toBe(true);
  });

  it('getValidators debe mapear los validadores string a ValidatorFns de Angular', () => {
    const validators = DomicilioComponent.getValidators(['required', 'maxLength:5', 'pattern:^\\d+$']);
    expect(validators.length).toBe(3);
    expect(validators[0]).toBe(Validators.required);
    expect(typeof validators[1]).toBe('function');
    expect(typeof validators[2]).toBe('function');
  });

  it('debe llamar a getDatosGenerales en ngOnInit y actualizar los valores del formulario', () => {
    component.domicilioFiscal = [
      {
        campo: 'campo1', validators: [], disabled: false,
        labelNombre: '',
        class: '',
        tipo_input: ''
      },
      {
        campo: 'campo2', validators: [], disabled: false,
        labelNombre: '',
        class: '',
        tipo_input: ''
      }
    ];
    component.form = new FormBuilder().group({ domicilioFiscal: new FormBuilder().group({ campo1: '', campo2: '' }) });
    component.ngOnInit();
    expect(mockSolicitanteService.getDatosGenerales).toHaveBeenCalledWith(CATALOGOS_ID.DATOS_PERSONA_FISICA);
    expect(FormulariosService.obtenerNombresCamposForm).toHaveBeenCalled();
    expect(FormulariosService.agregarValorCampoDesactivado).toHaveBeenCalledWith(expect.anything(), 'campo1', 'valor1');
    expect(FormulariosService.agregarValorCampoDesactivado).toHaveBeenCalledWith(expect.anything(), 'campo2', 'valor2');
  });

  it('debe establecer tipoPersona y domicilioFiscal para MORAL_NACIONAL', () => {
    component.obtenerTipoPersona(TIPO_PERSONA.MORAL_NACIONAL);
    expect(component.tipoPersona).toBe(TIPO_PERSONA.MORAL_NACIONAL);
    expect(component.domicilioFiscal).toBe(DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL);
  });

  it('debe establecer tipoPersona y domicilioFiscal para EXTRANJERA', () => {
    component.obtenerTipoPersona(999);
    expect(component.tipoPersona).toBe(999);
    expect(component.domicilioFiscal).toBe(DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_EXTRANJERA);
  });

  it('debe retornar el getter domicilioFiscalForm', () => {
    const group = new FormBuilder().group({});
    component.form = new FormBuilder().group({ domicilioFiscal: group });
    expect(component.domicilioFiscalForm).toBe(group);
  });

  it('debe desuscribirse en ngOnDestroy', () => {
    const sub = new Subscription();
    const unsubSpy = jest.spyOn(sub, 'unsubscribe');
    (component as any).subscription = sub;
    component.ngOnDestroy();
    expect(unsubSpy).toHaveBeenCalled();
  });
});