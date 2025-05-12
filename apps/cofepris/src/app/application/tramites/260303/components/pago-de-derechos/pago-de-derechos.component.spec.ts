import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { PagoDeDerechosComponent } from './pago-de-derechos.component';
import { CertificadosLicenciasPermisosService } from '../../services/certificados-licencias-permisos.service';
import { Tramite260303Store } from '../../../../estados/tramites/260303/tramite260303.store';
import { Tramite260303Query } from '../../../../estados/queries/260303/tramite260303.query';

describe('PagoDeDerechosComponent', () => {
  let component: PagoDeDerechosComponent;
  let fixture: ComponentFixture<PagoDeDerechosComponent>;
  let certificadosLicenciasSvcMock: jest.Mocked<CertificadosLicenciasPermisosService>;
  let tramite260303StoreMock: jest.Mocked<Tramite260303Store>;
  let tramite260303QueryMock: jest.Mocked<Tramite260303Query>;

  beforeEach(async () => {
    certificadosLicenciasSvcMock = {
      getBancoDatos: jest.fn(),
    } as unknown as jest.Mocked<CertificadosLicenciasPermisosService>;

    tramite260303StoreMock = {
      SetFechaDePago: jest.fn(),
    } as unknown as jest.Mocked<Tramite260303Store>;

    tramite260303QueryMock = {
      selectSolicitud$: of({
        claveDeReferencia: '12345',
        cadenaDaLaDependencia: 'cadena',
        banco: 'Banco1',
        laveDePago: 'clave123',
        fechaDePago: '2023-01-01',
        importeDePago: 1000,
      }),
    } as unknown as jest.Mocked<Tramite260303Query>;

    await TestBed.configureTestingModule({
      imports: [PagoDeDerechosComponent, ReactiveFormsModule],
      providers: [
        { provide: CertificadosLicenciasPermisosService, useValue: certificadosLicenciasSvcMock },
        { provide: Tramite260303Store, useValue: tramite260303StoreMock },
        { provide: Tramite260303Query, useValue: tramite260303QueryMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PagoDeDerechosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize bancoCatalogo on getBancoCatalogDatos call', () => {
    const mockResponse:any = { data: [{ id: 1, nombre: 'Banco1' }, { id: 2, nombre: 'Banco2' }] };
    certificadosLicenciasSvcMock.getBancoDatos.mockReturnValue(of(mockResponse));

    component.getBancoCatalogDatos();

    expect(certificadosLicenciasSvcMock.getBancoDatos).toHaveBeenCalled();
    expect(component.bancoCatalogo).toEqual(mockResponse.data);
  });

  it('should initialize pagoDerechosForm with solicitudState values', () => {
    expect(component.pagoDerechosForm.value).toEqual({
      claveDeReferencia: '12345',
      cadenaDaLaDependencia: 'cadena',
      banco: 'Banco1',
      laveDePago: 'clave123',
      fechaDePago: '2023-01-01',
      importeDePago: 1000,
    });
  });

  it('should update fechaDePago in the form and store on cambioFechaFinal call', () => {
    const newDate = '2023-02-01';
    component.cambioFechaFinal(newDate);

    expect(component.pagoDerechosForm.get('fechaDePago')?.value).toBe(newDate);
    expect(tramite260303StoreMock.SetFechaDePago).toHaveBeenCalledWith(newDate);
  });

  it('should call setValoresStore with correct parameters', () => {
    const spy = jest.spyOn(component, 'setValoresStore');
    component.setValoresStore(component.pagoDerechosForm, 'banco', 'SetFechaDePago');

    expect(spy).toHaveBeenCalledWith(component.pagoDerechosForm, 'banco', 'SetFechaDePago');
  });

  it('should clean up subscriptions on ngOnDestroy', () => {
    const destroySpy = jest.spyOn(component['destroyNotifier$'], 'next');
    const completeSpy = jest.spyOn(component['destroyNotifier$'], 'complete');

    component.ngOnDestroy();

    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
