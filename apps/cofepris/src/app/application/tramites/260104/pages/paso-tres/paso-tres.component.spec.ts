import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoTresComponent } from './paso-tres.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrModule, ToastrService, provideToastr } from 'ngx-toastr';
import { FirmaElectronicaComponent } from '@libs/shared/data-access-user/src';
import { of, Subject } from 'rxjs';

describe('PasoTresComponent', () => {
  let component: PasoTresComponent;
  let fixture: ComponentFixture<PasoTresComponent>;
  let mockServiciosPantallaService: any;
  let mockTramiteCofeprisStore: any;
  let mockRouter: any;

  beforeEach(async () => {
    mockServiciosPantallaService = {
      obtenerTramite: jest.fn().mockReturnValue(of({ data: 'tramite-data' })),
    };
    mockTramiteCofeprisStore = {
      establecerTramite: jest.fn(),
    };
    mockRouter = {
      navigate: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ToastrModule.forRoot(), FirmaElectronicaComponent],
      declarations: [PasoTresComponent],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { params: {}, queryParams: {} } } },
        { provide: 'ServiciosPantallaService', useValue: mockServiciosPantallaService },
        { provide: 'TramiteCofeprisStore', useValue: mockTramiteCofeprisStore },
        { provide: Router, useValue: mockRouter },
        provideToastr({ positionClass: 'toast-top-right' }),
      ],
    })
      .overrideComponent(PasoTresComponent, {
        set: {
          providers: [
            { provide: Router, useValue: mockRouter },
            { provide: 'ServiciosPantallaService', useValue: mockServiciosPantallaService },
            { provide: 'TramiteCofeprisStore', useValue: mockTramiteCofeprisStore },
          ],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(PasoTresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crearse', () => {
    expect(component).toBeTruthy();
  });

  it('debe llamar a los servicios y navegar cuando obtieneFirma recibe una firma válida', () => {
    component['serviciosExtraordinariosServices'] = mockServiciosPantallaService;
    component['TramiteCofeprisStore'] = mockTramiteCofeprisStore;
    component['router'] = mockRouter;

    component.obtieneFirma('firma-valida');

    expect(mockServiciosPantallaService.obtenerTramite).toHaveBeenCalledWith(19);
    expect(mockTramiteCofeprisStore.establecerTramite).toHaveBeenCalledWith('tramite-data', 'firma-valida');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['servicios-extraordinarios/acuse']);
  });

  it('no debe llamar a los servicios si obtieneFirma recibe una firma vacía', () => {
    component['serviciosExtraordinariosServices'] = mockServiciosPantallaService;
    component['TramiteCofeprisStore'] = mockTramiteCofeprisStore;
    component['router'] = mockRouter;

    component.obtieneFirma('');

    expect(mockServiciosPantallaService.obtenerTramite).not.toHaveBeenCalled();
    expect(mockTramiteCofeprisStore.establecerTramite).not.toHaveBeenCalled();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });
});
