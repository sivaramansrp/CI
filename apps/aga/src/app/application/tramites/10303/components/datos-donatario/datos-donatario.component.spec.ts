import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { CATALOGOS_ID } from '@ng-mf/data-access-user';
import { ContribuyenteRespuesta } from '../../models/donaciones-extranjeras.model';

import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { DatosDonatarioComponent } from './datos-donatario.component';
import { DonacionesExtranjerasService } from '../../services/donaciones-extranjeras/donaciones-extranjeras.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DatosDonatarioComponent', () => {
  let component: DatosDonatarioComponent;
  let fixture: ComponentFixture<DatosDonatarioComponent>;
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

  beforeEach(async () => {
    const DONACIONES_EXTRANJERAS_SERVICE_MOCK = {
      getPaises: jest.fn().mockReturnValue(of(PAIS_MOCK)),
      buscarContribuyente: jest.fn().mockReturnValue(of(CONTRIBUYENTE_MOCK))
    };

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, CatalogoSelectComponent],
      declarations: [DatosDonatarioComponent],
      providers: [
        { provide: DonacionesExtranjerasService, useValue: DONACIONES_EXTRANJERAS_SERVICE_MOCK }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DatosDonatarioComponent);
    component = fixture.componentInstance;
    donacionesExtranjerasService = TestBed.inject(DonacionesExtranjerasService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the pais catalog correctly on ngOnInit', () => {
    component.ngOnInit();

    // Check if pais is correctly populated
    expect(component.pais).toEqual([{ id: 1, descripcion: 'México' }]);
  });

  it('should call getPaises method during initialization', () => {
    component.ngOnInit();

    // Ensure getPaises method is called
    expect(donacionesExtranjerasService.getPaises).toHaveBeenCalledWith(CATALOGOS_ID.CAT_PAIS);
  });

  it('should correctly populate form fields with contribuyente data when found', () => {
    component.buscarContribuyenteRfc(1, 'ABC123456789');

    // Check if form fields are correctly populated
    expect(component.nombreDonatario).toBe('Juan Pérez González');
    expect(component.calleDonatario).toBe('Av. Reforma');
    expect(component.numExteriorDonatario).toBe('123');
    expect(component.numInteriorDonatario).toBe('101');
    expect(component.estadoDonatario).toBe('CDMX');
    expect(component.coloniaDonatario).toBe('Centro');
    expect(component.codigoPostalDonatario).toBe('01000');
    expect(component.cvePaisDonatario).toBe('MX');
    expect(component.correoElectronicoDonatario).toBe('juan.perez@example.com');
    expect(component.telefonoDonatario).toBe('5551234567');
  });

  it('should reset form fields if contribuyente data is not found', () => {
    // Modify mock to return null data
    const CONTRIBUYENTE_NOT_FOUND_MOCK: ContribuyenteRespuesta = { data: [] };
    (donacionesExtranjerasService.buscarContribuyente as jest.Mock).mockReturnValue(of(CONTRIBUYENTE_NOT_FOUND_MOCK));

    component.buscarContribuyenteRfc(1, 'XYZ987654321');

    // Check if form fields are reset
    expect(component.nombreDonatario).toBe('');
    expect(component.calleDonatario).toBe('');
    expect(component.numExteriorDonatario).toBe('');
    expect(component.numInteriorDonatario).toBe('');
    expect(component.estadoDonatario).toBe('');
    expect(component.coloniaDonatario).toBe('');
    expect(component.codigoPostalDonatario).toBe('');
    expect(component.cvePaisDonatario).toBe('');
    expect(component.correoElectronicoDonatario).toBe('');
    expect(component.telefonoDonatario).toBe('');
  });

  it('should show an alert when invalid value is passed to buscarContribuyenteRfc', () => {
    window.alert = jest.fn(); 

    component.buscarContribuyenteRfc(0, 'ABC123456789'); // Invalid value passed

    // Check if alert is triggered
    expect(window.alert).toHaveBeenCalledWith('Valor erronio');
  });

  it('should call buscarContribuyente with the correct RFC', () => {
    component.buscarContribuyenteRfc(1, 'ABC123456789');

    // Check if service method is called with correct RFC
    expect(donacionesExtranjerasService.buscarContribuyente).toHaveBeenCalledWith('ABC123456789');
  });

  it('should call restablecerFormulario when contribuyente is not found', () => {
    // Mocking contribuyente data as null
    const CONTRIBUYENTE_NOT_FOUND_MOCK: ContribuyenteRespuesta = { data: [] };
    (donacionesExtranjerasService.buscarContribuyente as jest.Mock).mockReturnValue(of(CONTRIBUYENTE_NOT_FOUND_MOCK));

    jest.spyOn(component, 'restablecerFormulario');

    component.buscarContribuyenteRfc(1, 'XYZ987654321'); // RFC not found

    // Ensure restablecerFormulario is called when no contribuyente is found
    expect(component.restablecerFormulario).toHaveBeenCalled();
  });

  it('should reset all form fields when restablecerFormulario is called', () => {
    // Set some fields with non-empty values
    component.nombreDonatario = 'Juan Pérez';
    component.calleDonatario = 'Av. Reforma';

    // Call restablecerFormulario method
    component.restablecerFormulario();

    // Check if all fields are reset
    expect(component.nombreDonatario).toBe('');
    expect(component.calleDonatario).toBe('');
    expect(component.numExteriorDonatario).toBe('');
    expect(component.numInteriorDonatario).toBe('');
    expect(component.estadoDonatario).toBe('');
    expect(component.coloniaDonatario).toBe('');
    expect(component.codigoPostalDonatario).toBe('');
    expect(component.cvePaisDonatario).toBe('');
    expect(component.correoElectronicoDonatario).toBe('');
    expect(component.telefonoDonatario).toBe('');
  });
});