import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodospasosComponent } from './todospasos.component';
import { WizardComponent } from '@libs/shared/data-access-user/src';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PANTA_PASOS, TITULO_PASO_DOS, TITULO_PASO_TRES, TITULO_PASO_UNO } from '../../services/certificados-licencias.enum';


@Component({selector: 'app-wizard', template: ''})
class MockWizardComponent {
  @Input() listaPasos: any;
  siguiente = jest.fn();
  atras = jest.fn();
}

@Component({selector: 'app-paso-uno', template: ''})
class MockPasoUnoComponent {}

@Component({selector: 'app-paso-dos', template: ''})
class MockPasoDosComponent {}

@Component({selector: 'app-paso-tres', template: ''})
class MockPasoTresComponent {}

@Component({selector: 'btn-continuar', template: ''})
class MockBtnContinuarComponent {
  @Input() datos: any;
  @Output() continuarEvento = new EventEmitter<any>();
}

describe('TodospasosComponent', () => {
  let component: TodospasosComponent;
  let fixture: ComponentFixture<TodospasosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TodospasosComponent,
        MockWizardComponent,
        MockPasoUnoComponent,
        MockPasoDosComponent,
        MockPasoTresComponent,
        MockBtnContinuarComponent
      ],
      providers: []
    })
    .overrideComponent(TodospasosComponent, {
      set: {
        
        template: `<app-wizard [listaPasos]="pantallasPasos"></app-wizard>`
      }
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodospasosComponent);
    component = fixture.componentInstance;
    
    component.wizardComponent = {
      siguiente: jest.fn(),
      atras: jest.fn()
    } as any;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar con los valores por defecto correctos', () => {
    expect(component.indice).toBe(1);
    expect(component.titulo).toBe(TITULO_PASO_UNO);
    expect(component.datosPasos.nroPasos).toBe(component.pantallasPasos.length);
    expect(component.datosPasos.indice).toBe(1);
    expect(component.datosPasos.txtBtnAnt).toBe('Anterior');
    expect(component.datosPasos.txtBtnSig).toBe('Continuar');
  });

  it('debería establecer titulo a TITULO_PASO_TRES y llamar atras en getValorIndice con indice 3 y accion diferente a cont', () => {
    // Ensure wizardComponent is defined with mock methods
    component.wizardComponent = {
      siguiente: jest.fn(),
      atras: jest.fn()
    } as any;

    const event = { valor: 3, accion: 'back' };
    component.getValorIndice(event as any);
    expect(component.indice).toBe(3);
    expect(component.titulo).toBe(TITULO_PASO_TRES);
    expect(component.wizardComponent.atras).toHaveBeenCalled();
  });

  it('debería establecer titulo a TITULO_PASO_UNO para otros índices', () => {
    // Ensure wizardComponent is defined with mock methods
    component.wizardComponent = {
      siguiente: jest.fn(),
      atras: jest.fn()
    } as any;

    const event = { valor: 1, accion: 'cont' };
    component.getValorIndice(event as any);
    expect(component.indice).toBe(1);
    expect(component.titulo).toBe(TITULO_PASO_UNO);
    expect(component.wizardComponent.siguiente).toHaveBeenCalled();
  });

  it('no debería cambiar indice ni llamar métodos del wizard si valor está fuera de rango', () => {
    // Aseguramos que wizardComponent esté definido y sus métodos sean mocks
    component.wizardComponent = {
      siguiente: jest.fn(),
      atras: jest.fn()
    } as any;

    const event = { valor: 0, accion: 'cont' };
    component.getValorIndice(event as any);
    expect(component.indice).toBe(1); 
    expect(component.wizardComponent.siguiente).not.toHaveBeenCalled();
    expect(component.wizardComponent.atras).not.toHaveBeenCalled();

    const event2 = { valor: 5, accion: 'cont' };
    component.getValorIndice(event2 as any);
    expect(component.indice).toBe(1); 
    expect(component.wizardComponent.siguiente).not.toHaveBeenCalled();
    expect(component.wizardComponent.atras).not.toHaveBeenCalled();
  });
 
});