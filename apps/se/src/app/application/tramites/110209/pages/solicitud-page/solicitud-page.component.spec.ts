import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitudPageComponent } from './solicitud-page.component';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-wizard',
  template: ''
})
class MockWizardComponent {
  siguiente = jest.fn();
  atras = jest.fn();
}

describe('SolicitudPageComponent', () => {
  let component: SolicitudPageComponent;
  let fixture: ComponentFixture<SolicitudPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SolicitudPageComponent, MockWizardComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA] 
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitudPageComponent);
    component = fixture.componentInstance;
    component.wizardComponent = new MockWizardComponent() as any;
    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe mostrar u ocultar el formulario de mercancía y capturar el índice', () => {
    component.showMercancia(false, 2);
    expect(component.showMercanciaForm).toBe(false);
    expect(component.capturarTapIndice).toBe(2);

    component.showMercancia(true, 3);
    expect(component.showMercanciaForm).toBe(true);
    expect(component.capturarTapIndice).toBe(3);
  });

it('debe actualizar el índice y llamar siguiente en getValorIndice con acción "cont"', () => {
  const ACCION = { accion: 'cont', valor: 2 };
  component.wizardComponent = new MockWizardComponent() as any; 
  component.getValorIndice(ACCION);
  expect(component.indice).toBe(2);
  expect(component.wizardComponent.siguiente).toHaveBeenCalled();
});

it('debe actualizar el índice y llamar atras en getValorIndice con otra acción', () => {
  const ACCION = { accion: 'atras', valor: 3 };
  component.wizardComponent = new MockWizardComponent() as any; 
  component.getValorIndice(ACCION);
  expect(component.indice).toBe(3);
  expect(component.wizardComponent.atras).toHaveBeenCalled();
});

 it('no debe actualizar el índice ni llamar métodos si valor fuera de rango', () => {
  const ACCION = { accion: 'cont', valor: 0 };
  component.wizardComponent = new MockWizardComponent() as any;
  component.getValorIndice(ACCION);
  expect(component.indice).not.toBe(0);
  expect(component.wizardComponent.siguiente).not.toHaveBeenCalled();
  expect(component.wizardComponent.atras).not.toHaveBeenCalled();
});
});