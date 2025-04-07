import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TramitesAsociadosComponent } from './tramites-asociados.component';
import { CertificadosLicenciasService } from '../../services/certificados-licencias.service';
import { of } from 'rxjs';

describe('TramitesAsociadosComponent', () => {
  let component: TramitesAsociadosComponent;
  let fixture: ComponentFixture<TramitesAsociadosComponent>;
  let certificadosLicenciasSvcMock: any;

  beforeEach(async () => {
    certificadosLicenciasSvcMock = {
      getTramitesAsociados: jest.fn().mockReturnValue(of([
        { folioTramite: '123', tipoTramite: 'Type A', estatus: 'Active', fetchAlta: '2023-01-01' },
        { folioTramite: '456', tipoTramite: 'Type B', estatus: 'Inactive', fetchAlta: '2023-02-01' },
      ])),
    };

    await TestBed.configureTestingModule({
      imports: [TramitesAsociadosComponent],
      providers: [
        { provide: CertificadosLicenciasService, useValue: certificadosLicenciasSvcMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TramitesAsociadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize tramitesAsociadosDatos with data from the service', () => {
    expect(certificadosLicenciasSvcMock.getTramitesAsociados).toHaveBeenCalled();
    expect(component.tramitesAsociadosDatos.length).toBe(2);
    expect(component.tramitesAsociadosDatos[0].folioTramite).toBe('123');
  });

  it('should configure the table columns correctly', () => {
    expect(component.configuracionTabla.length).toBe(4);
    expect(component.configuracionTabla[0].encabezado).toBe('Folio trámite');
    expect(component.configuracionTabla[1].encabezado).toBe('Tipo trámite');
  });

  it('should clean up subscriptions on destroy', () => {
    const destroySpy = jest.spyOn(component['destroyNotifier$'], 'next');
    const completeSpy = jest.spyOn(component['destroyNotifier$'], 'complete');

    component.ngOnDestroy();

    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
