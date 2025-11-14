import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoUnoComponent } from './paso-uno.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA, Component } from '@angular/core';
import { Service260702Service } from '../../../../shared/services/shared2607/service260702.service';
import { of, Subject } from 'rxjs';

/**
 * Mock component for 'solicitante' to avoid dependency errors
 */
@Component({
  selector: 'solicitante',
  template: '<div></div>',
})
class MockSolicitanteComponent {}

describe('PasoUnoComponent', () => {
  let component: PasoUnoComponent;
  let fixture: ComponentFixture<PasoUnoComponent>;
  let solicitudPermisoServiceMock: any;
  let tramite260703StoreMock: any;
  let tramite260703QueryMock: any;

  beforeEach(async () => {
    // Mock services
    solicitudPermisoServiceMock = {
      obtenerTramitesAsociados: jest.fn().mockReturnValue(of([])),
      inicializaPagoDeDerechosDatosCatalogos: jest.fn(),
      banco: [{ id: 1, descripcion: 'Banco 1' }],
    };

    tramite260703StoreMock = {
      setClaveDeReferencia: jest.fn(),
      setCadenaPagoDependencia: jest.fn(),
      setBancoseleccionado: jest.fn(),
      setLlaveDePago: jest.fn(),
      setFecPago: jest.fn(),
      setImpPago: jest.fn(),
    };

    tramite260703QueryMock = {
      selectSolicitudPermiso$: of({
        claveDeReferencia: '12345',
        cadenaPagoDependencia: 'DEPENDENCIA',
        bancoseleccionado: 1,
        llaveDePago: 'LLAVE123',
        fecPago: '2025-04-10',
        impPago: 1000,
      }),
    };

    await TestBed.configureTestingModule({
      declarations: [PasoUnoComponent, MockSolicitanteComponent,],
      imports: [ReactiveFormsModule,],
      providers: [
        FormBuilder,
        { provide: Service260702Service, useValue: solicitudPermisoServiceMock },
       
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should clean up subscriptions on ngOnDestroy', () => {
    const destroySpy = jest.spyOn(component['notificadorDestruccion$'], 'next');
    const completeSpy = jest.spyOn(component['notificadorDestruccion$'], 'complete');

    component.ngOnDestroy();

    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

});