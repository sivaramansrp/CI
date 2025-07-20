import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { DatosComunesComponent } from './datos-comunes.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Tramite32615Store } from '../../../../estados/tramites/tramite32615.store';
import { Tramite32615Query } from '../../../../estados/queries/tramite32615.query';
import { RecintoFiscalizadoService } from '../../services/recinto-fiscalizado.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { ALERTA_COM, OPCIONES_DE_BOTON_DE_RADIO } from '@libs/shared/data-access-user/src/tramites/constantes/32615/datos-comunes.enum';

describe('DatosComunesComponent', () => {
  let component: DatosComunesComponent;
  let fixture: ComponentFixture<DatosComunesComponent>;
  let mockStore: Partial<Tramite32615Store>;
  let mockQuery: Partial<Tramite32615Query>;
  let mockService: Partial<RecintoFiscalizadoService>;

  beforeEach(async () => {
    mockStore = {
      setSectorProductivo: jest.fn(),
      setServicio: jest.fn(),
      setSolicitudDeInspeccion: jest.fn(),
      // Add other store methods as needed
    };

    mockQuery = {
      selectSolicitud$: of({
        sectorProductivo: '',
        servicio: '',
        preOperativo: '',
        solicitudDeInspeccion: '',
        indiqueAutorizo: '',
        senaleCuentaEmpleados: '',
        bimestre: '',
        numeroDeEmpleados: '',
        cumpleConLaObligacion: '',
        acreditaRealizar: '',
        senaleSiAlMomento: '',
        rfc: '',
        numeroDeEmpleadosForma: '',
        bimestreForma: '',
        acreditaCumplir: '',
        fraccionVI: '',
        cuartoParrafoDelCff: '',
        novenoParrafoDelCff: '',
        digitalesEstanVigentes: '',
        ultimosDoceMeses: '',
        prestacionDeServicios: '',
        instalacionesPrincipales: '',
        municipioAlcaldia: '',
        tipoDeInstalcion: '',
        procesoProductivo: '',
        acreditacionDelUso: '',
        prefilMensajeria: '',
        articuloDelCff: '',
        exportadoresSectorial: '',
        archivoNacionales: '',
        proveedores: '',
        solicitudDeCertificacion: '',
        controlInventarios: '',
        nombreDelSistema: '',
        lugarDeRadicacion: '',
        previstas: '',
        delCffLasReglas: '',
        enSeCaracter: '',
        obligadoTributar: '',
        nacionalidad: '',
        conformidad: '',
        esquemaIntegralCertificacion: '',
        modificadasRevocadas: ''
      }),
    };

    mockService = {
      obtenerTablaDatos: jest.fn().mockReturnValue(of({ data: [{}] })),
      obtenerInstalacionesPrincipalesTablaDatos: jest.fn().mockReturnValue(of({ data: [{}] })),
      obtenerInventariosTablaDatos: jest.fn().mockReturnValue(of({ data: [{}] })),
    };

    await TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule],
      declarations: [DatosComunesComponent],
      providers: [
        FormBuilder,
        { provide: Tramite32615Store, useValue: mockStore },
        { provide: Tramite32615Query, useValue: mockQuery },
        { provide: RecintoFiscalizadoService, useValue: mockService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosComunesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with default values', () => {
    expect(component.datosComunesForma).toBeDefined();
    expect(component.tablaModalForma).toBeDefined();
    expect(component.tablaDosModalForma).toBeDefined();
    expect(component.miembroDeLaEmpresa).toBeDefined();
  });

  it('should load catalog data', () => {
    expect(component.sectorProductivoAgace.length).toBeGreaterThan(0);
    expect(component.serviciosAgace.length).toBeGreaterThan(0);
  });

  it('should set alert constants', () => {
    expect(component.alerta).toEqual(ALERTA_COM);
    expect(component.opcionDeBotonDeRadio).toEqual(OPCIONES_DE_BOTON_DE_RADIO);
  });

  it('should call service methods to load table data', () => {
    component.obtenerTablaDatos();
    component.obtenerInstalacionesPrincipalesTablaDatos();
    component.obtenerInventariosTablaDatos();

    expect(mockService.obtenerTablaDatos).toHaveBeenCalled();
    expect(mockService.obtenerInstalacionesPrincipalesTablaDatos).toHaveBeenCalled();
    expect(mockService.obtenerInventariosTablaDatos).toHaveBeenCalled();
  });

  it('should update store values when form changes', () => {
    const testValue = 'test-value';
    component.datosComunesForma.get('sectorProductivo')?.setValue(testValue);
    
    expect(mockStore.setSectorProductivo).toHaveBeenCalledWith(testValue);
  });

  it('should show/hide fields based on radio button selection', () => {
    // Test senaleCuentaEmpleados field
    component.datosComunesForma.get('senaleCuentaEmpleados')?.setValue('1');
    expect(component.showSenaleCuentaEmpleados).toBe(true);
    
    component.datosComunesForma.get('senaleCuentaEmpleados')?.setValue('0');
    expect(component.showSenaleCuentaEmpleados).toBe(false);

    // Test senaleSiAlMomento field
    component.datosComunesForma.get('senaleSiAlMomento')?.setValue('1');
    expect(component.showSenaleSiAlMomento).toBe(true);
    
    component.datosComunesForma.get('senaleSiAlMomento')?.setValue('0');
    expect(component.showSenaleSiAlMomento).toBe(false);
  });

  it('should clear servicio when sectorProductivo changes and vice versa', () => {
    component.datosComunesForma.get('sectorProductivo')?.setValue('test');
    expect(mockStore.setServicio).toHaveBeenCalledWith('');
    
    component.datosComunesForma.get('servicio')?.setValue('test');
    expect(mockStore.setSectorProductivo).toHaveBeenCalledWith('');
  });

  it('should open confirm modal when certain conditions are met', () => {
    component.openConfirmModal = jest.fn();
    
    // Test with a field that should trigger the modal
    component.setValoresStore(component.datosComunesForma, 'solicitudDeInspeccion', 'setSolicitudDeInspeccion', true, 0);
    expect(component.openConfirmModal).toHaveBeenCalled();
  });

  it('should handle form validation', () => {
    const requiredFields = [
      'solicitudDeInspeccion',
      'indiqueAutorizo',
      'senaleCuentaEmpleados',
      // Add other required fields
    ];

    requiredFields.forEach(field => {
      const control = component.datosComunesForma.get(field);
      control?.setValue('');
      expect(control?.valid).toBeFalsy();
      control?.setValue('valid-value');
      expect(control?.valid).toBeTruthy();
    });
  });

  it('should disable form controls in read-only mode', () => {
    component.esFormularioSoloLectura = true;
    component.inicializarEstadoFormulario();
    
    Object.keys(component.datosComunesForma.controls).forEach(key => {
      expect(component.datosComunesForma.get(key)?.disabled).toBeTruthy();
    });
  });

  it('should create table data when modal is accepted', () => {
    component.crearTablaDatos();
    expect(component.mercanciasTablaDatos.length).toBe(1);
    
    component.crearTablaDosDatos();
    expect(component.instalacionesPrincipalesTablaDatos.length).toBe(1);
  });

  it('should open and close modals', () => {
    // Mock modal instances
    component.confirmInstance = { show: jest.fn(), hide: jest.fn() } as any;
    component.tablaInstance = { show: jest.fn(), hide: jest.fn() } as any;
    component.instalacionesPrincipalesTablaInstance = { show: jest.fn(), hide: jest.fn() } as any;
    component.miembroDeLaEmpresaInstance = { show: jest.fn(), hide: jest.fn() } as any;
    
    component.openConfirmModal();
    expect(component.confirmInstance.show).toHaveBeenCalled();
    
    component.closeConfirmModal();
    expect(component.confirmInstance.hide).toHaveBeenCalled();
    
    // Test other modals similarly
  });

  it('should clean up on destroy', () => {
    const nextSpy = jest.spyOn(component.destroyNotifier$, 'next');
    const completeSpy = jest.spyOn(component.destroyNotifier$, 'complete');
    
    component.ngOnDestroy();
    
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('should render required fields with asterisk', () => {
    const requiredLabels = fixture.debugElement.queryAll(By.css('.danger'));
    expect(requiredLabels.length).toBeGreaterThan(0);
  });

  it('should update changed flag on value change', () => {
    const initialChanged = component.changed;
    component.enCambioDeValor();
    expect(component.changed).toBe(!initialChanged);
  });
});