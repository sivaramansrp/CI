import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TercerosRelacionadosComponent } from './terceros-relacionados.component';
import { FormBuilder } from '@angular/forms';
import { EmpresasComercializadorasService } from '../../services/empresas-comercializadoras.service';
import { Solicitud32604Store } from '../../estados/solicitud32604.store';
import { Solicitud32604Query } from '../../estados/solicitud32604.query';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { of } from 'rxjs';

describe('TercerosRelacionadosComponent', () => {
  let component: TercerosRelacionadosComponent;
  let fixture: ComponentFixture<TercerosRelacionadosComponent>;
  let empresasComercializadorasServiceMock: any;
  let solicitud32604StoreMock: any;
  let solicitud32604QueryMock: any;
  let consultaioQueryMock: any;

  beforeEach(async () => {
    empresasComercializadorasServiceMock = {
      conseguirRepresentanteLegalDatos: jest.fn().mockReturnValue(of({
        rfc: 'RFC123',
        nombre: 'John',
        apellidoPaterno: 'Doe',
        apellidoMaterno: 'Smith',
        telefono: '1234567890',
        correoElectronico: 'john.doe@example.com',
      }))
    };
    solicitud32604StoreMock = {
      actualizarRfc: jest.fn(),
      actualizarNombre: jest.fn(),
      actualizarApellidoPaterno: jest.fn(),
      actualizarApellidoMaterno: jest.fn(),
      actualizarTelefono: jest.fn(),
      actualizarCorreoElectronico: jest.fn(),
      actualizarRfcTercero: jest.fn(),
      actualizarEnlaceOperativosLista: jest.fn()
    };
    solicitud32604QueryMock = {
      selectSolicitud$: of({
        idPersonaSolicitud: 1,
        rfcTercero: 'RFC123',
        rfc: 'RFC456',
        nombre: 'John',
        apellidoPaterno: 'Doe',
        apellidoMaterno: 'Smith',
        telefono: '1234567890',
        correoElectronico: 'john.doe@example.com',
      })
    };
    consultaioQueryMock = {
      selectConsultaioState$: of({ readonly: false })
    };

    await TestBed.configureTestingModule({
      imports: [TercerosRelacionadosComponent, HttpClientTestingModule],
      providers: [
        FormBuilder,
        { provide: EmpresasComercializadorasService, useValue: empresasComercializadorasServiceMock },
        { provide: Solicitud32604Store, useValue: solicitud32604StoreMock },
        { provide: Solicitud32604Query, useValue: solicitud32604QueryMock },
        { provide: ConsultaioQuery, useValue: consultaioQueryMock }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(TercerosRelacionadosComponent);
    component = fixture.componentInstance;
    component.tercerosRelacionadosForm = new FormBuilder().group({
      idPersonaSolicitud: [1],
      rfcTercero: ['RFC123'],
      rfc: [{ value: 'RFC456', disabled: true }],
      nombre: [{ value: 'John', disabled: true }],
      apellidoPaterno: [{ value: 'Doe', disabled: true }],
      apellidoMaterno: [{ value: 'Smith', disabled: true }],
      telefono: ['1234567890'],
      correoElectronico: ['john.doe@example.com']
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.tercerosRelacionadosForm.get('rfcTercero')?.value).toBe('RFC123');
    expect(component.tercerosRelacionadosForm.get('nombre')?.value).toBe('John');
    expect(component.tercerosRelacionadosForm.get('rfc')?.disabled).toBe(true);
    expect(component.tercerosRelacionadosForm.get('nombre')?.disabled).toBe(true);
    expect(component.tercerosRelacionadosForm.get('apellidoPaterno')?.disabled).toBe(true);
    expect(component.tercerosRelacionadosForm.get('apellidoMaterno')?.disabled).toBe(true);
  });

  it('should disable the form if esFormularioSoloLectura is true in guardarDatosFormulario', () => {
    component.esFormularioSoloLectura = true;
    component.guardarDatosFormulario();
    expect(component.tercerosRelacionadosForm.disabled).toBe(true);
  });

  it('should enable the form if esFormularioSoloLectura is false in guardarDatosFormulario', () => {
    component.esFormularioSoloLectura = false;
    component.guardarDatosFormulario();
    expect(component.tercerosRelacionadosForm.enabled).toBe(true);
  });

  it('should call actualizarRfcTercero on store when actualizarRfcTercero is called', () => {
    const mockEvent = { target: { value: 'RFC789' } } as unknown as Event;
    component.actualizarRfcTercero(mockEvent);
    expect(solicitud32604StoreMock.actualizarRfcTercero).toHaveBeenCalledWith('RFC789');
  });

  it('should call actualizarTelefono on store when actualizarTelefono is called', () => {
    const mockEvent = { target: { value: '5551234567' } } as unknown as Event;
    component.actualizarTelefono(mockEvent);
    expect(solicitud32604StoreMock.actualizarTelefono).toHaveBeenCalledWith('5551234567');
  });

  it('should call actualizarCorreoElectronico on store when actualizarCorreoElectronico is called', () => {
    const mockEvent = { target: { value: 'test@email.com' } } as unknown as Event;
    component.actualizarCorreoElectronico(mockEvent);
    expect(solicitud32604StoreMock.actualizarCorreoElectronico).toHaveBeenCalledWith('test@email.com');
  });

  it('should patch form values when buscarTerceroNacionalIDC finds a registro', () => {
  component.tercerosRelacionadosForm.get('rfcTercero')?.setValue('RFC123');
  component.buscarTerceroNacionalIDC();
  expect(component.tercerosRelacionadosForm.get('rfc')?.value).toBe('RFC456');
  expect(component.tercerosRelacionadosForm.get('nombre')?.value).toBe('John');
  });

  it('should show notification when eliminarPedimento is called with true', () => {
    component.pedimentos = [{}, {}] as any;
    component.elementoParaEliminar = 0;
    component.eliminarPedimento(true);
    expect(component.mostrarNotificacion).toBe(true);
    expect(component.pedimentos.length).toBe(1);
  });

  it('should add enlace operativo if not duplicate', () => {
    const evento = { rfc: 'RFC999', nombre: 'Test', apellidoPaterno: 'A', apellidoMaterno: 'B', ciudad: 'X', cargo: 'Y', telefono: 'Z', correo: 'C', suplente: '', calle: '', numeroExterior: '', numeroInterior: '', colonia: '', codigoPostal: '', localidad: '', delegacionMunicipio: '' };
    component.enlaceOperativosLista = [];
    component.agregarEnlaceOperativo(evento as any);
    expect(component.enlaceOperativosLista.length).toBe(1);
  });

  it('should not add enlace operativo if duplicate', () => {
    const evento = { rfc: 'RFC999', nombre: 'Test', apellidoPaterno: 'A', apellidoMaterno: 'B', ciudad: 'X', cargo: 'Y', telefono: 'Z', correo: 'C', suplente: '', calle: '', numeroExterior: '', numeroInterior: '', colonia: '', codigoPostal: '', localidad: '', delegacionMunicipio: '' };
    component.enlaceOperativosLista = [evento as any];
    component.agregarEnlaceOperativo(evento as any);
    expect(component.enlaceOperativosLista.length).toBe(1);
  });

  it('should clean up subscriptions on ngOnDestroy', () => {
    const destroySpy = jest.spyOn((component as any)['destroy$'], 'next');
    const completeSpy = jest.spyOn((component as any)['destroy$'], 'complete');
    component.ngOnDestroy();
    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
