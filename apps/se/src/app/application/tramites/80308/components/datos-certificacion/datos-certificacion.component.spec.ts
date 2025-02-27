import { TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, of as observableOf, throwError } from 'rxjs';
import { DatosCertificacionComponent } from './datos-certificacion.component';
import { FormBuilder } from '@angular/forms';


describe('DatosCertificacionComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],
      declarations: [ ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        FormBuilder
      ]
    }).overrideComponent(DatosCertificacionComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(DatosCertificacionComponent);
    component = fixture.debugElement.componentInstance;
  });


  it('debería ejecutar #constructor()', async () => {
    expect(component).toBeTruthy();
  });

});