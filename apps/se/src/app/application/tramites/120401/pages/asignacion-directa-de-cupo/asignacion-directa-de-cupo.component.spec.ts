// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AsignacionDirectaDeCupoComponent } from './asignacion-directa-de-cupo.component';

@Directive({ selector: '[myCustom]' })
class MyCustomDirective {
  @Input() myCustom;
}

@Pipe({ name: 'translate' })
class TranslatePipe implements PipeTransform {
  transform(value) { return value; }
}

@Pipe({ name: 'phoneNumber' })
class PhoneNumberPipe implements PipeTransform {
  transform(value) { return value; }
}

@Pipe({ name: 'safeHtml' })
class SafeHtmlPipe implements PipeTransform {
  transform(value) { return value; }
}

describe('AsignacionDirectaDeCupoComponent', () => {
  let fixture: ComponentFixture<AsignacionDirectaDeCupoComponent>;
  let component: AsignacionDirectaDeCupoComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [
        AsignacionDirectaDeCupoComponent,
        TranslatePipe, PhoneNumberPipe, SafeHtmlPipe,
        MyCustomDirective
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(AsignacionDirectaDeCupoComponent);
    component = fixture.debugElement.componentInstance;
  });

  afterEach(() => {
    component.ngOnDestroy = function () {};
    fixture.destroy();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('#getValorIndice', () => {
    beforeEach(() => {
      component.wizardComponent = {
        siguiente: jest.fn(),
        atras: jest.fn()
      };
    });

    it('should call siguiente if accion is "cont" and valor is valid', () => {
      const event = { valor: 2, accion: 'cont' };
      component.getValorIndice(event);
      expect(component.indice).toBe(2);
      expect(component.wizardComponent.siguiente).toHaveBeenCalled();
      expect(component.wizardComponent.atras).not.toHaveBeenCalled();
    });

    it('should call atras if accion is not "cont" and valor is valid', () => {
      const event = { valor: 3, accion: 'back' };
      component.getValorIndice(event);
      expect(component.indice).toBe(3);
      expect(component.wizardComponent.atras).toHaveBeenCalled();
      expect(component.wizardComponent.siguiente).not.toHaveBeenCalled();
    });

    it('should not call anything if valor is 0 (invalid)', () => {
      const event = { valor: 0, accion: 'cont' };
      component.getValorIndice(event);
      expect(component.indice).not.toBe(0);
      expect(component.wizardComponent.siguiente).not.toHaveBeenCalled();
      expect(component.wizardComponent.atras).not.toHaveBeenCalled();
    });

    it('should not call anything if valor is 5 (out of range)', () => {
      const event = { valor: 5, accion: 'cont' };
      component.getValorIndice(event);
      expect(component.indice).not.toBe(5);
      expect(component.wizardComponent.siguiente).not.toHaveBeenCalled();
      expect(component.wizardComponent.atras).not.toHaveBeenCalled();
    });
  });
});
