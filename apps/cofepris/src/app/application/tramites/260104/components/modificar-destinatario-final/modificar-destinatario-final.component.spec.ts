import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificarDestinatarioFinalComponent } from './modificar-destinatario-final.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Tramite260104Store } from '../../estados/stores/tramite260104.store';

describe('AgregarDestinatarioFinalComponent', () => {
  let component: ModificarDestinatarioFinalComponent;
  let fixture: ComponentFixture<ModificarDestinatarioFinalComponent>;
  let mockTramite260104Store: Partial<Tramite260104Store>;

  mockTramite260104Store = {
    updateDestinatarioFinalTablaDatos: jest.fn(),
  };


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificarDestinatarioFinalComponent, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ModificarDestinatarioFinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have a valid form when all required fields are filled', () => {
    component.modificarDestinatarioFinal.setValue({
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
      descPais: '',
      descEstado: '',
      descMunicipio: '',
      descLocalidad: '',
      descCodigoPostal: '',
      descColonia: '',
    });
    expect(component.modificarDestinatarioFinal.valid).toBe(false);
  });

  it('should have an invalid form when required fields are empty', () => {
    component.modificarDestinatarioFinal.setValue({
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
      descPais: '',
      descEstado: '',
      descMunicipio: '',
      descLocalidad: '',
      descCodigoPostal: '',
      descColonia: '',
    });
    expect(component.modificarDestinatarioFinal.invalid).toBe(true);
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

    component.modificarDestinatarioFinal.setValue(mockDestinatario);

    component.guardarDestinatario();

    // Log the actual data passed to the mock store for debugging
    const actualData = (mockTramite260104Store.updateDestinatarioFinalTablaDatos as jest.Mock).mock.calls[0][0];
    console.log('Actual data passed to updateDestinatarioFinalTablaDatos:', actualData);

    expect(mockTramite260104Store.updateDestinatarioFinalTablaDatos).toHaveBeenCalledWith([mockDestinatario]);
    expect(component.modificarDestinatarioFinal.pristine).toBeTruthy();
    expect(component.modificarDestinatarioFinal.value).toEqual({
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
    component.modificarDestinatarioFinal.get('pais')?.setValue(1); // Ensure the value matches the id type
    component.cambiaPais();
    expect(component.modificarDestinatarioFinal.get('descPais')?.value).toBe('Mexico');
  });

  it('should update desc when cambiaEstado is called', () => {
    component.estadosDatos = [{ id: 1, descripcion: 'Mexico' }];
    component.modificarDestinatarioFinal.get('estado')?.setValue(1); // Ensure the value matches the id type
    component.cambiaEstado();
    expect(component.modificarDestinatarioFinal.get('descEstado')?.value).toBe('Mexico');
  });

  it('should update desc when cambiaMunicipio is called', () => {
    component.estadosDatos = [{ id: 1, descripcion: 'Mexico' }];
    component.modificarDestinatarioFinal.get('municipio')?.setValue(1); // Ensure the value matches the id type
    component.cambiaMunicipio();
    expect(component.modificarDestinatarioFinal.get('descMunicipio')?.value).toBe('Mexico');
  });

  it('should update desc when cambiaLocalidad is called', () => {
    component.estadosDatos = [{ id: 1, descripcion: 'Mexico' }];
    component.modificarDestinatarioFinal.get('localidad')?.setValue(1); // Ensure the value matches the id type
    component.cambiaLocalidad();
    expect(component.modificarDestinatarioFinal.get('descLocalidad')?.value).toBe('Mexico');
  });

  it('should update desc when cambiaCodigoPostal is called', () => {
    component.estadosDatos = [{ id: 1, descripcion: 'Mexico' }];
    component.modificarDestinatarioFinal.get('codigoPostal')?.setValue(1); // Ensure the value matches the id type
    component.cambiaCodigoPostal();
    expect(component.modificarDestinatarioFinal.get('descCodigoPostal')?.value).toBe('Mexico');
  });

  it('should update desc when cambiaColonia is called', () => {
    component.estadosDatos = [{ id: 1, descripcion: 'Mexico' }];
    component.modificarDestinatarioFinal.get('colonia')?.setValue(1); // Ensure the value matches the id type
    component.cambiaColonia();
    expect(component.modificarDestinatarioFinal.get('descColonia')?.value).toBe('Mexico');
  });

  it('should unsubscribe on ngOnDestroy', () => {
    const unsubscribeSpy = jest.spyOn(component['unsubscribe$'], 'next');
    const completeSpy = jest.spyOn(component['unsubscribe$'], 'complete');
    component.ngOnDestroy();
    expect(unsubscribeSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
