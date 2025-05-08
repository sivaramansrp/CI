import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { AgregarEnlaceOperativoComponent } from './agregar-enlace-operativo.component';
import { Solicitud32605Query } from '../../estados/solicitud32605.query';
import { Solicitud32605Store } from '../../estados/solicitud32605.store';
import { SolicitudService } from '../../services/solicitud.service';
import { CommonModule } from '@angular/common';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AgregarEnlaceOperativoComponent', () => {
  let component: AgregarEnlaceOperativoComponent;
  let fixture: ComponentFixture<AgregarEnlaceOperativoComponent>;
  let solicitudServiceMock: any;
  let solicitud32605QueryMock: any;
  let solicitud32605StoreMock: any;

  beforeEach(async () => {
    solicitudServiceMock = {
      conseguirRepresentanteLegalDatos: jest.fn().mockReturnValue(
        of({
          rfc: 'RFC123',
          nombre: 'John',
          apellidoPaterno: 'Doe',
          apellidoMaterno: 'Smith',
          telefono: '1234567890',
          correoElectronico: 'john.doe@example.com',
        })
      ),
    };

    solicitud32605QueryMock = {
      selectSolicitud$: of({
        rfcTercero: 'RFC123',
        rfc: 'RFC456',
        nombre: 'John',
        apellidoPaterno: 'Doe',
        apellidoMaterno: 'Smith',
        agregarEnlaceCiudadEstado: 'City, State',
        agregarEnlaceCargo: 'Manager',
        telefono: '1234567890',
        correoElectronico: 'john.doe@example.com',
        agregarEnlaceSuplente: false,
      }),
    };

    solicitud32605StoreMock = {
      actualizarEnlaceRfc: jest.fn(),
      actualizarEnlaceNombre: jest.fn(),
      actualizarEnlaceApellidoPaterno: jest.fn(),
      actualizarEnlaceApellidoMaterno: jest.fn(),
      actualizarEnlaceTelefono: jest.fn(),
      actualizarEnlaceCorreoElectronico: jest.fn(),
      actualizarRfcTercero: jest.fn(),
      actualizarTelefono: jest.fn(),
      actualizarCorreoElectronico: jest.fn(),
      actualizarEnlaceCargo: jest.fn(),
      actualizarEnlaceSuplente: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [
        AgregarEnlaceOperativoComponent,
        CommonModule,
        ReactiveFormsModule,
        TituloComponent,
        HttpClientTestingModule
      ],
      declarations: [],
      providers: [
        { provide: SolicitudService, useValue: solicitudServiceMock },
        { provide: Solicitud32605Query, useValue: solicitud32605QueryMock },
        { provide: Solicitud32605Store, useValue: solicitud32605StoreMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AgregarEnlaceOperativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.agregarEnlaceOperativoForm.value).toEqual({
      agregarEnlaceRfcTercero: 'RFC123',
      agregarEnlaceRfc: 'RFC456',
      agregarEnlaceNombre: 'John',
      agregarEnlaceApellidoPaterno: 'Doe',
      agregarEnlaceApellidoMaterno: 'Smith',
      agregarEnlaceCiudadEstado: 'City, State',
      agregarEnlaceCargo: 'Manager',
      agregarEnlaceTelefono: '1234567890',
      agregarEnlaceCorreoElectronico: 'john.doe@example.com',
      agregarEnlaceSuplente: false,
    });
  });

  it('should call solicitudService.conseguirRepresentanteLegalDatos on buscarTerceroNacionalIDC', () => {
    component.agregarEnlaceOperativoForm.get('rfcTercero')?.setValue('RFC123');
    component.buscarTerceroNacionalIDC();
    expect(
      solicitudServiceMock.conseguirRepresentanteLegalDatos
    ).toHaveBeenCalled();
  });

  it('should update store values on buscarTerceroNacionalIDC', () => {
    component.agregarEnlaceOperativoForm.get('rfcTercero')?.setValue('RFC123');
    component.buscarTerceroNacionalIDC();
    expect(solicitud32605StoreMock.actualizarEnlaceRfc).toHaveBeenCalledWith(
      'RFC123'
    );
    expect(solicitud32605StoreMock.actualizarEnlaceNombre).toHaveBeenCalledWith(
      'John'
    );
    expect(
      solicitud32605StoreMock.actualizarEnlaceApellidoPaterno
    ).toHaveBeenCalledWith('Doe');
    expect(
      solicitud32605StoreMock.actualizarEnlaceApellidoMaterno
    ).toHaveBeenCalledWith('Smith');
    expect(
      solicitud32605StoreMock.actualizarEnlaceTelefono
    ).toHaveBeenCalledWith('1234567890');
    expect(
      solicitud32605StoreMock.actualizarEnlaceCorreoElectronico
    ).toHaveBeenCalledWith('john.doe@example.com');
  });

  it('should emit agregarEnlaceOperativo event on aceptarEnlaceSuplente', () => {
    jest.spyOn(component.agregarEnlaceOperativo, 'emit');
    component.aceptarEnlaceSuplente();
    expect(component.agregarEnlaceOperativo.emit).toHaveBeenCalledWith({
      rfc: 'RFC456',
      nombre: 'John',
      apellidoPaterno: 'Doe',
      apellidoMaterno: 'Smith',
      claveCiudad: '',
      ciudad: 'City, State',
      cargo: 'Manager',
      telefono: '1234567890',
      correo: 'john.doe@example.com',
      suplente: '',
      calle: '',
      numeroExterior: '',
      numeroInterior: '',
      colonia: '',
      codigoPostal: '',
      localidad: '',
      delegacionMunicipio: '',
    });
  });

  it('should clean up subscriptions on ngOnDestroy', () => {
    const destroySpy = jest.spyOn(component['destroy$'], 'next');
    const completeSpy = jest.spyOn(component['destroy$'], 'complete');
    component.ngOnDestroy();
    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
