import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { AlertComponent, CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { CATALOGOS_ID } from '@ng-mf/data-access-user';
import { ContribuyenteRespuesta } from '@ng-mf/data-access-user';
import { DatosPersonaOirRecibirComponent } from './datos-persona-oir-recibir.component';
import { DonacionesExtranjerasService } from '@ng-mf/data-access-user';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DatosPersonaOirRecibirComponent', () => {
  let component: DatosPersonaOirRecibirComponent;
  let fixture: ComponentFixture<DatosPersonaOirRecibirComponent>;
  let donacionesExtranjerasService: DonacionesExtranjerasService;

  const PAIS_MOCK = { data: [{ id: 1, descripcion: 'México' }] };
  const CONTRIBUYENTE_MOCK: ContribuyenteRespuesta = {
    data: [{
      rfc: 'ABC123456789',
      razonSocial: 'Empresa S.A. de C.V.',
      nombre: 'Juan',
      apellidoPaterno: 'Pérez',
      apellidoMaterno: 'González',
      calle: 'Av. Reforma',
      numeroExterior: '123',
      numeroInterior: '101',
      estado: 'CDMX',
      colonia: 'Centro',
      codigoPostal: '01000',
      pais: 'MX',
      correoElectronico: 'juan.perez@example.com',
      telefono: '5551234567'
    }]
  };

  const CONTRIBUYENTE_NOT_FOUND_MOCK: ContribuyenteRespuesta = { data: [] };

  beforeEach(async () => {
    const DONACIONES_EXTRANJERAS_SERVICE_MOCK = {
      getPaises: jest.fn().mockReturnValue(of(PAIS_MOCK)),
      buscarContribuyente: jest.fn().mockReturnValue(of(CONTRIBUYENTE_MOCK))
    };

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, CatalogoSelectComponent, AlertComponent],
      declarations: [DatosPersonaOirRecibirComponent],
      providers: [
        { provide: DonacionesExtranjerasService, useValue: DONACIONES_EXTRANJERAS_SERVICE_MOCK }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatosPersonaOirRecibirComponent);
    component = fixture.componentInstance;
    donacionesExtranjerasService = TestBed.inject(DonacionesExtranjerasService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the catalog of countries correctly on ngOnInit', () => {
    component.ngOnInit();
    expect(component.pais).toEqual([{ id: 1, descripcion: 'México' }]);
    expect(donacionesExtranjerasService.getPaises).toHaveBeenCalledWith(CATALOGOS_ID.CAT_PAIS);
  });

  it('should call `inicializaCatalogos` and populate pais catalog', () => {
    component.inicializaCatalogos();
    expect(component.pais).toEqual([{ id: 1, descripcion: 'México' }]);
  });

  it('should populate form fields correctly when contributor is found', () => {
    component.buscarContribuyenteRfc(4, 'ABC123456789');
    expect(component.nombrePersonaAutorizada).toBe('Juan Pérez González');
    expect(component.callePersonaAutorizada).toBe('Av. Reforma');
    expect(component.numExteriorPersonaAutorizada).toBe('123');
    expect(component.numInteriorPersonaAutorizada).toBe('101');
    expect(component.estadoPersonaAutorizada).toBe('CDMX');
    expect(component.coloniaPersonaAutorizada).toBe('Centro');
    expect(component.codigoPostalPersonaAutorizada).toBe('01000');
    expect(component.cvePaisPersonaAutorizada).toBe('MX');
    expect(component.correoElectronicoPersonaAutorizada).toBe('juan.perez@example.com');
    expect(component.telefonoPersonaAutorizada).toBe('5551234567');
  });

  it('should reset form fields when contributor is not found', () => {
    (donacionesExtranjerasService.buscarContribuyente as jest.Mock).mockReturnValue(of(CONTRIBUYENTE_NOT_FOUND_MOCK));
    component.buscarContribuyenteRfc(4, 'XYZ987654321');
    expect(component.rfcPersonaAutorizada).toBe('');
    expect(component.nombrePersonaAutorizada).toBe('');
    expect(component.callePersonaAutorizada).toBe('');
    expect(component.numExteriorPersonaAutorizada).toBe('');
    expect(component.numInteriorPersonaAutorizada).toBe('');
    expect(component.estadoPersonaAutorizada).toBe('');
    expect(component.coloniaPersonaAutorizada).toBe('');
    expect(component.codigoPostalPersonaAutorizada).toBe('');
    expect(component.cvePaisPersonaAutorizada).toBe('');
    expect(component.correoElectronicoPersonaAutorizada).toBe('');
    expect(component.telefonoPersonaAutorizada).toBe('');
  });

  it('should show alert when an invalid value is passed to `buscarContribuyenteRfc`', () => {
    jest.spyOn(window, 'alert').mockImplementation((message) => console.log(message));
    component.buscarContribuyenteRfc(0, 'ABC123456789');
    expect(window.alert).toHaveBeenCalledWith('Valor erronio');
  });

  it('should call `buscarContribuyente` with the correct RFC', () => {
    component.buscarContribuyenteRfc(4, 'ABC123456789');
    expect(donacionesExtranjerasService.buscarContribuyente).toHaveBeenCalledWith('ABC123456789');
  });

  it('should reset all form fields when `restablecerFormulario` is called', () => {
    component.nombrePersonaAutorizada = 'Juan Pérez';
    component.callePersonaAutorizada = 'Av. Reforma';
    component.restablecerFormulario();
    expect(component.nombrePersonaAutorizada).toBe('');
    expect(component.callePersonaAutorizada).toBe('');
    expect(component.numExteriorPersonaAutorizada).toBe('');
    expect(component.numInteriorPersonaAutorizada).toBe('');
    expect(component.estadoPersonaAutorizada).toBe('');
    expect(component.coloniaPersonaAutorizada).toBe('');
    expect(component.codigoPostalPersonaAutorizada).toBe('');
    expect(component.cvePaisPersonaAutorizada).toBe('');
    expect(component.correoElectronicoPersonaAutorizada).toBe('');
    expect(component.telefonoPersonaAutorizada).toBe('');
  });

  it('should call `restablecerFormulario` when contributor data is not found', () => {
    (donacionesExtranjerasService.buscarContribuyente as jest.Mock).mockReturnValue(of(CONTRIBUYENTE_NOT_FOUND_MOCK));
    jest.spyOn(component, 'restablecerFormulario');
    component.buscarContribuyenteRfc(4, 'XYZ987654321'); // RFC not found
    expect(component.restablecerFormulario).toHaveBeenCalled();
  });
});