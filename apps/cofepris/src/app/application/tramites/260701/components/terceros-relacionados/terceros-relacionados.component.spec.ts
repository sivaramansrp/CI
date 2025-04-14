import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TercerosRelacionadosComponent } from './terceros-relacionados.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CertificadosLicenciasService } from '../../services/certificados-licencias.service';
import { of } from 'rxjs';

describe('TercerosRelacionadosComponent', () => {
  let component: TercerosRelacionadosComponent;
  let fixture: ComponentFixture<TercerosRelacionadosComponent>;
  let certificadosLicenciasSvcMock: any;
  let modalServiceMock: any;

  beforeEach(async () => {
    certificadosLicenciasSvcMock = {
      getDestinatarioDatos: jest.fn().mockReturnValue(of([])),
      getFabricanteDatos: jest.fn().mockReturnValue(of([])),
    };

    modalServiceMock = {
      show: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [TercerosRelacionadosComponent],
      providers: [
        { provide: CertificadosLicenciasService, useValue: certificadosLicenciasSvcMock },
        { provide: BsModalService, useValue: modalServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TercerosRelacionadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize destinatarioDatos and fabricanteTablaDatos on ngOnInit', () => {
    const destinatariosMock = [{ nombre: 'Test Destinatario' }];
    const fabricantesMock = [{ nombre: 'Test Fabricante' }];

    certificadosLicenciasSvcMock.getDestinatarioDatos.mockReturnValue(of(destinatariosMock));
    certificadosLicenciasSvcMock.getFabricanteDatos.mockReturnValue(of(fabricantesMock));

    component.ngOnInit();

    expect(component.destinatarioDatos).toEqual(destinatariosMock);
    expect(component.fabricanteTablaDatos).toEqual(fabricantesMock);
  });

  it('should open a modal with the given template', () => {
    const template = {} as any;
    component.abrirModal(template);
    expect(modalServiceMock.show).toHaveBeenCalledWith(template, { class: 'modal-sm' });
  });

  it('should open a modal for managing fabricantes with the given title', () => {
    const titulo = 'Test Title';
    component.abrirFabricanteModal(titulo);
    expect(modalServiceMock.show).toHaveBeenCalledWith(expect.any(Function), {
      class: 'modal-xl',
      initialState: { titulo },
    });
  });

  it('should clean up resources on ngOnDestroy', () => {
    const destroySpy = jest.spyOn(component['destroyNotifier$'], 'next');
    const completeSpy = jest.spyOn(component['destroyNotifier$'], 'complete');

    component.ngOnDestroy();

    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
it('should update tieneFilaSeleccionada when setTablaSeleccionDestinatario is called', () => {
  const mockRows:any = [{ 
    nombre: 'Test Destinatario', 
    rfc: 'RFC123456', 
    curp: 'CURP123456', 
    telefono: '1234567890', 
    correoElectronico: 'test@example.com',
    // Add other required properties here
  }];
  const fixture = TestBed.createComponent(TercerosRelacionadosComponent);
  const component = fixture.componentInstance;

  component.setTablaSeleccionDestinatario(mockRows);
  expect(component.tieneFilaSeleccionada).toBe(true);

  component.setTablaSeleccionDestinatario([]);
  expect(component.tieneFilaSeleccionada).toBe(false);
});

it('should update tieneFilaSeleccionadaFabricante when setTablaSeleccionFabricante is called', () => {
  const mockRows: any = [{ nombre: 'Test Fabricante' }];
  const fixture = TestBed.createComponent(TercerosRelacionadosComponent);
  const component = fixture.componentInstance;
  component.setTablaSeleccionFabricante(mockRows);
  expect(component.tieneFilaSeleccionadaFabricante).toBe(true);

  component.setTablaSeleccionFabricante([]);
  expect(component.tieneFilaSeleccionadaFabricante).toBe(false);
});

it('should remove the last entry from destinatarioDatos and fabricanteTablaDatos when eliminarDatos is called', () => {
  const fixture = TestBed.createComponent(TercerosRelacionadosComponent);
  const component = fixture.componentInstance;
  component.destinatarioDatos = [{
    nombre: 'Destinatario 1',
    rfc: '',
    curp: '',
    telefono: '',
    correoElectronico: '',
    calle: '',
    numeroExterior: '',
    numeroInterior: '',
    pais: '',
    colonia: '',
    municipio: '',
    localidad: '',
    entidadFederativa: '',
    estado: '',
    codigoPostal: '',
    coloniaEquivalente: ''
  }];
  component.fabricanteTablaDatos = [{
    nombre: 'Fabricante 1',
    rfc: '',
    curp: '',
    telefono: '',
    correoElectronico: '',
    calle: '',
    numeroExterior: '',
    numeroInterior: '',
    pais: '',
    colonia: '',
    municipio: '',
    localidad: '',
    entidadFederativa: '',
    estado: '',
    cp: ''
  }];
  component.tieneFilaSeleccionada = true;
  component.tieneFilaSeleccionadaFabricante = true;

  component.eliminarDatos();

  expect(component.destinatarioDatos.length).toBe(0);
  expect(component.fabricanteTablaDatos.length).toBe(0);
  expect(component.modalRef?.hide).toHaveBeenCalled();
});

it('should not remove entries if no rows are selected when eliminarDatos is called', () => {
  const fixture = TestBed.createComponent(TercerosRelacionadosComponent);
  const component = fixture.componentInstance;
  component.destinatarioDatos = [{
    nombre: 'Destinatario 1',
    rfc: '',
    curp: '',
    telefono: '',
    correoElectronico: '',
    calle: '',
    numeroExterior: '',
    numeroInterior: '',
    pais: '',
    colonia: '',
    municipio: '',
    localidad: '',
    entidadFederativa: '',
    estado: '',
    codigoPostal: '',
    coloniaEquivalente: ''
  }];
  component.fabricanteTablaDatos = [{
    nombre: 'Fabricante 1',
    rfc: '',
    curp: '',
    telefono: '',
    correoElectronico: '',
    calle: '',
    numeroExterior: '',
    numeroInterior: '',
    pais: '',
    colonia: '',
    municipio: '',
    localidad: '',
    entidadFederativa: '',
    estado: '',
    cp: ''
  }];
  component.tieneFilaSeleccionada = false;
  component.tieneFilaSeleccionadaFabricante = false;

  component.eliminarDatos();

  expect(component.destinatarioDatos.length).toBe(1);
  expect(component.fabricanteTablaDatos.length).toBe(1);
});
