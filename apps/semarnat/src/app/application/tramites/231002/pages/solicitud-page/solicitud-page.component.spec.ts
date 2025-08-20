import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitudPageComponent } from './solicitud-page.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { WizardComponent, AccionBoton } from '@libs/shared/data-access-user/src';

describe('SolicitudPageComponent', () => {
  let component: SolicitudPageComponent;
  let fixture: ComponentFixture<SolicitudPageComponent>;
  let mockWizardComponent: WizardComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SolicitudPageComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA], // Ignores <app-wizard> or similar in HTML
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitudPageComponent);
    component = fixture.componentInstance;

    // Force trigger change detection so ngOnInit runs
    fixture.detectChanges();

    mockWizardComponent = {
      siguiente: jest.fn(),
      atras: jest.fn(),
    } as unknown as WizardComponent;

    component.wizardComponent = mockWizardComponent;
  });

  it('debería crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debería llamar a wizardComponent.siguiente() si la acción es "cont"', () => {
    const evento: AccionBoton = { accion: 'cont', valor: 2 };

    component.getValorIndice(evento);

    expect(mockWizardComponent.siguiente).toHaveBeenCalled();
    expect(component.indice).toBe(2);
  });

  it('debería llamar a wizardComponent.atras() si la acción no es "cont"', () => {
    const evento: AccionBoton = { accion: 'back', valor: 3 };

    component.getValorIndice(evento);

    expect(mockWizardComponent.atras).toHaveBeenCalled();
    expect(component.indice).toBe(3);
  });

  it('no debería hacer nada si el valor está fuera del rango válido', () => {
    const evento: AccionBoton = { accion: 'cont', valor: 6 };

    component.getValorIndice(evento);

    expect(mockWizardComponent.siguiente).not.toHaveBeenCalled();
    expect(mockWizardComponent.atras).not.toHaveBeenCalled();
    expect(component.indice).toBe(1); // valor inicial
  });
});
