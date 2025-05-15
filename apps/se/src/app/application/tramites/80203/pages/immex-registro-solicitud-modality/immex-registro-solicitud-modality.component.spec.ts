/* eslint-disable */// @ts-nocheck

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA, Directive, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ImmexRegistroSolicitudModalityComponent } from './immex-registro-solicitud-modality.component';

@Directive({ selector: '[myCustom]' })
class MyCustomDirective {
  @Input() myCustom: unknown; 
}

describe('ImmexRegistroSolicitudModalityComponent', () => {
  let fixture: ComponentFixture<ImmexRegistroSolicitudModalityComponent>;
  let component: {
    ngOnDestroy: () => void;
    title: (arg0: Record<string, unknown>) => void;
    wizardComponent: {
      siguiente?: () => void;
      atras?: () => void;
    };
    getValorIndice: (arg0: { valor: Record<string, unknown>; accion: Record<string, unknown> }) => void;
    obtenerNombreDelTítulo: (arg0: Record<string, unknown>) => void;
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [ImmexRegistroSolicitudModalityComponent, MyCustomDirective],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [],
    })
      .overrideComponent(ImmexRegistroSolicitudModalityComponent, {})
      .compileComponents();

    fixture = TestBed.createComponent(ImmexRegistroSolicitudModalityComponent);
    component = fixture.debugElement.componentInstance;
  });

  afterEach(() => {
    component.ngOnDestroy = () => {
        console.log('Component destroyed');
    };
    fixture.destroy();
  });


  it('should run #constructor()', () => {
    expect(component).toBeTruthy();
  });  

  it('should run #getValorIndice()', () => {
    component.wizardComponent = component.wizardComponent || {};
    component.wizardComponent.siguiente = jest.fn();
    component.wizardComponent.atras = jest.fn();
    component.getValorIndice({
      valor: {},
      accion: {},
    });
  });
});
