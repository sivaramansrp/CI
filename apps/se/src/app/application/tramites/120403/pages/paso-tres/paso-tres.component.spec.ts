import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { PasoTresComponent } from './paso-tres.component';
import { TramiteFolioService } from '@ng-mf/data-access-user';
import { TramiteStore } from '../../../../estados/tramite.store';

describe('PasoTresComponent', () => {
  let component: PasoTresComponent;
  let fixture: ComponentFixture<PasoTresComponent>;
  let mockRouter: any;
  let mockTramiteFolioService: any;
  let mockTramiteStore: any;

  beforeEach(async () => {
    mockRouter = {
      navigate: jest.fn(),
    };

    mockTramiteFolioService = {
      obtenerTramite: jest.fn(),
    };

    mockTramiteStore = {
      establecerTramite: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [PasoTresComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: TramiteFolioService, useValue: mockTramiteFolioService },
        { provide: TramiteStore, useValue: mockTramiteStore },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(PasoTresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('obtenerTipoPersona', () => {
    it('should set tipoPersona correctly', () => {
      const tipo = 1;
      component.obtenerTipoPersona(tipo);
      expect(component.tipoPersona).toBe(tipo);
    });
  });

  describe('obtieneFirma', () => {
    it('should call `obtenerTramite` and navigate to "servicios-extraordinarios/acuse" when FIRMA is valid', () => {
      const mockTramite = { data: { id: 1, name: 'Test Tramite' } };
      mockTramiteFolioService.obtenerTramite.mockReturnValue(of(mockTramite));

      const firma = 'mockFirma';
      component.obtieneFirma(firma);

      expect(mockTramiteFolioService.obtenerTramite).toHaveBeenCalledWith(19);
      expect(mockTramiteStore.establecerTramite).toHaveBeenCalledWith(
        mockTramite.data,
        firma
      );
      expect(mockRouter.navigate).toHaveBeenCalledWith([
        'servicios-extraordinarios/acuse',
      ]);
    });

    it('should not call `obtenerTramite` if FIRMA is empty', () => {
      const firma = '';
      component.obtieneFirma(firma);

      expect(mockTramiteFolioService.obtenerTramite).not.toHaveBeenCalled();
      expect(mockRouter.navigate).not.toHaveBeenCalled();
    });
  });

  describe('ngOnDestroy', () => {
    it('should complete the destroyed$ subject on ngOnDestroy', () => {
      const nextSpy = jest.spyOn(component['destroyed$'], 'next');
      const completeSpy = jest.spyOn(component['destroyed$'], 'complete');

      component.ngOnDestroy();

      expect(nextSpy).toHaveBeenCalledWith(true);
      expect(completeSpy).toHaveBeenCalled();
    });
  });
});