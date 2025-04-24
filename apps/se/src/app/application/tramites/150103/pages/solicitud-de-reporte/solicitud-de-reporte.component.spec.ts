
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SolicitudDeReporteComponent } from './solicitud-de-reporte.component';

@Directive({ selector: '[myCustom]' })
class MyCustomDirective {}



describe('SolicitudDeReporteComponent', () => {
  let fixture: ComponentFixture<SolicitudDeReporteComponent>;
  let component: { ngOnDestroy: () => void; wizardComponent: { siguiente?: any; atras?: any; }; getValorIndice: (arg0: { valor: {}; accion: {}; }) => void; };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],
      declarations: [
        SolicitudDeReporteComponent,
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [

      ]
    }).overrideComponent(SolicitudDeReporteComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(SolicitudDeReporteComponent);
    component = fixture.debugElement.componentInstance;
  });

  afterEach(() => {
    component.ngOnDestroy = function() {};
    fixture.destroy();
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #getValorIndice()', async () => {
    component.wizardComponent = component.wizardComponent || {};
    component.wizardComponent.siguiente = jest.fn();
    component.wizardComponent.atras = jest.fn();
    component.getValorIndice({
      valor: {},
      accion: {}
    });
    expect(component.wizardComponent.siguiente).toHaveBeenCalled();
    expect(component.wizardComponent.atras).toHaveBeenCalled();
  });

});