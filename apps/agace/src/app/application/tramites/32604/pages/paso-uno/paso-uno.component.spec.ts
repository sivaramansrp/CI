import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasoUnoComponent } from './paso-uno.component';
import { of } from 'rxjs';
import { Component } from '@angular/core';

@Component({selector: 'solicitante', template: ''})
class MockSolicitanteComponent {}

class MockSolicitud32604Store {}
class MockConsultaioQuery {
  selectConsultaioState$ = of({ update: false });
}
class MockEmpresasComercializadorasService {
  guardarDatosFormulario() { return { pipe: () => ({ subscribe: () => {} }) }; }
}

describe('PasoUnoComponent', () => {
  let component: PasoUnoComponent;
  let fixture: ComponentFixture<PasoUnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasoUnoComponent, MockSolicitanteComponent],
      imports: [require('@angular/common').CommonModule],
      providers: [
        { provide: require('../../estados/solicitud32604.store').Solicitud32604Store, useClass: MockSolicitud32604Store },
        { provide: require('@ng-mf/data-access-user').ConsultaioQuery, useClass: MockConsultaioQuery },
        { provide: require('../../services/empresas-comercializadoras.service').EmpresasComercializadorasService, useClass: MockEmpresasComercializadorasService }
      ],
      schemas: [require('@angular/core').NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
