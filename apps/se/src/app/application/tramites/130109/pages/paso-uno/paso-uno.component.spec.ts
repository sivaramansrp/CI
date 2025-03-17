import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoUnoComponent } from './paso-uno.component';
import { SolicitanteComponent, TIPO_PERSONA } from '@ng-mf/data-access-user';
import { PERSONA_MORAL_NACIONAL, DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL } from 'libs/shared/data-access-user/src/tramites/constantes/solicitante-constantes.enum';
import { By } from '@angular/platform-browser';

describe('PasoUnoComponent', () => {
  let component: PasoUnoComponent;
  let fixture: ComponentFixture<PasoUnoComponent>;

  beforeEach(async () => {
    // Create a mock of the SolicitanteComponent
    const solicitanteMock = {
      obtenerTipoPersona: jasmine.createSpy('obtenerTipoPersona')
    };

    await TestBed.configureTestingModule({
      declarations: [PasoUnoComponent],  // Declare only the component you're testing
      imports: [SolicitanteComponent],  // Import the standalone SolicitanteComponent
      providers: [
        { provide: SolicitanteComponent, useValue: solicitanteMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialize persona and domicilioFiscal correctly', () => {
    expect(component.persona).toEqual(PERSONA_MORAL_NACIONAL);
    expect(component.domicilioFiscal).toEqual(DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL);
  });

  it('should call obtenerTipoPersona with correct argument after view init', () => {
    // Get the mocked SolicitanteComponent
    const solicitanteComponent = fixture.debugElement.injector.get(SolicitanteComponent);
    component.ngAfterViewInit();
    expect(solicitanteComponent.obtenerTipoPersona).toHaveBeenCalledWith(TIPO_PERSONA.MORAL_NACIONAL);
  });

  it('should update indice when seleccionaTab is called', () => {
    component.seleccionaTab(2);
    expect(component.indice).toBe(2);
    component.seleccionaTab(1);
    expect(component.indice).toBe(1);
  });

  it('should render correct tab content based on indice', () => {
    component.indice = 1;
    fixture.detectChanges();
    const solicitanteTab = fixture.nativeElement.querySelector('li:nth-child(1)');
    expect(solicitanteTab.classList).toContain('active');

    component.indice = 2;
    fixture.detectChanges();
    const solicitudTab = fixture.nativeElement.querySelector('li:nth-child(2)');
    expect(solicitudTab.classList).toContain('active');
  });

  it('should handle invalid tab selection gracefully', () => {
    const initialIndice = component.indice;

    // Invalid index selection
    component.seleccionaTab(3);  // Invalid index, outside the range
    expect(component.indice).toBe(initialIndice);  // Should not change to an invalid index
    
    // Another invalid index selection
    component.seleccionaTab(-1); // Invalid index, outside the range
    expect(component.indice).toBe(initialIndice);  // Should still not change to an invalid index
  });

}); // End of describe block
