import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { AlertComponent, CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { CATALOGOS_ID } from '@ng-mf/data-access-user';
import { ContribuyenteRespuesta } from '../../models/donaciones-extranjeras.model';
import { DatosRepLegalDonatarioComponent } from './datos-rep-legal-donatario.component';
import { DonacionesExtranjerasService } from '../../services/donaciones-extranjeras/donaciones-extranjeras.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DatosRepLegalDonatarioComponent', () => {
  let component: DatosRepLegalDonatarioComponent;
  let fixture: ComponentFixture<DatosRepLegalDonatarioComponent>;
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
      declarations: [DatosRepLegalDonatarioComponent],
      providers: [
        { provide: DonacionesExtranjerasService, useValue: DONACIONES_EXTRANJERAS_SERVICE_MOCK }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatosRepLegalDonatarioComponent);
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
    component.buscarContribuyenteRfc(2, 'ABC123456789');
    expect(component.nombreRepLegalDonatario).toBe('Juan Pérez González');
    expect(component.calleRepLegalDonatario).toBe('Av. Reforma');
    expect(component.numExteriorRepLegalDonatario).toBe('123');
    expect(component.numInteriorRepLegalDonatario).toBe('101');
    expect(component.estadoRepLegalDonatario).toBe('CDMX');
    expect(component.coloniaRepLegalDonatario).toBe('Centro');
    expect(component.codigoPostalRepLegalDonatario).toBe('01000');
    expect(component.cvePaisRepLegalDonatario).toBe('MX');
    expect(component.correoElectronicoRepLegalDonatario).toBe('juan.perez@example.com');
    expect(component.telefonoRepLegalDonatario).toBe('5551234567');
  });

  it('should reset form fields when contributor is not found', () => {
    (donacionesExtranjerasService.buscarContribuyente as jest.Mock).mockReturnValue(of(CONTRIBUYENTE_NOT_FOUND_MOCK));
    component.buscarContribuyenteRfc(2, 'XYZ987654321');
    expect(component.rfcRepLegalDonatario).toBe('');
    expect(component.nombreRepLegalDonatario).toBe('');
    expect(component.calleRepLegalDonatario).toBe('');
    expect(component.numExteriorRepLegalDonatario).toBe('');
    expect(component.numInteriorRepLegalDonatario).toBe('');
    expect(component.estadoRepLegalDonatario).toBe('');
    expect(component.coloniaRepLegalDonatario).toBe('');
    expect(component.codigoPostalRepLegalDonatario).toBe('');
    expect(component.cvePaisRepLegalDonatario).toBe('');
    expect(component.correoElectronicoRepLegalDonatario).toBe('');
    expect(component.telefonoRepLegalDonatario).toBe('');
  });

  it('should show alert when an invalid value is passed to `buscarContribuyenteRfc`', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => undefined);
    component.buscarContribuyenteRfc(0, 'ABC123456789'); // Invalid value
    expect(window.alert).toHaveBeenCalledWith('Valor erronio');
  });

  it('should call `buscarContribuyente` with the correct RFC', () => {
    component.buscarContribuyenteRfc(2, 'ABC123456789');
    expect(donacionesExtranjerasService.buscarContribuyente).toHaveBeenCalledWith('ABC123456789');
  });

  it('should reset all form fields when `restablecerFormulario` is called', () => {
    component.nombreRepLegalDonatario = 'Juan Pérez';
    component.calleRepLegalDonatario = 'Av. Reforma';
    component.restablecerFormulario();
    expect(component.nombreRepLegalDonatario).toBe('');
    expect(component.calleRepLegalDonatario).toBe('');
    expect(component.numExteriorRepLegalDonatario).toBe('');
    expect(component.numInteriorRepLegalDonatario).toBe('');
    expect(component.estadoRepLegalDonatario).toBe('');
    expect(component.coloniaRepLegalDonatario).toBe('');
    expect(component.codigoPostalRepLegalDonatario).toBe('');
    expect(component.cvePaisRepLegalDonatario).toBe('');
    expect(component.correoElectronicoRepLegalDonatario).toBe('');
    expect(component.telefonoRepLegalDonatario).toBe('');
  });

  it('should call `restablecerFormulario` when contributor data is not found', () => {
    (donacionesExtranjerasService.buscarContribuyente as jest.Mock).mockReturnValue(of(CONTRIBUYENTE_NOT_FOUND_MOCK));
    jest.spyOn(component, 'restablecerFormulario');
    component.buscarContribuyenteRfc(2, 'XYZ987654321'); // RFC not found
    expect(component.restablecerFormulario).toHaveBeenCalled();
  });
});