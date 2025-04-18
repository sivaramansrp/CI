import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RetornoImportacionTemporalComponent } from './retorno-importacion-temporal-page.component';
import { WizardComponent } from '@ng-mf/data-access-user';
import { PASOS_REGISTRO } from '../../enum/retorno-importacion-temporal.enum';
import { AVISO } from '@ng-mf/data-access-user';

describe('RetornoImportacionTemporalComponent', () => {
  let component: RetornoImportacionTemporalComponent;
  let fixture: ComponentFixture<RetornoImportacionTemporalComponent>;
  let wizardComponentMock: jest.Mocked<WizardComponent>;

  beforeEach(async () => {
    wizardComponentMock = {
      siguiente: jest.fn(),
      atras: jest.fn(),
    } as unknown as jest.Mocked<WizardComponent>;

    await TestBed.configureTestingModule({
      declarations: [RetornoImportacionTemporalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RetornoImportacionTemporalComponent);
    component = fixture.componentInstance;
    component.wizardComponent = wizardComponentMock;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.infoAlert).toBe('alert-info');
    expect(component.TEXTOS).toBe(AVISO.Aviso);
    expect(component.pasos).toBe(PASOS_REGISTRO);
    expect(component.pantallasPasos).toBe(PASOS_REGISTRO);
    expect(component.indice).toBe(1);
    expect(component.datosPasos).toEqual({
      nroPasos: PASOS_REGISTRO.length,
      indice: 1,
      txtBtnAnt: 'Anterior',
      txtBtnSig: 'Continuar',
    });
  });

  it('should update the indice and call wizardComponent.siguiente when getValorIndice is called with "cont" action', () => {
    const mockEvent = { accion: 'cont', valor: 2 };

    component.getValorIndice(mockEvent);

    expect(component.indice).toBe(2);
    expect(wizardComponentMock.siguiente).toHaveBeenCalled();
    expect(wizardComponentMock.atras).not.toHaveBeenCalled();
  });

  it('should update the indice and call wizardComponent.atras when getValorIndice is called with non-"cont" action', () => {
    const mockEvent = { accion: 'ant', valor: 1 };

    component.getValorIndice(mockEvent);

    expect(component.indice).toBe(1);
    expect(wizardComponentMock.atras).toHaveBeenCalled();
    expect(wizardComponentMock.siguiente).not.toHaveBeenCalled();
  });

  it('should not update indice or call wizardComponent methods if valor is out of range', () => {
    const mockEvent = { accion: 'cont', valor: 0 };

    component.getValorIndice(mockEvent);

    expect(component.indice).toBe(1); 
    expect(wizardComponentMock.siguiente).not.toHaveBeenCalled();
    expect(wizardComponentMock.atras).not.toHaveBeenCalled();
  });
});