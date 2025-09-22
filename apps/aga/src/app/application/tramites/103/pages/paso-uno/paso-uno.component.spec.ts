import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PasoUnoComponent } from './paso-uno.component';
import { SolicitanteComponent } from '@ng-mf/data-access-user';
import { ExencionImpuestosComponent } from '../../components/exencion-impuestos.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL, PERSONA_MORAL_NACIONAL } from '@libs/shared/data-access-user/src/tramites/constantes/solicitante-constantes.enum';
import { TIPO_PERSONA } from '@ng-mf/data-access-user';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PasoUnoComponent', () => {
  let component: PasoUnoComponent;
  let fixture: ComponentFixture<PasoUnoComponent>;
  let changeDetectorRef: ChangeDetectorRef;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SolicitanteComponent,
        ExencionImpuestosComponent,
        PasoUnoComponent,
        HttpClientTestingModule
      ],
      providers: [
        { provide: ChangeDetectorRef, useValue: { detectChanges: jest.fn() } }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.componentInstance;
    changeDetectorRef = TestBed.inject(ChangeDetectorRef);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Initialization', () => {
    it('should initialize with default values', () => {
      expect(component.indice).toBe(1);
      // After ngOnInit, persona should be initialized with PERSONA_MORAL_NACIONAL
      expect(component.persona).toEqual(PERSONA_MORAL_NACIONAL);
      expect(component.domicilioFiscal).toEqual(DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL);
    });

    it('should call ngAfterViewInit and initialize properties', () => {
      // Clear any previous calls to the mock
      jest.clearAllMocks();
      
      component.solicitante = {
        obtenerTipoPersona: jest.fn()
      } as unknown as SolicitanteComponent;

      // Spy on the component's cdr.detectChanges method
      const cdrSpy = jest.spyOn(component['cdr'], 'detectChanges');

      component.ngAfterViewInit();

      expect(component.persona).toEqual(PERSONA_MORAL_NACIONAL);
      expect(component.domicilioFiscal).toEqual(DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL);
      expect(component.solicitante.obtenerTipoPersona).toHaveBeenCalledWith(TIPO_PERSONA.MORAL_NACIONAL);
      expect(cdrSpy).toHaveBeenCalled();
    });
  });

  describe('Tab Selection', () => {
    it('should change tab index when seleccionaTab is called', () => {
      component.seleccionaTab(2);
      expect(component.indice).toBe(2);

      component.seleccionaTab(1);
      expect(component.indice).toBe(1);
    });

    it('should render correct tab content based on indice', () => {
      component.indice = 1;
      fixture.detectChanges();
      let tabContent = fixture.nativeElement.querySelector('solicitante');
      expect(tabContent).toBeTruthy();

      component.indice = 2;
      fixture.detectChanges();
      tabContent = fixture.nativeElement.querySelector('app-exencion-impuestos');
      expect(tabContent).toBeTruthy();
    });
  });

  describe('Template', () => {
    it('should render two tabs', () => {
      const tabs = fixture.nativeElement.querySelectorAll('.nav-tabs li');
      expect(tabs.length).toBe(2);
      expect(tabs[0].textContent).toContain('Solicitante');
      expect(tabs[1].textContent).toContain('Exención impuestos');
    });

    it('should apply active class to the selected tab', () => {
      component.indice = 1;
      fixture.detectChanges();
      const tabs = fixture.nativeElement.querySelectorAll('.nav-tabs li');
      expect(tabs[0].classList).toContain('active');
      expect(tabs[1].classList).not.toContain('active');

      component.indice = 2;
      fixture.detectChanges();
      expect(tabs[0].classList).not.toContain('active');
      expect(tabs[1].classList).toContain('active');
    });

    it('should call seleccionaTab on click and keyboard events', () => {
      jest.spyOn(component, 'seleccionaTab');
      const tabs = fixture.nativeElement.querySelectorAll('.nav-tabs li a');

      tabs[0].click();
      expect(component.seleccionaTab).toHaveBeenCalledWith(1);

      const enterEvent = new KeyboardEvent('keyup', { key: 'Enter' });
      tabs[1].dispatchEvent(enterEvent);
      expect(component.seleccionaTab).toHaveBeenCalledWith(2);

      const spaceEvent = new KeyboardEvent('keydown', { key: ' ' });
      tabs[0].dispatchEvent(spaceEvent);
      expect(component.seleccionaTab).toHaveBeenCalledWith(1);
    });
  });

  // Reasonable implementation for fetchGetDatosConsulta
  function fetchGetDatosConsulta(): any {
    // Simulate a response structure similar to what the real service would return
    return {
      success: true,
      datos: {
        exencionImpuestos: {
          manifesto: 'manifestoValue',
          organismoPublico: 'organismoValue',
          aduana: 'aduanaValue',
          destinoMercancia: 'destinoValue'
        },
        importadorExportador: {
          nombre: 'nombreValue',
          calle: 'calleValue',
          numeroExterior: '123',
          numeroInterior: 'A',
          telefono: '555-1234',
          correoElectronico: 'test@example.com',
          pais: 'Mexico',
          codigoPostal: '12345',
          estado: 'EstadoValue',
          colonia: 'ColoniaValue',
          opcion: 'OpcionValue'
        },
        datosMercancia: {
          tipoDeMercancia: 'TipoValue',
          usoEspecifico: 'UsoValue',
          condicionMercancia: 'CondicionValue',
          unidadMedida: 'UnidadValue',
          vehiculo: 'VehiculoValue',
          ano: 2024,
          cantidad: 10,
          marca: 'MarcaValue',
          modelo: 'ModeloValue',
          serie: 'SerieValue'
        }
      }
    };
  }
});

function fetchGetDatosConsulta(): any {
  throw new Error('Function not implemented.');
}
