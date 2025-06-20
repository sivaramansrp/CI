import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PagoDeDerechoComponent } from './pago-de-derecho.component';
import { MediodetransporteService } from '../../services/medio-de-transporte.service';
import { Solicitud220402Store } from '../../estados/tramites/tramites220402.store';
import { Solicitud220402Query } from '../../estados/queries/tramites220402.query';
import { CatalogoSelectComponent, TituloComponent, ValidacionesFormularioService } from '@ng-mf/data-access-user';
import { of } from 'rxjs';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';


describe('PagoDeDerechoComponent', () => {
  let component: PagoDeDerechoComponent;
  let fixture: ComponentFixture<PagoDeDerechoComponent>;
  let mockMediodetransporteService: any;
  let mockSolicitud220402Store: any;
  let mockSolicitud220402Query: any;
  let mockValidacionesFormularioService: any;

  beforeEach(async () => {
    mockMediodetransporteService = {
      getMedioDeTransporte: jest.fn().mockReturnValue(of([{ id: 1, descripcion: 'Banco A' }])),
    };

    mockSolicitud220402Store = {
      setExentoDePago: jest.fn(),
      setJustificacion: jest.fn(),
      setClaveDeReferencia: jest.fn(),
      setCadenaDependencia: jest.fn(),
      setBanco: jest.fn(),
      setllaveDePago: jest.fn(),
      setFechaPago: jest.fn(),
      setImportePago: jest.fn(),
    };

    mockSolicitud220402Query = {
      selectSolicitud$: of({
        exentoDePago: 'No',
        justificacion: 'Test Justification',
        claveDeReferencia: '12345',
        cadenaDependencia: 'Test Dependency',
        banco: 'Banco A',
        llaveDePago: 'Key123',
        fechaPago: '2023-01-01',
        importePago: '1000',
      }),
    };

    mockValidacionesFormularioService = {
      isValid: jest.fn().mockReturnValue(true),
    };

    await TestBed.configureTestingModule({
      declarations: [PagoDeDerechoComponent],
      imports: [ReactiveFormsModule, FormsModule, TituloComponent, CatalogoSelectComponent],
      providers: [
        { provide: MediodetransporteService, useValue: mockMediodetransporteService },
        { provide: Solicitud220402Store, useValue: mockSolicitud220402Store },
        { provide: Solicitud220402Query, useValue: mockSolicitud220402Query },
        { provide: ValidacionesFormularioService, useValue: mockValidacionesFormularioService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PagoDeDerechoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form correctly', () => {
    expect(component.FormSolicitud).toBeDefined();
    expect(component.FormSolicitud.get('datosImportadorExportador.exentoDePago')?.value).toBe('No');
    expect(component.FormSolicitud.get('datosImportadorExportador.justificacion')?.value).toBe('Test Justification');
  });

  it('should fetch banco data', () => {
    expect(mockMediodetransporteService.getMedioDeTransporte).toHaveBeenCalled();
    expect(component.bancoCatalogo.catalogos).toEqual([{ id: 1, descripcion: 'Banco A' }]);
  });

  it('should set values in the store', () => {
    const formGroup = component.FormSolicitud.get('datosImportadorExportador') as FormGroup;
    component.setValoresStore(formGroup, 'justificacion', 'setJustificacion');
    expect(mockSolicitud220402Store.setJustificacion).toHaveBeenCalledWith('Test Justification');
  });

  it('should disable the form in solo lectura mode', () => {
    component.soloLectura = true;
    component.inicializarEstadoFormulario();
    expect(component.FormSolicitud.disabled).toBe(true);
  });

  it('should enable the form when not in solo lectura mode', () => {
    component.soloLectura = false;
    component.inicializarEstadoFormulario();
    expect(component.FormSolicitud.enabled).toBe(true);
  });

  it('should update banco selection', () => {
    const mockBanco = { id: 1, descripcion: 'Banco A' };
    component.actualizarBanco(mockBanco);
    expect(component.bancoSeleccionado).toEqual(mockBanco);
  });
});