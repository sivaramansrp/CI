// @ts-nocheck
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SolicitantePageComponent } from './solicitante-page.component';

describe('SolicitantePageComponent', () => {
  let fixture: ComponentFixture<SolicitantePageComponent>;
  let component: SolicitantePageComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        SolicitantePageComponent
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: []
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitantePageComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #seleccionaTab()', async () => {
    component.seleccionaTab({});
  });

  it('should run #getValorIndice()', async () => {
    component.obtenerNombreDelTítulo = jest.fn();
    component.wizardComponent = {
      siguiente: jest.fn(),
      atras: jest.fn()
    };
    component.getValorIndice({
      valor: {},
      accion: {}
    });


  });

  it('should run #obtenerNombreDelTítulo()', async () => {
    component.pasos = {
      '1': { titulo: {} },
      '2': { titulo: {} }
    };
    component.obtenerNombreDelTítulo({});
  });
});