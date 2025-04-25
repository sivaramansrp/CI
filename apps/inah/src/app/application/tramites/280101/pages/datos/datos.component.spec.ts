import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosComponent } from './datos.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PermisoDeExportacionService } from '../../services/permiso-de-exportacion.service'; // Adjust the import path
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Import HttpClientTestingModule

describe('DatosComponent', () => {
  let component: DatosComponent;
  let fixture: ComponentFixture<DatosComponent>;

  // Mock for SolicitanteComponent
  const solicitanteMock = {
    obtenerTipoPersona: jest.fn(), // Mock the obtenerTipoPersona method
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DatosComponent], // Declare the component to be tested
      imports: [HttpClientTestingModule], // Import HttpClientTestingModule for _HttpClient
      providers: [PermisoDeExportacionService], // Provide the required service
      schemas: [NO_ERRORS_SCHEMA], // Ignore unknown elements in the template
    }).compileComponents();

    fixture = TestBed.createComponent(DatosComponent); // Create an instance of the component
    component = fixture.componentInstance; // Get the component instance

    // Mock the @ViewChild `solicitante` property
    Object.defineProperty(component, 'solicitante', {
      value: solicitanteMock, // Assign the mock to the solicitante property
      writable: true, // Allow the property to be writable
    });

    fixture.detectChanges(); // Detect changes in the component
  });

  it('should create the component', () => {
    // Verify that the component is created successfully
    expect(component).toBeTruthy();
  });

  it('should set the index correctly when seleccionaTab is called', () => {
    // Call the seleccionaTab method with index 2
    component.seleccionaTab(2);

    // Verify that the index is set correctly
    expect(component.indice).toBe(2);
  });
});