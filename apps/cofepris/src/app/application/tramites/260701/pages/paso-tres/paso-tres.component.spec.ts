import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoTresComponent } from './paso-tres.component';
import { Router } from '@angular/router';
import { CertificadosLicenciasService } from '../../services/certificados-licencias.service';
import { TramiteCofeprisStore } from '../../../../estados/tramite.store';
import { of, throwError } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('PasoTresComponent', () => {
  let component: PasoTresComponent;
  let fixture: ComponentFixture<PasoTresComponent>;
  let router: { navigate: jest.Mock };
  let certificadosSvc: { obtenerTramite: jest.Mock };
  let tramiteStore: { establecerTramite: jest.Mock };

  beforeEach(async () => {
    router = { navigate: jest.fn() };
    certificadosSvc = { obtenerTramite: jest.fn() };
    tramiteStore = { establecerTramite: jest.fn() };

    await TestBed.configureTestingModule({
      imports: [],
      declarations: [PasoTresComponent],
      providers: [
        { provide: Router, useValue: router },
        { provide: CertificadosLicenciasService, useValue: certificadosSvc },
        { provide: TramiteCofeprisStore, useValue: tramiteStore }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(PasoTresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  describe('obtieneFirma', () => {
    it('debería llamar establecerTramite y navegar si se proporciona FIRMA', (done) => {
      const tramiteData = { data: { id: 1 } };
      certificadosSvc.obtenerTramite.mockReturnValue(of(tramiteData));

      component.obtieneFirma('firma-valida');

      setTimeout(() => {
        expect(certificadosSvc.obtenerTramite).toHaveBeenCalledWith(19);
        expect(tramiteStore.establecerTramite).toHaveBeenCalledWith(tramiteData.data, 'firma-valida');
        expect(router.navigate).toHaveBeenCalledWith(['servicios-extraordinarios/acuse']);
        done();
      }, 0);
    });

    it('no debería hacer nada si FIRMA es una cadena vacía', () => {
      component.obtieneFirma('');
      expect(certificadosSvc.obtenerTramite).not.toHaveBeenCalled();
      expect(tramiteStore.establecerTramite).not.toHaveBeenCalled();
      expect(router.navigate).not.toHaveBeenCalled();
    });

    it('no debería hacer nada si FIRMA es undefined', () => {
      component.obtieneFirma(undefined as any);
      expect(certificadosSvc.obtenerTramite).not.toHaveBeenCalled();
      expect(tramiteStore.establecerTramite).not.toHaveBeenCalled();
      expect(router.navigate).not.toHaveBeenCalled();
    });

    it('no debería hacer nada si FIRMA es null', () => {
      component.obtieneFirma(null as any);
      expect(certificadosSvc.obtenerTramite).not.toHaveBeenCalled();
      expect(tramiteStore.establecerTramite).not.toHaveBeenCalled();
      expect(router.navigate).not.toHaveBeenCalled();
    });
  });

  it('debería completar destroyed$ en ngOnDestroy', () => {
    const completeSpy = jest.spyOn((component as any).destroyed$, 'complete');
    const nextSpy = jest.spyOn((component as any).destroyed$, 'next');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});