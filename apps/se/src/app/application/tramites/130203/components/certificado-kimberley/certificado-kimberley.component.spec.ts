import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Observable, of, Subject } from 'rxjs';
import { CertificadoKimberleyComponent } from './certificado-kimberley.component';
import { ExportacionDeDiamantesEnBrutoService } from '../../services/exportacion-de-diamantes-en-bruto.service';
import { Tramite130203Query } from '../../estados/queries/tramite130203.query';
import { Tramite130203Store } from '../../estados/tramites/tramites130203.store';

describe('CertificadoKimberleyComponent', () => {
  let component: CertificadoKimberleyComponent;
  let fixture: ComponentFixture<CertificadoKimberleyComponent>;
  let mockExportacionService: jest.Mocked<ExportacionDeDiamantesEnBrutoService>;
  let mockTramiteQuery: jest.Mocked<Tramite130203Query>;
  let mockTramiteStore: jest.Mocked<Tramite130203Store>;

  beforeEach(async () => {
    mockExportacionService = {
      getPaisesEmisores: jest.fn(),
      getNombresIngles: jest.fn(),
    } as unknown as jest.Mocked<ExportacionDeDiamantesEnBrutoService>;

    mockTramiteQuery = {
      select: jest.fn(),
      nombreExportador$: of('Test Exporter') as Observable<string | null>,
      direccionExportador$: of('Test Address') as Observable<string | null>,
      nombreImportador$: of('Test Importer') as Observable<string | null>,
      direccionImportador$: of('Importer Address') as Observable<string | null>,
      numeroEnLetraDeLosLotes$: of('One') as Observable<string | null>,
      numeroEnLetraDeLosLotesEnIngles$: of('One (English)') as Observable<string | null>,
      numeroDeFactura$: of('12345') as Observable<string | null>,
      cantidadEnQuilates$: of('100') as Observable<string | null>,
      valorDeLosDiamantes$: of('5000') as Observable<string | null>,
      someMissingObservable$: of(null) as Observable<any>,
      anotherMissingObservable$: of(null) as Observable<any>,
    } as unknown as jest.Mocked<Tramite130203Query>;

    mockTramiteStore = {
      setNombreExportador: jest.fn(),
      setDireccionExportador: jest.fn(),
      setNombreImportador: jest.fn(),
      setDireccionImportador: jest.fn(),
      setNumeroEnLetraDeLosLotes: jest.fn(),
      setNumeroEnLetraDeLosLotesEnIngles: jest.fn(),
      setNumeroDeFactura: jest.fn(),
      setCantidadEnQuilates: jest.fn(),
      setValorDeLosDiamantes: jest.fn(),
    } as unknown as jest.Mocked<Tramite130203Store>;

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, CertificadoKimberleyComponent],
      declarations: [],
      providers: [
        {
          provide: ExportacionDeDiamantesEnBrutoService,
          useValue: mockExportacionService,
        },
        { provide: Tramite130203Query, useValue: mockTramiteQuery },
        { provide: Tramite130203Store, useValue: mockTramiteStore },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CertificadoKimberleyComponent);
    component = fixture.componentInstance;

    mockExportacionService.getPaisesEmisores.mockReturnValue(
      of([{ id: 1, descripcion: 'Country1' }])
    );
    mockExportacionService.getNombresIngles.mockReturnValue(
      of([{ codigo: '1', nombre: 'Country1' }])
    );
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize forms on ngOnInit', () => {
    component.ngOnInit();
    expect(component.formularioEmpresa).toBeDefined();
    expect(component.datosDelExportador).toBeDefined();
    expect(component.datosDelImportador).toBeDefined();
    expect(component.datosDeLaRemesa).toBeDefined();
    expect(component.datosDeLosDiamantes).toBeDefined();
  });

  it('should load data from services', () => {
    component.ngOnInit();
    expect(mockExportacionService.getPaisesEmisores).toHaveBeenCalled();
    expect(mockExportacionService.getNombresIngles).toHaveBeenCalled();
    expect(component.paisesEmisores.length).toBe(1);
    expect(component.nombresIngles.length).toBe(1);
  });

  it('should subscribe to state and update form values', () => {
    component.ngOnInit();
    expect(component.formularioEmpresa.value).toEqual({
      especifique: '',
      numero: '',
      tipoEmpresa: '',
      nombre: '',
      lineaCheckbox: false,
      paisOrigen: null,
    });
    expect(component.datosDelExportador.get('nombreExportador')?.value).toBe(
      'Test Exporter'
    );
    expect(component.datosDelExportador.get('direccionExportador')?.value).toBe(
      'Test Address'
    );
  });
  it('should call store methods when form values change', () => {
    component.ngOnInit();
    
    // Ensure that the observables are set up correctly before interacting with the form
    mockTramiteQuery.nombreExportador$ = of('Test Exporter');
    mockTramiteQuery.direccionExportador$ = of('Test Address');
    
    // Simulate form value change
    component.datosDelExportador
      .get('nombreExportador')
      ?.setValue('New Exporter');
    
    component.getNombreExportador();
    expect(mockTramiteStore.setNombreExportador).toHaveBeenCalledWith('New Exporter');
    
    component.datosDelExportador
      .get('direccionExportador')
      ?.setValue('New Address');
    
    component.getDireccionExportador();
    expect(mockTramiteStore.setDireccionExportador).toHaveBeenCalledWith('New Address');
  });
  

  it('should update nombre in English when tipoEmpresa changes', () => {
    component.ngOnInit();
    component.nombresIngles = [{ idDelPais: 1, name: 'Country1' }];
    component.updateNombreIngles(1);
    expect(component.formularioEmpresa.get('nombre')?.value).toBe('Country1');
  });

  it('should handle invalid form controls', () => {
    component.ngOnInit();
    component.formularioEmpresa.get('numero')?.setValue('');
    expect(component.isInvalid('numero')).toBe(true);
  });

  it('should clean up subscriptions on ngOnDestroy', () => {
    const destroyedSpy = jest.spyOn(component['destroyed$'], 'next');
    const completeSpy = jest.spyOn(component['destroyed$'], 'complete');
    component.ngOnDestroy();
    expect(destroyedSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('should set values in the store when setValoresStore is called', () => {
    component.ngOnInit();
    component.setValoresStore(
      component.formularioEmpresa,
      'nombre',
      'setNombreExportador'
    );
    expect(mockTramiteStore.setNombreExportador).toHaveBeenCalledWith('');
  });

  it('should create secondary forms correctly', () => {
    component.crearFormulario();
    expect(component.datosDelExportador).toBeDefined();
    expect(component.datosDelImportador).toBeDefined();
    expect(component.datosDeLaRemesa).toBeDefined();
    expect(component.datosDeLosDiamantes).toBeDefined();
  });

  it('should handle empty nombresIngles in updateNombreIngles', () => {
    component.ngOnInit();
    component.nombresIngles = [];
    component.updateNombreIngles(1);
    expect(component.formularioEmpresa.get('nombre')?.value).toBe('');
  });

  it('should handle null values in observables', () => {
    mockTramiteQuery.nombreExportador$ = of(null as string | null) as Observable<string>;
    mockTramiteQuery.direccionExportador$ = of(null as string | null) as Observable<string>;
    component.ngOnInit();
    expect(
      component.datosDelExportador.get('nombreExportador')?.value
    ).toBeNull();
    expect(
      component.datosDelExportador.get('direccionExportador')?.value
    ).toBeNull();
  });
});
