import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosComponent } from './datos.component';
import { SolicitanteComponent } from 'libs/shared/data-access-user/src/tramites/components/solicitante/solicitante.component';
import { TIPO_PERSONA } from 'libs/shared/data-access-user/src/tramites/constantes/constantes';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
describe('DatosComponent', () => {
  let component: DatosComponent;
  let fixture: ComponentFixture<DatosComponent>;

  // Mock for SolicitanteComponent
  const solicitanteMock = {
    obtenerTipoPersona: jest.fn(),
  };

 beforeEach(async () => {
  await TestBed.configureTestingModule({
    imports: [HttpClientTestingModule], // <-- Agrega esta línea
    declarations: [DatosComponent],
    schemas: [NO_ERRORS_SCHEMA],
  }).compileComponents();

  fixture = TestBed.createComponent(DatosComponent);
  component = fixture.componentInstance;

  Object.defineProperty(component, 'solicitante', {
    value: solicitanteMock,
  });

  fixture.detectChanges();
});

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call obtenerTipoPersona with MORAL_NACIONAL in ngAfterViewInit', () => {
    // Spy on the mock method
    const spy = jest.spyOn(solicitanteMock, 'obtenerTipoPersona');

    component.ngAfterViewInit();

    expect(spy).toHaveBeenCalledWith(TIPO_PERSONA.MORAL_NACIONAL);
  });

  it('should set the index correctly when seleccionaTab is called', () => {
    component.seleccionaTab(2);

    expect(component.indice).toBe(2);
  });
});
