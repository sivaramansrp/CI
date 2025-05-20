import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitudPageComponent } from './solicitud-page.component';
import { WizardComponent } from '@ng-mf/data-access-user';
import { PASOS } from '@libs/shared/data-access-user/src/tramites/constantes/11105/pasos.enum';

describe('SolicitudPageComponent', () => {
  let component: SolicitudPageComponent;
  let fixture: ComponentFixture<SolicitudPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SolicitudPageComponent],
      imports: [], // Add necessary imports if required
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitudPageComponent);
    component = fixture.componentInstance;

    // Mock the wizardComponent
    component.wizardComponent = {
      siguiente: jest.fn(),
      atras: jest.fn(),
    } as unknown as WizardComponent;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize datosPasos correctly', () => {
    expect(component.datosPasos.nroPasos).toBe(PASOS.length);
    expect(component.datosPasos.indice).toBe(component.indice);
    expect(component.datosPasos.txtBtnAnt).toBe('Anterior');
    expect(component.datosPasos.txtBtnSig).toBe('Continuar');
  });

  it('should update indice when seleccionaTab is called', () => {
    component.seleccionaTab(3);
    expect(component.indice).toBe(3);
  });

  it('should call wizardComponent.siguiente when getValorIndice is called with accion "cont"', () => {
    const mockEvent = { accion: 'cont', valor: 2 };
    component.getValorIndice(mockEvent);
    expect(component.indice).toBe(2);
    expect(component.wizardComponent.siguiente).toHaveBeenCalled();
  });

  it('should call wizardComponent.atras when getValorIndice is called with accion other than "cont"', () => {
    const mockEvent = { accion: 'back', valor: 2 };
    component.getValorIndice(mockEvent);
    expect(component.indice).toBe(2);
    expect(component.wizardComponent.atras).toHaveBeenCalled();
  });

  it('should not update indice or call wizardComponent methods if valor is out of range', () => {
    const mockEvent = { accion: 'cont', valor: 6 };
    component.getValorIndice(mockEvent);
    expect(component.indice).not.toBe(6);
    expect(component.wizardComponent.siguiente).not.toHaveBeenCalled();
    expect(component.wizardComponent.atras).not.toHaveBeenCalled();
  });
});
