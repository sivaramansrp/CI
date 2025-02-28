import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EmpresasSubmanufacturerasComponent } from './empresas-submanufactureras.component';
import { BehaviorSubject, of } from 'rxjs';
import { SubManufacturerService } from 'libs/shared/data-access-user/src/core/services/80207/servicios-submanufacturer-service';

import { SubfacrintaTablaModelo } from 'libs/shared/data-access-user/src/core/models/80207/submanufacturer-extension';

class MockSubManufacturerDatoService {
  getDatos() {
    return of({ infoRegistro: {}, datosSubcontratista: {} });
  }

  obtenerListaEstado() {
    return of({ data: [] });
  }

  getSubfabricantesDisponibles() {
    return of([]);
  }
}

// Mock the service
jest.mock('libs/shared/data-access-user/src/core/services/80207/servicios-submanufacturer-service');

describe('EmpresasSubmanufacturerasComponent', () => {
  let component: EmpresasSubmanufacturerasComponent;
  let fixture: ComponentFixture<EmpresasSubmanufacturerasComponent>;
  let fb: FormBuilder;
  let subManufacturerServiceMock: jest.Mocked<SubManufacturerService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpresasSubmanufacturerasComponent,ReactiveFormsModule],
      providers: [FormBuilder,
        { provide: SubManufacturerService, useClass: MockSubManufacturerDatoService } 
      ], 
    }).compileComponents();
    fixture = TestBed.createComponent(EmpresasSubmanufacturerasComponent);
    component = fixture.componentInstance;
    fb = TestBed.inject(FormBuilder); 
  
  });

 

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit and all necessary methods', () => {
    jest.spyOn(component, 'inicializarFormularioInfoRegistro');
    jest.spyOn(component, 'inicializarFormularioDatosSubcontratista');
    jest.spyOn(component, 'getDatos');
    jest.spyOn(component, 'obtenerListaEstado');
  
    component.ngOnInit();
  
    expect(component.inicializarFormularioInfoRegistro).toHaveBeenCalled();
    expect(component.inicializarFormularioDatosSubcontratista).toHaveBeenCalled();
    expect(component.getDatos).toHaveBeenCalled();
    expect(component.obtenerListaEstado).toHaveBeenCalled();
  });
  
  it('should initialize the form with infoRegistro values if infoRegistro is provided', () => {
  
    component.infoRegistro = {
      modalidad: 'Test Modalidad',
      folio: '123456',
      año: 2023
    };

    // Call the method
    component.inicializarFormularioInfoRegistro();

    // Check that the form has the correct values
    expect(component.formularioInfoRegistro.value.modalidad).toBe('Test Modalidad');
    expect(component.formularioInfoRegistro.value.folio).toBe('123456');
    expect(component.formularioInfoRegistro.value.año).toBe(2023);
  });

  it('should initialize form with datosSubcontratista values', () => {
    // Define sample data for datosSubcontratista
    component.datosSubcontratista = {
      rfc: 'ABC123',
      estado: 'Active',
    };

    component.inicializarFormularioDatosSubcontratista();

    
    expect(component.formularioDatosSubcontratista.value.rfc).toBe('ABC123');
    expect(component.formularioDatosSubcontratista.value.estado).toBe('Active');
  });

  it('should initialize form with empty values if datosSubcontratista is undefined', () => {
    component.datosSubcontratista = {rfc:'',estado:''}; // Simulate the absence of datosSubcontratista

    component.inicializarFormularioDatosSubcontratista();


    expect(component.formularioDatosSubcontratista.value.rfc).toBe('');
    expect(component.formularioDatosSubcontratista.value.estado).toBe('');
  });

  it('should set datosDelSubfabricanteSeleccionado when event has items', () => {
    const event: SubfacrintaTablaModelo[] = [
     { calle :"VIA MORELOS",  

      numExterior :55400,
      numInterior :347, 
      códigoPostal:28001,
      colonia :"SANTA MARIA TULPETLAC"
    }
    ];

    component.obtenerRegistroSeleccionado(event);

    
    expect(component.datosDelSubfabricanteSeleccionado).toEqual(event);
   
  });

  it('should set datosDelSubfabricanteSeleccionado to an empty array and hide the table when event is empty', () => {
    const event: SubfacrintaTablaModelo[] = [];

    component.obtenerRegistroSeleccionado(event);

   
    expect(component.datosDelSubfabricanteSeleccionado).toEqual([]);
   
    expect(component.mostrarTablaSubfabricantesSeleccionadas).toBeFalsy();
  });
  
}
)



