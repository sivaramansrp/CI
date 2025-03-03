import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasoTresComponent } from './paso-tres.component';
import { TestBed } from '@angular/core/testing';
import { provideToastr } from 'ngx-toastr';



describe('PasoTresComponent', () => {
  let fixture;
  let component!: PasoTresComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [provideToastr({
        positionClass: 'toast-top-right',
      }),

      ]
    }).overrideComponent(PasoTresComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(PasoTresComponent);
    component = fixture.debugElement.componentInstance;
  });
  it('debería ejecutar #constructor()', () => {
    expect(component).toBeTruthy();
  });

});


