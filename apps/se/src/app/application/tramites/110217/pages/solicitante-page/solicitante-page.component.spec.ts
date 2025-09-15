import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitantePageComponent } from './solicitante-page.component';
import { Tramite110217Store } from '../../../../estados/tramites/tramite110217.store';
import { Tramite110217Query } from '../../../../estados/queries/tramite110217.query';
import { of } from 'rxjs';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { PasoTresComponent } from '../paso-tres/paso-tres.component';
import { provideHttpClient } from '@angular/common/http';
import { provideToastr, ToastrService } from 'ngx-toastr';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('SolicitantePageComponent', () => {
  let component: SolicitantePageComponent;
  let fixture: ComponentFixture<SolicitantePageComponent>;
  let storeMock: any;
  let queryMock: any;

  beforeEach(async () => {
    storeMock = {
      setPasoActivo: jest.fn(),
    };

    queryMock = {
      selectSolicitud$: of({
        pestanaActiva: 1,
      }),
    };

    await TestBed.configureTestingModule({
      imports: [PasoUnoComponent, PasoTresComponent, SolicitantePageComponent],
      providers: [
        ToastrService,
        provideToastr({
          positionClass: 'toast-top-right',
        }),
        provideHttpClient(),
        { provide: Tramite110217Store, useValue: storeMock },
        { provide: Tramite110217Query, useValue: queryMock },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitantePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize tramiteState on ngOnInit', () => {
    component.ngOnInit();
    expect(component.tramiteState).toEqual({ pestanaActiva: 1 });
  });

  it('should update indice on getValorIndice with "cont"', () => {
    // Mock pasoUnoComponent validation to return true
    const mockPasoUnoComponent = {
      validarTodosLosFormularios: jest.fn().mockReturnValue(true)
    };
    component.pasoUnoComponent = mockPasoUnoComponent as any;
    
    // Mock wizardComponent
    component.wizardComponent = {
      siguiente: jest.fn()
    } as any;
    
    component.getValorIndice({ accion: 'cont', valor: 2 });
    expect(component.indice).toBe(2);
    expect(storeMock.setPasoActivo).toHaveBeenCalledWith(2);
  });

  it('should update indice on getValorIndice with "atras"', () => {
    // Mock wizardComponent
    component.wizardComponent = {
      atras: jest.fn()
    } as any;
    
    component.getValorIndice({ accion: 'atras', valor: 1 });
    expect(component.indice).toBe(1);
    expect(storeMock.setPasoActivo).toHaveBeenCalledWith(1);
  });

  it('should not update indice if valor is out of range', () => {
    component.getValorIndice({ accion: 'cont', valor: 5 });
    expect(component.indice).toBe(1); // Default value
    expect(storeMock.setPasoActivo).not.toHaveBeenCalled();
  });

  it('should complete destroyNotifier$ on ngOnDestroy', () => {
    const destroyNotifierSpy = jest.spyOn(component.destroyNotifier$, 'next');
    const destroyNotifierCompleteSpy = jest.spyOn(component.destroyNotifier$, 'complete');
    component.ngOnDestroy();
    expect(destroyNotifierSpy).toHaveBeenCalled();
    expect(destroyNotifierCompleteSpy).toHaveBeenCalled();
  });
});