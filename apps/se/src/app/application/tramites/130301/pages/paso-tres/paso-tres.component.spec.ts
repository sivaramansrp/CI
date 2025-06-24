import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { PasoTresComponent } from './paso-tres.component';
import { ServiciosPantallaService } from '@libs/shared/data-access-user/src/core/services/31601/servicios-pantalla.service';
import { TramiteStore } from '../../../../estados/tramite.store';
import {CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('PasoTresComponent', () => {
  let component: PasoTresComponent;
  let fixture: ComponentFixture<PasoTresComponent>;
  let mockRouter: jest.Mocked<Router>;
  let mockServiciosPantallaService: jest.Mocked<ServiciosPantallaService>;
  let mockTramiteStore: jest.Mocked<TramiteStore>;

  beforeEach(async () => {
    mockRouter = {
      navigate: jest.fn(),
    } as unknown as jest.Mocked<Router>;

    mockServiciosPantallaService = {
      obtenerTramite: jest.fn(),
    } as unknown as jest.Mocked<ServiciosPantallaService>;

    mockTramiteStore = {
      establecerTramite: jest.fn(),
    } as unknown as jest.Mocked<TramiteStore>;

    await TestBed.configureTestingModule({
      declarations: [PasoTresComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: ServiciosPantallaService, useValue: mockServiciosPantallaService },
        { provide: TramiteStore, useValue: mockTramiteStore },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(PasoTresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle error when obtenerTramite fails', () => {
    const mockError = new Error('Error fetching tramite');
    mockServiciosPantallaService.obtenerTramite.mockReturnValue(throwError(() => mockError));

    component.obtieneFirma('validSignature');

    expect(mockServiciosPantallaService.obtenerTramite).toHaveBeenCalledWith(19);
    expect(mockTramiteStore.establecerTramite).not.toHaveBeenCalled();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should not call obtenerTramite if signature is empty', () => {
    component.obtieneFirma('');

    expect(mockServiciosPantallaService.obtenerTramite).not.toHaveBeenCalled();
    expect(mockTramiteStore.establecerTramite).not.toHaveBeenCalled();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should complete destroyed$ on ngOnDestroy', () => {
    const destroyedSpy = jest.spyOn((component as any).destroyed$, 'next');
    const completeSpy = jest.spyOn((component as any).destroyed$, 'complete');

    component.ngOnDestroy();

    expect(destroyedSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
