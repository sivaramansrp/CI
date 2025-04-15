import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoUnoComponent } from './paso-uno.component';
import { CommonModule } from '@angular/common';
import { DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL, PERSONA_MORAL_NACIONAL, SolicitanteComponent } from '@ng-mf/data-access-user';
import { DatosDeLaSolicitudComponent } from '../../components/datos-de-la-solicitud/datos-de-la-solicitud.component';
import { PagoDeDerechosComponent } from '../../components/pago-de-derechos/pago-de-derechos.component';
import { TercerosRelacinadosComponent } from '../../components/terceros-relacinados/terceros-relacinados.component';
import { TramitesAsociadosComponent } from '../../components/tramites-asociados/tramites-asociados.component';
import { FormularioDinamico, TIPO_PERSONA, TituloComponent } from '@ng-mf/data-access-user';

const mockSolicitante = {
  obtenerTipoPersona: jest.fn()
};

describe('PasoUnoComponent', () => {
  let component: PasoUnoComponent;
  let fixture: ComponentFixture<PasoUnoComponent>;

  beforeEach(async () => {
    component.solicitante = mockSolicitante as any; // Use type assertion if needed
    jest.clearAllMocks();
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        SolicitanteComponent,
        DatosDeLaSolicitudComponent,
        PagoDeDerechosComponent,
        TercerosRelacinadosComponent,
        TramitesAsociadosComponent, PasoUnoComponent
      ],
      declarations: [],
    }).compileComponents();

    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default indice value as 1', () => {
    expect(component.indice).toBe(1);
  });

  it('should update indice when seleccionaTab is called', () => {
    component.seleccionaTab(3);
    expect(component.indice).toBe(3);

    component.seleccionaTab(5);
    expect(component.indice).toBe(5);
  });

  it('should initialize persona, domicilioFiscal and call obtenerTipoPersona', () => {
    // Act
    component.ngAfterViewInit();

    // Assert property assignments
    expect(component.persona).toBe(PERSONA_MORAL_NACIONAL);
    expect(component.domicilioFiscal).toBe(DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL);

    // Assert service method call
    expect(mockSolicitante.obtenerTipoPersona).toHaveBeenCalledTimes(1);
    expect(mockSolicitante.obtenerTipoPersona).toHaveBeenCalledWith(
      TIPO_PERSONA.MORAL_NACIONAL
    );
  });
  
});