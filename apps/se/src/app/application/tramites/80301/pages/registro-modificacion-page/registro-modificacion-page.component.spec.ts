import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroModificacionPageComponent } from './registro-modificacion-page.component';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AccionBoton, ListaPasosWizard } from '@libs/shared/data-access-user/src';
// 🔧 Mock de WizardComponent
@Component({
  selector: 'app-wizard',
  template: '',
})
class MockWizardComponent {
  @Input() listaPasos: ListaPasosWizard[] = [];
  siguiente = jest.fn();
  atras = jest.fn();
}

// 🔧 Mocks de pasos y botón
@Component({ selector: 'app-paso-uno', template: '' }) class MockPasoUno {}
@Component({ selector: 'app-paso-dos', template: '' }) class MockPasoDos {}
@Component({ selector: 'app-paso-tres', template: '' }) class MockPasoTres {}

@Component({
  selector: 'btn-continuar',
  template: '',
})
class MockBtnContinuar {
  @Input() datos: any;
  @Output() continuarEvento = new EventEmitter<AccionBoton>();
}

fdescribe('RegistroModificacionPageComponent', () => {
  let component: RegistroModificacionPageComponent;
  let fixture: ComponentFixture<RegistroModificacionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        RegistroModificacionPageComponent,
        MockWizardComponent,
        MockPasoUno,
        MockPasoDos,
        MockPasoTres,
        MockBtnContinuar,
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroModificacionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar con el paso 1', () => {
    expect(component.indice).toBe(1);
    expect(component.datosPasos.indice).toBe(1);
  });

  it('debería avanzar al siguiente paso cuando acción sea "cont"', () => {
    // Simular referencia al wizard
    component.wizardComponent = {
      siguiente: jest.fn(),
      atras: jest.fn()
    } as any;

    const action: AccionBoton = { valor: 2, accion: 'cont' };
    component.getValorIndice(action);

    expect(component.indice).toBe(2);
    expect(component.wizardComponent.siguiente).toHaveBeenCalled();
  });

  it('debería retroceder al paso anterior cuando acción sea "atras"', () => {
    component.wizardComponent = {
      siguiente: jest.fn(),
      atras: jest.fn()
    } as any;

    const action: AccionBoton = { valor: 1, accion: 'atras' };
    component.getValorIndice(action);

    expect(component.indice).toBe(1);
    expect(component.wizardComponent.atras).toHaveBeenCalled();
  });

  it('no debería cambiar de paso si el valor está fuera del rango permitido', () => {
    component.indice = 2;
    const action: AccionBoton = { valor: 10, accion: 'cont' };
    component.getValorIndice(action);

    // No debe cambiar el índice
    expect(component.indice).toBe(2);
  });
});
