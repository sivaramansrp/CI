import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosComponent } from './datos.component';
import { TIPO_PERSONA } from '@libs/shared/data-access-user/src';
import { of, Subject } from 'rxjs';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { Solicitud150101Store } from '../../estados/solicitud150101.store';
import { SolicitudService } from '../../services/registro-solicitud-anual.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

class MockConsultaioQuery {
  selectConsultaioState$ = of({ update: true });
}

class MockSolicitud150101Store {
  setRegistroSolicitudAnualState = jest.fn();
}

class MockSolicitudService {
  getRegistroSolicitudDatos = jest.fn(() => of({ nombre: 'Test Data' }));
}

describe('DatosComponent', () => {
  let component: DatosComponent;
  let fixture: ComponentFixture<DatosComponent>;
  let solicitudService: MockSolicitudService;
  let solicitudStore: MockSolicitud150101Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DatosComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: ConsultaioQuery, useClass: MockConsultaioQuery },
        { provide: Solicitud150101Store, useClass: MockSolicitud150101Store },
        { provide: SolicitudService, useClass: MockSolicitudService },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(DatosComponent);
    component = fixture.componentInstance;
    solicitudService = TestBed.inject(SolicitudService) as any;
    solicitudStore = TestBed.inject(Solicitud150101Store) as any;

    component.solicitante = {
      obtenerTipoPersona: jest.fn()
    } as any;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
  
  it('should update esDatosRespuesta and call store when guardarDatosFormulario is called', () => {
    component.guardarDatosFormulario();
    expect(solicitudService.getRegistroSolicitudDatos).toHaveBeenCalled();
    expect(solicitudStore.setRegistroSolicitudAnualState).toHaveBeenCalledWith({ nombre: 'Test Data' });
    expect(component.esDatosRespuesta).toBe(true);
  });

  it('should update indice when seleccionaTab is called', () => {
    component.seleccionaTab(3);
    expect(component.indice).toBe(3);
  });

  it('should set estaHabilitado when getFilaDeInformeSeleccionada is called with true', () => {
    component.getFilaDeInformeSeleccionada(true);
    expect(component.estaHabilitado).toBe(true);
  });

  it('should clean up subscriptions on destroy', () => {
    const spy = jest.spyOn(component['destroyNotifier$'], 'next');
    const completeSpy = jest.spyOn(component['destroyNotifier$'], 'complete');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});