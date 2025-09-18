import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, Subject } from 'rxjs';
import { TramitesAsociadosComponent } from './tramites-asociados.component';
import { SolicitudDatosService } from '../../services/solicitud-datos.service';
import { Asociados } from '../../models/asociados.model';
import { TablaDinamicaComponent } from '@libs/shared/data-access-user/src';

describe('TramitesAsociadosComponent', () => {
  let component: TramitesAsociadosComponent;
  let fixture: ComponentFixture<TramitesAsociadosComponent>;
  let solicitudDatosService: jest.Mocked<SolicitudDatosService>;

  beforeEach(async () => {
    const solicitudDatosServiceMock: jest.Mocked<SolicitudDatosService> = {
      obtenerTramitesAsociadosListo: jest.fn()
    } as any;

    await TestBed.configureTestingModule({
      declarations: [TramitesAsociadosComponent],
      imports: [TablaDinamicaComponent],
      providers: [
        { provide: SolicitudDatosService, useValue: solicitudDatosServiceMock }
      ]
    }).compileComponents();

    solicitudDatosService = TestBed.inject(SolicitudDatosService) as jest.Mocked<SolicitudDatosService>;
    solicitudDatosService.obtenerTramitesAsociadosListo.mockReturnValue(of([
      { folioTramite: 'F1', tipoTramite: 'T1', estatus: 'Activo', fechaAltaDeRegistro: '2025-09-17' } as Asociados
    ]));

    fixture = TestBed.createComponent(TramitesAsociadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should call obtenerTramitesAsociadosListo and set datos', () => {
    expect(solicitudDatosService.obtenerTramitesAsociadosListo).toHaveBeenCalled();
    expect(component.tramitesAsociadosDatos.length).toBe(1);
    expect(component.tramitesAsociadosDatos[0].folioTramite).toBe('F1');
  });

  it('should have correct column configuration', () => {
    const columns = component.tramitesAsociadosConfiguracionTabla;
    expect(columns.length).toBe(4);
    expect(columns[0].encabezado).toBe('Folio Trámite');
    expect(columns[1].encabezado).toBe('Tipo Trámite');
    expect(columns[2].encabezado).toBe('Estatus');
    expect(columns[3].encabezado).toBe('Fecha Alta De Registro');

    const mockItem: Asociados = {
      folioTramite: '123',
      tipoTramite: 'ABC',
      estatus: 'Activo',
      fechaAltaDeRegistro: '2025-01-01'
    };
    expect(columns[0].clave(mockItem)).toBe('123');
    expect(columns[1].clave(mockItem)).toBe('ABC');
  });

  it('should complete destroyNotifier$ on ngOnDestroy', () => {
    const nextSpy = jest.spyOn(component['destroyNotifier$'], 'next');
    const completeSpy = jest.spyOn(component['destroyNotifier$'], 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});