import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoDosComponent } from './paso-dos.component';
import { Router } from '@angular/router';
import { ServiciosPantallaService } from '@libs/shared/data-access-user/src/core/services/31601/servicios-pantalla.service';
import { TramiteStore } from '@libs/shared/data-access-user/src/core/estados/tramite.store';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';
import { FirmaElectronicaComponent } from '@libs/shared/data-access-user/src';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrService } from 'ngx-toastr';

describe('PasoDosComponent', () => {
  let component: PasoDosComponent;
  let fixture: ComponentFixture<PasoDosComponent>;
  let mockRouter: jest.Mocked<Router>;
  let mockServiciosService: jest.Mocked<ServiciosPantallaService>;
  let mockTramiteStore: jest.Mocked<TramiteStore>;

  beforeEach(async () => {
    mockRouter = {
      navigate: jest.fn()
    } as any;

    mockServiciosService = {
      obtenerTramite: jest.fn()
    } as any;

    mockTramiteStore = {
      establecerTramite: jest.fn()
    } as any;

    await TestBed.configureTestingModule({
      declarations: [PasoDosComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: ServiciosPantallaService, useValue: mockServiciosService },
        { provide: TramiteStore, useValue: mockTramiteStore },
        { provide: ToastrService, useValue: { success: jest.fn(), error: jest.fn() } }
      ],
      imports: [FirmaElectronicaComponent,HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PasoDosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('obtieneFirma', () => {
    const mockFirma = 'test-firma';

    it('should not call services when firma is empty', () => {
      component.obtieneFirma('');

      expect(mockServiciosService.obtenerTramite).not.toHaveBeenCalled();
      expect(mockTramiteStore.establecerTramite).not.toHaveBeenCalled();
      expect(mockRouter.navigate).not.toHaveBeenCalled();
    });

    it('should handle service error gracefully', () => {
      const mockError = new Error('Test error');
      mockServiciosService.obtenerTramite.mockReturnValue(throwError(() => mockError));
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      component.obtieneFirma(mockFirma);

      expect(mockServiciosService.obtenerTramite).toHaveBeenCalled();
      expect(consoleSpy).toHaveBeenCalledWith('Error obtaining tramite:', mockError);
      consoleSpy.mockRestore();
    });
  });

  describe('ngOnDestroy', () => {
    it('should complete destroyed$ subject', () => {
      const nextSpy = jest.spyOn(component.destroyed$, 'next');
      const completeSpy = jest.spyOn(component.destroyed$, 'complete');

      component.ngOnDestroy();

      expect(nextSpy).toHaveBeenCalled();
      expect(completeSpy).toHaveBeenCalled();
    });

    it('should unsubscribe from observables', () => {
      component.obtieneFirma('test-firma');

      // Spy on the unsubscribe logic
      const nextSpy = jest.spyOn(component.destroyed$, 'next');
      const completeSpy = jest.spyOn(component.destroyed$, 'complete');

      component.ngOnDestroy();

      expect(nextSpy).toHaveBeenCalled();
      expect(completeSpy).toHaveBeenCalled();
    });
  });

  describe('Template', () => {
    it('should have a firma component or input', () => {
      // This would depend on your actual template implementation
      // For example, if you're using a component for signature capture:
      const firmaElement = fixture.debugElement.query(By.css('app-firma-captura'));
      expect(firmaElement).toBeTruthy();
    });

    it('should call obtieneFirma when firma is captured', () => {
      // This test assumes you have a way to trigger firma capture in your template
      const obtieneFirmaSpy = jest.spyOn(component, 'obtieneFirma');
      
      // Simulate firma capture event
      const firmaElement = fixture.debugElement.query(By.css('app-firma-captura'));
      firmaElement.triggerEventHandler('firmaCapturada', 'test-firma');
      
      expect(obtieneFirmaSpy).toHaveBeenCalledWith('test-firma');
    });
  });
});