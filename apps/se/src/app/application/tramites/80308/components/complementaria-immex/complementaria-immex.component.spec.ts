import { TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, of as observableOf, throwError } from 'rxjs';
import { ComplementariaImmexComponent } from './complementaria-immex.component';

describe('ComplementariaImmexComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],
      declarations: [
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [

      ]
    }).overrideComponent(ComplementariaImmexComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(ComplementariaImmexComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('debería ejecutar #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('debe ejecutar #seleccionaTab()', async () => {

    component.seleccionaTab({});

  });

});