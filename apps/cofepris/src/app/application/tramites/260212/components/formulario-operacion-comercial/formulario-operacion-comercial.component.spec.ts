import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormularioOperacionComercialComponent } from './formulario-operacion-comercial.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { SolicitudService } from '../../services/solicitud.service';
import { CommonModule } from '@angular/common';

class MockSolicitudService {
  getclave() {
    return of([{ id: 1, descripcion: 'Mock Clave' }]); 
  }
}

describe('FormularioOperacionComercialComponent', () => {
  let component: FormularioOperacionComercialComponent;
  let fixture: ComponentFixture<FormularioOperacionComercialComponent>;
  let mockService: MockSolicitudService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule,FormularioOperacionComercialComponent], // Import required modules
      declarations: [], 
      providers: [
        FormBuilder,
        { provide: SolicitudService, useClass: MockSolicitudService }, 
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioOperacionComercialComponent);
    component = fixture.componentInstance;
    mockService = TestBed.inject(SolicitudService) as MockSolicitudService; 
    fixture.detectChanges(); 
  });

  it('should create the component', () => {
    expect(component).toBeTruthy(); 
  });

  it('should initialize the form with default values', () => {
    expect(component.formularioOperacionForm).toBeDefined(); 
    expect(component.formularioOperacionForm.controls['noLicenciaSanitaria'].value).toBe(''); 
    expect(component.formularioOperacionForm.controls['regimen'].value).toBe(''); 
  });

  it('should validate "regimen" as a required field', () => {
    const regimenControl = component.formularioOperacionForm.controls['regimen'];
    expect(regimenControl.valid).toBeFalsy();
    regimenControl.setValue('Valid Value'); 
    expect(regimenControl.valid).toBeTruthy();
  });

  it('should load clave data from the service', () => {
    expect(component.clave).toEqual([{ id: 1, descripcion: 'Mock Clave' }]); 
  });

});
