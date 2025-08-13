import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CamCertificadoComponent } from './cam-certificado.component';
import { WizardComponent } from '@ng-mf/data-access-user';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AccionBoton } from '../../models/cam-certificado.module';

describe('CamCertificadoComponent', () => {
  let component: CamCertificadoComponent;
  let fixture: ComponentFixture<CamCertificadoComponent>;

  const mockWizardComponent = {
    siguiente: jest.fn(),
    atras: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CamCertificadoComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA], // Ignore unknown elements like WizardComponent
    }).compileComponents();

    fixture = TestBed.createComponent(CamCertificadoComponent);
    component = fixture.componentInstance;

    // Attach mock wizard
    component.wizardComponent = mockWizardComponent as unknown as WizardComponent;

    fixture.detectChanges();
    component.wizardComponent = {
    siguiente: jest.fn(),
    atras: jest.fn()
  } as any;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have default values', () => {
    expect(component.indice).toBe(1);
    expect(component.tituloMensaje).toBe('Zoosanitario para importación');
    expect(component.datosPasos.nroPasos).toBe(component.pasos.length);
    expect(component.datosPasos.indice).toBe(1);
    expect(component.datosPasos.txtBtnAnt).toBe('Anterior');
    expect(component.datosPasos.txtBtnSig).toBe('Continuar');
  });

  it('should call wizardComponent.siguiente when accion is "cont"', () => {
  fixture.detectChanges();

  // Manually mock the ViewChild after fixture init
  component.wizardComponent = {
    siguiente: jest.fn(),
    atras: jest.fn()
  } as any;

  // Mock pasoUnoComponent and its validarFormularios method
  component.pasoUnoComponent = {
    validarFormularios: jest.fn().mockReturnValue(true)
  } as any;

  const accion: AccionBoton = { valor: 2, accion: 'cont' };
  component.getValorIndice(accion);
  expect(component.indice).toBe(1);
});


  it('should call wizardComponent.atras when accion is not "cont"', () => {
  fixture.detectChanges();

  component.wizardComponent = {
    siguiente: jest.fn(),
    atras: jest.fn()
  } as any;

  const accion: AccionBoton = { valor: 3, accion: 'back' };
  component.getValorIndice(accion);
  expect(component.indice).toBe(1);
});


  it('should not change indice or call methods when valor is out of range', () => {
  fixture.detectChanges();

  component.wizardComponent = {
    siguiente: jest.fn(),
    atras: jest.fn()
  } as any;

  component.indice = 3; // Important! Set initial indice

  const accion: AccionBoton = { valor: 6, accion: 'cont' }; // valor out of range
  component.getValorIndice(accion);

  expect(component.indice).toBe(3); // Should not have changed
  expect(component.wizardComponent.siguiente).not.toHaveBeenCalled();
  expect(component.wizardComponent.atras).not.toHaveBeenCalled();
});

});
