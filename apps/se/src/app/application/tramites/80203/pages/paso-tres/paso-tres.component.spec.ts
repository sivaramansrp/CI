/* eslint-disable @typescript-eslint/no-empty-function */
// @ts-nocheck
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule, provideToastr } from 'ngx-toastr';
import { PasoTresComponent } from './paso-tres.component';
import { Router, RouterModule } from '@angular/router';
import { TestBed } from '@angular/core/testing';

class MockRouter {
  navigate(): void {}
}

describe('PasoTresComponent', () => {
  let fixture;
  let component: PasoTresComponent;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, ToastrModule, RouterModule],
      declarations: [PasoTresComponent], // Added component declaration
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        { provide: Router, useClass: MockRouter },
        provideToastr({
          positionClass: 'toast-top-right',
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PasoTresComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
