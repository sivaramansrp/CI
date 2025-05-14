import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { SolicitudPageComponent } from './solicitud-page.component';
import { WizardComponent } from '@ng-mf/data-access-user';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { PasoDosComponent } from '../paso-dos/paso-dos.component';
import { PasoTresComponent } from '../paso-tres/paso-tres.component';
import { BtnContinuarComponent } from '@ng-mf/data-access-user';

describe('SolicitudPageComponent', () => {
  let component: SolicitudPageComponent;
  let fixture: ComponentFixture<SolicitudPageComponent>;
  let wizardMock: WizardComponent;

  beforeEach(async () => {
    wizardMock = jasmine.createSpyObj('WizardComponent', ['siguiente', 'atras'])

    await TestBed.configureTestingModule({
      imports: [
        WizardComponent,
        PasoUnoComponent,
        PasoDosComponent,
        PasoTresComponent,
        BtnContinuarComponent,
        SolicitudPageComponent
      ],
      declarations: [],
      providers:[{ provide: WizardComponent, useValue: wizardMock }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SolicitudPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.wizardComponent = wizardMock;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not update indice for invalid tab values', () => {
    component.seleccionaTab(-1);
    expect(component.indice).not.toBe(-1);
  });
  
  it('should handle edge cases for getValorIndice', () => {
    const invalidEvent = { accion: 'invalid', valor: 5 };
    component.getValorIndice(invalidEvent);
    expect(component.indice).not.toBe(5);
  
    const nullActionEvent = { accion: 'cont', valor: 2 };
    component.getValorIndice(nullActionEvent);
    expect(wizardMock.atras).toHaveBeenCalled();
    expect(component.indice).toBe(2);
  });
  
});