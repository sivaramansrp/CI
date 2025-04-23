import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoUnoComponent } from './paso-uno.component';
import { SolicitanteComponent } from '@libs/shared/data-access-user/src/tramites/components/solicitante/solicitante.component';
import { TIPO_PERSONA } from '@libs/shared/data-access-user/src/tramites/constantes/constantes';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('PasoUnoComponent', () => {
  let component: PasoUnoComponent;
  let fixture: ComponentFixture<PasoUnoComponent>;
  let solicitanteComponentMock: jest.Mocked<SolicitanteComponent>;

  beforeEach(async () => {
    solicitanteComponentMock = {
      obtenerTipoPersona: jest.fn(),
    } as unknown as jest.Mocked<SolicitanteComponent>;

    await TestBed.configureTestingModule({
      declarations: [PasoUnoComponent],
      providers: [
        { provide: SolicitanteComponent, useValue: solicitanteComponentMock },
      ],
      schemas: [NO_ERRORS_SCHEMA], // Ignorar plantillas y componentes hijos
    }).compileComponents();

    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería llamar a obtenerTipoPersona con TIPO_PERSONA.MORAL_NACIONAL después de inicializar la vista', () => {
    component.ngAfterViewInit();
    expect(solicitanteComponentMock.obtenerTipoPersona).toHaveBeenCalledWith(TIPO_PERSONA.MORAL_NACIONAL);
  });

  it('debería cambiar el índice del tab seleccionado al llamar a seleccionaTab', () => {
    const nuevoIndice = 2;
    component.seleccionaTab(nuevoIndice);
    expect(component.indice).toBe(nuevoIndice);
  });
});