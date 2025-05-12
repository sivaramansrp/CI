import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SolicitudPageComponent } from './solicitud-page.component';
import { TestBed } from '@angular/core/testing';

describe('SolicitudPageComponent', () => {
  let fixture;
  let component: SolicitudPageComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],
      declarations: [
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [

      ]
    }).overrideComponent(SolicitudPageComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(SolicitudPageComponent);
    component = fixture.debugElement.componentInstance;
  });


  it('debería ejecutar #constructor()', () => {
    expect(component).toBeTruthy();
  });

  it('debe ejecutar #seleccionaTab()', () => {

    component.seleccionaTab(1);

  });

  it('debería ejecutar #getValorIndice()', () => {
    component.wizardComponent = component.wizardComponent || {};
    component.wizardComponent.siguiente = jest.fn();
    component.wizardComponent.atras = jest.fn();
    component.getValorIndice({
      valor: 1,
      accion: 'cont'
    });
    expect(component.wizardComponent.siguiente).toHaveBeenCalled();
  });

  it('debe ejecutar #obtenerNombreDelTítulo()', () => {

    component.obtenerNombreDelTítulo(1);

  });

});