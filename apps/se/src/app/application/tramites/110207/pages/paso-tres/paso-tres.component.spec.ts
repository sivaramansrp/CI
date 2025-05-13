import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { PasoTresComponent } from './paso-tres.component';
import { ServiciosExtraordinariosService } from '@ng-mf/data-access-user';
import { TramiteStore } from '../../../../estados/tramite.store';
import { ToastrService } from 'ngx-toastr';

describe('PasoTresComponent', () => {
  let component: PasoTresComponent;
  let fixture: ComponentFixture<PasoTresComponent>;
  let mockRouter: any;
  let mockServiciosExtraordinariosService: any;
  let mockTramiteStore: any;

  beforeEach(async () => {
    mockRouter = {
      navigate: jest.fn(),
    };

    mockServiciosExtraordinariosService = {
      obtenerTramite: jest.fn(),
    };

    mockTramiteStore = {
      establecerTramite: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, PasoTresComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        {
          provide: ServiciosExtraordinariosService,
          useValue: mockServiciosExtraordinariosService,
        },
        { provide: TramiteStore, useValue: mockTramiteStore },
        ToastrService,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
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

  describe('obtieneFirma', () => {
    it('should call `obtenerTramite` and navigate to "servicios-extraordinarios/acuse" when FIRMA is valid', () => {
      const mockTramite = { data: { id: 1, name: 'Test Tramite' } };
      mockServiciosExtraordinariosService.obtenerTramite.mockReturnValue(
        of(mockTramite)
      );

      const firma = 'mockFirma';
      component.obtieneFirma(firma);

      expect(
        mockServiciosExtraordinariosService.obtenerTramite
      ).toHaveBeenCalledWith(19);
      expect(mockTramiteStore.establecerTramite).toHaveBeenCalledWith(
        mockTramite.data,
        firma
      );
      expect(mockRouter.navigate).toHaveBeenCalledWith([
        'servicios-extraordinarios/acuse',
      ]);
    });

    it('should handle errors when `obtenerTramite` fails', () => {
      const errorSpy = jest.spyOn(console, 'error').mockImplementation();
      mockServiciosExtraordinariosService.obtenerTramite.mockReturnValue(
        throwError(() => new Error('Service Error'))
      );

      const firma = 'mockFirma';
      component.obtieneFirma(firma);

      expect(
        mockServiciosExtraordinariosService.obtenerTramite
      ).toHaveBeenCalledWith(19);
      expect(errorSpy).toHaveBeenCalledWith(expect.any(Error));
    });

    it('should not call `obtenerTramite` if FIRMA is empty', () => {
      const firma = '';
      component.obtieneFirma(firma);

      expect(
        mockServiciosExtraordinariosService.obtenerTramite
      ).not.toHaveBeenCalled();
      expect(mockRouter.navigate).not.toHaveBeenCalled();
    });
  });
});
