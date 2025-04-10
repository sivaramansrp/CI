// filepath: /d:/workspace/260906/frontend/apps/cofepris/src/app/application/tramites/260906/components/datos-establecimiento/test_datos-establecimiento.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { DatosEstablecimientoComponent } from './datos-establecimiento.component';
import { Tramite260906Store } from '../../../../estados/tramites/tramite260906.store';
import { Tramite260906Query } from '../../../../estados/queries/tramite260906.query';
import { SolicitudDatosService } from '../../services/solicitud-datos.service';
import { of } from 'rxjs';

describe('DatosEstablecimientoComponent', () => {
  let component: DatosEstablecimientoComponent;
  let fixture: ComponentFixture<DatosEstablecimientoComponent>;
  let mockTramite260906Store: Partial<Tramite260906Store>;
  let mockTramite260906Query: Partial<Tramite260906Query>;
  let mockSolicitudDatosService: Partial<SolicitudDatosService>;

  beforeEach(async () => {
    mockTramite260906Store = {
      setTipoOperacion: jest.fn(),
      setTipoOperacionJustificacion: jest.fn(),
      setRfcResponsableSanitario: jest.fn(),
      setDenominacion: jest.fn(),
      setCorreo: jest.fn(),
    };

    mockTramite260906Query = {
      selectSolicitud$: of({
        tipoOperacion: 'operacion1',
        tipoOperacionJustificacion: 'justificacion1',
        rfcResponsableSanitario: 'RFC123456',
        denominacion: 'Empresa XYZ',
        correo: 'correo@ejemplo.com',
        
      }),
    };

    mockSolicitudDatosService = {};

    await TestBed.configureTestingModule({
      declarations: [DatosEstablecimientoComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: Tramite260906Store, useValue: mockTramite260906Store },
        { provide: Tramite260906Query, useValue: mockTramite260906Query },
        { provide: SolicitudDatosService, useValue: mockSolicitudDatosService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosEstablecimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values from the state', () => {
    expect(component.forma.value).toEqual({
      tipoOperacion: 'operacion1',
      tipoOperacionJustificacion: 'justificacion1',
      rfcResponsableSanitario: 'RFC123456',
      denominacion: 'Empresa XYZ',
      correo: 'correo@ejemplo.com',
    });
  });

  it('should toggle the collapsible section', () => {
    expect(component.colapsable).toBe(true);
    component.mostrar_colapsable();
    expect(component.colapsable).toBe(false);
    component.mostrar_colapsable();
    expect(component.colapsable).toBe(true);
  });

  it('should call setTipoOperacion when the radio button value changes', () => {
    const spy = jest.spyOn(mockTramite260906Store, 'setTipoOperacion');
    component.setTipoOperacion('operacion2');
    expect(spy).toHaveBeenCalledWith('operacion2');
  });

  it('should enable all form controls when toggleFormControls is called', () => {
    component.forma.controls['tipoOperacion'].disable();
    component.forma.controls['correo'].disable();
    component.toggleFormControls();
    expect(component.forma.controls['tipoOperacion'].enabled).toBe(true);
    expect(component.forma.controls['correo'].enabled).toBe(true);
  });

  it('should call setValoresStore to update the store when a form control value changes', () => {
    const spy = jest.spyOn(mockTramite260906Store, 'setDenominacion');
    component.setValoresStore(component.forma, 'denominacion', 'setDenominacion');
    expect(spy).toHaveBeenCalledWith('Empresa XYZ');
  });

  it('should clean up subscriptions on component destroy', () => {
    const spy = jest.spyOn(component['destroyNotifier$'], 'next');
    const completeSpy = jest.spyOn(component['destroyNotifier$'], 'complete');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});