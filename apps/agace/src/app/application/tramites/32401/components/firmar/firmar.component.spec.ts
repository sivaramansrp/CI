import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { FirmarComponent } from './firmar.component';
import { FirmaElectronicaComponent, TramiteFolioService } from '@libs/shared/data-access-user/src';
import { TramiteStore } from '@libs/shared/data-access-user/src';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';

describe('FirmarComponent', () => {
  let component: FirmarComponent;
  let fixture: ComponentFixture<FirmarComponent>;
  let router: jest.Mocked<Router>;
  let tramiteFolioService: jest.Mocked<TramiteFolioService>;
  let tramiteStore: jest.Mocked<TramiteStore>;

  beforeEach(async () => {
    const routerMock = { navigate: jest.fn() } as Partial<jest.Mocked<Router>>;
    const tramiteFolioServiceMock = {
      obtenerTramite: jest.fn(),
    } as Partial<jest.Mocked<TramiteFolioService>>;
    const tramiteStoreMock = {
      establecerTramite: jest.fn(),
    } as Partial<jest.Mocked<TramiteStore>>;

    await TestBed.configureTestingModule({
      imports: [FirmarComponent, FirmaElectronicaComponent, HttpClientTestingModule, ToastrModule.forRoot()],
      providers: [
        ToastrService,
        { provide: Router, useValue: routerMock },
        { provide: TramiteFolioService, useValue: tramiteFolioServiceMock },
        { provide: TramiteStore, useValue: tramiteStoreMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FirmarComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router) as jest.Mocked<Router>;
    tramiteFolioService = TestBed.inject(
      TramiteFolioService
    ) as jest.Mocked<TramiteFolioService>;
    tramiteStore = TestBed.inject(TramiteStore) as jest.Mocked<TramiteStore>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set tipoPersona when obtenerTipoPersona is called', () => {
    component.obtenerTipoPersona(1);
    expect(component.tipoPersona).toBe(1);
  });

  it('should navigate and set tramite when obtieneFirma is called with a valid signature', () => {
    const mockTramite = {
      id: 1,
      descripcion: 'Test Descripcion',
      codigo: 'Test Codigo',
      data: 'mockData',
    };
    tramiteFolioService.obtenerTramite.mockReturnValue(of(mockTramite));

    fixture.detectChanges();

    component.obtieneFirma('validSignature');

    expect(tramiteFolioService.obtenerTramite).toHaveBeenCalledWith(19);
    expect(tramiteStore.establecerTramite).toHaveBeenCalledWith(
      'mockData',
      'validSignature'
    );
    expect(router.navigate).toHaveBeenCalledWith([
      'agace/registro-solicitud/acuse',
    ]);
  });

  it('should handle error when obtieneFirma is called and obtenerTramite fails', () => {
    tramiteFolioService.obtenerTramite.mockReturnValue(
      throwError(() => new Error('Error'))
    );
  
    fixture.detectChanges();
  
    component.obtieneFirma('validSignature');
  
    expect(tramiteFolioService.obtenerTramite).toHaveBeenCalledWith(19);
    expect(tramiteStore.establecerTramite).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should complete destroyed$ on ngOnDestroy', () => {
    const nextSpy = jest.spyOn(component['destroyed$'], 'next');
    const completeSpy = jest.spyOn(component['destroyed$'], 'complete');

    component.ngOnDestroy();

    expect(nextSpy).toHaveBeenCalledWith(true);
    expect(completeSpy).toHaveBeenCalled();
  });
});
