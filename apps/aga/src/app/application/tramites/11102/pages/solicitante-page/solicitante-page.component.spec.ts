import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitantePageComponent } from './solicitante-page.component';
import { WizardComponent } from '@ng-mf/data-access-user';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BtnContinuarComponent } from '@ng-mf/data-access-user';
import { PasoUnoComponent } from '../../../11102/pages/paso-uno/paso-uno.component';
import { PasoDosComponent } from '../../../11102/pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from '../../../11102/pages/paso-tres/paso-tres.component';
import { PASOS } from '../../constants/pasos.enum';

describe('SolicitantePageComponent', () => {
  let component: SolicitantePageComponent;
  let fixture: ComponentFixture<SolicitantePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        BtnContinuarComponent,
        PasoUnoComponent,
        PasoDosComponent,
        PasoTresComponent,
        WizardComponent,
      ],
      declarations: [SolicitantePageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitantePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.indice).toBe(1);
    expect(component.pasos).toBe(PASOS);
    expect(component.datosPasos.nroPasos).toBe(PASOS.length);
    expect(component.datosPasos.indice).toBe(1);
    expect(component.datosPasos.txtBtnAnt).toBe('Anterior');
    expect(component.datosPasos.txtBtnSig).toBe('Continuar');
  });

  it('should update indice when seleccionaTab is called', () => {
    component.seleccionaTab(3);
    expect(component.indice).toBe(3);
  });

  it('should update indice and call wizardComponent.siguiente when getValorIndice is called with "cont"', () => {
    component.wizardComponent = {
      siguiente: jest.fn(),
      atras: jest.fn(),
    } as unknown as WizardComponent;

    const wizardSpy = jest.spyOn(component.wizardComponent, 'siguiente');
    component.getValorIndice({ accion: 'cont', valor: 2 });

    expect(component.indice).toBe(2);
    expect(component.datosPasos.indice).toBe(2);
    expect(wizardSpy).toHaveBeenCalled();
  });

  it('should update indice and call wizardComponent.atras when getValorIndice is called with "ant"', () => {
    component.wizardComponent = {
      siguiente: jest.fn(),
      atras: jest.fn(),
    } as unknown as WizardComponent;

    const wizardSpy = jest.spyOn(component.wizardComponent, 'atras');
    component.getValorIndice({ accion: 'ant', valor: 2 });

    expect(component.indice).toBe(2);
    expect(component.datosPasos.indice).toBe(2);
    expect(wizardSpy).toHaveBeenCalled();
  });

  it('should not update indice or call wizardComponent methods if valor is out of range', () => {
    component.wizardComponent = {
      siguiente: jest.fn(),
      atras: jest.fn(),
    } as unknown as WizardComponent;

    const siguienteSpy = jest.spyOn(component.wizardComponent, 'siguiente');
    const atrasSpy = jest.spyOn(component.wizardComponent, 'atras');

    component.getValorIndice({ accion: 'cont', valor: 0 });
    expect(component.indice).toBe(1);
    expect(siguienteSpy).not.toHaveBeenCalled();
    expect(atrasSpy).not.toHaveBeenCalled();

    component.getValorIndice({ accion: 'ant', valor: 6 });
    expect(component.indice).toBe(1);
    expect(siguienteSpy).not.toHaveBeenCalled();
    expect(atrasSpy).not.toHaveBeenCalled();
  });

  it('should call getValorIndice with correct parameters when continuar is called', () => {
    const getValorIndiceSpy = jest.spyOn(component, 'getValorIndice');
    component.indice = 2;

    component.continuar();

    expect(getValorIndiceSpy).toHaveBeenCalledWith({
      accion: 'cont',
      valor: 3,
    });
  });
});
