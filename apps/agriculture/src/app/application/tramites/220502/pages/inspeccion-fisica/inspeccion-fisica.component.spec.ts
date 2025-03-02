import { ComponentFixture } from '@angular/core/testing';
import { DatosPasos } from '@ng-mf/data-access-user';
import { InspeccionFisicaComponent } from './inspeccion-fisica.component';
import { InspeccionFisicaPasos } from '@ng-mf/data-access-user';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { WizardComponent } from '@ng-mf/data-access-user';


describe('InspeccionFisicaComponent', () => {
  let component: InspeccionFisicaComponent;
  let fixture: ComponentFixture<InspeccionFisicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InspeccionFisicaComponent ],
      imports: [ WizardComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InspeccionFisicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize pasos with INSPECCIONFISIOPASOS', () => {
    expect(component.pasos).toEqual(InspeccionFisicaPasos);
  });

  it('should initialize datosPasos correctly', () => {
    const EXPECTEDDATOSPASOS: DatosPasos = {
      nroPasos: InspeccionFisicaPasos.length,
      indice: 1,
      txtBtnAnt: 'Anterior',
      txtBtnSig: 'Continuar'
    };
    expect(component.datosPasos).toEqual(EXPECTEDDATOSPASOS);
  });

  it('should update indice and call wizardComponent.siguiente on getValorIndice with accion "cont"', () => {
    component.wizardComponent = jasmine.createSpyObj('WizardComponent', ['siguiente', 'atras']);
    component.getValorIndice({ valor: 2, accion: 'cont' });
    expect(component.indice).toBe(2);
    expect(component.wizardComponent.siguiente).toHaveBeenCalled();
  });

  it('should update indice and call wizardComponent.atras on getValorIndice with accion "atras"', () => {
    component.wizardComponent = jasmine.createSpyObj('WizardComponent', ['siguiente', 'atras']);
    component.getValorIndice({ valor: 2, accion: 'atras' });
    expect(component.indice).toBe(2);
    expect(component.wizardComponent.atras).toHaveBeenCalled();
  });

  it('should not update indice or call wizardComponent methods if valor is out of range', () => {
    component.wizardComponent = jasmine.createSpyObj('WizardComponent', ['siguiente', 'atras']);
    component.getValorIndice({ valor: 0, accion: 'cont' });
    expect(component.indice).toBe(1);
    expect(component.wizardComponent.siguiente).not.toHaveBeenCalled();
    component.getValorIndice({ valor: 5, accion: 'atras' });
    expect(component.indice).toBe(1);
    expect(component.wizardComponent.atras).not.toHaveBeenCalled();
  });
});