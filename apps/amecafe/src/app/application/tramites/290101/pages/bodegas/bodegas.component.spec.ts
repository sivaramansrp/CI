import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BodegasComponent } from '../../pages/bodegas/bodegas.component';
import { CatalogosService } from '../../servicios/catalogos.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SeccionLibQuery } from '@libs/shared/data-access-user/src';
import { SeccionLibStore } from '@libs/shared/data-access-user/src';
import { TramiteStore } from '../../estados/tramite290101.store';
import { TramiteStoreQuery } from '../../estados/tramite290101.query';
import { of } from 'rxjs';

describe('BodegasComponent', () => {
  let component: BodegasComponent;
  let fixture: ComponentFixture<BodegasComponent>;
  let catalogosServiceMock: any;
  let tramiteStoreQueryMock: any;
  let tramiteStoreMock: any;
  let seccionQueryMock: any;
  let seccionStoreMock: any;
  let routerMock: any;

  beforeEach(async () => {
    catalogosServiceMock = {
      cargarBodegaPropiaAlquilad: jest.fn().mockReturnValue(of({ code: 200, data: [] })),
      cargarEstadoCatalog: jest.fn().mockReturnValue(of({ code: 200, data: [] }))
    };

    tramiteStoreQueryMock = {
      selectSolicitudTramite$: of({ BodegasFormaState: {} })
    };

    tramiteStoreMock = {
      setBodegasTramite: jest.fn()
    };

    seccionQueryMock = {
      selectSeccionState$: of({})
    };

    seccionStoreMock = {};
    routerMock = { navigate: jest.fn() };

    await TestBed.configureTestingModule({
      declarations: [BodegasComponent],
      providers: [
        FormBuilder,
        { provide: Router, useValue: routerMock },
        { provide: CatalogosService, useValue: catalogosServiceMock },
        { provide: TramiteStoreQuery, useValue: tramiteStoreQueryMock },
        { provide: TramiteStore, useValue: tramiteStoreMock },
        { provide: SeccionLibQuery, useValue: seccionQueryMock },
        { provide: SeccionLibStore, useValue: seccionStoreMock }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BodegasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form', () => {
    expect(component.bodegaForm).toBeDefined();
    expect(component.bodegaForm.controls['razonSocial']).toBeDefined();
  });

  it('should call cargarBodegaPropiaAlquilad on init', () => {
    expect(catalogosServiceMock.cargarBodegaPropiaAlquilad).toHaveBeenCalled();
  });

  it('should call cargarEstadoCatalog on init', () => {
    expect(catalogosServiceMock.cargarEstadoCatalog).toHaveBeenCalled();
  });

  it('should navigate when seleccionaTab is called', () => {
    component.seleccionaTab(1);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/pago/cafe-exportadores/cafe-exportadores'], { queryParams: { tab: 1 } });
  });

  it('should reset form when cancelarBodega is called', () => {
    const resetSpy = jest.spyOn(component.bodegaForm, 'reset');
    component.cancelarBodega();
    expect(resetSpy).toHaveBeenCalled();
  });
});

export { BodegasComponent };
