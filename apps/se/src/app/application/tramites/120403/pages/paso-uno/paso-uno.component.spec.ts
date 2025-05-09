import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoUnoComponent } from './paso-uno.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CuposService } from '../../services/cupos.service';
import { of } from 'rxjs';
import { SolicitanteComponent } from '@libs/shared/data-access-user/src';
import {
  PERSONA_MORAL_NACIONAL,
  DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL,
} from '@libs/shared/data-access-user/src/tramites/constantes/solicitante-constantes.enum';
import { TIPO_PERSONA } from '@ng-mf/data-access-user';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('PasoUnoComponent', () => {
  let component: PasoUnoComponent;
  let fixture: ComponentFixture<PasoUnoComponent>;
  let cuposServiceMock: any;

  beforeEach(async () => {
    cuposServiceMock = {
      obtenerCatalogoEntidades: jest.fn().mockReturnValue(of([{ id: 1, nombre: 'Entidad 1' }])),
    };

    await TestBed.configureTestingModule({
      declarations: [PasoUnoComponent],
      imports: [SolicitanteComponent,HttpClientModule],
      providers: [{ provide: CuposService, useValue: cuposServiceMock }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize persona and domicilioFiscal on ngAfterViewInit', () => {
    const solicitanteMock = {
      obtenerTipoPersona: jest.fn(),
    };
    component.solicitante = solicitanteMock as unknown as SolicitanteComponent;

    component.ngAfterViewInit();

    expect(component.persona).toEqual(PERSONA_MORAL_NACIONAL);
    expect(component.domicilioFiscal).toEqual(DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL);
    expect(component.solicitante.obtenerTipoPersona).toHaveBeenCalledWith(TIPO_PERSONA.MORAL_NACIONAL);
  });

  it('should update indice on seleccionaTab', () => {
    component.seleccionaTab(3);
    expect(component.indice).toBe(3);
  });
});