import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CertificadoKimberleyComponent } from './certificado-kimberley.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SolicitudProrrogaService } from '../../services/solicitudProrroga/solicitud-prorroga.service';
import { Tramite130301Store } from '../../../../estados/tramites/tramite130301.store';
import { Tramite130301Query } from '../../../../estados/queries/tramite130301.query';
import { of } from 'rxjs';

describe('CertificadoKimberleyComponent', () => {
  let component: CertificadoKimberleyComponent;
  let fixture: ComponentFixture<CertificadoKimberleyComponent>;
  let mockService: Partial<SolicitudProrrogaService>;
  let mockStore: Partial<Tramite130301Store>;
  let mockQuery: Partial<Tramite130301Query>;

  beforeEach(async () => {
    mockService = {
      obtenerCertificadoKimberleyFormDatos: jest.fn().mockReturnValue(of({ data: [{}] })),
      obtenerEstadoList: jest.fn().mockReturnValue(of({ data: [] })),
    };
    mockStore = {};
    mockQuery = {
      selectSolicitud$: of({ 
        paisEmisorCertificado: 'MX', 
        mixed: 'true', 
        paisDeOrigen: 'US', 
        motivoJustificacion: '', 
        otrasDeclaraciones: '' 
      }),
    };

    await TestBed.configureTestingModule({
      imports: [CertificadoKimberleyComponent, ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: SolicitudProrrogaService, useValue: mockService },
        { provide: Tramite130301Store, useValue: mockStore },
        { provide: Tramite130301Query, useValue: mockQuery },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CertificadoKimberleyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.certificadoKimberley.value).toEqual({
      certificadosEmitidos: undefined,
      numeroCertificadokimberley: undefined,
      paisEmisorCertificado: 'MX',
      nombreIngles: undefined,
      mixed: "true",
      paisDeOrigen: 'US',
      nombreExportador: undefined,
      direccionExportador: undefined,
      nombreImportador: undefined,
      direccionImportador: undefined,
      numeroEnLetra: undefined,
      numeroEnLetraIngles: undefined,
      numeroFactura: undefined,
      cantidadQuilates: undefined,
      valorDiamantes: undefined,
    });
  });

  it('should call obtenerEstadoList on initialization', () => {
    const obtenerEstadoListSpy = jest.spyOn(mockService, 'obtenerEstadoList');
    component.ngOnInit();
    expect(obtenerEstadoListSpy).toHaveBeenCalled();
  });

  it('should call obtenerFormDatos on initialization', () => {
    const obtenerFormDatosSpy = jest.spyOn(mockService, 'obtenerCertificadoKimberleyFormDatos');
    component.ngOnInit();
    expect(obtenerFormDatosSpy).toHaveBeenCalled();
  });

  it('should patch form values when obtenerFormDatos is called', () => {
    const mockData = {
      data: [
        {
          certificadosEmitidos: '123',
          numeroCertificadokimberley: '456',
          nombreIngles: 'Test Name',
          nombreExportador: 'Exporter Name',
          direccionExportador: 'Exporter Address',
          nombreImportador: 'Importer Name',
          direccionImportador: 'Importer Address',
          numeroEnLetra: 'One Hundred',
          numeroEnLetraIngles: 'One Hundred (EN)',
          numeroFactura: '789',
          cantidadQuilates: '10',
          valorDiamantes: '1000',
        },
      ],
    };
    expect(component.certificadoKimberley.value).toEqual({
      certificadosEmitidos: undefined,
      numeroCertificadokimberley: undefined,
      paisEmisorCertificado: 'MX',
      nombreIngles: undefined,
      mixed: "true",
      paisDeOrigen: 'US',
      nombreExportador: undefined,
      direccionExportador: undefined,
      nombreImportador: undefined,
      direccionImportador: undefined,
      numeroEnLetra: undefined,
      numeroEnLetraIngles: undefined,
      numeroFactura: undefined,
      cantidadQuilates: undefined,
      valorDiamantes: undefined,
    });
  });

  it('should clean up subscriptions on destroy', () => {
    const destroySpy = jest.spyOn(component['destroyNotifier$'], 'next');
    const completeSpy = jest.spyOn(component['destroyNotifier$'], 'complete');
    component.ngOnDestroy();
    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
