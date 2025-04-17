import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PermisoDeExportacionComponent } from './permiso-de-exportacion.component';
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from '@angular/core';
import { WizardComponent } from '@libs/shared/data-access-user/src'; // Import WizardComponent
import { AccionBoton } from '@libs/shared/data-access-user/src/core/models/140103/cancelacion.model';
import { AVISO, FIRMAR } from '@libs/shared/data-access-user/src/tramites/constantes/aviso-privacidad.enum';

@Component({
  selector: 'ng-alert',
  template: '<div [innerHTML]="CONTENIDO"></div>',
})
class MockNgAlertComponent {
  @Input() CONTENIDO!: string;
}

describe('PermisoDeExportacionComponent', () => {
  let component: PermisoDeExportacionComponent;
  let fixture: ComponentFixture<PermisoDeExportacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PermisoDeExportacionComponent, MockNgAlertComponent], // Mock ng-alert component
      schemas: [CUSTOM_ELEMENTS_SCHEMA], // Allow custom elements like <app-datos>, <app-firmar-solicitud>
    }).compileComponents();

    fixture = TestBed.createComponent(PermisoDeExportacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display "Registro de solicitud de Cancelación IMMEX" when indice is 1', () => {
    component.indice = 1;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const heading = compiled.querySelector('h1');
    expect(heading?.textContent).toContain('Registro de solicitud de Cancelación IMMEX');
  });

  it('should display "Firmar" and ng-alert when indice is not 1', () => {
    component.indice = 2;
  
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const heading = compiled.querySelector('h1');
    const alert = compiled.querySelector('ng-alert');

    expect(heading?.textContent).toContain('Firmar');
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

  it('should render <app-firmar-solicitud> when indice is 2', () => {
    component.indice = 2;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const appFirmarSolicitud = compiled.querySelector('app-firmar-solicitud');
    expect(appFirmarSolicitud).toBeTruthy();
  });

  it('should render <ng-alert> with TEXTOS.AVISO.Aviso when indice is 1', () => {
    component.indice = 1;
    
    component.TEXTOS = AVISO;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const alert = compiled.querySelector('ng-alert');

    expect(alert).toBeTruthy();

    // Check the rendered content of the ng-alert
    const alertContent = alert?.innerHTML.trim();
    expect(alertContent).toContain('Aviso de privacidad simplificado');
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
  
  it('should have TEXTOS initialized with AVISO and FIRMAR constants', () => {
    expect(component.TEXTOS.Aviso).toBe(AVISO);
    expect(component.TEXTOS).toBe(FIRMAR);
  });
});