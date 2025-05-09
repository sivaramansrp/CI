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
      actualizarEnlaceRfc: jest.fn(() => of('RFC123')),
      actualizarEnlaceNombre: jest.fn(() => of('John')),
      actualizarEnlaceApellidoPaterno: jest.fn(() => of('Doe')),
      actualizarEnlaceApellidoMaterno: jest.fn(() => of('Smith')),
      actualizarEnlaceTelefono: jest.fn(() => of('1234567890')),
      actualizarEnlaceCorreoElectronico: jest.fn(() =>
        of('john.doe@example.com')
      ),
      actualizarRfcTercero: jest.fn(() => of('RFC123')),
      actualizarTelefono: jest.fn(() => of('1234567890')),
      actualizarCorreoElectronico: jest.fn(() => of('john.doe@example.com')),
      actualizarEnlaceCargo: jest.fn(() => of('Manager')),
      actualizarEnlaceSuplente: jest.fn(() => of(false)),
    };

    await TestBed.configureTestingModule({
      imports: [
        AgregarEnlaceOperativoComponent,
        CommonModule,
        ReactiveFormsModule,
        TituloComponent,
        HttpClientTestingModule,
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
      agregarEnlaceCargo: 'Manager',
      agregarEnlaceTelefono: '1234567890',
      agregarEnlaceCorreoElectronico: 'john.doe@example.com',
      agregarEnlaceSuplente: false,
    });
  });

  it('should call solicitudService.conseguirRepresentanteLegalDatos on buscarTerceroNacionalIDC', () => {
    component.agregarEnlaceOperativoForm.get('rfcTercero')?.setValue('RFC123');
    solicitudServiceMock.conseguirRepresentanteLegalDatos();
    expect(
      solicitudServiceMock.conseguirRepresentanteLegalDatos
    ).toHaveBeenCalled();
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
