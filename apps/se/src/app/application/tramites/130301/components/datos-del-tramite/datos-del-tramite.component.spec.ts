import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosDelTramiteComponent } from './datos-del-tramite.component';
import { FormBuilder } from '@angular/forms';
import { SolicitudProrrogaService } from '../../services/solicitudProrroga/solicitud-prorroga.service';
import { of } from 'rxjs';

describe('DatosDelTramiteComponent', () => {
  let component: DatosDelTramiteComponent;
  let fixture: ComponentFixture<DatosDelTramiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosDelTramiteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosDelTramiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  describe('DatosDelTramiteComponent', () => {
    let component: DatosDelTramiteComponent;
    let fixture: ComponentFixture<DatosDelTramiteComponent>;
    let mockService: Partial<SolicitudProrrogaService>;

    beforeEach(async () => {
      mockService = {
        obtenerDelTramiteFormDatos: jest.fn().mockReturnValue(of({ data: [{ numeroFolioTramiteOriginal: '12345', solicitudOpcion: 'opcion1', regimen: 'regimen1', clasificacionDelRegimen: 'clasificacion1', productoOpcion: 'producto1', descripcionMercancia: 'descripcion1', fraccionArancelaria: 'fraccion1', umt: 'umt1', cantidad: 10, valorFactura: 100 }] })),
      };

      await TestBed.configureTestingModule({
        imports: [DatosDelTramiteComponent],
        providers: [
          FormBuilder,
          { provide: SolicitudProrrogaService, useValue: mockService },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(DatosDelTramiteComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize the form with default values', () => {
      expect(component.datosDelTramite.value).toEqual({
        numeroFolioTramiteOriginal: '',
        solicitudOpcion: '',
        regimen: '',
        clasificacionDelRegimen: '',
        productoOpcion: '',
        descripcionMercancia: '',
        fraccionArancelaria: '',
        umt: '',
        cantidad: '',
        valorFactura: '',
      });
    });

    it('should call obtenerFormDatos on initialization', () => {
      const obtenerFormDatosSpy = jest.spyOn(component, 'obtenerFormDatos');
      component.ngOnInit();
      expect(obtenerFormDatosSpy).toHaveBeenCalled();
    });

    it('should populate the form with data from the service', () => {
      component.obtenerFormDatos();
      expect(component.datosDelTramite.value).toEqual({
        numeroFolioTramiteOriginal: '12345',
        solicitudOpcion: 'opcion1',
        regimen: 'regimen1',
        clasificacionDelRegimen: 'clasificacion1',
        productoOpcion: 'producto1',
        descripcionMercancia: 'descripcion1',
        fraccionArancelaria: 'fraccion1',
        umt: 'umt1',
        cantidad: 10,
        valorFactura: 100,
      });
    });

    it('should clean up observables on destroy', () => {
      const destroyNotifierSpy = jest.spyOn(component['destroyNotifier$'], 'next');
      const destroyNotifierCompleteSpy = jest.spyOn(component['destroyNotifier$'], 'complete');
      component.ngOnDestroy();
      expect(destroyNotifierSpy).toHaveBeenCalled();
      expect(destroyNotifierCompleteSpy).toHaveBeenCalled();
    });
  });
})
})