import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoTresComponent } from './paso-tres.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideToastr, ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { TramiteFolioService } from '@libs/shared/data-access-user/src/core/services/shared/tramite-folio/tramite-folio.service';
import { TramiteStore } from '@libs/shared/data-access-user/src';
import { of } from 'rxjs';

describe('PasoTresComponent', () => {
  let component: PasoTresComponent;
  let fixture: ComponentFixture<PasoTresComponent>;
  let router: Router;
  let tramiteFolioService: TramiteFolioService;
  let tramiteStore: TramiteStore;
  
  beforeEach(async () => {
    router = { navigate: jest.fn() } as unknown as Router;
    tramiteFolioService = {
      obtenerTramite: jest.fn(),
    } as unknown as TramiteFolioService;
    tramiteStore = {
      establecerTramite: jest.fn(),
    } as unknown as TramiteStore;

    // component = new PasoTresComponent(router, tramiteFolioService, tramiteStore);
    await TestBed.configureTestingModule({
      imports: [PasoTresComponent, HttpClientTestingModule],
      providers: [
        ToastrService,
        provideToastr({
          positionClass: 'toast-top-right',
        }),
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PasoTresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call obtenerTramite, establecerTramite and navigate when FIRMA is valid', (done) => {
      const mockFirma = 'mockFirma123';
      const mockTramiteData = { data: { id: 1, name: 'Test Tramite' } };

      (tramiteFolioService.obtenerTramite as jest.Mock).mockReturnValue(of(mockTramiteData));

      component.obtieneFirma(mockFirma);

      setTimeout(() => {
        expect(tramiteFolioService.obtenerTramite).toHaveBeenCalledWith(19);
        expect(tramiteStore.establecerTramite).toHaveBeenCalledWith(mockTramiteData.data, mockFirma);
        expect(router.navigate).toHaveBeenCalledWith(['servicios-extraordinarios/acuse']);
        done();
      }, 0);
    });
});
