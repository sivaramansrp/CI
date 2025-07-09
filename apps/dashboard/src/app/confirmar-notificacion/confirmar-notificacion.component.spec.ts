import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmarNotificacionComponent } from './confirmar-notificacion.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

describe('ConfirmarNotificacionComponent', () => {
  let component: ConfirmarNotificacionComponent;
  let fixture: ComponentFixture<ConfirmarNotificacionComponent>;
  let router: Router;

  beforeEach(async () => {
    const routerMock = {
      navigate: jest.fn(),
      getCurrentNavigation: jest.fn(() => undefined),
    };
    
    const toastrMock = {
      success: jest.fn(),
      error: jest.fn(),
      info: jest.fn(),
      warning: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [ConfirmarNotificacionComponent, HttpClientTestingModule],
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: ToastrService, useValue: toastrMock }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmarNotificacionComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar con indiceDePaso = 1 por defecto', () => {
    expect(component.indiceDePaso).toBe(1);
  });

  it('debería establecer indiceDePaso a 3 si el estado de navegación tiene isAcuseRecibo', () => {
    const routerMock = {
      navigate: jest.fn(),
      getCurrentNavigation: jest.fn(() => ({
        extras: { state: { isAcuseRecibo: true } }
      })),
    };
    const comp = new ConfirmarNotificacionComponent(routerMock as any);
    expect(comp.indiceDePaso).toBe(3);
  });

  it('debería mantener indiceDePaso como 1 si el estado de navegación no tiene isAcuseRecibo', () => {
    const routerMock = {
      navigate: jest.fn(),
      getCurrentNavigation: jest.fn(() => ({
        extras: { state: {} }
      })),
    };
    const comp = new ConfirmarNotificacionComponent(routerMock as any);
    expect(comp.indiceDePaso).toBe(1);
  });

  it('debería mantener indiceDePaso como 1 si getCurrentNavigation devuelve undefined', () => {
    const routerMock = {
      navigate: jest.fn(),
      getCurrentNavigation: jest.fn(() => undefined),
    };
    const comp = new ConfirmarNotificacionComponent(routerMock as any);
    expect(comp.indiceDePaso).toBe(1);
  });

  it('debería mantener indiceDePaso como 1 si el estado de navegación es undefined', () => {
    const routerMock = {
      navigate: jest.fn(),
      getCurrentNavigation: jest.fn(() => ({
        extras: {}
      })),
    };
    const comp = new ConfirmarNotificacionComponent(routerMock as any);
    expect(comp.indiceDePaso).toBe(1);
  });

  it('debería incrementar indiceDePaso cuando se llama alContinuar', () => {
    component.indiceDePaso = 1;
    component.alContinuar();
    expect(component.indiceDePaso).toBe(2);
  });

  it('debería incrementar indiceDePaso desde cualquier valor cuando se llama alContinuar', () => {
    component.indiceDePaso = 3;
    component.alContinuar();
    expect(component.indiceDePaso).toBe(4);
    
    component.indiceDePaso = 10;
    component.alContinuar();
    expect(component.indiceDePaso).toBe(11);
  });

  it('debería establecer indiceDePaso a 3 cuando se llama obtieneFirma con firma válida', () => {
    component.indiceDePaso = 1;
    component.obtieneFirma('valid-signature');
    expect(component.indiceDePaso).toBe(3);
  });

  it('debería establecer indiceDePaso a 3 cuando se llama obtieneFirma con firma vacía', () => {
    component.indiceDePaso = 2;
    component.obtieneFirma('');
    expect(component.indiceDePaso).toBe(3);
  });

  it('debería establecer indiceDePaso a 3 independientemente del valor anterior cuando se llama obtieneFirma', () => {
    component.indiceDePaso = 10;
    component.obtieneFirma('test-signature');
    expect(component.indiceDePaso).toBe(3);
  });

  it('debería llamar router.navigate cuando se llama cerrar', () => {
    component.cerrar();
    expect(router.navigate).toHaveBeenCalledWith(['/bandeja-de-tareas-pendientes']);
  });

  it('debería llamar router.navigate exactamente una vez cuando se llama cerrar múltiples veces', () => {
    component.cerrar();
    component.cerrar();
    expect(router.navigate).toHaveBeenCalledTimes(2);
    expect(router.navigate).toHaveBeenCalledWith(['/bandeja-de-tareas-pendientes']);
  });

  describe('Renderizado de Plantilla', () => {
    it('debería renderizar título y botón continuar cuando indiceDePaso es 1', () => {
      component.indiceDePaso = 1;
      fixture.detectChanges();
      
      const compiled = fixture.nativeElement as HTMLElement;
      const continueButton = compiled.querySelector('button[type="button"]');
      expect(continueButton).toBeTruthy();
      expect(continueButton?.textContent?.trim()).toBe('Continuar');
    });

    it('debería renderizar botón cerrar cuando indiceDePaso es 3', () => {
      component.indiceDePaso = 3;
      fixture.detectChanges();
      
      const compiled = fixture.nativeElement as HTMLElement;
      const closeButton = compiled.querySelector('button.btn-danger');
      expect(closeButton).toBeTruthy();
      expect(closeButton?.textContent?.trim()).toBe('Cerrar');
    });

    it('debería llamar alContinuar cuando se hace clic en el botón continuar', () => {
      component.indiceDePaso = 1;
      fixture.detectChanges();
      
      const spy = jest.spyOn(component, 'alContinuar');
      const compiled = fixture.nativeElement as HTMLElement;
      const continueButton = compiled.querySelector('button[type="button"]') as HTMLButtonElement;
      
      continueButton.click();
      expect(spy).toHaveBeenCalled();
    });

    it('debería llamar cerrar cuando se hace clic en el botón cerrar', () => {
      component.indiceDePaso = 3;
      fixture.detectChanges();
      
      const spy = jest.spyOn(component, 'cerrar');
      const compiled = fixture.nativeElement as HTMLElement;
      const closeButton = compiled.querySelector('button.btn-danger') as HTMLButtonElement;
      
      closeButton.click();
      expect(spy).toHaveBeenCalled();
    });

    it('debería mostrar contenido diferente basado en el valor de indiceDePaso', () => {
      component.indiceDePaso = 1;
      fixture.detectChanges();
      let compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('button')?.textContent?.trim()).toBe('Continuar');
      
      component.indiceDePaso = 3;
      fixture.detectChanges();
      compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('button.btn-danger')?.textContent?.trim()).toBe('Cerrar');
    });

    it('no debería renderizar botones Continuar o Cerrar cuando indiceDePaso es 2', () => {
      component.indiceDePaso = 2;
      fixture.detectChanges();
      
      const compiled = fixture.nativeElement as HTMLElement;
      const continueButton = compiled.querySelector('button[name="eliminarMercancias"].btn-primary');
      const closeButton = compiled.querySelector('button[name="eliminarMercancias"].btn-danger');
      expect(continueButton).toBeNull();
      expect(closeButton).toBeNull();
    });

    it('debería tener las clases de botón correctas', () => {
      component.indiceDePaso = 1;
      fixture.detectChanges();
      
      const compiled = fixture.nativeElement as HTMLElement;
      const continueButton = compiled.querySelector('button');
      expect(continueButton?.classList.contains('btn')).toBe(true);
      expect(continueButton?.classList.contains('btn-primary')).toBe(true);
      
      component.indiceDePaso = 3;
      fixture.detectChanges();
      
      const closeButton = compiled.querySelector('button');
      expect(closeButton?.classList.contains('btn')).toBe(true);
      expect(closeButton?.classList.contains('btn-danger')).toBe(true);
    });
  });

  describe('Casos Límite', () => {
    it('debería manejar firma null en obtieneFirma', () => {
      component.indiceDePaso = 1;
      component.obtieneFirma(null as any);
      expect(component.indiceDePaso).toBe(3);
    });

    it('debería manejar firma undefined en obtieneFirma', () => {
      component.indiceDePaso = 2;
      component.obtieneFirma(undefined as any);
      expect(component.indiceDePaso).toBe(3);
    });

    it('debería manejar estado de navegación con extras null', () => {
      const routerMock = {
        navigate: jest.fn(),
        getCurrentNavigation: jest.fn(() => ({
          extras: null
        })),
      };
      expect(() => new ConfirmarNotificacionComponent(routerMock as any)).toThrow();
    });

    it('debería manejar navegación con propiedad extras faltante', () => {
      const routerMock = {
        navigate: jest.fn(),
        getCurrentNavigation: jest.fn(() => ({})),
      };
      expect(() => new ConfirmarNotificacionComponent(routerMock as any)).toThrow();
    });
  });
});
