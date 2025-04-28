import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoUnoComponent } from './paso-uno.component';
import { RegistroService } from '../../services/registro.service';
import { of } from 'rxjs';
import { SharedModule, SolicitanteComponent } from '@libs/shared/data-access-user/src';
import { PERSONA_MORAL_NACIONAL, DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL } from '@libs/shared/data-access-user/src/tramites/constantes/solicitante-constantes.enum';
import { TIPO_PERSONA } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('PasoUnoComponent', () => {
  let component: PasoUnoComponent;
  let fixture: ComponentFixture<PasoUnoComponent>;
  let mockRegistroService: jest.Mocked<RegistroService>;

  beforeEach(async () => {
    mockRegistroService = {
      getCatalogoById: jest.fn().mockReturnValue(of({ data: JSON.stringify({ domicilioFiscal: { entidadFederativa: 'Test Entidad Federativa' } }) })),
    } as unknown as jest.Mocked<RegistroService>;

    await TestBed.configureTestingModule({
      declarations: [PasoUnoComponent],
      imports: [SolicitanteComponent, CommonModule, SharedModule],
      providers: [{ provide: RegistroService, useValue: mockRegistroService }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch and process entidad federativa on ngOnInit', () => {
    component.ngOnInit();
    expect(mockRegistroService.getCatalogoById).toHaveBeenCalledWith(21);
    expect(component.entidadFederativa).toBe('Test Entidad Federativa');
  });

  it('should initialize persona and domicilioFiscal on ngAfterViewInit', () => {
    const mockSolicitanteComponent = {
      obtenerTipoPersona: jest.fn(),
    } as unknown as SolicitanteComponent;

    component.solicitante = mockSolicitanteComponent;
    component.ngAfterViewInit();

    expect(component.persona).toBe(PERSONA_MORAL_NACIONAL);
    expect(component.domicilioFiscal).toBe(DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL);
    expect(mockSolicitanteComponent.obtenerTipoPersona).toHaveBeenCalledWith(TIPO_PERSONA.MORAL_NACIONAL);
  });

  it('should update indice when seleccionaTab is called', () => {
    component.seleccionaTab(2);
    expect(component.indice).toBe(2);
  });
});