import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RepresentanteLegalComponent } from './representante-legal.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ValidacionesFormularioService } from '@libs/shared/data-access-user/src';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RepresentanteLegalComponent', () => {
  let component: RepresentanteLegalComponent;
  let fixture: ComponentFixture<RepresentanteLegalComponent>;
  let httpClient: HttpClient;
  let validacionesService: ValidacionesFormularioService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [CommonModule, ReactiveFormsModule,RepresentanteLegalComponent, HttpClientTestingModule],
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
    jest.spyOn(validacionesService, 'isValid').mockReturnValue(true);
    expect(component.esValido('rfc')).toBe(true);
  });

  it('should fetch options and populate losDatos', () => {
    jest.spyOn(httpClient, 'get').mockReturnValue(of([{ id: 1, value: 'Option 1' }]));
    component.obtenerOpcionesSolicitud();
    expect(component.losDatos.length).toBe(1);
    expect(component.losDatos[0].value).toBe('Option 1');
  });
});
