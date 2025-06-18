import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoUnoComponent } from './paso-uno.component';
import { SolicitanteComponent } from '@ng-mf/data-access-user';
import { DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL, PERSONA_MORAL_NACIONAL, TIPO_PERSONA } from '@ng-mf/data-access-user';
import { NO_ERRORS_SCHEMA } from '@angular/core';
describe('PasoUnoComponent', () => {
  let component: PasoUnoComponent;
  let fixture: ComponentFixture<PasoUnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasoUnoComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize persona with PERSONA_MORAL_NACIONAL after view initialization', () => {
    component.ngAfterViewInit();
    expect(component.persona).toEqual(PERSONA_MORAL_NACIONAL);
  });
  it('should initialize persona with PERSONA_MORAL_NACIONAL after view initialization', () => {
    component.solicitante = {
      obtenerTipoPersona: jest.fn(),
    } as unknown as SolicitanteComponent;
    component.ngAfterViewInit();
    expect(component.persona).toEqual(PERSONA_MORAL_NACIONAL);
  });

  it('should initialize domicilioFiscal with DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL after view initialization', () => {
    component.solicitante = {
      obtenerTipoPersona: jest.fn(),
    } as unknown as SolicitanteComponent;
    component.ngAfterViewInit();
    expect(component.domicilioFiscal).toEqual(DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL);
  });

  it('should call solicitante.obtenerTipoPersona with TIPO_PERSONA.MORAL_NACIONAL after view initialization', () => {
    component.solicitante = {
      obtenerTipoPersona: jest.fn(),
    } as unknown as SolicitanteComponent;
    component.ngAfterViewInit();
    expect(component.solicitante.obtenerTipoPersona).toHaveBeenCalledWith(TIPO_PERSONA.MORAL_NACIONAL);
  });
  it('should initialize persona and domicilioFiscal as empty arrays by default', () => {
    component.solicitante = undefined as any;
    expect(component.persona).toEqual([]);
    expect(component.domicilioFiscal).toEqual([]);
  });

  it('should initialize persona and domicilioFiscal as empty arrays by default', () => {
    expect(component.persona).toEqual([]);
    expect(component.domicilioFiscal).toEqual([]);
  });
});