
import {  ComponentFixture, TestBed } from '@angular/core/testing';
import {
    CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
   NgModule,
} from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { SolicitanteComponent } from './solicitante.component';


@NgModule({
  declarations: [
    SolicitanteComponent,
     ],
  imports: [FormsModule, ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
class TestModule {}

describe('SolicitanteComponent', () => {
  let fixture: ComponentFixture<SolicitanteComponent>;
  let component: SolicitanteComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [FormBuilder],
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitanteComponent);
    component = fixture.componentInstance;
    component.solicitudForm = new FormGroup({
      rfc: new FormControl(''),
      denominacion: new FormControl(''),
      actividadEconomica: new FormControl(''),
      correoElectronico: new FormControl(''),
    });
  });

  afterEach(() => {
    if (component) {
      component.ngOnDestroy = function () {};
    }
    if (fixture) {
      fixture.destroy();
    }
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnInit()', async () => {
    component.fb = component.fb || {};
    component.fb.group = jest.fn();
    
    component.ngOnInit();
  });
});
