import { TestBed } from '@angular/core/testing';
import { BusquedaFolioComponent } from './busqueda-folio.component';
import { ServicioDeMensajesService } from '../../services/servicio-de-mensajes.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { of, Subject } from 'rxjs';
import type { ConsultaioState } from '@ng-mf/data-access-user';

describe('BusquedaFolioComponent', () => {
  let component: BusquedaFolioComponent;
  let fixture: any;
  let mockServicioDeMensajesService: jest.Mocked<ServicioDeMensajesService>;
  let mockConsultaioQuery: Partial<ConsultaioQuery>;
  let destroyNotifier$: Subject<void>;

  beforeEach(async () => {
    mockServicioDeMensajesService = {
      enviarMensaje: jest.fn(),
      establecerDatosDePermiso: jest.fn(),
      devolverFacturasMensaje$: of(false),
      mensaje$: of(false)
    } as any;

    mockConsultaioQuery = {
      selectConsultaioState$: of({
        procedureId: '',
        parameter: '',
        department: '',
        folioTramite: '',
        readonly: false,
        tramite: '',
        tramiteData: null,
        tramiteId: '',
        tramiteType: '',
        tipoDeTramite: '',
        estadoDeTramite: '',
        create: null,
        update: null,
        consultaioSolicitante: null
      } as unknown as ConsultaioState)
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [BusquedaFolioComponent],
      providers: [
        FormBuilder,
        { provide: ServicioDeMensajesService, useValue: mockServicioDeMensajesService },
        { provide: ConsultaioQuery, useValue: mockConsultaioQuery }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BusquedaFolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize montoACancelarForm with required and pattern validators', () => {
    component.establecerMontoACancelarForm();
    const control = component.montoACancelarForm.get('monto');
    control?.setValue('');
    expect(control?.valid).toBe(false);
    control?.setValue('abc');
    expect(control?.valid).toBe(false);
    control?.setValue('123');
    expect(control?.valid).toBe(true);
  });

  it('should mark all as touched and not emit messages if montoACancelarForm is invalid', () => {
    component.establecerMontoACancelarForm();
    const markAllAsTouchedSpy = jest.spyOn(component.montoACancelarForm, 'markAllAsTouched');
    component.montoACancelarForm.get('monto')?.setValue('');
    component.agregarSelect(new Event('submit'));
    expect(markAllAsTouchedSpy).toHaveBeenCalled();
    expect(mockServicioDeMensajesService.enviarMensaje).not.toHaveBeenCalledWith(false);
  });

  it('should emit messages if montoACancelarForm is valid in agregarSelect', () => {
    component.establecerMontoACancelarForm();
    component.montoACancelarForm.get('monto')?.setValue('123');
    component.agregarSelect(new Event('submit'));
    expect(mockServicioDeMensajesService.enviarMensaje).toHaveBeenCalledWith(false);
    expect(mockServicioDeMensajesService.establecerDatosDePermiso).toHaveBeenCalledWith(true);
  });

  it('should emit messages in agregar', () => {
    component.agregar(new Event('click'));
    expect(mockServicioDeMensajesService.enviarMensaje).toHaveBeenCalledWith(false);
    expect(mockServicioDeMensajesService.establecerDatosDePermiso).toHaveBeenCalledWith(true);
  });

  it('should emit message in cancelar', () => {
    component.cancelar(new Event('click'));
    expect(mockServicioDeMensajesService.enviarMensaje).toHaveBeenCalledWith(false);
  });

  it('should initialize devloverForm, cantidadADevolver, and devolver in estableDevloverForm', () => {
    component.estableDevloverForm();
    expect(component.devloverForm).toBeTruthy();
    expect(component.cantidadADevolver).toBeTruthy();
    expect(component.devolver).toBeTruthy();
  });

  it('should patch value in establecerFormularioDeDetallesDe', () => {
    component.estableDevloverForm();
    const patchValueSpy = jest.spyOn(component.devloverForm, 'patchValue');
    component.establecerFormularioDeDetallesDe();
    expect(patchValueSpy).toHaveBeenCalled();
  });

  it('should clean up on ngOnDestroy', () => {
    const nextSpy = jest.spyOn(component.destroyNotifier$, 'next');
    const completeSpy = jest.spyOn(component.destroyNotifier$, 'complete');
    component.ngOnDestroy();
    expect(mockServicioDeMensajesService.establecerDatosDePermiso).toHaveBeenCalledWith(false);
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('should subscribe to devolverFacturasMensaje$ and set mostrarDevolverFacturas', () => {
    mockServicioDeMensajesService.devolverFacturasMensaje$ = of(true);
    const estableDevloverFormSpy = jest.spyOn(component, 'estableDevloverForm');
    component.ngOnInit();
    expect(component.mostrarDevolverFacturas).toBe(true);
    expect(estableDevloverFormSpy).toHaveBeenCalled();
  });

  it('should subscribe to mensaje$ and set mostrarBusqueda', () => {
    mockServicioDeMensajesService.mensaje$ = of(true);
    component.ngOnInit();
    expect(component.mostrarBusqueda).toBe(true);
  });
});
