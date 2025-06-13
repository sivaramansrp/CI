import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoUnoComponent } from './paso-uno.component';
import { Router } from '@angular/router';
import { SolicitanteComponent } from '@libs/shared/data-access-user/src';
import { PERSONA_MORAL_NACIONAL, DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL } from '@libs/shared/data-access-user/src/tramites/constantes/solicitante-constantes.enum';
import { TIPO_PERSONA } from '@ng-mf/data-access-user';

describe('PasoUnoComponent', () => {
  let component: PasoUnoComponent;
  let fixture: ComponentFixture<PasoUnoComponent>;
  let mockRouter: any;
  let mockSolicitante: any;

  beforeEach(async () => {
    mockRouter = { navigate: jest.fn() };
    mockSolicitante = { obtenerTipoPersona: jest.fn() };

    await TestBed.configureTestingModule({
      declarations: [PasoUnoComponent],
      providers: [
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.componentInstance;
    component.solicitante = mockSolicitante;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial indice value as 1', () => {
    expect(component.indice).toBe(1);
  });

  it('should have initial persona as empty array', () => {
    expect(component.persona).toEqual([]);
  });

  it('should have initial domicilioFiscal as empty array', () => {
    expect(component.domicilioFiscal).toEqual([]);
  });

  it('should have tipoPersona as undefined initially', () => {
    expect(component.tipoPersona).toBeUndefined();
  });

  it('should set persona and domicilioFiscal in ngAfterViewInit', () => {
    component.ngAfterViewInit();
    expect(component.persona).toBe(PERSONA_MORAL_NACIONAL);
    expect(component.domicilioFiscal).toBe(DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL);
  });

  it('should call solicitante.obtenerTipoPersona with correct argument in ngAfterViewInit', () => {
    component.ngAfterViewInit();
    expect(mockSolicitante.obtenerTipoPersona).toHaveBeenCalledWith(TIPO_PERSONA.MORAL_NACIONAL);
  });

  it('seleccionaTab should update indice', () => {
    component.indice = 1;
    component.seleccionaTab(3);
    expect(component.indice).toBe(3);
  });
});