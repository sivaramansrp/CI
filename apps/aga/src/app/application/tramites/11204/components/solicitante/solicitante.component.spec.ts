import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { SolicitanteComponent } from './solicitante.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';


describe('SolicitanteComponent', () => {
  let fixture: ComponentFixture<SolicitanteComponent>;
  let component: SolicitanteComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SolicitanteComponent, FormsModule, ReactiveFormsModule],
      declarations: [
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
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
      component.ngOnDestroy = function () { };
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
    component.setFormValues = jest.fn();
    component.ngOnInit();
  });
});
