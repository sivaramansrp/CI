// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Directive, Input, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SustanciasQuimicasComponent } from './sustancias-quimicas.component';

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

describe('SustanciasQuimicasComponent', () => {
  let fixture: ComponentFixture<SustanciasQuimicasComponent>;
  let component: SustanciasQuimicasComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [
        SustanciasQuimicasComponent,
        TranslatePipe,
        PhoneNumberPipe,
        SafeHtmlPipe,
        MyCustomDirective
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(SustanciasQuimicasComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    if (component) {
      component.ngOnDestroy = () => {};
    }
    if (fixture) {
      fixture.destroy();
    }
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should run #getValorIndice() and call wizardComponent.siguiente()', () => {
    const siguienteMock = jest.fn();
    const atrasMock = jest.fn();

    component.wizardComponent = {
      siguiente: siguienteMock,
      atras: atrasMock,
    };

    component.getValorIndice = function(event: { valor: any, accion: string }) {
      if (event.accion === 'siguiente') {
        this.wizardComponent.siguiente();
      } else if (event.accion === 'atras') {
        this.wizardComponent.atras();
      }
    };

    component.getValorIndice({ valor: 'someValue', accion: 'siguiente' });

    expect(siguienteMock).toHaveBeenCalled();
    expect(atrasMock).not.toHaveBeenCalled();
  });
});
