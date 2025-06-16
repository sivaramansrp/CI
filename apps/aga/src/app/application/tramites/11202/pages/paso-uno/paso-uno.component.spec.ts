import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoUnoComponent } from './paso-uno.component';
import { DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL, PERSONA_MORAL_NACIONAL } from '@libs/shared/data-access-user/src/tramites/constantes/solicitante-constantes.enum';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { SolicitanteComponent } from '@libs/shared/data-access-user/src';

describe('PasoUnoComponent', () => {
  let component: PasoUnoComponent;
  let fixture: ComponentFixture<PasoUnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasoUnoComponent],
      imports: [SolicitanteComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });



  it('should initialize persona and domicilioFiscal after view init', () => {
    const spy = jest.spyOn(component, 'obtenerTipoPersona');
    component.ngAfterViewInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should select tab', () => {
    component.seleccionaTab(2);
    expect(component.indice).toBe(2);
  });

  it('should have default values', () => {
    expect(component.indice).toBe(1);
    expect(component.validacion).toBe(false);
  });

  it('should have @Input properties', () => {
    component.datosNroPedimento = { test: 'test' };
    expect(component.datosNroPedimento).toEqual({ test: 'test' });
  });
});