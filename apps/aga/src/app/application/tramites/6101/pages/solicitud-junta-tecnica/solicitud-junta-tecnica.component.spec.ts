import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitudJuntaTecnicaComponent } from './solicitud-junta-tecnica.component';
import { WizardComponent } from '@ng-mf/data-access-user';
import { PASOS } from '@ng-mf/data-access-user';

describe('SolicitudJuntaTecnicaComponent', () => {
  let component: SolicitudJuntaTecnicaComponent;
  let fixture: ComponentFixture<SolicitudJuntaTecnicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SolicitudJuntaTecnicaComponent],
      providers: [],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudJuntaTecnicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize pasos with PASOS', () => {
    expect(component.pasos).toEqual(PASOS);
  });

  it('should initialize indice with 1', () => {
    expect(component.indice).toBe(1);
  });

  it('should initialize datosPasos correctly', () => {
    expect(component.datosPasos).toEqual({
      nroPasos: PASOS.length,
      indice: 1,
      txtBtnAnt: 'Anterior',
      txtBtnSig: 'Continuar',
    });
  });

  it('should update indice and call wizardComponent.siguiente when accion is "cont"', () => {
    const mockWizardComponent = {
      siguiente: jest.fn(),
      atras: jest.fn(),
    };
    component.wizardComponent = mockWizardComponent as unknown as WizardComponent;

    const evento = { accion: 'cont', valor: 2 };
    component.getValorIndice(evento);

    expect(component.indice).toBe(2);
    expect(mockWizardComponent.siguiente).toHaveBeenCalled();
  });

  it('should update indice and call wizardComponent.atras when accion is not "cont"', () => {
    const mockWizardComponent = {
      siguiente: jest.fn(),
      atras: jest.fn(),
    };
    component.wizardComponent = mockWizardComponent as unknown as WizardComponent;

    const evento = { accion: 'ant', valor: 0 };
    component.getValorIndice(evento);

    expect(component.indice).toBe(0);
    expect(mockWizardComponent.atras).toHaveBeenCalled();
  });
});