import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { DatosEmpresaComponent } from './datos-empresa.component';
import { Tramite140205Store } from '../../../../estados/tramites/tramite140205.store';
import { Tramite140205Query } from '../../../../estados/queries/tramite140205.query';
import { CancelacionCertificadosService } from '../../services/cancelacionCertificados.service';

describe('DatosEmpresaComponent', () => {
  let component: DatosEmpresaComponent;
  let fixture: ComponentFixture<DatosEmpresaComponent>;
  let mockStore: jest.Mocked<Tramite140205Store>;
  let mockQuery: jest.Mocked<Tramite140205Query>;
  let mockService: jest.Mocked<CancelacionCertificadosService>;

  beforeEach(async () => {
    mockStore = {
      updateGrupoEmpresa: jest.fn(),
    } as unknown as jest.Mocked<Tramite140205Store>;

    mockQuery = {
      selectSolicitud$: of({
        grupoEmpresa: {
          rfc: 'RFC123456789',
          nombre: 'Empresa Test',
          primerApellido: 'Apellido1',
          segundoApellido: 'Apellido2',
          actividadEconomica: 'Comercio',
          datosRfc: 'DatosRFC',
          clave: 'Clave123',
          correo: 'test@example.com',
          calle: 'Calle 123',
          numeroExterior: '10',
          numeroInterior: '2',
          codigoPostal: '12345',
          colonia: 'Colonia Test',
          pais: 'México',
          estado: 'Estado Test',
          localidad: 'Localidad Test',
          municipio: 'Municipio Test',
          telefono: '1234567890',
        },
      }),
    } as unknown as jest.Mocked<Tramite140205Query>;

    mockService = {
      validate: jest.fn(),
    } as unknown as jest.Mocked<CancelacionCertificadosService>;

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: Tramite140205Store, useValue: mockStore },
        { provide: Tramite140205Query, useValue: mockQuery },
        { provide: CancelacionCertificadosService, useValue: mockService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on init', () => {
    component.ngOnInit();
    expect(component.solicitudForm).toBeDefined();
    expect(component.solicitudForm.get('grupoEmpresa')).toBeDefined();
  });

  it('should display company data when buscarEmpresa is called', () => {
    component.buscarEmpresa();
    expect(component.mostrarDatosGenerales).toBe(true);
  });

  it('should unsubscribe on destroy', () => {
    const destroySpy = jest.spyOn(component.destroyNotifier$, 'next');
    const completeSpy = jest.spyOn(component.destroyNotifier$, 'complete');
    component.ngOnDestroy();
    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('should validate form controls', () => {
    const grupoEmpresa = component.solicitudForm.get('grupoEmpresa');
    grupoEmpresa?.get('rfc')?.setValue('');
    expect(grupoEmpresa?.get('rfc')?.valid).toBe(false);
    grupoEmpresa?.get('rfc')?.setValue('RFC123456789');
    expect(grupoEmpresa?.get('rfc')?.valid).toBe(true);
  });

});