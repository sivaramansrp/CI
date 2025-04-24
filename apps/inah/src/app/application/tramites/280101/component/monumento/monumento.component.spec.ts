import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';
import { MonumentoComponent } from './monumento.component';
import { Tramite280101Store } from '../../../../estados/tramite/tramite280101.store';
import { Tramite280101Query } from '../../../../estados/queries/tramite280101.query';
import { TablaDinamicaComponent, TituloComponent } from '@libs/shared/data-access-user/src';

describe('MonumentoComponent', () => {
  let component: MonumentoComponent;
  let fixture: ComponentFixture<MonumentoComponent>;
  let tramiteStore: jest.Mocked<Tramite280101Store>;
  let tramiteQuery: jest.Mocked<Tramite280101Query>;
  let routerMock: any;
  let activatedRouteMock: any;

  beforeEach(async () => {
    const storeMock = {
      borrorMonumentos: jest.fn(),
    };

    const queryMock = {
      selectSolicitud$: of({
        monumentoTablaDatos: [{ titulo: 'Monumento 1', epoca: 'Epoca 1', autor: 'Autor 1',material: '',
          alto: 0,
          ancho: 0,
          profundidad: '',
          fraccion: '',
          descripcionEstado: '',
          descMaterial: '',
          descFraccion: '',
          descEpoca: '' }],
      }),
    };

    routerMock = {
      navigate: jest.fn(),
    };

    activatedRouteMock = {
      snapshot: {
        paramMap: {
          get: jest.fn(),
        },
      },
    };

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [MonumentoComponent, TablaDinamicaComponent, TituloComponent],
      providers: [
        { provide: Tramite280101Store, useValue: storeMock },
        { provide: Tramite280101Query, useValue: queryMock },
        { provide: Router, useValue: routerMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock }, // Mock ActivatedRoute
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MonumentoComponent);
    tramiteStore = TestBed.inject(Tramite280101Store) as jest.Mocked<Tramite280101Store>;
    tramiteQuery = TestBed.inject(Tramite280101Query) as jest.Mocked<Tramite280101Query>;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize monumentoTablaDatos on ngOnInit', () => {
    expect(component.monumentoTablaDatos).toEqual([
      {
        titulo: 'Monumento 1',
        epoca: 'Epoca 1',
        autor: 'Autor 1',
        // Adjusted to match the actual structure
        alto: 0,
        ancho: 0,
        profundidad: '',
        fraccion: '',
        descripcionEstado: '',
        descMaterial: '',
        descFraccion: '',
        descEpoca: '',
        material: '',
      },
    ]);
  });

  it('should navigate to datos-monumento on agregar', () => {
    component.agregar();
    expect(routerMock.navigate).toHaveBeenCalledWith(['../datos-monumento'], {
      relativeTo: component.activatedRoute,
    });
  });

  it('should call borrorMonumentos and clear monumentoSeleccionLista on Borrar', () => {
    component.monumentoSeleccionLista = [
      {
        titulo: 'Monumento 1', epoca: 'Epoca 1', autor: 'Autor 1',
        material: '',
        alto: 0,
        ancho: 0,
        profundidad: '',
        fraccion: '',
        descripcionEstado: '',
        descMaterial: '',
        descFraccion: '',
        descEpoca: ''
      },
    ];
    component.Borrar();
    expect(tramiteStore.borrorMonumentos).toHaveBeenCalledWith({
      titulo: 'Monumento 1',
      epoca: 'Epoca 1',
      autor: 'Autor 1',
      material: '',
        alto: 0,
        ancho: 0,
        profundidad: '',
        fraccion: '',
        descripcionEstado: '',
        descMaterial: '',
        descFraccion: '',
        descEpoca: ''
    });
    expect(component.monumentoSeleccionLista.length).toBe(0);
  });

  it('should do nothing on Borrar if monumentoSeleccionLista is empty', () => {
    component.monumentoSeleccionLista = [];
    component.Borrar();
    expect(tramiteStore.borrorMonumentos).not.toHaveBeenCalled();
  });

  it('should clean up subscriptions on destroy', () => {
    const destroyNotifierSpy = jest.spyOn(component['destroyNotifier$'], 'next');
    const destroyNotifierCompleteSpy = jest.spyOn(component['destroyNotifier$'], 'complete');

    component.ngOnDestroy();

    expect(destroyNotifierSpy).toHaveBeenCalled();
    expect(destroyNotifierCompleteSpy).toHaveBeenCalled();
  });
});
