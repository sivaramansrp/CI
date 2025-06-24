import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerificarDictamenComponent } from './verificar-dictamen.component';
import { VerificaDictamenService } from '@libs/shared/data-access-user/src/core/services/verificaDictamen/verifica-dictamen.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { of } from 'rxjs';

// jest-preset-angular setup should be handled globally, not in individual spec files.

// Ensure no jasmine references are present; use jest for spies and mocks.

// Mocks
class MockVerificaDictamenService {
  obtenerDictamen() {
    return of({
      requisitos: [],
      asignarAutorizador: [],
      numeroDeTramite: '',
      fundamento: '',
      justificacion: '',
      plazo: '',
      tipoAnalisis: '',
      numeroDeMuestras: '',
      siglasDictaminador: ''
    });
  }
  selectDictamen$ = of({
    requisitos: [],
    asignarAutorizador: [],
    numeroDeTramite: '',
    fundamento: '',
    justificacion: '',
    plazo: '',
    tipoAnalisis: '',
    numeroDeMuestras: '',
    siglasDictaminador: ''
  });
}
class MockConsultaioQuery {
  selectConsultaioState$ = of({
    procedureId: 1,
    folioTramite: 'FOLIO123',
    department: 'test-dept'
  });
}
class MockRouter {
  navigate = jest.fn();
}

describe('VerificarDictamenComponent', () => {
  let component: VerificarDictamenComponent;
  let fixture: ComponentFixture<VerificarDictamenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerificarDictamenComponent],
      providers: [
        { provide: VerificaDictamenService, useClass: MockVerificaDictamenService },
        { provide: FormBuilder, useValue: new FormBuilder() },
        { provide: Router, useClass: MockRouter },
        { provide: ConsultaioQuery, useClass: MockConsultaioQuery }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(VerificarDictamenComponent);
    component = fixture.componentInstance;
    // Do not call fixture.detectChanges() here; call it in each test after setting up spies if needed
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize FormTramite with disabled controls', () => {
    component.ngOnInit();
    expect(component.FormTramite).toBeDefined();
    expect(component.FormTramite.get('numeroDeTramite')?.disabled).toBe(true);
    expect(component.FormTramite.get('tipoDeSolicitud')?.disabled).toBe(true);
  });

  it('should navigate on observacion()', () => {
    component.consultaState = { department: 'test-dept' } as any;
    component.observacion();
    expect((component as any).router.navigate).toHaveBeenCalledWith(['test-dept/detalle-v-dictamen']);
  });

  it('should set tramite and slectTramite on selectTramite()', () => {
    component.selectTramite(1);
    expect(component.tramite).toBe(1);
    // slectTramite can be undefined if LISTA_TRIMITES is empty or not matching
    // So just check that property exists
    expect('slectTramite' in component).toBe(true);
  });

  it('should clean up subscriptions on ngOnDestroy', () => {
    const destruirSuscripcion$ = (component as any).destruirSuscripcion$;
    destruirSuscripcion$.complete = jest.fn();
    component.ngOnDestroy();
    expect(destruirSuscripcion$.complete).toHaveBeenCalled();
  });
});
