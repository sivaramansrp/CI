import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { PasoTresComponent } from './paso-tres.component';
import { ServiciosExtraordinariosService } from '@ng-mf/data-access-user';
import { TramiteStore } from '../../../../estados/tramite.store';
import { FirmaElectronicaComponent } from "../../../../../../../../../libs/shared/data-access-user/src/tramites/components/firma-electronica/firma-electronica.component";
import { ToastrModule, ToastrService } from 'ngx-toastr';

describe('PasoTresComponent', () => {
  let component: PasoTresComponent;
  let fixture: ComponentFixture<PasoTresComponent>;
  let mockRouter: any;
  let mockServiciosExtraordinariosService: any;
  let mockTramiteStore: any;

  beforeEach(async () => {
    mockRouter = {
      navigate: jest.fn()
    };

    mockServiciosExtraordinariosService = {
      obtenerTramite: jest.fn()
    };

    mockTramiteStore = {
      establecerTramite: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: ServiciosExtraordinariosService, useValue: mockServiciosExtraordinariosService },
        { provide: TramiteStore, useValue: mockTramiteStore },
        ToastrService
      ],
      imports: [FirmaElectronicaComponent, ToastrModule.forRoot()]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasoTresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have TEXTOS defined', () => {
    expect(component.TEXTOS).toBeDefined();
  });

  it('should call obtieneFirma and navigate on success', () => {
    const mockTramite = { data: 'mockData' };
    mockServiciosExtraordinariosService.obtenerTramite.mockReturnValue(of(mockTramite));
    const firma = 'mockFirma';

    component.obtieneFirma(firma);

    expect(mockServiciosExtraordinariosService.obtenerTramite).toHaveBeenCalledWith(19);
    expect(mockTramiteStore.establecerTramite).toHaveBeenCalledWith(mockTramite.data, firma);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['servicios-extraordinarios/acuse']);
  });

  it('should handle error in obtieneFirma', () => {
    const error = new Error('Test error');
    mockServiciosExtraordinariosService.obtenerTramite.mockReturnValue(throwError(error));
    const firma = 'mockFirma';

    component.obtieneFirma(firma);

    expect(mockServiciosExtraordinariosService.obtenerTramite).toHaveBeenCalledWith(19);
    // Error handling can be tested here if there's specific logic for it
  });

  it('should not call obtieneFirma if FIRMA is empty', () => {
    component.obtieneFirma('');

    expect(mockServiciosExtraordinariosService.obtenerTramite).not.toHaveBeenCalled();
    expect(mockTramiteStore.establecerTramite).not.toHaveBeenCalled();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });
});