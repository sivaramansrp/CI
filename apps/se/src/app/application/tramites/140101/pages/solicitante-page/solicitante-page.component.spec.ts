import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitantePageComponent } from './solicitante-page.component';
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

describe('SolicitantePageComponent', () => {
  let component: SolicitantePageComponent;
  let fixture: ComponentFixture<SolicitantePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SolicitantePageComponent, MockNgAlertComponent], // Mock ng-alert component
      schemas: [CUSTOM_ELEMENTS_SCHEMA], // Allow custom elements like <app-datos>, <app-firmar-solicitud>
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitantePageComponent);
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
    component.TEXTOS = {
      FIRMAR: {
        Firmar: '<p>La solicitud ha sido guardado existosamente. Tiene 15 dias naturales para firmarla, despues de ese tiempo desaparecera del listado de solicitudes pendientes por firmar. Numero de soliticid [202767878] </p>',
      },
      AVISO: {
        Aviso: 'Some aviso text',
      },
    };
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
    component.TEXTOS = {
      AVISO: {
        Aviso: `<p style="text-align: center; font-weight: bold;">Aviso de privacidad simplificado</p>
          <p>El Servicio de Administración Tributaria (SAT), es el sujeto obligado y responsable del tratamiento de los datos personales que se recaban a través de la Ventanilla Digital Mexicana de Comercio Exterior (VUCEM), los datos personales podrán ser utilizados y transferidos a las autoridades competentes, con la finalidad de llevar a cabo cualquier trámite relacionado con importaciones, exportaciones y tránsito de mercancías de comercio exterior, incluyendo las regulaciones y restricciones no arancelarias que, conforme a la legislación aplicable, sea exigido por las autoridades competentes en materia de comercio exterior y consultar información sobre los procedimientos para la importación, exportación y tránsito de mercancías de comercio exterior, incluyendo las regulaciones y restricciones no arancelarias, así como las notificaciones que se deriven de dichos trámites y serán protegidos, incorporados y tratados... </p>`,
      },
      FIRMAR: {
        Firmar: 'Some firmar text',
      },
    };
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
    expect(component.TEXTOS.AVISO).toBe(AVISO);
    expect(component.TEXTOS.FIRMAR).toBe(FIRMAR);
  });
});