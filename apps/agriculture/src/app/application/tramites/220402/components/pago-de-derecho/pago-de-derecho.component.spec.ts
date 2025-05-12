import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CapturaSolicitudeService } from '../../services/captura-solicitud.service';

import { PagoDeDerechoComponent } from './pago-de-derecho.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('PagoDeDerechoComponent', () => {
  let component: PagoDeDerechoComponent;
  let fixture: ComponentFixture<PagoDeDerechoComponent>;

  beforeEach(async () => {
    const capturaSolicitudeServiceSpy = jasmine.createSpyObj(
      'CapturaSolicitudeService',
      ['getBanco']
    );

    await TestBed.configureTestingModule({
      declarations: [PagoDeDerechoComponent],
      imports: [ReactiveFormsModule],
      providers: [
        {
          provide: CapturaSolicitudeService,
          useValue: capturaSolicitudeServiceSpy,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PagoDeDerechoComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize banco data on init', () => {
    component.fetchBancoData();
    expect(component.bancoCatalogo.catalogos.length).toBe(1);
    expect(component.bancoCatalogo.catalogos[0].descripcion).toBe('Banco 1');
  });

  it('should initialize mercancia on init', () => {
    component.ngOnInit();
    expect(component.mercanciaCatalogo.catalogos.length).toBe(2);
    expect(component.mercanciaCatalogo.catalogos[0].descripcion).toBe('Opción 1');
  });

  it('should set form values and disable fields when exentoDePago is No', () => {
    component.actualizarCamposDeFormularioBasadosEnExentoDePago('No');
    expect(
      component.FormSolicitud.get('datosImportadorExportador.claveDeReferencia')
        ?.value
    ).toBe('454000554');
    expect(
      component.FormSolicitud.get('datosImportadorExportador.importePago')
        ?.value
    ).toBe('594.0');
    expect(
      component.FormSolicitud.get('datosImportadorExportador.justificacion')
        ?.disabled
    ).toBeTruthy();
  });

  it('should reset and disable fields when exentoDePago is Sí', () => {
    component.actualizarCamposDeFormularioBasadosEnExentoDePago('Sí');
    expect(
      component.FormSolicitud.get('datosImportadorExportador.justificacion')
        ?.value
    ).toBeNull();
    expect(
      component.FormSolicitud.get('datosImportadorExportador.justificacion')
        ?.disabled
    ).toBeTruthy();
  });

  it('should validate form and log values if valid', () => {
    spyOn(console, 'log');
    component.FormSolicitud.setValue({
      datosImportadorExportador: {
        exentoDePago: 'No',
        nombreImportExport: 'Test Name',
        justificacion: 'Test Justification',
        claveDeReferencia: 'Test Reference',
        cadenaDependencia: 'Test Chain',
        llaveDePago: 'Test Key',
        fechaPago: '2025-02-21',
        importePago: '1000',
      },
    });
    expect(console.log).toHaveBeenCalledWith(component.FormSolicitud.value);
  });

});
