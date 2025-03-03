import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RespuestaCatalogos, TituloComponent } from '@ng-mf/data-access-user';
import { Observable, of } from 'rxjs';
import { EmpresasSubmanufacturerasComponent } from './empresas-submanufactureras.component';

import { TablaDinamicaComponent } from 'libs/shared/data-access-user/src/tramites/components/tabla-dinamica/tabla-dinamica.component';
import { SubmanufacturerDatos, SubmanufacturerDireccionModelo } from '../../modelos/submanufacturer-modelos';
import { SubManufacturerService } from '../../servicios/servicios-submanufacturer-servico';


class MockSubManufacturerDatoService {
  getDatos():Observable<SubmanufacturerDatos> {
    const MOCKDATA:SubmanufacturerDatos={ infoRegistro:{
      modalidad: "",
      folio: "",
      ano: 123
    }, datosSubcontratista: {
      rfc: "134",
      estado : "Mexico"
    } }
    return of(MOCKDATA);
  }

  obtenerListaEstado():Observable<RespuestaCatalogos> {
    const MOCKDATA:RespuestaCatalogos={ code:200,data: [],message:"" }
    return of(MOCKDATA);
  }

  getSubfabricantesDisponibles() :Observable<SubmanufacturerDireccionModelo[]>{
    return of([]);
  }
}

describe('EmpresasSubmanufacturerasComponent', () => {
  let component: EmpresasSubmanufacturerasComponent;
  let fixture: ComponentFixture<EmpresasSubmanufacturerasComponent>;
  let fb: FormBuilder;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpresasSubmanufacturerasComponent,ReactiveFormsModule,TituloComponent, TablaDinamicaComponent],
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
      ano: 2023
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
    const event: SubmanufacturerDireccionModelo[] = [
     { calle :"VIA MORELOS",  

      numExterior :55400,
      numInterior :347, 
      codigoPostal:28001,
      colonia :"SANTA MARIA TULPETLAC"
    }
    ];

    component.obtenerRegistroSeleccionado(event);

    
    expect(component.datosDelSubfabricanteSeleccionado).toEqual(event);
   
  });

  it('should set datosDelSubfabricanteSeleccionado to an empty array and hide the table when event is empty', () => {
    const event: SubmanufacturerDireccionModelo[] = [];

    component.obtenerRegistroSeleccionado(event);

   
    expect(component.datosDelSubfabricanteSeleccionado).toEqual([]);
   
    expect(component.mostrarTablaSubfabricantesSeleccionadas).toBeFalsy();
  });
  
}
)



