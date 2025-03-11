import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SolicitudModalidadPageComponent } from './solicitud-modalidad-page.component';
import { TestBed } from '@angular/core/testing';

describe('SolicitudModalidadPageComponent', () => {
  let fixture;
  let component: SolicitudModalidadPageComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, HttpClientTestingModule],
      declarations: [

      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        
      ]
    }).overrideComponent(SolicitudModalidadPageComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(SolicitudModalidadPageComponent);
    component = fixture.debugElement.componentInstance;
  });

  // eslint-disable-next-line require-await
  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  // eslint-disable-next-line require-await
  it('should run #getValorIndice()', async () => {
    component.wizardComponent = component.wizardComponent || {};
    component.wizardComponent.siguiente = jest.fn();
    component.wizardComponent.atras = jest.fn();
    component.getValorIndice({
      valor: 1,
      accion: 'cont'
    });
  });

});