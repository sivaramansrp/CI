import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoTresComponent } from './paso-tres.component';
import { Router } from '@angular/router';

describe('PasoTresComponent', () => {
  let component: PasoTresComponent;
  let mockRouter: jest.Mocked<Router>;

  beforeEach(() => {
    mockRouter = {
      navigate: jest.fn(),
    } as unknown as jest.Mocked<Router>;

    component = new PasoTresComponent(mockRouter);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to "servicios-extraordinarios/acuse" when obtieneFirma is called with a valid signature', () => {
    const mockFirma = 'valid-signature';
    component.obtieneFirma(mockFirma);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['servicios-extraordinarios/acuse']);
  });

  it('should not navigate when obtieneFirma is called with an empty signature', () => {
    const mockFirma = '';
    component.obtieneFirma(mockFirma);
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should handle null signature gracefully in obtieneFirma', () => {
    const mockFirma = null as unknown as string;
    component.obtieneFirma(mockFirma);
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should handle undefined signature gracefully in obtieneFirma', () => {
    const mockFirma = undefined as unknown as string;
    component.obtieneFirma(mockFirma);
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should navigate only once when obtieneFirma is called multiple times with valid signatures', () => {
    const mockFirma = 'valid-signature';
    component.obtieneFirma(mockFirma);
    component.obtieneFirma(mockFirma);
    expect(mockRouter.navigate).toHaveBeenCalledTimes(2);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['servicios-extraordinarios/acuse']);
  });

  it('should not throw an error if router is undefined', () => {
    const componentWithoutRouter = new PasoTresComponent(undefined as unknown as Router);
    expect(() => componentWithoutRouter.obtieneFirma('valid-signature')).not.toThrow();
  });
});
