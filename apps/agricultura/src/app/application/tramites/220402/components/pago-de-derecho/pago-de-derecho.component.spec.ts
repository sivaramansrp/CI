import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder, FormsModule } from '@angular/forms';
import { PagoDeDerechoComponent } from './pago-de-derecho.component';
import { MediodetransporteService } from '../../services/medio-de-transporte.service';
import { Solicitud220402Store } from '../../estados/tramites/tramites220402.store';
import { Solicitud220402Query } from '../../estados/queries/tramites220402.query';
import { of } from 'rxjs';
import { CatalogoSelectComponent, InputRadioComponent, TituloComponent, ValidacionesFormularioService } from '@ng-mf/data-access-user';

describe('PagoDeDerechoComponent', () => {
  let component: PagoDeDerechoComponent;
  let fixture: ComponentFixture<PagoDeDerechoComponent>;
  let mediodetransporteServiceMock: any;
  let solicitud220402StoreMock: any;
  let solicitud220402QueryMock: any;
  let validacionesServiceMock: any;

  beforeEach(async () => {
    mediodetransporteServiceMock = {
      getMedioDeTransporte: jest.fn().mockReturnValue(of([{ id: 1, descripcion: 'Banco 1' }])),
    };

    solicitud220402StoreMock = {
      setExentoDePago: jest.fn(),
      setJustificacion: jest.fn(),
      setClaveDeReferencia: jest.fn(),
      setCadenaDependencia: jest.fn(),
      setBanco: jest.fn(),
      setllaveDePago: jest.fn(),
      setFechaPago: jest.fn(),
      setImportePago: jest.fn(),
    };

    solicitud220402QueryMock = {
      selectSolicitud$: of({
        exentoDePago: 'No',
        nombreImportExport: 'Importador',
        justificacion: 'Justificación',
        claveDeReferencia: '12345',
        cadenaDependencia: 'Dependencia',
        banco: 'Banco 1',
        llaveDePago: 'Llave123',
        fechaPago: '2023-01-01',
        importePago: '1000',
      }),
    };

    validacionesServiceMock = {
      isValid: jest.fn().mockReturnValue(false),
    };

    await TestBed.configureTestingModule({
      declarations: [PagoDeDerechoComponent],
      imports: [ReactiveFormsModule, FormsModule, TituloComponent, CatalogoSelectComponent, InputRadioComponent],
      providers: [
        FormBuilder,
        { provide: MediodetransporteService, useValue: mediodetransporteServiceMock },
        { provide: Solicitud220402Store, useValue: solicitud220402StoreMock },
        { provide: Solicitud220402Query, useValue: solicitud220402QueryMock },
        { provide: ValidacionesFormularioService, useValue: validacionesServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PagoDeDerechoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.FormSolicitud).toBeDefined();
    expect(component.FormSolicitud.get('datosImportadorExportador')).toBeDefined();
  });

  it('should fetch bank data on fetchBancoData', () => {
    component.fetchBancoData();
    expect(mediodetransporteServiceMock.getMedioDeTransporte).toHaveBeenCalled();
    expect(component.bancoCatalogo.catalogos.length).toBe(1);
    expect(component.bancoCatalogo.catalogos[0].descripcion).toBe('Banco 1');
  });

  it('should update form fields based on exentoDePago value', () => {
    component.FormSolicitud.get('datosImportadorExportador.exentoDePago')?.setValue('No');
    component.actualizarCamposDeFormularioBasadosEnExentoDePago();
    expect(component.FormSolicitud.get('datosImportadorExportador.claveDeReferencia')?.disabled).toBe(true);
    expect(component.FormSolicitud.get('datosImportadorExportador.justificacion')?.disabled).toBe(true);
  });

  it('should validate the form field using isValid method', () => {
    const isValid = component.isValid(component.FormSolicitud, 'datosImportadorExportador.justificacion');
    expect(validacionesServiceMock.isValid).toHaveBeenCalled();
    expect(isValid).toBe(false);
  });

  it('should call setValoresStore when updating a field', () => {
    const form = component.FormSolicitud;
    component.setValoresStore(form, 'datosImportadorExportador.justificacion', 'setJustificacion');
    expect(solicitud220402StoreMock.setJustificacion).toHaveBeenCalled();
  });
});