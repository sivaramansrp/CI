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

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe inicializar el formulario al crear el componente', () => {
    expect(component.agregarDestinatarioFinal).toBeDefined();
    expect(component.agregarDestinatarioFinal.controls['tipoPersona']).toBeDefined();
  });

  it('debe llamar a cargarDatos en ngOnInit', () => {
    const cargarDatosSpy = jest.spyOn(component, 'cargarDatos');
    component.ngOnInit();
    expect(cargarDatosSpy).toHaveBeenCalled();
  });

  it('debe actualizar descPais cuando se llama cambiaPais', () => {
    component.paisesDatos = [{ id: 1, descripcion: 'Mexico' }];
    component.agregarDestinatarioFinal.get('pais')?.setValue(1);
    component.cambiaPais();
    expect(component.agregarDestinatarioFinal.get('descPais')?.value).toBe('Mexico');
  });

  it('debe actualizar descEstado cuando se llama cambiaEstado', () => {
    component.estadosDatos = [{ id: 1, descripcion: 'Mexico' }];
    component.agregarDestinatarioFinal.get('estado')?.setValue(1);
    component.cambiaEstado();
    expect(component.agregarDestinatarioFinal.get('descEstado')?.value).toBe('Mexico');
  });

  it('debe actualizar descMunicipio cuando se llama cambiaMunicipio', () => {
    component.municipiosDatos = [{ id: 1, descripcion: 'Mexico' }]; // Correct array
    component.agregarDestinatarioFinal.get('municipio')?.setValue(1);
    component.cambiaMunicipio();
    expect(component.agregarDestinatarioFinal.get('descMunicipio')?.value).toBe('Mexico');
  });

  it('debe actualizar descColonia cuando se llama cambiaColonia', () => {
    component.coloniasDatos = [{ id: 1, descripcion: 'Mexico' }]; // Use the correct array
    component.agregarDestinatarioFinal.get('colonia')?.setValue(1);
    component.cambiaColonia();
    expect(component.agregarDestinatarioFinal.get('descColonia')?.value).toBe('Mexico');
  });

  it('debe desuscribirse en ngOnDestroy', () => {
    const unsubscribeSpy = jest.spyOn(component['unsubscribe$'], 'next');
    const completeSpy = jest.spyOn(component['unsubscribe$'], 'complete');
    component.ngOnDestroy();
    expect(unsubscribeSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('debe guardar destinatario tipoPersona "0" (moral) y actualizar el store', () => {
    const backSpy = jest.spyOn((component as any).ubicaccion, 'back');
    component.agregarDestinatarioFinal.setValue({
      tipoPersona: '0',
      rfc: 'RFC123456789',
      nombres: '',
      denominacionRazon: 'Empresa S.A.',
      primerApellido: '',
      segundoApellido: '',
      pais: 1,
      estado: 'E',
      municipio: 'M',
      localidad: 'L',
      codigoPostal: 'CP',
      colonia: 'COL',
      calle: 'Calle',
      numeroExterior: '123',
      numeroInterior: '',
      lada: '55',
      telefono: '12345678',
      correoElectronico: 'empresa@test.com',
      descPais: 'México',
      descEstado: 'CDMX',
      descMunicipio: 'Miguel Hidalgo',
      descLocalidad: 'Polanco',
      descCodigoPostal: '11560',
      descColonia: 'Polanco'
    });
    component.destinatarios = [];
    component.guardarDestinatario();
    expect(component.destinatarios.length).toBe(1);
    expect(mockTramite260104Store.updateDestinatarioFinalTablaDatos).toHaveBeenCalledWith(component.destinatarios);
    expect(backSpy).toHaveBeenCalled();
  });

  it('debe guardar destinatario tipoPersona "1" (física) y actualizar el store', () => {
    const backSpy = jest.spyOn((component as any).ubicaccion, 'back');
    component.agregarDestinatarioFinal.setValue({
      tipoPersona: '1',
      rfc: 'RFC987654321',
      nombres: 'Juan',
      denominacionRazon: '',
      primerApellido: 'Pérez',
      segundoApellido: 'García',
      pais: 1,
      estado: 'E',
      municipio: 'M',
      localidad: 'L',
      codigoPostal: 'CP',
      colonia: 'COL',
      calle: 'Calle',
      numeroExterior: '456',
      numeroInterior: '',
      lada: '55',
      telefono: '87654321',
      correoElectronico: 'juan@test.com',
      descPais: 'México',
      descEstado: 'CDMX',
      descMunicipio: 'Benito Juárez',
      descLocalidad: 'Del Valle',
      descCodigoPostal: '03100',
      descColonia: 'Del Valle'
    });
    component.destinatarios = [];
    component.guardarDestinatario();
    expect(component.destinatarios.length).toBe(1);
    expect(mockTramite260104Store.updateDestinatarioFinalTablaDatos).toHaveBeenCalledWith(component.destinatarios);
    expect(backSpy).toHaveBeenCalled();
  });

  it('debe limpiar el formulario', () => {
    const resetSpy = jest.spyOn(component.agregarDestinatarioFinal, 'reset');
    component.limpiarFormulario();
    expect(resetSpy).toHaveBeenCalled();
  });

  it('debe cancelar y regresar', () => {
    const backSpy = jest.spyOn((component as any).ubicaccion, 'back');
    component.cancelar();
    expect(backSpy).toHaveBeenCalled();
  });

  it('debe actualizar descLocalidad cuando se llama cambiaLocalidad', () => {
    component.localidadesDatos = [{ id: 1, descripcion: 'Mexico' }];
    component.agregarDestinatarioFinal.get('localidad')?.setValue(1);
    component.cambiaLocalidad();
    expect(component.agregarDestinatarioFinal.get('descLocalidad')?.value).toBe('Mexico');
  });

  it('debe actualizar descCodigoPostal cuando se llama cambiaCodigoPostal', () => {
    component.codigosPostalesDatos = [{ id: 1, descripcion: 'Mexico' }];
    component.agregarDestinatarioFinal.get('codigoPostal')?.setValue(1);
    component.cambiaCodigoPostal();
    expect(component.agregarDestinatarioFinal.get('descCodigoPostal')?.value).toBe('Mexico');
  });
});
