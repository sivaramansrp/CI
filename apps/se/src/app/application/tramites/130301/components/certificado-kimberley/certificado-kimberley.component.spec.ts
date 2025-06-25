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

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe inicializar el formulario con los valores por defecto', () => {
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

  it('debe llamar a obtenerEstadoList al inicializar', () => {
    const obtenerEstadoListSpy = jest.spyOn(mockService, 'obtenerEstadoList');
    component.ngOnInit();
    expect(obtenerEstadoListSpy).toHaveBeenCalled();
  });

  it('debe llamar a obtenerCertificadoKimberleyFormDatos al inicializar', () => {
    const obtenerFormDatosSpy = jest.spyOn(mockService, 'obtenerCertificadoKimberleyFormDatos');
    component.ngOnInit();
    expect(obtenerFormDatosSpy).toHaveBeenCalled();
  });

  it('debe actualizar los valores del formulario cuando se llama a obtenerFormDatos', () => {
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
    // Simular la llamada y el patchValue
    (mockService.obtenerCertificadoKimberleyFormDatos as jest.Mock).mockReturnValueOnce(of(mockData));
    component.ngOnInit();
    expect(component.certificadoKimberley.value).toEqual({
      certificadosEmitidos: '123',
      numeroCertificadokimberley: '456',
      paisEmisorCertificado: 'MX',
      nombreIngles: 'Test Name',
      mixed: "true",
      paisDeOrigen: 'US',
      nombreExportador: 'Exporter Name',
      direccionExportador: 'Exporter Address',
      nombreImportador: 'Importer Name',
      direccionImportador: 'Importer Address',
      numeroEnLetra: 'One Hundred',
      numeroEnLetraIngles: 'One Hundred (EN)',
      numeroFactura: '789',
      cantidadQuilates: '10',
      valorDiamantes: '1000',
    });
  });

  it('debe limpiar las suscripciones al destruir el componente', () => {
    const destroySpy = jest.spyOn(component['destroyNotifier$'], 'next');
    const completeSpy = jest.spyOn(component['destroyNotifier$'], 'complete');
    component.ngOnDestroy();
    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
