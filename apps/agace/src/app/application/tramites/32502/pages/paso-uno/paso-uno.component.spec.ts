import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL, PERSONA_MORAL_NACIONAL } from 'libs/shared/data-access-user/src/tramites/constantes/solicitante-constantes.enum';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PasoUnoComponent } from './paso-uno.component';
import { SolicitanteComponent, TIPO_PERSONA } from '@ng-mf/data-access-user';
import { By } from '@angular/platform-browser';

describe('PasoUnoComponent', () => {
  let component: PasoUnoComponent;
  let fixture: ComponentFixture<PasoUnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitanteComponent, HttpClientTestingModule],
      declarations: [PasoUnoComponent, ]
    }).compileComponents();

    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize persona and domicilioFiscal on ngAfterViewInit', () => {
    component.ngAfterViewInit();
    expect(component.persona).toEqual(PERSONA_MORAL_NACIONAL);
    expect(component.domicilioFiscal).toEqual(DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL);
    expect(component.solicitante.obtenerTipoPersona).toHaveBeenCalledWith(TIPO_PERSONA.MORAL_NACIONAL);
  });

  it('should select tab', () => {
    component.seleccionaTab(2);
    expect(component.indice).toBe(2);
  });

  it('should render SolicitanteComponent when indice is 1', () => {
    component.indice = 1;
    fixture.detectChanges();
    const solicitanteElement = fixture.debugElement.query(By.css('solicitante'));
    expect(solicitanteElement).toBeTruthy();
  });

  it('should render SolicitudComponent when indice is 2', () => {
    component.indice = 2;
    fixture.detectChanges();
    const solicitudElement = fixture.debugElement.query(By.css('solicitud'));
    expect(solicitudElement).toBeTruthy();
  });
});