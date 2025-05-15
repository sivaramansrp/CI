import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatosCertificacionComponent } from './datos-certificacion.component';
import { FormBuilder } from '@angular/forms';

describe('DatosCertificacionComponent', () => {
  let fixture: ComponentFixture<DatosCertificacionComponent>;
  let component: { ngOnDestroy: () => void; };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule, DatosCertificacionComponent ],
      declarations: [],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        FormBuilder
      ]
    }).overrideComponent(DatosCertificacionComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(DatosCertificacionComponent);
    component = fixture.debugElement.componentInstance;
  });

  afterEach(() => {
    component.ngOnDestroy = function() {};
    fixture.destroy();
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

});