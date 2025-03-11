import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { of } from 'rxjs';

import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { ContribuyenteRespuesta } from '../../models/donaciones-extranjeras.model';
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
    const SPY = jasmine.createSpyObj('DonacionesExtranjerasService', ['getPaises', 'buscarContribuyente']);

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create the form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.datosDonatarioForm).toBeDefined();
  });
  
  it('should call tramite10303Store.setCvePaisDonatario on paisSeleccion', () => {
    const SPY = jest.spyOn(component['tramite10303Store'], 'setCvePaisDonatario');
    component.datosDonatarioForm.patchValue({ cvePaisDonatario: 'testPais' });
    component.paisSeleccion();
    expect(SPY).toHaveBeenCalledWith('testPais');
  });
  
  it('should call construirDonatario with correct parameters on buscarContribuyenteRfc', () => {
    const SPY = jest.spyOn(component, 'construirDonatario');
    jest.spyOn(donacionesExtranjerasService, 'buscarContribuyente').mockReturnValue(of(CONTRIBUYENTE_MOCK));
    component.buscarContribuyenteRfc(1, 'ABC123456789');
    expect(SPY).toHaveBeenCalledWith(CONTRIBUYENTE_MOCK.data[0], true);
  });
  
  it('should call toastr.error on buscarContribuyenteRfc with incorrect valor', () => {
    const TOASTR_SPY = jest.spyOn((component as any).toastr, 'error');
    jest.spyOn(donacionesExtranjerasService, 'buscarContribuyente').mockReturnValue(of(CONTRIBUYENTE_MOCK));
    component.buscarContribuyenteRfc(0, 'ABC123456789');
    expect(TOASTR_SPY).toHaveBeenCalledWith('Valor erronio');
  });
  
  it('should call restablecerFormulario if contribuyente not found', () => {
    const SPY = jest.spyOn(component, 'restablecerFormulario');
    jest.spyOn(donacionesExtranjerasService, 'buscarContribuyente').mockReturnValue(of({ data: [] }));
    component.buscarContribuyenteRfc(1, 'ABC123456789');
    expect(SPY).toHaveBeenCalled();
  });
  
  it('should patch form values on construirDonatario with encontrado true', () => {
    const CONTRIBUYENTE = CONTRIBUYENTE_MOCK.data[0];
    component.construirDonatario(CONTRIBUYENTE, true);
    expect(component.datosDonatarioForm.get('nombreDonatario')?.value).toEqual('Juan Pérez González');
    expect(component.datosDonatarioForm.get('calleDonatario')?.value).toEqual('Av. Reforma');
  });
  
  it('should reset form on construirDonatario with encontrado false', () => {
    const SPY = jest.spyOn(component, 'restablecerFormulario');
    component.construirDonatario(CONTRIBUYENTE_MOCK.data[0], false);
    expect(SPY).toHaveBeenCalled();
  });
  
  it('should reset form on restablecerFormulario', () => {
    component.datosDonatarioForm.reset({
      rfcDonatario: null,
      nombreDonatario: null,
      calleDonatario: null,
      numExteriorDonatario: null,
      numInteriorDonatario: null,
      cvePaisDonatario: null,
      codigoPostalDonatario: null,
      estadoDonatario: null,
      coloniaDonatario: null,
      correoElectronicoDonatario: null,
      telefonoDonatario: null
    });
    component.restablecerFormulario();
    expect(component.datosDonatarioForm.get('rfcDonatario')?.value).toBeNull();
    expect(component.datosDonatarioForm.get('nombreDonatario')?.value).toBeNull();
  });

  it('should set valores in store on setValoresStore', () => {
    const FORM = new FormGroup({
      testCampo: new FormControl('testValue')
    });
    const SPY = jest.spyOn(component['tramite10303Store'], 'setCvePaisDonatario');
    component.setValoresStore(FORM, 'testCampo', 'setCvePaisDonatario');
    expect(SPY).toHaveBeenCalledWith('testValue');
  });
  
  it('should destroy subscriptions on ngOnDestroy', () => {
    const SPY = jest.spyOn(component['destruirNotificador$'], 'next');
    component.ngOnDestroy();
    expect(SPY).toHaveBeenCalled();
  });
});