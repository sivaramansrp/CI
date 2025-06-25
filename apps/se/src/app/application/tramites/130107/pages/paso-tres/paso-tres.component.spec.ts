import { TestBed, ComponentFixture } from '@angular/core/testing';
import { PasoTresComponent } from './paso-tres.component';
import { Router } from '@angular/router';
import { ImportacionesAgropecuariasService } from '../../services/importaciones-agropecuarias.service';
import { TramiteFolioStore } from '@libs/shared/data-access-user/src';
import { of, Subject, throwError } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('PasoTresComponent', () => {
  let component: PasoTresComponent;
  let fixture: ComponentFixture<PasoTresComponent>;
  let routerMock: jest.Mocked<Router>;
  let importacionesSvcMock: jest.Mocked<ImportacionesAgropecuariasService>;
  let tramiteStoreMock: jest.Mocked<TramiteFolioStore>;

  beforeEach(async () => {
    routerMock = {
      navigate: jest.fn(),
    } as unknown as jest.Mocked<Router>;

    importacionesSvcMock = {
      obtenerTramite: jest.fn(),
    } as unknown as jest.Mocked<ImportacionesAgropecuariasService>;

    tramiteStoreMock = {
      establecerTramite: jest.fn(),
    } as unknown as jest.Mocked<TramiteFolioStore>;

    await TestBed.configureTestingModule({
      declarations: [PasoTresComponent],
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: ImportacionesAgropecuariasService, useValue: importacionesSvcMock },
        { provide: TramiteFolioStore, useValue: tramiteStoreMock },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(PasoTresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe manejar errores en obtieneFirma correctamente', () => {
    importacionesSvcMock.obtenerTramite.mockReturnValue(throwError(() => new Error('Error fetching trámite')));

    component.obtieneFirma('valid-firma');

    expect(importacionesSvcMock.obtenerTramite).toHaveBeenCalledWith(19);
    expect(tramiteStoreMock.establecerTramite).not.toHaveBeenCalled();
    expect(routerMock.navigate).not.toHaveBeenCalled();
  });

  it('no debe llamar obtieneFirma si firma está vacía', () => {
    component.obtieneFirma('');

    expect(importacionesSvcMock.obtenerTramite).not.toHaveBeenCalled();
    expect(tramiteStoreMock.establecerTramite).not.toHaveBeenCalled();
    expect(routerMock.navigate).not.toHaveBeenCalled();
  });

  it('debe limpiar las suscripciones en ngOnDestroy', () => {
    const destroyedSpy = jest.spyOn(component['destroyed$'], 'next');
    const completeSpy = jest.spyOn(component['destroyed$'], 'complete');

    component.ngOnDestroy();

    expect(destroyedSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
