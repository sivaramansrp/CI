import 'jest-preset-angular/setup-jest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoTresComponent } from './PasoTres.component';
import { Router } from '@angular/router';
import { TramiteAgaceStore } from '../../../../estados/tramite.store';
import { FirmaElectronicaComponent, TramiteFolioService } from '@libs/shared/data-access-user/src';
import { of, throwError, Subject } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';

describe('PasoTresComponent', () => {
  let component: PasoTresComponent;
  let fixture: ComponentFixture<PasoTresComponent>;
  let mockRouter: any;
  let mockTramiteStore: any;
  let mockTramiteFolioService: any;

  beforeEach(async () => {
    mockRouter = { navigate: jest.fn() };
    mockTramiteStore = { establecerTramite: jest.fn() };
    mockTramiteFolioService = { obtenerTramite: jest.fn() };

    await TestBed.configureTestingModule({
      imports: [PasoTresComponent, CommonModule, FirmaElectronicaComponent, ReactiveFormsModule, HttpClientTestingModule, ToastrModule.forRoot()],
      providers: [
        ToastrService,
        { provide: Router, useValue: mockRouter },
        { provide: TramiteAgaceStore, useValue: mockTramiteStore },
        { provide: TramiteFolioService, useValue: mockTramiteFolioService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PasoTresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should assign tipoPersona when obtenerTipoPersona is called', () => {
    component.obtenerTipoPersona(2);
    expect(component.tipoPersona).toBe(2);
  });

  it('should call establecerTramite and navigate when obtieneFirma is called with valid firma', () => {
    const tramiteMock = { data: { id: 1, name: 'test' } };
    mockTramiteFolioService.obtenerTramite.mockReturnValue(of(tramiteMock));
    component.obtieneFirma('firma123');
    expect(mockTramiteFolioService.obtenerTramite).toHaveBeenCalledWith(19);
    // establecerTramite is called asynchronously, so we need to flush microtasks
    setTimeout(() => {
      expect(mockTramiteStore.establecerTramite).toHaveBeenCalledWith(tramiteMock.data, 'firma123');
      expect(mockRouter.navigate).toHaveBeenCalledWith(['servicios-extraordinarios/acuse']);
    }, 0);
  });

  it('should not call obtenerTramite if obtieneFirma is called with empty firma', () => {
    component.obtieneFirma('');
    expect(mockTramiteFolioService.obtenerTramite).not.toHaveBeenCalled();
  });

  it('should handle error in obtieneFirma', (done) => {
    mockTramiteFolioService.obtenerTramite.mockReturnValue(
      throwError(() => new Error('error'))
    );
    component.obtieneFirma('firma123');
    setTimeout(() => {
      expect(mockTramiteStore.establecerTramite).not.toHaveBeenCalled();
      expect(mockRouter.navigate).not.toHaveBeenCalled();
      done();
    }, 0);
  });

  it('should complete destroy$ on ngOnDestroy', () => {
    const destroy$ = (component as any).destroy$ as Subject<void>;
    const nextSpy = jest.spyOn(destroy$, 'next');
    const completeSpy = jest.spyOn(destroy$, 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

});