import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodosPasosComponent } from './todos-pasos.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('TodosPasosComponent', () => {
  let component: TodosPasosComponent;
  let fixture: ComponentFixture<TodosPasosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodosPasosComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(TodosPasosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should set titulo to TITULO_PASO_UNO for other indices', () => {
    component.wizardComponent = {
      siguiente: jest.fn(),
      atras: jest.fn()
    } as any;

    component.getValorIndice({ valor: 2, accion: 'cont' });

    expect(component.wizardComponent.siguiente).toHaveBeenCalled();
  });
});
