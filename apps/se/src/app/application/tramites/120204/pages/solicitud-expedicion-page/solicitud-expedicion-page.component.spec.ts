import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitudExpedicionPageComponent } from './solicitudExpedicion-page.component';
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from '@angular/core';
import { WizardComponent } from '@libs/shared/data-access-user/src'; // Import WizardComponent
import { AccionBoton } from '@libs/shared/data-access-user/src/core/models/140103/cancelacion.model';
import { REQUISITOS } from '../../constantes/expedicion-certificado.enum';

/**
 * Componente de prueba simulado para representar un componente de alerta.
 * 
 * Este componente se utiliza en pruebas unitarias para simular el comportamiento
 * de un componente de alerta real. Renderiza contenido HTML dinámico a través
 * de la propiedad de entrada `CONTENIDO`.
 * 
 * @selector ng-alert
 * @template `<div [innerHTML]="CONTENIDO"></div>`
 * 
 * @property {string} CONTENIDO - Propiedad de entrada que contiene el contenido
 * HTML que se mostrará dentro del componente.
 */
@Component({
  selector: 'ng-alert',
  template: '<div [innerHTML]="CONTENIDO"></div>',
})
class MockNgAlertComponent {
  @Input() CONTENIDO!: string;
}

describe('SolicitantePageComponent', () => {
  let component: SolicitudExpedicionPageComponent;
  let fixture: ComponentFixture<SolicitudExpedicionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SolicitudExpedicionPageComponent, MockNgAlertComponent], // Mock ng-alert component
      schemas: [CUSTOM_ELEMENTS_SCHEMA], // Allow custom elements like <app-datos>, <app-firmar-solicitud>
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitudExpedicionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display "Solicitud expedición de certificado de cupo obtenido por licitación pública" when indice is 1', () => {
    component.indice = 1;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const heading = compiled.querySelector('h1');
    expect(heading?.textContent).toContain('Solicitud expedición de certificado de cupo obtenido por licitación pública');
  });

  it('should display "TEXTOS" and ng-alert when indice is not 1', () => {
    component.indice = 2;
    component.TEXTOS = REQUISITOS;

    const compiled = fixture.nativeElement as HTMLElement;
    const heading = compiled.querySelector('h1');
    const alert = compiled.querySelector('ng-alert');

    expect(heading?.textContent).toContain('Solicitud expedición de certificado');
    expect(alert).toBeTruthy();

    // Check the rendered content of the ng-alert
    const alertContent = alert?.innerHTML.trim();
    expect(alertContent).toContain('La solicitud ha sido guardado existosamente.');
  });

  it('should render <app-datos> when indice is 1', () => {
    component.indice = 1;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const appDatos = compiled.querySelector('app-datos');
    expect(appDatos).toBeTruthy();
  });

  it('should render <app-requisitos-necessarios> when indice is 2', () => {
    component.indice = 2;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const appFirmarSolicitud = compiled.querySelector('app-requisitos-necessarios');
    expect(appFirmarSolicitud).toBeTruthy();
  });

  it('should render <app-anexar-requisitos> when indice is 3', () => {
    component.indice = 3;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const appFirmarSolicitud = compiled.querySelector('app-anexar-requisitos');
    expect(appFirmarSolicitud).toBeTruthy();
  });

  it('should render <app-firmar-solicitud> when indice is 4', () => {
    component.indice = 4;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const appFirmarSolicitud = compiled.querySelector('app-firmar-solicitud');
    expect(appFirmarSolicitud).toBeTruthy();
  });

  it('should render "Cargas archivos" when indice is 2', () => {
    component.indice = 2;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const heading = compiled.querySelector('h1');
    expect(heading?.textContent).toContain('Cargas archivos');
  });

  it('should render "Cargas archivos" when indice is 3', () => {
    component.indice = 3;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const heading = compiled.querySelector('h1');
    expect(heading?.textContent).toContain('Cargas archivos');
  });


  it('should call getValorIndice when btn-continuar emits continuarEvento', () => {
    jest.spyOn(component, 'getValorIndice');
    const compiled = fixture.nativeElement as HTMLElement;
    const btnContinuar = compiled.querySelector('btn-continuar');

    // Simulate the event emission
    const event = new Event('continuarEvento');
    btnContinuar?.dispatchEvent(event);

    expect(component.getValorIndice).toHaveBeenCalled();
  });
  it('should update indice and call wizardComponent.siguiente when getValorIndice is called with accion "cont"', () => {
    component.wizardComponent = {
      siguiente: jest.fn(),
      atras: jest.fn(),
    } as unknown as WizardComponent;
  
    const accionBoton: AccionBoton = { valor: 2, accion: 'cont' };
    component.getValorIndice(accionBoton);
  
    expect(component.indice).toBe(2);
    expect(component.wizardComponent.siguiente).toHaveBeenCalled();
  });
  it('should update indice and call wizardComponent.atras when getValorIndice is called with accion "atras"', () => {
    component.wizardComponent = {
      siguiente: jest.fn(),
      atras: jest.fn(),
    } as unknown as WizardComponent;
  
    const accionBoton: AccionBoton = { valor: 3, accion: 'atras' };
    component.getValorIndice(accionBoton);
  
    expect(component.indice).toBe(3);
    expect(component.wizardComponent.atras).toHaveBeenCalled();
  });
  
  it('should not update indice or call wizardComponent methods if valor is out of range', () => {
    component.wizardComponent = {
      siguiente: jest.fn(),
      atras: jest.fn(),
    } as unknown as WizardComponent;
  
    const accionBoton: AccionBoton = { valor: 5, accion: 'cont' };
    component.getValorIndice(accionBoton);
  
    expect(component.indice).toBe(1); // Default value
    expect(component.wizardComponent.siguiente).not.toHaveBeenCalled();
    expect(component.wizardComponent.atras).not.toHaveBeenCalled();
  });
  it('should initialize datosPasos with correct values', () => {
    expect(component.datosPasos.nroPasos).toBe(component.pantallasPasos.length);
    expect(component.datosPasos.indice).toBe(component.indice);
    expect(component.datosPasos.txtBtnAnt).toBe('Anterior');
    expect(component.datosPasos.txtBtnSig).toBe('Continuar');
  });
  
  it('should have TEXTOS initialized with REQUISITOS constants', () => {
    expect(component.TEXTOS).toBe(REQUISITOS);
  });
});