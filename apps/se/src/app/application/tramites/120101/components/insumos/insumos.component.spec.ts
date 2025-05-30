import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InsumosComponent } from './insumos.component';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { SolicitudDeRegistroTplService } from '../../services/solicitud-de-registro-tpl.service';
import { ServicioDeFormularioService } from '../../services/forma-servicio/servicio-de-formulario.service';
import { Tramite120101Store } from '../../../../estados/tramites/tramite120101.store';
import { Tramite120101Query } from '../../../../estados/queries/tramite120101.query';

describe('InsumosComponent', () => {
  let component: InsumosComponent;
  let fixture: ComponentFixture<InsumosComponent>;
  let solicitudDeRegistroTplServiceMock: any;
  let servicioDeFormularioServiceMock: any;
  let tramite120101StoreMock: any;
  let tramite120101QueryMock: any;

  beforeEach(async () => {
    solicitudDeRegistroTplServiceMock = {
      obtenerDatosTablaInsumos: jest.fn().mockReturnValue(of([])),
      obtenerDatosFraccionArancelaria: jest.fn().mockReturnValue(of([])),
      obtenerDatosEstados: jest.fn().mockReturnValue(of([])),
      obtenerTablaInsumos: jest.fn().mockReturnValue(of([]))
    };

    servicioDeFormularioServiceMock = {
      registerForm: jest.fn(),
      setFormValue: jest.fn(),
      establecerTablaInsumos: jest.fn(),
      obtenerTablaInsumos: jest.fn().mockReturnValue([]),
    };

    tramite120101StoreMock = {
      setDynamicFieldValue: jest.fn(),
    };

    tramite120101QueryMock = {
      selectSolicitudDeRegistroTpl$: of({}),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, InsumosComponent],
      providers: [
        { provide: SolicitudDeRegistroTplService, useValue: solicitudDeRegistroTplServiceMock },
        { provide: ServicioDeFormularioService, useValue: servicioDeFormularioServiceMock },
        { provide: Tramite120101Store, useValue: tramite120101StoreMock },
        { provide: Tramite120101Query, useValue: tramite120101QueryMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(InsumosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call setDynamicFieldValue and setFormValue when establecerCambioDeValor is called', () => {
    const event = { campo: 'testCampo', valor: 'testValor' };

    component.establecerCambioDeValor(event);

    expect(tramite120101StoreMock.setDynamicFieldValue).toHaveBeenCalledWith(event.campo, event.valor);
    expect(servicioDeFormularioServiceMock.setFormValue).toHaveBeenCalledWith('insumosForm', {
      [event.campo]: event.valor,
    });
  });

  it('should do nothing if establecerCambioDeValor is called with null', () => {
    const setDynamicFieldValueSpy = jest.spyOn(tramite120101StoreMock, 'setDynamicFieldValue');
    const setFormValueSpy = jest.spyOn(servicioDeFormularioServiceMock, 'setFormValue');

    component.establecerCambioDeValor(null as any);

    expect(setDynamicFieldValueSpy).not.toHaveBeenCalled();
    expect(setFormValueSpy).not.toHaveBeenCalled();
  });

  it('should clean up subscriptions on ngOnDestroy', () => {
    const destroySpy = jest.spyOn(component['destroy$'], 'next');
    const completeSpy = jest.spyOn(component['destroy$'], 'complete');

    component.ngOnDestroy();

    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});