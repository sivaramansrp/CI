import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoTresComponent } from './paso-tres.component';
import { Router } from '@angular/router';
import { FirmaElectronicaComponent, TramiteFolioService } from '@ng-mf/data-access-user';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';

describe('PasoTresComponent', () => {
  let component: PasoTresComponent;
  let fixture: ComponentFixture<PasoTresComponent>;
  let mockRouter: any;
  let mockTramiteFolioService: any;

  beforeEach(async () => {
    mockRouter = { navigate: jest.fn() };
    mockTramiteFolioService = {
      obtenerTramite: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [PasoTresComponent, FirmaElectronicaComponent, HttpClientTestingModule, ToastrModule.forRoot()],
      providers: [
        ToastrService,
        { provide: TramiteFolioService, useValue: mockTramiteFolioService },
        { provide: FirmaElectronicaComponent, useValue: FirmaElectronicaComponent },
        { provide: Router, useValue: mockRouter },
        { provide: TramiteFolioService, useValue: mockTramiteFolioService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PasoTresComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call obtenerTramite and navigate on valid firma', () => {
    mockTramiteFolioService.obtenerTramite.mockReturnValue(of({}));
    component.obtieneFirma('valid-firma');
    expect(mockTramiteFolioService.obtenerTramite).toHaveBeenCalledWith(19);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['servicios-extraordinarios/acuse']);
  });

  it('should not call obtenerTramite if firma is empty', () => {
    component.obtieneFirma('');
    expect(mockTramiteFolioService.obtenerTramite).not.toHaveBeenCalled();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should handle error from obtenerTramite', () => {
    const error = new Error('Service error');
    mockTramiteFolioService.obtenerTramite.mockReturnValue(throwError(() => error));
    // Spy on catchError return value (though in this code, error is just returned, not handled)
    component.obtieneFirma('valid-firma');
    expect(mockTramiteFolioService.obtenerTramite).toHaveBeenCalledWith(19);
    // Navigation should not be called on error
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });
});