import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoUnoComponent } from './paso-uno.component';
import { SolicitanteComponent, TIPO_PERSONA } from '@libs/shared/data-access-user/src';
import { Component, Input } from '@angular/core';

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
    }).compileComponents();

    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.componentInstance;
    solicitanteComponentMock = TestBed.createComponent(MockSolicitanteComponent).componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default tab index as 1', () => {
    expect(component.indice).toBe(1);
  });

  it('should call obtenerTipoPersona with MORAL_NACIONAL after view init', () => {
    const obtenerTipoPersonaSpy = jest.spyOn(solicitanteComponentMock, 'obtenerTipoPersona');
    component.solicitante = solicitanteComponentMock as any;
    component.ngAfterViewInit();
    expect(obtenerTipoPersonaSpy).toHaveBeenCalledWith(TIPO_PERSONA.MORAL_NACIONAL);
  });

  it('should update indice when seleccionaTab is called', () => {
    component.seleccionaTab(2);
    expect(component.indice).toBe(2);
  });
});
