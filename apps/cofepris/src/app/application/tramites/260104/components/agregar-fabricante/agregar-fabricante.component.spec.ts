import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AgregarFabricanteComponent } from './agregar-fabricante.component';
import { DatosSolicitudService } from '../../../../shared/services/datos-solicitud.service';
import { Tramite260104Store } from '../../estados/stores/tramite260104.store';
import { of } from 'rxjs';

describe('AgregarFabricanteComponent', () => {
  let component: AgregarFabricanteComponent;
  let fixture: ComponentFixture<AgregarFabricanteComponent>;
  let mockDatosSolicitudService: Partial<DatosSolicitudService>;
  let mockTramite260104Store: Partial<Tramite260104Store>;

  beforeEach(async () => {
    mockDatosSolicitudService = {
      obtenerListaPaises: jest.fn().mockReturnValue(of([])),
    };

    mockTramite260104Store = {
      updateFabricanteTablaDatos: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,AgregarFabricanteComponent],
      declarations: [],
      providers: [
        { provide: DatosSolicitudService, useValue: mockDatosSolicitudService },
        { provide: Tramite260104Store, useValue: mockTramite260104Store },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AgregarFabricanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on component creation', () => {
    expect(component.agregarFabricante).toBeDefined();
    expect(component.agregarFabricante.controls['tipoPersona']).toBeDefined();
    expect(component.agregarFabricante.controls['descPais']).toBeDefined();
    expect(component.agregarFabricante.controls['estado']).toBeDefined();
    expect(component.agregarFabricante.controls['municipio']).toBeDefined(); 
    expect(component.agregarFabricante.controls['localidad']).toBeDefined();
    expect(component.agregarFabricante.controls['codigoPostal']).toBeDefined();
    expect(component.agregarFabricante.controls['colonia']).toBeDefined();
    expect(component.agregarFabricante.controls['calle']).toBeDefined();
    expect(component.agregarFabricante.controls['numeroExterior']).toBeDefined();
    expect(component.agregarFabricante.controls['numeroInterior']).toBeDefined();
    expect(component.agregarFabricante.controls['lada']).toBeDefined();
    expect(component.agregarFabricante.controls['telefono']).toBeDefined();
    expect(component.agregarFabricante.controls['correoElectronico']).toBeDefined();
    expect(component.agregarFabricante.controls['rfc']).toBeDefined();
    expect(component.agregarFabricante.controls['nombres']).toBeDefined();
    expect(component.agregarFabricante.controls['denominacionRazon']).toBeDefined();
    expect(component.agregarFabricante.controls['primerApellido']).toBeDefined();
    expect(component.agregarFabricante.controls['segundoApellido']).toBeDefined();
    expect(component.agregarFabricante.controls['pais']).toBeDefined();
  });

  it('should call cargarDatos on ngOnInit', () => {
    const cargarDatosSpy = jest.spyOn(component, 'cargarDatos');
    component.ngOnInit();
    expect(cargarDatosSpy).toHaveBeenCalled();
  });

  it('should call guardarFabricante and update the store', () => {
    component.agregarFabricante.setValue({
      tipoPersona: 'FISICA',
      rfc: 'XAXX010101000',
      nombres: 'John',
      denominacionRazon: '',
      primerApellido: 'Doe',
      segundoApellido: 'Smith',
      pais: '1',
      estado: '1',
      municipio: '1',
      localidad: '1',
      codigoPostal: '12345',
      colonia: '1',
      calle: 'Main Street',
      numeroExterior: '123',
      numeroInterior: '',
      lada: '55',
      telefono: '12345678',
      correoElectronico: 'john.doe@example.com',
      descPais:'Mexico'
    });

    component.guardarFabricante();

    expect(mockTramite260104Store.updateFabricanteTablaDatos).toHaveBeenCalledWith(component.fabricantes);
    expect(component.agregarFabricante.pristine).toBeTruthy();
  });

  it('should reset the form when limpiarFormulario is called', () => {
    component.agregarFabricante.setValue({
      tipoPersona: 'FISICA',
      rfc: 'XAXX010101000',
      nombres: 'John',
      denominacionRazon: '',
      primerApellido: 'Doe',
      segundoApellido: 'Smith',
      pais: '1',
      estado: '1',
      municipio: '1',
      localidad: '1',
      codigoPostal: '12345',
      colonia: '1',
      calle: 'Main Street',
      numeroExterior: '123',
      numeroInterior: '',
      lada: '55',
      telefono: '12345678',
      correoElectronico: 'john.doe@example.com',
      descPais:'Mexico'
    });

    component.limpiarFormulario();

    expect(component.agregarFabricante.pristine).toBeTruthy();
    expect(component.agregarFabricante.value).toEqual({
      tipoPersona: '',
      rfc: '',
      nombres: '',
      denominacionRazon: '',
      primerApellido: '',
      segundoApellido: '',
      pais: { value: '1', disabled: true },
      estado: '',
      municipio: '',
      localidad: '',
      codigoPostal: '',
      colonia: '',
      calle: '',
      numeroExterior: '',
      numeroInterior: '',
      lada: '',
      telefono: '',
      correoElectronico: '',
      descPais:'Mexico'
    });
  });

  it('should unsubscribe on ngOnDestroy', () => {
    const unsubscribeSpy = jest.spyOn(component['unsubscribe$'], 'next');
    const completeSpy = jest.spyOn(component['unsubscribe$'], 'complete');
    component.ngOnDestroy();
    expect(unsubscribeSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
