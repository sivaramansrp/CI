import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TercerosRelacionadosComponent } from './terceros-relacionados.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { of, Subject } from 'rxjs';
import { SolicitudService } from '../../services/solicitud.service';
import { Solicitud32605Store } from '../../estados/solicitud32605.store';
import { Solicitud32605Query } from '../../estados/solicitud32605.query';

describe('TercerosRelacionadosComponent', () => {
  let component: TercerosRelacionadosComponent;
  let fixture: ComponentFixture<TercerosRelacionadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TercerosRelacionadosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TercerosRelacionadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('TercerosRelacionadosComponent', () => {
    let component: TercerosRelacionadosComponent;
    let fixture: ComponentFixture<TercerosRelacionadosComponent>;
    let solicitudServiceMock: jest.Mocked<SolicitudService>;
    let solicitud32605StoreMock: jest.Mocked<Solicitud32605Store>;
    let solicitud32605QueryMock: jest.Mocked<Solicitud32605Query>;

    beforeEach(async () => {
      solicitudServiceMock = {
        conseguirRecibirNotificaciones: jest.fn(),
        conseguirEnlaceOperativoDatos: jest.fn(),
        conseguirRepresentanteLegalDatos: jest.fn(),
      } as jest.Mocked<SolicitudService>;

      solicitud32605StoreMock = {
        actualizarRfc: jest.fn(),
        actualizarNombre: jest.fn(),
        actualizarApellidoPaterno: jest.fn(),
        actualizarApellidoMaterno: jest.fn(),
        actualizarTelefono: jest.fn(),
        actualizarCorreoElectronico: jest.fn(),
        actualizarRfcTercero: jest.fn(),
        actualizarEnlaceOperativosLista: jest.fn(),
      } as jest.Mocked<Solicitud32605Store>;

      solicitud32605QueryMock = {
        selectSolicitud$: jest.fn(),
      } as jest.Mocked<Solicitud32605Query>;

      await TestBed.configureTestingModule({
        imports: [ReactiveFormsModule, HttpClientModule],
        declarations: [TercerosRelacionadosComponent],
        providers: [
          { provide: SolicitudService, useValue: solicitudServiceMock },
          { provide: Solicitud32605Store, useValue: solicitud32605StoreMock },
          { provide: Solicitud32605Query, useValue: solicitud32605QueryMock },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(TercerosRelacionadosComponent);
      component = fixture.componentInstance;
      solicitud32605QueryMock.selectSolicitud$.mockReturnValue(
        of({
          idPersonaSolicitud: 1,
          rfcTercero: 'RFC123',
          rfc: 'RFC456',
          nombre: 'John',
          apellidoPaterno: 'Doe',
          apellidoMaterno: 'Smith',
          telefono: '1234567890',
          correoElectronico: 'test@example.com',
          enlaceOperativosLista: [],
        }) as any
      );
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize the form on ngOnInit', () => {
      expect(component.tercerosRelacionadosForm.value).toEqual({
        idPersonaSolicitud: 1,
        rfcTercero: 'RFC123',
        rfc: 'RFC456',
        nombre: 'John',
        apellidoPaterno: 'Doe',
        apellidoMaterno: 'Smith',
        telefono: '1234567890',
        correoElectronico: 'test@example.com',
      });
    });

    it('should call conseguirRecibirNotificaciones on init', () => {
      solicitudServiceMock.conseguirRecibirNotificaciones.mockReturnValue(of([]));
      component.conseguirRecibirNotificaciones();
      expect(solicitudServiceMock.conseguirRecibirNotificaciones).toHaveBeenCalled();
      expect(component.orecibirNotificacionesLista).toEqual([]);
    });

    it('should call conseguirEnlaceOperativoDatos on init', () => {
      solicitudServiceMock.conseguirEnlaceOperativoDatos.mockReturnValue(of([]));
      component.conseguirEnlaceOperativoDatos();
      expect(solicitudServiceMock.conseguirEnlaceOperativoDatos).toHaveBeenCalled();
      expect(component.enlaceOperativosLista).toEqual([]);
    });

    it('should update store on actualizarRfcTercero', () => {
      const event = { target: { value: 'RFC789' } } as any;
      component.actualizarRfcTercero(event);
      expect(solicitud32605StoreMock.actualizarRfcTercero).toHaveBeenCalledWith('RFC789');
    });

    it('should update store on actualizarTelefono', () => {
      const event = { target: { value: '9876543210' } } as any;
      component.actualizarTelefono(event);
      const event = { target: { value: 'new@example.com' } } as any;
      component.actualizarCorreoElectronico(event);
      expect(solicitud32605StoreMock.actualizarCorreoElectronico).toHaveBeenCalledWith('new@example.com');
    });

    it('should clean up subscriptions on ngOnDestroy', () => {
      const destroySpy = spyOn(component['destroy$'], 'next');
      const completeSpy = spyOn(component['destroy$'], 'complete');
      component.ngOnDestroy();
      expect(destroySpy).toHaveBeenCalled();
      expect(completeSpy).toHaveBeenCalled();
    });
  });
});
