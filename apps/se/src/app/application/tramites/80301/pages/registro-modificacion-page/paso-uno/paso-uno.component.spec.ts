import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoUnoComponent } from './paso-uno.component';
import { Component } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

// Componentes mockeados
@Component({ selector: 'solicitante', template: '' })
class MockSolicitante {}

@Component({ selector: 'app-modificacion', template: '' })
class MockModificacion {}

@Component({ selector: 'app-bitacora', template: '' })
class MockBitacora {}

fdescribe('PasoUnoComponent', () => {
  let component: PasoUnoComponent;
  let fixture: ComponentFixture<PasoUnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        PasoUnoComponent,
        MockSolicitante,
        MockModificacion,
        MockBitacora
      ],
      imports: [HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debería iniciar con la pestaña Solicitante activa (índice = 1)', () => {
    expect(component.indice).toBe(1);
  });

  it('debería cambiar a la pestaña Modificación (índice = 2)', () => {
    component.seleccionaTab(2);
    expect(component.indice).toBe(2);
  });

  it('debería cambiar a la pestaña Bitácora (índice = 3)', () => {
    component.seleccionaTab(3);
    expect(component.indice).toBe(3);
  });
});
