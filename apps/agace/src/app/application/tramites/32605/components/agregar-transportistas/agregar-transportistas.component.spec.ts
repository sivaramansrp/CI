import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { AgregarTransportistasComponent } from './agregar-transportistas.component';
import { Solicitud32605Query } from '../../estados/solicitud32605.query';
import { Solicitud32605Store } from '../../estados/solicitud32605.store';
import { SolicitudService } from '../../services/solicitud.service';
import { TransportistasTable } from '../../models/solicitud.model';
import { CommonModule } from '@angular/common';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AgregarTransportistasComponent', () => {
  let component: AgregarTransportistasComponent;
  let fixture: ComponentFixture<AgregarTransportistasComponent>;
  let solicitudServiceMock: jest.Mocked<SolicitudService>;
  let solicitud32605StoreMock: jest.Mocked<Solicitud32605Store>;
  let solicitud32605QueryMock: jest.Mocked<Solicitud32605Query>;

  beforeEach(async () => {
    solicitudServiceMock = {
      conseguirTransportistasLista: jest.fn(() =>
        of([
          {
            rfc: 'AAL0409235E6',
            razonSocial: 'INTEGRADORA DE URBANIZACIONES SIGNUM S DE RL DE CV',
            domicilio:
              'CAMINO VIEJO 1353 81210 LOS MOCHIS MIGUEL HIDALGO AHOME SINALOA ESTADOS UNIDOS MEXICANOS',
            caat: '3CJD',
          },
        ])
      ),
    } as unknown as jest.Mocked<SolicitudService>;

    solicitud32605StoreMock = {
      actualizarTransportistaRFC: jest.fn(() => of()),
      actualizarTransportistaRFCModifTrans: jest.fn(() => of()),
      actualizarTransportistaRazonSocial: jest.fn(() => of()),
      actualizarTransportistaDomicilio: jest.fn(() => of()),
      actualizarTransportistaCaat: jest.fn(() => of()),
    } as unknown as jest.Mocked<Solicitud32605Store>;

    solicitud32605QueryMock = {
      selectSolicitud$: of({}) as any,
    } as unknown as jest.Mocked<Solicitud32605Query>;

    await TestBed.configureTestingModule({
      imports: [
        AgregarTransportistasComponent,
        CommonModule,
        ReactiveFormsModule,
        TituloComponent,
        HttpClientTestingModule,
      ],
      declarations: [],
      providers: [
        { provide: SolicitudService, useValue: solicitudServiceMock },
        { provide: Solicitud32605Store, useValue: solicitud32605StoreMock },
        { provide: Solicitud32605Query, useValue: solicitud32605QueryMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarTransportistasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.transportistaCertificacionForm).toBeDefined();
    expect(
      component.transportistaCertificacionForm.get('transportistaRFC')
    ).toBeTruthy();
  });

  it('should call actualizarTransportistaRFC on input change', () => {
    const event = { target: { value: 'RFC123' } } as unknown as Event;
    component.actualizarTransportistaRFC(event);
    expect(
      solicitud32605StoreMock.actualizarTransportistaRFC
    ).toHaveBeenCalledWith('RFC123');
  });

  it('should emit transportistasDatos on aceptarTransportista', () => {
    jest.spyOn(component.transportistasDatos, 'emit');
    component.transportistaCertificacionForm.setValue({
      transportistaRFC: 'RFC123',
      transportistaRFCModifTrans: 'RFC456',
      transportistaRazonSocial: 'Razon Social',
      transportistaDomicilio: 'Domicilio',
      transportistaCaat: 'CAAT',
      transportistaIdDomicilio: null,
      transportistaIdRFC: null,
      transportistaIdRazonSocial: null,
      transportistaIdCaat: null,
    });
    component.aceptarTransportista();
    expect(component.transportistasDatos.emit).toHaveBeenCalledWith({
      rfc: 'RFC456',
      razonSocial: 'Razon Social',
      domicilio: 'Domicilio',
      caat: 'CAAT',
    });
  });

  it('should call conseguirTransportistasLista on selectBuscarTransportista if RFC is provided', () => {
    jest.spyOn(component, 'conseguirTransportistasLista');
    component.conseguirTransportistasLista();
    component.selectBuscarTransportista();
    expect(component.conseguirTransportistasLista).toHaveBeenCalled();
  });

  it('should update form values on conseguirTransportistasLista response', () => {
    const transportistasMock: TransportistasTable[] = [
      {
        rfc: 'RFC123',
        razonSocial: 'Razon Social',
        domicilio: 'Domicilio',
        caat: 'CAAT',
      },
    ];
    solicitudServiceMock.conseguirTransportistasLista.mockReturnValue(
      of(transportistasMock)
    );
    component.conseguirTransportistasLista();
    expect(
      solicitud32605StoreMock.actualizarTransportistaRazonSocial
    ).toHaveBeenCalledWith('Razon Social');
    expect(
      solicitud32605StoreMock.actualizarTransportistaDomicilio
    ).toHaveBeenCalledWith('Domicilio');
    expect(
      solicitud32605StoreMock.actualizarTransportistaCaat
    ).toHaveBeenCalledWith('CAAT');
  });

  it('should clean up subscriptions on ngOnDestroy', () => {
    const destroySpy = jest.spyOn(component['destroy$'], 'next');
    const completeSpy = jest.spyOn(component['destroy$'], 'complete');
    component.ngOnDestroy();
    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
