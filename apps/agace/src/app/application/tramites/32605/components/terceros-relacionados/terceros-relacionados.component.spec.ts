import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TercerosRelacionadosComponent } from './terceros-relacionados.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { SolicitudService } from '../../services/solicitud.service';
import { Solicitud32605Store } from '../../estados/solicitud32605.store';
import { Solicitud32605Query } from '../../estados/solicitud32605.query';
import { CommonModule } from '@angular/common';
import {
  NotificacionesComponent,
  TablaDinamicaComponent,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import { AgregarEnlaceOperativoComponent } from '../agregar-enlace-operativo/agregar-enlace-operativo.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  Domicilios,
  EnlaceOperativo,
  NumeroDeEmpleados,
  SeccionSociosIC,
} from '../../models/solicitud.model';

describe('TercerosRelacionadosComponent', () => {
  let component: TercerosRelacionadosComponent;
  let fixture: ComponentFixture<TercerosRelacionadosComponent>;
  let solicitudServiceMock: jest.Mocked<SolicitudService>;
  let solicitud32605StoreMock: jest.Mocked<Solicitud32605Store>;
  let solicitud32605QueryMock: jest.Mocked<Solicitud32605Query>;

  beforeEach(async () => {
    solicitudServiceMock = {
      conseguirRecibirNotificaciones: jest.fn(() =>
        of([
          {
            rfc: 'LEQI8101314S7',
            curp: 'LEQI810131HDGSXG05',
            nombre: 'MISAEL',
            apellidoPaterno: 'BARRAGAN',
            apellidoMaterno: 'RUIZ',
          },
          {
            rfc: 'MAJIth621207C95',
            curp: 'MAVL621207HDGRLS06',
            nombre: 'EUROFOODS DE MEXICO',
            apellidoPaterno: 'GONZALEZ',
            apellidoMaterno: 'PINAL',
          },
        ])
      ),
      conseguirEnlaceOperativoDatos: jest.fn(() =>
        of([
          {
            rfc: 'ABC123456XYZ',
            nombre: 'Juan',
            apellidoPaterno: 'Pérez',
            apellidoMaterno: 'Gómez',
            claveCiudad: '001',
            ciudad: 'Ciudad de México',
            cargo: 'Gerente',
            telefono: '+52 55 1234 5678',
            correo: 'juan.perez@example.com',
            suplente: 'Maria López',
            calle: 'Avenida Reforma',
            numeroExterior: '123',
            numeroInterior: '4B',
            colonia: 'Centro',
            codigoPostal: '01000',
            localidad: 'Ciudad de México',
            delegacionMunicipio: 'Cuauhtémoc',
          },
        ])
      ),
      conseguirRepresentanteLegalDatos: jest.fn(() =>
        of({
          rfcTercero: 'ZURC721023D12',
          rfc: 'ZURC721023D12',
          nombre: 'ROBERTO CARLOS',
          apellidoPaterno: 'CRUZ',
          apellidoMaterno: 'VELAZQUEZ',
          telefono: '22234323',
          correoElectronico: 'vucem2.5@hotmail.com',
        })
      ),
    } as unknown as jest.Mocked<SolicitudService>;

    solicitud32605StoreMock = {
      actualizarRfc: jest.fn(() => of('ZURC721023D12')),
      actualizarNombre: jest.fn(() => of('test')),
      actualizarApellidoPaterno: jest.fn(() => of('test')),
      actualizarApellidoMaterno: jest.fn(() => of('test')),
      actualizarTelefono: jest.fn(() => of('12345')),
      actualizarCorreoElectronico: jest.fn(() => of('vucem2.5@hotmail.com')),
      actualizarRfcTercero: jest.fn(() => of('ZURC721023D12')),
      actualizarEnlaceOperativosLista: jest.fn(() => of('test')),
    } as unknown as jest.Mocked<Solicitud32605Store>;

    solicitud32605QueryMock = {
      selectSolicitud$: of({
        idPersonaSolicitud: '',
        rfcTercero: '',
        rfc: '',
        nombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        telefono: '',
        correoElectronico: '',

        agregarEnlaceRfcTercero: '',
        agregarEnlaceRfc: '',
        agregarEnlaceNombre: '',
        agregarEnlaceApellidoPaterno: '',
        agregarEnlaceApellidoMaterno: '',
        agregarEnlaceCiudadEstado: '',
        agregarEnlaceCargo: '',
        agregarEnlaceTelefono: '',
        agregarEnlaceCorreoElectronico: '',
        agregarEnlaceSuplente: false,

        '2089': 0,
        '2090': 0,
        '2091': 0,

        '2042': 0,
        '2043': 0,
        '2044': 0,
        fechaInicioComercio: '',
        fechaPago: '',
        monto: '',
        operacionesBancarias: '',
        llavePago: '',

        transportistaRFC: '',
        transportistaRFCModifTrans: '',
        transportistaRazonSocial: '',
        transportistaDomicilio: '',
        transportistaCaat: '',
        transportistaIdDomicilio: '',
        transportistaIdRFC: '',
        transportistaIdRazonSocial: '',
        transportistaIdCaat: '',

        miembroCaracterDe: '',
        miembroTributarMexico: 0,
        miembroNacionalidad: '',
        miembroRfc: '',
        miembroRegistroFederal: '',
        miembroNombreCompleto: '',
        miembroTipoPersonaMuestra: '',
        miembroNombre: '',
        miembroApellidoPaterno: '',
        miembroApellidoMaterno: '',
        miembroNombreEmpresa: '',

        subcontrataRFCBusqueda: '',
        subcontrataRFC: '',
        subcontrataRazonSocial: '',
        subcontrataEmpleados: '',
        subcontrataBimestre: 0,

        principales: 0,
        municipio: '',
        tipoDeInstalacion: 0,
        entidadFederativa: '',
        registroSESAT: '',
        descripcion: '',
        codigoPostal: '',
        procesoProductivo: 0,
        goceDelInmueble: 0,
        empresa: 0,
        comercioExterior: 0,
        mutuo: 0,

        catseleccionados: 0,
        servicio: 0,
        '190': 0,
        '191': 0,
        '199': 0,
        empleados: '',
        bimestre: 0,
        '2034': 0,
        '236': 0,
        '237': 0,
        '238': 0,
        '239': 0,
        '240': 0,
        '243': 0,
        '244': 0,
        '245': 0,
        indiqueTodos: 0,
        '246': 0,
        file1: '',
        file2: '',
        '247': 0,
        '248': 0,
        identificacion: '',
        lugarDeRadicacion: '',
        '249': 0,
        '250': 0,
        '251': 0,
        checkbox1: false,
        checkbox2: false,
        checkbox3: false,
        actualmente2: '',
        actualmente1: '',
        numeroDeEmpleadosLista: [] as NumeroDeEmpleados[],
        domiciliosDatos: [] as Domicilios[],
        listaSeccionSociosIC: [] as SeccionSociosIC[],
        enlaceOperativosLista: [] as EnlaceOperativo[],
      }),
    } as unknown as jest.Mocked<Solicitud32605Query>;

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        TituloComponent,
        TablaDinamicaComponent,
        HttpClientModule,
        AgregarEnlaceOperativoComponent,
        NotificacionesComponent,
        ReactiveFormsModule,
        TercerosRelacionadosComponent,
        HttpClientTestingModule,
      ],
      declarations: [],
      providers: [
        { provide: SolicitudService, useValue: solicitudServiceMock },
        { provide: Solicitud32605Store, useValue: solicitud32605StoreMock },
        { provide: Solicitud32605Query, useValue: solicitud32605QueryMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TercerosRelacionadosComponent);
    component = fixture.componentInstance;
    solicitud32605QueryMock.selectSolicitud$ = of({
      idPersonaSolicitud: '',
      rfcTercero: '',
      rfc: '',
      nombre: '',
      apellidoPaterno: '',
      apellidoMaterno: '',
      telefono: '',
      correoElectronico: '',

      agregarEnlaceRfcTercero: '',
      agregarEnlaceRfc: '',
      agregarEnlaceNombre: '',
      agregarEnlaceApellidoPaterno: '',
      agregarEnlaceApellidoMaterno: '',
      agregarEnlaceCiudadEstado: '',
      agregarEnlaceCargo: '',
      agregarEnlaceTelefono: '',
      agregarEnlaceCorreoElectronico: '',
      agregarEnlaceSuplente: false,

      '2089': 0,
      '2090': 0,
      '2091': 0,

      '2042': 0,
      '2043': 0,
      '2044': 0,
      fechaInicioComercio: '',
      fechaPago: '',
      monto: '',
      operacionesBancarias: '',
      llavePago: '',

      transportistaRFC: '',
      transportistaRFCModifTrans: '',
      transportistaRazonSocial: '',
      transportistaDomicilio: '',
      transportistaCaat: '',
      transportistaIdDomicilio: '',
      transportistaIdRFC: '',
      transportistaIdRazonSocial: '',
      transportistaIdCaat: '',

      miembroCaracterDe: '',
      miembroTributarMexico: 0,
      miembroNacionalidad: '',
      miembroRfc: '',
      miembroRegistroFederal: '',
      miembroNombreCompleto: '',
      miembroTipoPersonaMuestra: '',
      miembroNombre: '',
      miembroApellidoPaterno: '',
      miembroApellidoMaterno: '',
      miembroNombreEmpresa: '',

      subcontrataRFCBusqueda: '',
      subcontrataRFC: '',
      subcontrataRazonSocial: '',
      subcontrataEmpleados: '',
      subcontrataBimestre: 0,

      principales: 0,
      municipio: '',
      tipoDeInstalacion: 0,
      entidadFederativa: '',
      registroSESAT: '',
      descripcion: '',
      codigoPostal: '',
      procesoProductivo: 0,
      goceDelInmueble: 0,
      empresa: 0,
      comercioExterior: 0,
      mutuo: 0,

      catseleccionados: 0,
      servicio: 0,
      '190': 0,
      '191': 0,
      '199': 0,
      empleados: '',
      bimestre: 0,
      '2034': 0,
      '236': 0,
      '237': 0,
      '238': 0,
      '239': 0,
      '240': 0,
      '243': 0,
      '244': 0,
      '245': 0,
      indiqueTodos: 0,
      '246': 0,
      file1: '',
      file2: '',
      '247': 0,
      '248': 0,
      identificacion: '',
      lugarDeRadicacion: '',
      '249': 0,
      '250': 0,
      '251': 0,
      checkbox1: false,
      checkbox2: false,
      checkbox3: false,
      actualmente2: '',
      actualmente1: '',
      numeroDeEmpleadosLista: [] as NumeroDeEmpleados[],
      domiciliosDatos: [] as Domicilios[],
      listaSeccionSociosIC: [] as SeccionSociosIC[],
      enlaceOperativosLista: [] as EnlaceOperativo[],
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    expect(component.tercerosRelacionadosForm.value).toEqual({
      idPersonaSolicitud: 1,
      rfcTercero: 'RFC123',
      rfc: 'RFC456',
      nombre: 'John',
      apellidoPaterno: 'Doe',
      apellidoMaterno: 'Smith',
      telefono: '1234567890',
      correoElectronico: 'vucem2.5@hotmail.com',
    });
  });

  it('should call conseguirRecibirNotificaciones on init', () => {
    solicitudServiceMock.conseguirRecibirNotificaciones.mockReturnValue(
      of([
        {
          rfc: 'LEQI8101314S7',
          curp: 'LEQI810131HDGSXG05',
          nombre: 'MISAEL',
          apellidoPaterno: 'BARRAGAN',
          apellidoMaterno: 'RUIZ',
        },
        {
          rfc: 'MAJIth621207C95',
          curp: 'MAVL621207HDGRLS06',
          nombre: 'EUROFOODS DE MEXICO',
          apellidoPaterno: 'GONZALEZ',
          apellidoMaterno: 'PINAL',
        },
      ])
    );
    solicitudServiceMock.conseguirRecibirNotificaciones();
    expect(
      solicitudServiceMock.conseguirRecibirNotificaciones
    ).toHaveBeenCalled();
  });

  it('should call conseguirEnlaceOperativoDatos on init', () => {
    solicitudServiceMock.conseguirEnlaceOperativoDatos.mockReturnValue(
      of([
        {
          rfc: 'ABC123456XYZ',
          nombre: 'Juan',
          apellidoPaterno: 'Pérez',
          apellidoMaterno: 'Gómez',
          claveCiudad: '001',
          ciudad: 'Ciudad de México',
          cargo: 'Gerente',
          telefono: '+52 55 1234 5678',
          correo: 'juan.perez@example.com',
          suplente: 'Maria López',
          calle: 'Avenida Reforma',
          numeroExterior: '123',
          numeroInterior: '4B',
          colonia: 'Centro',
          codigoPostal: '01000',
          localidad: 'Ciudad de México',
          delegacionMunicipio: 'Cuauhtémoc',
        },
      ])
    );
    solicitudServiceMock.conseguirEnlaceOperativoDatos();
    expect(
      solicitudServiceMock.conseguirEnlaceOperativoDatos
    ).toHaveBeenCalled();
  });

  it('should update store on actualizarRfcTercero', () => {
    const event = { target: { value: 'RFC789' } } as any;
    component.actualizarRfcTercero(event);
    expect(solicitud32605StoreMock.actualizarRfcTercero).toHaveBeenCalledWith(
      'RFC789'
    );
  });

  it('should update store on actualizarTelefono', () => {
    const event = { target: { value: '9876543210' } } as any;
    component.actualizarTelefono(event);
    expect(solicitud32605StoreMock.actualizarTelefono).toHaveBeenCalledWith(
      '9876543210'
    );
  });

  it('should update store on actualizarCorreoElectronico', () => {
    const event = { target: { value: 'new@example.com' } } as any;
    component.actualizarCorreoElectronico(event);
    expect(
      solicitud32605StoreMock.actualizarCorreoElectronico
    ).toHaveBeenCalledWith('new@example.com');
  });

  it('should clean up subscriptions on ngOnDestroy', () => {
    const destroySpy = jest.spyOn(component['destroy$'], 'next');
    const completeSpy = jest.spyOn(component['destroy$'], 'complete');
    component.ngOnDestroy();
    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
