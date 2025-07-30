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
    mockRouter = { navigate: jest.fn(() => of(['servicios-extraordinarios/acuse'])) };
    mockTramiteFolioService = {
      obtenerTramite: jest.fn(() => of({})),
    };

    await TestBed.configureTestingModule({
      imports: [PasoTresComponent, FirmaElectronicaComponent, HttpClientTestingModule, ToastrModule.forRoot()],
      providers: [
        ToastrService,
        { provide: TramiteFolioService, useValue: mockTramiteFolioService },
        { provide: FirmaElectronicaComponent, useValue: FirmaElectronicaComponent },
        { provide: Router, useValue: mockRouter },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PasoTresComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not call obtenerTramite if firma is empty', () => {
    component.obtieneFirma('');
    expect(mockTramiteFolioService.obtenerTramite).not.toHaveBeenCalled();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should handle error from obtenerTramite', () => {
    const error = new Error('Service error');
    mockTramiteFolioService.obtenerTramite.mockReturnValue(throwError(() => error));
    component.obtieneFirma('valid-firma');
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });
});