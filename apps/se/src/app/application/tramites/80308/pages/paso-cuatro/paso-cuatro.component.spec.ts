/* eslint-disable @typescript-eslint/no-empty-function */
import { CUSTOM_ELEMENTS_SCHEMA, Injectable, NO_ERRORS_SCHEMA} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule, provideToastr } from 'ngx-toastr';
import { PasoCuatroComponent } from './paso-cuatro.component';
import { Router } from '@angular/router';
import {TestBed } from '@angular/core/testing';

@Injectable()
class MockRouter {
  // eslint-disable-next-line no-empty-function, class-methods-use-this
  navigate():void {}
}

describe('PasoCuatroComponent', () => {
  let fixture;
  let component!: PasoCuatroComponent;

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


  it('debería ejecutar #constructor()', () => {
    expect(component).toBeTruthy();
  });

  it('debe ejecutar #obtieneFirma()', () => {
    component.router = component.router || {};
    component.router.navigate = jest.fn();
    component.obtieneFirma('test');
    expect(component.router.navigate).toHaveBeenCalled();
  });

});