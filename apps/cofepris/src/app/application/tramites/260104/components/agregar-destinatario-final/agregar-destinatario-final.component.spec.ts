import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AgregarDestinatarioFinalComponent } from './agregar-destinatario-final.component';
import { DatosSolicitudService } from '../../../../shared/services/datos-solicitud.service';
import { Tramite260104Store } from '../../estados/stores/tramite260104.store';
import { of } from 'rxjs';

describe('AgregarDestinatarioFinalComponent', () => {
  let component: AgregarDestinatarioFinalComponent;
  let fixture: ComponentFixture<AgregarDestinatarioFinalComponent>;
  let mockDatosSolicitudService: Partial<DatosSolicitudService>;
  let mockTramite260104Store: Partial<Tramite260104Store>;

  beforeEach(async () => {
    mockDatosSolicitudService = {
      obtenerListaCodigosPostales: jest.fn().mockReturnValue(of([])),
      obtenerListaPaises: jest.fn().mockReturnValue(of([])),
      obtenerListaEstados: jest.fn().mockReturnValue(of([])),
      obtenerListaMunicipios: jest.fn().mockReturnValue(of([])),
      obtenerListaLocalidades: jest.fn().mockReturnValue(of([])),
      obtenerListaColonias: jest.fn().mockReturnValue(of([])),
    };

    mockTramite260104Store = {
      updateDestinatarioFinalTablaDatos: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, AgregarDestinatarioFinalComponent],
      providers: [
        { provide: DatosSolicitudService, useValue: mockDatosSolicitudService },
        { provide: Tramite260104Store, useValue: mockTramite260104Store },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AgregarDestinatarioFinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on component creation', () => {
    expect(component.agregarDestinatarioFinal).toBeDefined();
    expect(component.agregarDestinatarioFinal.controls['tipoPersona']).toBeDefined();
  });

  it('should call cargarDatos on ngOnInit', () => {
    const cargarDatosSpy = jest.spyOn(component, 'cargarDatos');
    component.ngOnInit();
    expect(cargarDatosSpy).toHaveBeenCalled();
  });

  it('should call guardarDestinatario and update the store', () => {
    const mockDestinatario = {
      tipoPersona: 'FISICA',
      rfc: 'XAXX010101000',
      nombres: 'John',
      denominacionRazon: '',
      primerApellido: 'Doe',
      segundoApellido: 'Smith',
      pais: 1,
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
      descPais: '',
      descEstado: '',
      descMunicipio: '',
      descLocalidad: '',
      descCodigoPostal: '',
      descColonia: '',
    };

    component.agregarDestinatarioFinal.setValue(mockDestinatario);

    component.guardarDestinatario();

    // Log the actual data passed to the mock store for debugging
    const actualData = (mockTramite260104Store.updateDestinatarioFinalTablaDatos as jest.Mock).mock.calls[0][0];
    console.log('Actual data passed to updateDestinatarioFinalTablaDatos:', actualData);

    expect(mockTramite260104Store.updateDestinatarioFinalTablaDatos).toHaveBeenCalledWith([mockDestinatario]);
    expect(component.agregarDestinatarioFinal.pristine).toBeTruthy();
    expect(component.agregarDestinatarioFinal.value).toEqual({
      tipoPersona: null,
      rfc: null,
      nombres: null,
      denominacionRazon: null,
      primerApellido: null,
      segundoApellido: null,
      pais: null,
      estado: null,
      municipio: null,
      localidad: null,
      codigoPostal: null,
      colonia: null,
      calle: null,
      numeroExterior: null,
      numeroInterior: null,
      lada: null,
      telefono: null,
      correoElectronico: null,
      descPais: null,
      descEstado: null,
      descMunicipio: null,
      descLocalidad: null,
      descCodigoPostal: null,
      descColonia: null,
    });
  });

  it('should update descPais when cambiaPais is called', () => {
    component.paisesDatos = [{ id: 1, descripcion: 'Mexico' }];
    component.agregarDestinatarioFinal.get('pais')?.setValue(1); // Ensure the value matches the id type
    component.cambiaPais();
    expect(component.agregarDestinatarioFinal.get('descPais')?.value).toBe('Mexico');
  });

  it('should update desc when cambiaEstado is called', () => {
    component.estadosDatos = [{ id: 1, descripcion: 'Mexico' }];
    component.agregarDestinatarioFinal.get('estado')?.setValue(1); // Ensure the value matches the id type
    component.cambiaEstado();
    expect(component.agregarDestinatarioFinal.get('descEstado')?.value).toBe('Mexico');
  });

  it('should update desc when cambiaMunicipio is called', () => {
    component.estadosDatos = [{ id: 1, descripcion: 'Mexico' }];
    component.agregarDestinatarioFinal.get('municipio')?.setValue(1); // Ensure the value matches the id type
    component.cambiaMunicipio();
    expect(component.agregarDestinatarioFinal.get('descMunicipio')?.value).toBe('Mexico');
  });

  it('should update desc when cambiaLocalidad is called', () => {
    component.estadosDatos = [{ id: 1, descripcion: 'Mexico' }];
    component.agregarDestinatarioFinal.get('localidad')?.setValue(1); // Ensure the value matches the id type
    component.cambiaLocalidad();
    expect(component.agregarDestinatarioFinal.get('descLocalidad')?.value).toBe('Mexico');
  });

  it('should update desc when cambiaCodigoPostal is called', () => {
    component.estadosDatos = [{ id: 1, descripcion: 'Mexico' }];
    component.agregarDestinatarioFinal.get('codigoPostal')?.setValue(1); // Ensure the value matches the id type
    component.cambiaCodigoPostal();
    expect(component.agregarDestinatarioFinal.get('descCodigoPostal')?.value).toBe('Mexico');
  });

  it('should update desc when cambiaColonia is called', () => {
    component.estadosDatos = [{ id: 1, descripcion: 'Mexico' }];
    component.agregarDestinatarioFinal.get('colonia')?.setValue(1); // Ensure the value matches the id type
    component.cambiaColonia();
    expect(component.agregarDestinatarioFinal.get('descColonia')?.value).toBe('Mexico');
  });

  it('should unsubscribe on ngOnDestroy', () => {
    const unsubscribeSpy = jest.spyOn(component['unsubscribe$'], 'next');
    const completeSpy = jest.spyOn(component['unsubscribe$'], 'complete');
    component.ngOnDestroy();
    expect(unsubscribeSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
