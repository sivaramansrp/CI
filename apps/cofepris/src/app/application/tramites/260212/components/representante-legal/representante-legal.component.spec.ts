import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RepresentanteLegalComponent } from './representante-legal.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ValidacionesFormularioService } from '@libs/shared/data-access-user/src';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

describe('RepresentanteLegalComponent', () => {
  let component: RepresentanteLegalComponent;
  let fixture: ComponentFixture<RepresentanteLegalComponent>;
  let httpClient: HttpClient;
  let validacionesService: ValidacionesFormularioService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [CommonModule, ReactiveFormsModule,RepresentanteLegalComponent],
      providers: [FormBuilder, ValidacionesFormularioService]
    }).compileComponents();

    fixture = TestBed.createComponent(RepresentanteLegalComponent);
    component = fixture.componentInstance;
    httpClient = TestBed.inject(HttpClient);
    validacionesService = TestBed.inject(ValidacionesFormularioService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.personaForm).toBeDefined();
    expect(component.personaForm.controls['rfc'].value).toBe('');
    expect(component.personaForm.controls['nombre'].disabled).toBe(true);
    expect(component.personaForm.controls['primerApellido'].disabled).toBe(true);
    expect(component.personaForm.controls['segundoApellido'].disabled).toBe(true);
  });

  it('should validate form fields correctly', () => {
    spyOn(validacionesService, 'isValid').and.returnValue(true);
    expect(component.isValid('rfc')).toBe(true);
  });

  it('should fetch options and populate losDatos', () => {
    spyOn(httpClient, 'get').and.returnValue(of([{ id: 1, value: 'Option 1' }]));

    component.fetchSolicitudeOptions();

    expect(component.losDatos.length).toBe(1);
    expect(component.losDatos[0].value).toBe('Option 1');
  });
});
