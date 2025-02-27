import {TestBed } from '@angular/core/testing';
import { Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, of as observableOf, throwError } from 'rxjs';
import { PasoCuatroComponent } from './paso-cuatro.component';
import { Router } from '@angular/router';
import { ToastrModule, provideToastr } from 'ngx-toastr';

@Injectable()
class MockRouter {
  navigate() {};
}

describe('PasoCuatroComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule, ToastrModule ],
      declarations: [
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        { provide: Router, useClass: MockRouter },
        provideToastr({
          positionClass: 'toast-top-right',
        }),
      ]
    }).overrideComponent(PasoCuatroComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(PasoCuatroComponent);
    component = fixture.debugElement.componentInstance;
  });


  it('debería ejecutar #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('debe ejecutar #obtieneFirma()', async () => {
    component.router = component.router || {};
    component.router.navigate = jest.fn();
    component.obtieneFirma({});
    expect(component.router.navigate).toHaveBeenCalled();
  });

});