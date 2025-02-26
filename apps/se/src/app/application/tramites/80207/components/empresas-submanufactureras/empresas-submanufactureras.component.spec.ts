import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { EmpresasSubmanufacturerasComponent } from './empresas-submanufactureras.component';

import { BehaviorSubject, of } from 'rxjs';
import { SubManufacturerService } from 'libs/shared/data-access-user/src/core/services/80207/servicios-submanufacturer-service';

const mockServiceDisponiblesDatos= [
  {
    "calle" :"VIA MORELOS",
    "numExterior" :55400,
    "numInterior" :347,
    "códigoPostal":28001,
    "colonia" :"SANTA MARIA TULPETLAC"
  },
  {
    "calle":"DRETA DE L'EIXAMPLE",
    "numExterior":55400,
   "numInterior" :347,
    "códigoPostal":28001,
    "colonia" :"AVENIDA DIAGONAL"
  }
];

const mockSubManufacturerService = {
  getDatos: jest.fn(),
  obtenerListaEstado: jest.fn(),
  getSubfabricantesDisponibles: jest.fn(),
};

describe('EmpresasSubmanufacturerasComponent', () => {
  let component: EmpresasSubmanufacturerasComponent;
  let fixture: ComponentFixture<EmpresasSubmanufacturerasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmpresasSubmanufacturerasComponent],
      providers: [
        FormBuilder,
        { provide: SubManufacturerService, useValue: mockSubManufacturerService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpresasSubmanufacturerasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize formularioInfoRegistro with data if available', () => {
    const mockResponse = { infoRegistro: { modalidad: 'test', folio: '123', año: '2021' } };
    mockSubManufacturerService.getDatos.mockReturnValue(of(mockResponse));

    component.getDatos();
    fixture.detectChanges();

    expect(component.formularioInfoRegistro.value.modalidad).toBe('test');
    expect(component.formularioInfoRegistro.value.folio).toBe('123');
    expect(component.formularioInfoRegistro.value.año).toBe('2021');
  });

  it('should initialize formularioInfoRegistro with empty values if no data', () => {
    const mockResponse = { infoRegistro: null };
    mockSubManufacturerService.getDatos.mockReturnValue(of(mockResponse));

    component.getDatos();
    fixture.detectChanges();

    expect(component.formularioInfoRegistro.value.modalidad).toBe('');
    expect(component.formularioInfoRegistro.value.folio).toBe('');
    expect(component.formularioInfoRegistro.value.año).toBe('');
  });

  it('should call obtenerListaEstado and update estadoCatalogo', () => {
    const mockEstadoResponse = { data: [{ id: 1, descripcion: 'Estado 1' }] };
    mockSubManufacturerService.obtenerListaEstado.mockReturnValue(of(mockEstadoResponse));

    component.obtenerListaEstado();
    fixture.detectChanges();

    expect(component.estadoCatalogo.length).toBeGreaterThan(0);
    expect(component.estadoCatalogo[0]['descripcion']).toBe('Estado 1');
  });

  it('should call obtenerSubfabricantesDisponibles and update datosTablaSubfabricantesDisponibles', () => {
    const mockSubfabricantesResponse = mockServiceDisponiblesDatos;
    mockSubManufacturerService.getSubfabricantesDisponibles.mockReturnValue(of(mockSubfabricantesResponse));

    component.obtenerSubfabricantesDisponibles();
    fixture.detectChanges();

    expect(component.datosTablaSubfabricantesDisponibles.length).toBe(2);
    expect(component.datosTablaSubfabricantesDisponibles[0].calle).toBe('VIA MORELOS');
  });

}
)



