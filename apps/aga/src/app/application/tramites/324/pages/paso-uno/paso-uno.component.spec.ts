import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoUnoComponent } from './paso-uno.component';
import { FormBuilder } from '@angular/forms';
import { SolicitanteComponent } from '@libs/shared/data-access-user/src';
import { PERSONA_MORAL_NACIONAL, DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL } from '@libs/shared/data-access-user/src/tramites/constantes/solicitante-constantes.enum';
import { TIPO_PERSONA } from '@ng-mf/data-access-user';
import { By } from '@angular/platform-browser';

describe('PasoUnoComponent', () => {
  let component: PasoUnoComponent;
  let fixture: ComponentFixture<PasoUnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasoUnoComponent],
      providers: [FormBuilder],
      imports:[SolicitanteComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize persona and domicilioFiscal in ngAfterViewInit', () => {
    const solicitanteSpy = jest.spyOn(component.solicitante, 'obtenerTipoPersona');
    component.ngAfterViewInit();
    expect(component.persona).toEqual(PERSONA_MORAL_NACIONAL);
    expect(component.domicilioFiscal).toEqual(DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL);
    expect(solicitanteSpy).toHaveBeenCalledWith(TIPO_PERSONA.MORAL_NACIONAL);
  });

  it('should update indice and emit indiceNombre in seleccionaTab', () => {
    const emitSpy = jest.spyOn(component.indiceNombre, 'emit');
    component.seleccionaTab(2);
    expect(component.indice).toBe(2);
    expect(emitSpy).toHaveBeenCalledWith(2);
  });

  it('should complete destroyed$ on ngOnDestroy', () => {
    const nextSpy = jest.spyOn(component.destroyed$, 'next');
    const completeSpy = jest.spyOn(component.destroyed$, 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalledWith(true);
    expect(completeSpy).toHaveBeenCalled();
  });

  it('should render the SolicitanteComponent', () => {
    const solicitanteElement = fixture.debugElement.query(By.directive(SolicitanteComponent));
    expect(solicitanteElement).toBeTruthy();
  });
});