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
      imports: [
        CommonModule,
        ReactiveFormsModule,
        RepresentanteLegalComponent,
        HttpClientTestingModule // <-- Agrega este módulo para proveer HttpClient
      ],
      providers: [FormBuilder, ValidacionesFormularioService]
    }).compileComponents();

    fixture = TestBed.createComponent(RepresentanteLegalComponent);
    component = fixture.componentInstance;
    httpClient = TestBed.inject(HttpClient);
    validacionesService = TestBed.inject(ValidacionesFormularioService);
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar el formulario con los valores predeterminados', () => {
    expect(component.personaForm).toBeDefined();
    expect(component.personaForm.controls['rfc'].value).toBe('');
    expect(component.personaForm.controls['nombre'].disabled).toBe(true);
    expect(component.personaForm.controls['primerApellido'].disabled).toBe(true);
    expect(component.personaForm.controls['segundoApellido'].disabled).toBe(true);
  });

});
