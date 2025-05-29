// @ts-nocheck
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  Pipe, PipeTransform, Directive, Input,
  CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgriculturaComponent } from './agricultura.component';


describe('AgriculturaComponent', () => {
  let fixture: ComponentFixture<AgriculturaComponent>;
  let component: AgriculturaComponent;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [
        AgriculturaComponent,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(AgriculturaComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call atras when accion is "atras"', () => {
    component.componenteWizard = {
      siguiente: jest.fn(),
      atras: jest.fn()
    };

    component.getValorIndice({ valor: {}, accion: 'atras' });

    
  });
});
