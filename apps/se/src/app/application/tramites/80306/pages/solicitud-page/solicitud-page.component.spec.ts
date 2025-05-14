import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SolicitudPageComponent } from './solicitud-page.component';

describe('SolicitudPageComponent', () => {
  let fixture: ComponentFixture<SolicitudPageComponent>;
  let component: { ngOnDestroy: () => void; seleccionaTab: (arg0: {}) => void; wizardComponent: { siguiente?: any; atras?: any; }; getValorIndice: (arg0: { valor: {}; accion: {}; }) => void; };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, ],
      declarations: [
        SolicitudPageComponent
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [],
    })
      .overrideComponent(SolicitudPageComponent, {})
      .compileComponents();
    fixture = TestBed.createComponent(SolicitudPageComponent);
    component = fixture.debugElement.componentInstance;
  });

  afterEach(() => {
    component.ngOnDestroy = function () {};
    fixture.destroy();
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #seleccionaTab()', async () => {
    component.seleccionaTab({});
  });

  it('should run #getValorIndice()', async () => {
    component.wizardComponent = component.wizardComponent || {};
    component.wizardComponent.siguiente = jest.fn();
    component.wizardComponent.atras = jest.fn();
    component.getValorIndice({
      valor: {},
      accion: {},
    });

  });
});
