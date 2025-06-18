import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { DestinatarioAgenteAduanalComponent } from './destinatario-agente-aduanal.component';
import { DestinatarioService } from '../../services/destinatario.service';
import { Tramite250101Store } from '../../estados/tramite250101.store';
import { Tramite250101Query } from '../../estados/tramite250101.query';

class Tramite250101QueryMock {
  destinatarioDenominacion$ = of([]);
  destinatarioPais$ = of([]);
  destinatarioEstado$ = of([]);
  destinatarioCodigoPostal$ = of([]);
  destinatarioDomicilio$ = of([]);
  selectSolicitud$ = of({});
}

describe('DestinatarioAgenteAduanalComponent', () => {
  let component: DestinatarioAgenteAduanalComponent;
  let fixture: ComponentFixture<DestinatarioAgenteAduanalComponent>;
  let destinatarioServiceMock: any;
  let tramite250101StoreMock: any;

  beforeEach(async () => {
    destinatarioServiceMock = {
      getDestinatarioEncabezadoDeTabla: jest.fn().mockReturnValue(of({ columns: ['Column1', 'Column2'] })),
      getAduanalEncabezadoDeTabla: jest.fn().mockReturnValue(of({ columns: ['ColumnA', 'ColumnB'] })),
      getPaisData: jest.fn().mockReturnValue(of([{ id: 1, descripcion: 'Pais1' }])),
      getEstadoData: jest.fn().mockReturnValue(of([{ id: 2, descripcion: 'Estado1' }])),
    };

    tramite250101StoreMock = {
      establecerDestinatario: jest.fn(),
      establecerAgenteAduanal: jest.fn(),
      establecerDestinatarioDenominacion: jest.fn(),
      establecerDestinatarioCodigoPostal: jest.fn(),
      establecerDestinatarioDomicilio: jest.fn(),
      establecerDestinatarioPais: jest.fn(),
      establecerDestinatarioEstado: jest.fn(),
      establecerAgenteAduanalNombre: jest.fn(),
      establecerAgenteAduanalPrimerApellido: jest.fn(),
      establecerAgenteAduanalSegundoApellido: jest.fn(),
      establecerAgenteAduanalPatente: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,DestinatarioAgenteAduanalComponent],
      declarations: [],
      providers: [
        { provide: DestinatarioService, useValue: destinatarioServiceMock },
        { provide: Tramite250101Store, useValue: tramite250101StoreMock },
        { provide: Tramite250101Query, useClass: Tramite250101QueryMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DestinatarioAgenteAduanalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form and fetch data on ngOnInit', () => {
    expect(component.formDestinatariosModal).toBeDefined();
    expect(component.formAgenteAduanal).toBeDefined();
    expect(destinatarioServiceMock.getDestinatarioEncabezadoDeTabla).toHaveBeenCalled();
    expect(destinatarioServiceMock.getAduanalEncabezadoDeTabla).toHaveBeenCalled();
    expect(destinatarioServiceMock.getPaisData).toHaveBeenCalled();
    expect(destinatarioServiceMock.getEstadoData).toHaveBeenCalled();
    expect(component.tablaDestinatarioData).toEqual(['Column1', 'Column2']);
    expect(component.tablaAgenteAduanalData).toEqual(['ColumnA', 'ColumnB']);
    expect(component.paisData).toEqual([{ id: 1, descripcion: 'Pais1' }]);
    expect(component.estadoData).toEqual([{ id: 2, descripcion: 'Estado1' }]);
  });

  it('should toggle showTableDiv and showDestinatarioModal when cambiarDestinatario is called', () => {
    component.cambiarDestinatario();
    expect(component.showTableDiv).toBe(false);
    expect(component.showDestinatarioModal).toBe(true);
  });

  it('should toggle showTableDiv and showAgenteModal when cambiarAgenteAduanal is called', () => {
    component.cambiarAgenteAduanal();
    expect(component.showTableDiv).toBe(false);
    expect(component.showAgenteModal).toBe(true);
  });

  it('should call establecerDestinatario when enviarDestinatarioFormulario is called', () => {
    component.formDestinatariosModal.patchValue({
      destinatarioRazonSocial: 'Test Razon Social',
      paisNacionalDestinatario: 1,
      estadoNacionalDestinatario: 2,
      codigoPostalDestinatario: '12345',
      domicilioDestinatario: 'Test Domicilio',
    });

    component.showTableDiv = true;
    component.showDestinatarioModal = true;

    component.enviarDestinatarioFormulario();

    expect(tramite250101StoreMock.establecerDestinatario).toHaveBeenCalled();
    expect(component.showTableDiv).toBe(false);
    expect(component.showDestinatarioModal).toBe(false);
  });

  it('should call establecerAgenteAduanal when enviarAgenteAduanalFormulario is called', () => {
    component.formAgenteAduanal.patchValue({
      nombreAgenteAduanal: 'Test Nombre',
      primerApellidoAgenteAduanal: 'Test Apellido1',
      segundoApellidoAgenteAduanal: 'Test Apellido2',
      patenteAgenteAduanal: '1234',
    });

    component.showTableDiv = true;
    component.showAgenteModal = true;

    component.enviarAgenteAduanalFormulario();

    expect(tramite250101StoreMock.establecerAgenteAduanal).toHaveBeenCalled();
    expect(component.showTableDiv).toBe(false);
    expect(component.showAgenteModal).toBe(false);
  });

  it('should set showAceptarModal to true when openAceptarModal is called', () => {
    component.showAceptarModal = false; 
    component.openAceptarModal();
    expect(component.showAceptarModal).toBe(true);
  });
  
  it('should call enviarDestinatarioFormulario and set showAceptarModal to false when confirmAgregar is called', () => {
    const enviarDestinatarioFormularioSpy = jest.spyOn(component, 'enviarDestinatarioFormulario');
    component.showAceptarModal = true;
  
    component.confirmAgregar();
  
    expect(enviarDestinatarioFormularioSpy).toHaveBeenCalled(); 
    expect(component.showAceptarModal).toBe(false); 
  });

  it('should update store when actualizarCodigoPostal is called', () => {
    component.formDestinatariosModal.patchValue({ codigoPostalDestinatario: '12345' });
    component.actualizarCodigoPostal();
    expect(tramite250101StoreMock.establecerDestinatarioCodigoPostal).toHaveBeenCalledWith('12345');
  });
  
  it('should update store when actualizarDomicilio is called', () => {
    component.formDestinatariosModal.patchValue({ domicilioDestinatario: 'Test Domicilio' });
    component.actualizarDomicilio();
    expect(tramite250101StoreMock.establecerDestinatarioDomicilio).toHaveBeenCalledWith('Test Domicilio');
  });

  it('should update store when actualizarDenominacion is called', () => {
    component.formDestinatariosModal.patchValue({ destinatarioRazonSocial: 'Test Denominacion' });
    component.actualizarDenominacion();
    expect(tramite250101StoreMock.establecerDestinatarioDenominacion).toHaveBeenCalledWith('Test Denominacion');
  });

  it('should clean up subscriptions on ngOnDestroy', () => {
    const destroySpy = jest.spyOn(component['destroy$'], 'next');
    const completeSpy = jest.spyOn(component['destroy$'], 'complete');

    component.ngOnDestroy();

    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

    it('should disable the form if esFormularioSoloLectura is true', () => {
      component.esFormularioSoloLectura = true;
      component.formDestinatariosModal.enable();
      component.inicializarEstadoFormulario();
      expect(component.formDestinatariosModal.disabled).toBe(true);
    });
  
    it('should enable the form if esFormularioSoloLectura is false', () => {
      component.esFormularioSoloLectura = false;
      component.formDestinatariosModal.disable(); 
      component.inicializarEstadoFormulario();
      expect(component.formDestinatariosModal.enabled).toBe(true);
    });

    
    it('should disable the form if esFormularioSoloLectura is true', () => {
      component.esFormularioSoloLectura = true;
      component.formAgenteAduanal.enable(); 
      component.inicializarEstadoFormulario();
      expect(component.formAgenteAduanal.disabled).toBe(true);
    });
  
    it('should enable the form if esFormularioSoloLectura is false', () => {
      component.esFormularioSoloLectura = false;
      component.formAgenteAduanal.disable();
      component.inicializarEstadoFormulario();
      expect(component.formAgenteAduanal.enabled).toBe(true);
    });
});
