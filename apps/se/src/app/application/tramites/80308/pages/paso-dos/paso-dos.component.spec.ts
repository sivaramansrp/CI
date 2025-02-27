import { TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, of as observableOf, throwError } from 'rxjs';
import { PasoDosComponent } from './paso-dos.component';
import { provideToastr } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';

describe('PasoDosComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule,HttpClientModule ],
      declarations: [
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [ provideToastr({
        positionClass: 'toast-top-right',
      }),

      ]
    }).overrideComponent(PasoDosComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(PasoDosComponent);
    component = fixture.debugElement.componentInstance;
  });
  it('debería ejecutar #constructor()', async () => {
    expect(component).toBeTruthy();
  });

});