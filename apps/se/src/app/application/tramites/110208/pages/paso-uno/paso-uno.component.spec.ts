import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoUnoComponent } from './paso-uno.component';
import { SolicitanteComponent, TIPO_PERSONA } from '@libs/shared/data-access-user/src';
import { Component, Input } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-solicitante',
  template: '',
})
class MockSolicitanteComponent {
  @Input() tipoPersona: typeof TIPO_PERSONA | undefined;
  obtenerTipoPersona(tipo: typeof TIPO_PERSONA[keyof typeof TIPO_PERSONA]): void {}
}

describe('PasoUnoComponent', () => {
  let component: PasoUnoComponent;
  let fixture: ComponentFixture<PasoUnoComponent>;
  let solicitanteComponentMock: MockSolicitanteComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasoUnoComponent, MockSolicitanteComponent],
      imports: [HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA], 
    }).compileComponents();

    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.componentInstance;
    solicitanteComponentMock = TestBed.createComponent(MockSolicitanteComponent).componentInstance;
    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe inicializar con el índice de pestaña por defecto en 1', () => {
    expect(component.indice).toBe(1);
  });

  it('debe llamar a obtenerTipoPersona con MORAL_NACIONAL después de ngAfterViewInit', () => {
    const obtenerTipoPersonaSpy = jest.spyOn(solicitanteComponentMock, 'obtenerTipoPersona');
    component.solicitante = solicitanteComponentMock as any;
    component.ngAfterViewInit();
    expect(obtenerTipoPersonaSpy).toHaveBeenCalledWith(TIPO_PERSONA.MORAL_NACIONAL);
  });

  it('debe actualizar el índice cuando se llama seleccionaTab', () => {
    component.seleccionaTab(2);
    expect(component.indice).toBe(2);
  });
});
