import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { DatosDeLaSolicitudComponent } from './datos-de-la-solicitud.component';
import { SolicitudService } from '../../services/solicitud.service';
import { Tramite270201Store } from '../../estados/tramites/tramite270201.store';
import { of } from 'rxjs';

describe('DatosDeLaSolicitudComponent', () => {
  let solicitudServiceMock: any;
  let tramiteStoreMock: any;
  let fixture: any;
  let component: any;

  beforeEach(async () => {
    solicitudServiceMock = {
      getOperacionData: jest.fn().mockReturnValue(of([])),
      getMovimientoData: jest.fn().mockReturnValue(of([])),
      getPaisData: jest.fn().mockReturnValue(of([])),
      getTransporteData: jest.fn().mockReturnValue(of([])),
      getAduanaData: jest.fn().mockReturnValue(of([])),
      getMotivoData: jest.fn().mockReturnValue(of([])),
      getMonedaData: jest.fn().mockReturnValue(of([])),
      getArancelariaData: jest.fn().mockReturnValue(of([])),
    };

    tramiteStoreMock = {
      setObraDeArte: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [DatosDeLaSolicitudComponent, ReactiveFormsModule],
      providers: [
        { provide: SolicitudService, useValue: solicitudServiceMock },
        { provide: Tramite270201Store, useValue: tramiteStoreMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosDeLaSolicitudComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize solicitudFormGroup', () => {
    fixture.detectChanges();
    expect(component.solicitudFormGroup).toBeTruthy();
  });

  it('should initialize obraDeArteFormgroup', () => {
    fixture.detectChanges();
    expect(component.obraDeArteFormgroup).toBeTruthy();
  });

  it('should validate solicitudFormGroup controls', () => {
    fixture.detectChanges();
    const controls = component.solicitudFormGroup.controls;
    Object.keys(controls).forEach((controlName) => {
      expect(controls[controlName].invalid).toBe(true); // Initially invalid
      controls[controlName].setValue('some value'); // Set a value
      expect(controls[controlName].invalid).toBe(false); // Should be valid
    });
  });

  it('should validate obraDeArteFormgroup controls', () => {
    fixture.detectChanges();
    const controls = component.obraDeArteFormgroup.controls;
    Object.keys(controls).forEach((controlName) => {
      expect(controls[controlName].invalid).toBe(true); // Initially invalid
      controls[controlName].setValue('some value'); // Set a value
      expect(controls[controlName].invalid).toBe(false); // Should be valid
    });
  });

  it('should toggle obra de arte modal and table div', () => {
    fixture.detectChanges();
    expect(component.showTableDiv).toBe(true);
    expect(component.showObraDeArteModal).toBe(false);

    component.toggleObraDeArte();
    expect(component.showTableDiv).toBe(false);
    expect(component.showObraDeArteModal).toBe(true);

    component.toggleObraDeArte();
    expect(component.showTableDiv).toBe(true);
    expect(component.showObraDeArteModal).toBe(false);
  });

  it('should submit obra de arte form', () => {
    fixture.detectChanges();

    // Mock form values
    component.obraDeArteFormgroup.setValue({
      autor: 'Author',
      titulo: 'Title',
      tecnicaDeRealizacion: 'Technique',
      medidas: 'Measure',
      alto: 'Height',
      ancho: 'Width',
      profundidad: 'Depth',
      diametro: 'Diameter',
      variables: 'Variables',
      anoDeCreacion: 'Year',
      avaluo: 'Appraisal',
      moneda: 'Currency',
      propietario: 'Owner',
      fraccionArancelaria: 'Tariff Fraction',
      descripcionArancelaria: 'Tariff Description',
    });

    component.submitDeArteForm();
    expect(component.obraDeArteRowData.length).toBe(1);
  });

  it('should retrieve data from solicitudService', () => {
    // Mock service responses
    solicitudServiceMock.getOperacionData.mockReturnValue(of([{ id: 1, descripcion: 'Operation' }]));
    solicitudServiceMock.getMovimientoData.mockReturnValue(of([{ id: 1, descripcion: 'Movement' }]));
    solicitudServiceMock.getPaisData.mockReturnValue(of([{ id: 1, descripcion: 'Country' }]));
    solicitudServiceMock.getTransporteData.mockReturnValue(of([{ id: 1, descripcion: 'Transport' }]));
    solicitudServiceMock.getAduanaData.mockReturnValue(of([{ id: 1, descripcion: 'Customs' }]));
    solicitudServiceMock.getMotivoData.mockReturnValue(of([{ id: 1, descripcion: 'Reason' }]));
    solicitudServiceMock.getMonedaData.mockReturnValue(of([{ id: 1, descripcion: 'Currency' }]));
    solicitudServiceMock.getArancelariaData.mockReturnValue(of([{ id: 1, descripcion: 'Tariff' }]));

    fixture.detectChanges();

    expect(component.operacionData.length).toBe(1);
    expect(component.movimientoData.length).toBe(1);
    expect(component.paisData.length).toBe(1);
    expect(component.transporteData.length).toBe(1);
    expect(component.aduanaData.length).toBe(1);
    expect(component.motivoData.length).toBe(1);
    expect(component.monedaData.length).toBe(1);
    expect(component.arancelariaData.length).toBe(1);
  });
});
