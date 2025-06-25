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

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe inicializar el formulario al crear el componente', () => {
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

  it('debe llamar a cargarDatos en ngOnInit', () => {
    const cargarDatosSpy = jest.spyOn(component, 'cargarDatos');
    component.ngOnInit();
    expect(cargarDatosSpy).toHaveBeenCalled();
  });

  it('debe desuscribirse en ngOnDestroy', () => {
    const unsubscribeSpy = jest.spyOn(component['unsubscribe$'], 'next');
    const completeSpy = jest.spyOn(component['unsubscribe$'], 'complete');
    component.ngOnDestroy();
    expect(unsubscribeSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('debe guardar fabricante tipoPersona "0" (moral) y actualizar el store', () => {
    const backSpy = jest.spyOn(component['ubicaccion'], 'back');
    component.agregarFabricante.patchValue({
      tipoPersona: '0',
      denominacionRazon: 'Empresa S.A.',
      rfc: 'RFC123456789',
      lada: '55',
      telefono: '12345678',
      correoElectronico: 'empresa@test.com',
      calle: 'Calle',
      numeroExterior: '123',
      numeroInterior: '',
      pais: '1',
      colonia: 'COL',
      municipio: 'MUN',
      localidad: 'LOC',
      estado: 'EDO',
      codigoPostal: 'CP',
      descPais: 'México'
    });
    component.fabricantes = [];
    component.guardarFabricante();
    expect(component.fabricantes.length).toBe(1);
    expect(mockTramite260104Store.updateFabricanteTablaDatos).toHaveBeenCalledWith(component.fabricantes);
    expect(backSpy).toHaveBeenCalled();
  });

  it('debe guardar fabricante tipoPersona "1" (física) y actualizar el store', () => {
    const backSpy = jest.spyOn(component['ubicaccion'], 'back');
    component.agregarFabricante.patchValue({
      tipoPersona: '1',
      nombres: 'Juan',
      primerApellido: 'Pérez',
      segundoApellido: 'García',
      rfc: 'RFC987654321',
      lada: '55',
      telefono: '87654321',
      correoElectronico: 'juan@test.com',
      calle: 'Calle',
      numeroExterior: '456',
      numeroInterior: '',
      pais: '1',
      colonia: 'COL',
      municipio: 'MUN',
      localidad: 'LOC',
      estado: 'EDO',
      codigoPostal: 'CP',
      descPais: 'México'
    });
    component.fabricantes = [];
    component.guardarFabricante();
    expect(component.fabricantes.length).toBe(1);
    expect(mockTramite260104Store.updateFabricanteTablaDatos).toHaveBeenCalledWith(component.fabricantes);
    expect(backSpy).toHaveBeenCalled();
  });

  it('debe limpiar el formulario', () => {
    const resetSpy = jest.spyOn(component.agregarFabricante, 'reset');
    component.limpiarFormulario();
    expect(resetSpy).toHaveBeenCalled();
  });

  it('debe cancelar y regresar', () => {
    const backSpy = jest.spyOn(component['ubicaccion'], 'back');
    component.cancelar();
    expect(backSpy).toHaveBeenCalled();
  });

  it('debe deshabilitar el formulario si esFormularioSoloLectura es true', () => {
    component.esFormularioSoloLectura = true;
    component.crearAgregarFormularioAgregarDestinatarioFinal();
    const allDisabled = Object.values(component.agregarFabricante.controls).every(ctrl => ctrl.disabled);
    expect(allDisabled).toBe(true);
  });
});
