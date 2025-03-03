import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosRepLegalRecibirDonacionComponent } from './datos-rep-legal-recibir-donacion.component';
import { DonacionesExtranjerasService } from 'libs/shared/data-access-user/src/core/services/10303/donaciones-extranjeras/donaciones-extranjeras.service';
import { of, throwError } from 'rxjs';
import { Catalogo } from 'libs/shared/data-access-user/src/core/models/shared/catalogos.model';
// import { CatalogoSelectComponent } from 'libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DatosRepLegalRecibirDonacionComponent', () => {
  let component: DatosRepLegalRecibirDonacionComponent;
  let fixture: ComponentFixture<DatosRepLegalRecibirDonacionComponent>;
  let donacionesExtranjerasService: jest.Mocked<DonacionesExtranjerasService>;

  beforeEach(async () => {
    const donacionesExtranjerasServiceMock = {
      getPaises: jest.fn(),
      buscarContribuyente: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [DatosRepLegalRecibirDonacionComponent],
      imports: [CatalogoSelectComponent],
      providers: [
        { provide: DonacionesExtranjerasService, useValue: donacionesExtranjerasServiceMock },
        NO_ERRORS_SCHEMA
      ]
    }).compileComponents();

    donacionesExtranjerasService = TestBed.inject(DonacionesExtranjerasService) as jest.Mocked<DonacionesExtranjerasService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosRepLegalRecibirDonacionComponent);
    component = fixture.componentInstance;
    donacionesExtranjerasService = TestBed.inject(DonacionesExtranjerasService) as jest.Mocked<DonacionesExtranjerasService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call `inicializaCatalogos` and populate pais catalog', () => {
    const paises: Catalogo[] = [{ id: 1, descripcion: 'México' }];
    donacionesExtranjerasService.getPaises.mockReturnValue(of({ code: 200, data: paises, message: 'Success' }));

    component.inicializaCatalogos();

    expect(component.pais).toEqual([{ id: 1, descripcion: 'México' }]);
    expect(donacionesExtranjerasService.getPaises).toHaveBeenCalled();
  });

  it('should initialize catalogos correctly', () => {
    const paises: Catalogo[] = [{ id: 1, descripcion: 'United States' }, { id: 2, descripcion: 'México' }];
    donacionesExtranjerasService.getPaises.mockReturnValue(of({ code: 200, data: paises, message: 'Success' }));

    component.ngOnInit();

    expect(component.pais).toEqual(paises);
  });

  it('should populate form with valid data when contributor is found', () => {
    const contributorData = {
      rfc: '123456789012',
      razonSocial: 'Company XYZ',
      nombre: 'John',
      apellidoPaterno: 'Doe',
      apellidoMaterno: 'Smith',
      calle: 'Main St',
      numeroExterior: '123',
      numeroInterior: 'A',
      estado: 'California',
      colonia: 'Downtown',
      codigoPostal: '90001',
      pais: 'US',
      correoElectronico: 'john.doe@example.com',
      telefono: '1234567890'
    };

    donacionesExtranjerasService.buscarContribuyente.mockReturnValue(of({ data: [contributorData] }));

    component.buscarContribuyenteRfc(3, '123456789012');

    expect(component.nombreRepLegalAutorizado).toBe('Company XYZ');
    expect(component.calleRepLegalAutorizado).toBe('Main St');
    expect(component.estadoRepLegalAutorizado).toBe('California');
    expect(component.telefonoRepLegalAutorizado).toBe('1234567890');
  });

  it('should reset the form if no contributor is found', () => {
    donacionesExtranjerasService.buscarContribuyente.mockReturnValue(of({ data: [] }));

    component.buscarContribuyenteRfc(3, 'nonexistentRFC');

    expect(component.nombreRepLegalAutorizado).toBe('');
    expect(component.calleRepLegalAutorizado).toBe('');
    expect(component.estadoRepLegalAutorizado).toBe('');
  });

  it('should alert with "Valor erronio" if the value is incorrect', () => {
    window.alert = jest.fn();
    donacionesExtranjerasService.buscarContribuyente.mockReturnValue(of({ data: [] }));

    component.buscarContribuyenteRfc(2, '123456789012');

    expect(window.alert).toHaveBeenCalledWith('Valor erronio');
  });

  it('should handle errors from the service and reset the form', () => {
    donacionesExtranjerasService.buscarContribuyente.mockReturnValue(throwError(() => new Error('Service Error')));

    component.buscarContribuyenteRfc(3, '123456789012');

    expect(component.nombreRepLegalAutorizado).toBe('');
    expect(component.calleRepLegalAutorizado).toBe('');
    expect(component.estadoRepLegalAutorizado).toBe('');
  });

  it('should reset all fields to empty values', () => {
    component.nombreRepLegalAutorizado = 'John Doe';
    component.calleRepLegalAutorizado = 'Main St';

    component.restablecerFormulario();

    expect(component.nombreRepLegalAutorizado).toBe('');
    expect(component.calleRepLegalAutorizado).toBe('');
  });

  it('should call getPaises and populate pais', () => {
    const paises: Catalogo[] = [{ id: 1, descripcion: 'United States' }];
    donacionesExtranjerasService.getPaises.mockReturnValue(of({ code: 200, data: paises, message: 'Success' }));

    component.inicializaCatalogos();

    expect(component.pais).toEqual(paises);
    expect(donacionesExtranjerasService.getPaises).toHaveBeenCalled();
  });

  it('should alert with "Valor erronio" when searching with invalid RFC and incorrect valor', () => {
    window.alert = jest.fn();

    // Simulate a search with an invalid RFC and incorrect valor (2 instead of 3)
    component.buscarContribuyenteRfc(2, 'invalidRFC');

    expect(window.alert).toHaveBeenCalledWith('Valor erronio');
  });

  it('should handle no countries in the catalog gracefully', () => {
    donacionesExtranjerasService.getPaises.mockReturnValue(of({ code: 200, data: [], message: 'Success' }));

    component.inicializaCatalogos();

    expect(component.pais).toEqual([]);
    expect(donacionesExtranjerasService.getPaises).toHaveBeenCalled();
  });
});