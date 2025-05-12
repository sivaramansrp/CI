
import { TestBed } from '@angular/core/testing';
import { CapturarExpedicionCertificadosComponent } from './capturar-expedicion-certificados.component';
import { FormBuilder } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { ExpedicionCertificadoService } from '../../services/expedicion-certificado.service';
import { Expedicion120204Store } from '../../estados/tramites/expedicion120204.store';
import { Expedicion120204Query } from '../../estados/queries/expedicion120204.query';

describe('CapturarExpedicionCertificadosComponent', () => {
  let component: CapturarExpedicionCertificadosComponent;
  let expedicionCertificadoServiceMock: any;
  let expedicion120204StoreMock: any;
  let expedicion120204QueryMock: any;

  beforeEach(() => {
    expedicionCertificadoServiceMock = {
      getEntidadFederativa: jest.fn().mockReturnValue(of([{ id: 1, descripcion: 'Entidad Federativa' }])),
      getRepresentacionFederal: jest.fn().mockReturnValue(of([{ id: 2, descripcion: 'Representacion Federal' }])),
      getDetallesDelalicitacion: jest.fn().mockReturnValue(of({ 
         "numeraDelicitacion":"002/2024",
        "fechaDelEventoDelicitacion":"2024-03-22",
        "descripcionDelProducto":"PANTALONES CON PETO Y TIRANTI 100% ALGODON" 
      })),
      getDistribucionSaldo: jest.fn().mockReturnValue(of({ 
        "montoAExpedir":"",
        "montoAExpedirCheck":false,
        "montoDisponible":"9985",
        "totalAExpedir":"" })),

      getTableData: jest.fn().mockReturnValue(of([{
         "numerodelicitacion":"002/2024 ",
      "fechadelicitacion":"2024-03-22 ",
      "descripcion":"",
      "montoadjudicado":"9985",
      "fechainiciovigencia":"2024-03-01",
      "fechafinvigencia":"2024-12-31" }])),
    };

    expedicion120204StoreMock = {
      setEntidadFederativa: jest.fn(),
      setRepresentacionFederal: jest.fn(),
      setMontoExpedir: jest.fn(),
      setMontoExpedirCheck: jest.fn(),
      setTotalExpedir: jest.fn(),
    };

    expedicion120204QueryMock = {
      entidadFederativa$: of({ id: 1, descripcion: 'Entidad Federativa' }),
      representacionFederal$: of({ id: 2, descripcion: 'Representacion Federal' }),
      montoAExpedir$: of('500'),
      montoAExpedirCheck$: of(true),
      totalAExpedir$: of('1500'),
    };

    TestBed.configureTestingModule({
      providers: [
        FormBuilder,
        { provide: ExpedicionCertificadoService, useValue: expedicionCertificadoServiceMock },
        { provide: Expedicion120204Store, useValue: expedicion120204StoreMock },
        { provide: Expedicion120204Query, useValue: expedicion120204QueryMock },
      ],
    });

    const fb = TestBed.inject(FormBuilder);
    component = new CapturarExpedicionCertificadosComponent(
      expedicionCertificadoServiceMock,
      fb,
      expedicion120204StoreMock,
      expedicion120204QueryMock
    );
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize forms and fetch data on ngOnInit', () => {
    jest.spyOn(component, 'getEntidadFederativa');
    jest.spyOn(component, 'getRepresentacionFederal');
    jest.spyOn(component, 'getDetallesDelalicitacion');
    jest.spyOn(component, 'getDistribucionSaldo');
    jest.spyOn(component, 'obtenerDatosTabla');

    component.ngOnInit();

    expect(component.getEntidadFederativa).toHaveBeenCalled();
    expect(component.getRepresentacionFederal).toHaveBeenCalled();
    expect(component.getDetallesDelalicitacion).toHaveBeenCalled();
    expect(component.getDistribucionSaldo).toHaveBeenCalled();
    expect(component.obtenerDatosTabla).toHaveBeenCalled();
  });

  it('should call setEntidadFederativa on onChangeEntiadFederative', () => {
    component.formulario.get('entidadFederativa')?.setValue('Entidad 1');
    component.onCambiarEntiadFederative();
    expect(expedicion120204StoreMock.setEntidadFederativa).toHaveBeenCalledWith('Entidad 1');
  });

  it('should call setRepresentacionFederal on onChangeRepresentacionFederal', () => {
    component.formulario.get('representacionFederal')?.setValue('Representación 1');
    component.onCambiarRepresentacionFederal();
    expect(expedicion120204StoreMock.setRepresentacionFederal).toHaveBeenCalledWith('Representación 1');
  });

  it('should call setMontoExpedir on onChangeMontoAExpedir', () => {
    component.distribucionSaldoForm.get('montoAExpedir')?.setValue('500');
    component.onCambiarMontoAExpedir();
    expect(expedicion120204StoreMock.setMontoExpedir).toHaveBeenCalledWith('500');
  });

  it('should call setMontoExpedirCheck on onChangeMontoAExpedirCheck', () => {
    component.distribucionSaldoForm.get('montoAExpedirCheck')?.setValue(true);
    component.onCambiarMontoAExpedirCheck();
    expect(expedicion120204StoreMock.setMontoExpedirCheck).toHaveBeenCalledWith(true);
  });

  it('should calculate and update totalAExpedir on AgregarMontoExpedir', () => {
    component.distribucionSaldoForm.patchValue({ montoAExpedir: '500', totalAExpedir: '1000' });
    component.AgregarMontoExpedir();
    expect(component.distribucionSaldoForm.get('totalAExpedir')?.value).toBe('1500');
    expect(expedicion120204StoreMock.setTotalExpedir).toHaveBeenCalledWith(1500);
  });
});