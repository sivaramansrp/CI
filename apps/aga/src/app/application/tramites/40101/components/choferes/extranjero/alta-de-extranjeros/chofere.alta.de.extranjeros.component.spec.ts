import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChofereAltaDeExtranjerosComponent } from './chofere.alta.de.extranjeros.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { of, Subject } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Chofer40101Query } from '../../../../estado/chofer40101.query';
import { Chofer40101Service } from '../../../../estado/chofer40101.service';
import { ConsultaioQuery } from '@ng-mf/data-access-user';

// @ts-nocheck

describe('ChofereAltaDeExtranjerosComponent ngOnInit', () => {
  let component: ChofereAltaDeExtranjerosComponent;
  let fixture: ComponentFixture<ChofereAltaDeExtranjerosComponent>;
  let chofer40101QueryMock: any;
  let consultaioQueryMock: any;

  beforeEach(() => {
    chofer40101QueryMock = {
      selectSolicitud$: of({
        datosDelChoferExtranjerosAlta: [{ id: 1, nombre: 'Test' }]
      })
    };

    consultaioQueryMock = {
      selectConsultaioState$: of({
        readonly: true,
        foo: 'bar'
      })
    };

    TestBed.configureTestingModule({
      declarations: [],
      imports: [ChofereAltaDeExtranjerosComponent],
      providers: [
        BsModalService,
        { provide: Chofer40101Query, useValue: chofer40101QueryMock },
        { provide: Chofer40101Service, useValue: {} },
        { provide: ConsultaioQuery, useValue: consultaioQueryMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();

  });

  afterEach(() => {
    if (component && component.ngOnDestroy) {
      component.ngOnDestroy();
    }
    fixture.destroy();
  });

  it('should subscribe to selectSolicitud$ and set datosDelChoferExtranjeros', () => {
    fixture = TestBed.createComponent(ChofereAltaDeExtranjerosComponent);
    component = fixture.componentInstance;

    component.ngOnInit();
    expect(component.datosDelChoferExtranjeros).toEqual([{ id: 1, nombre: 'Test' }]);
  });

  it('should subscribe to selectConsultaioState$ and set datosConsulta and isReadonly if readonly is true', () => {

    consultaioQueryMock.selectConsultaioState$ = of({ readonly: true, foo: 'bar' });
    TestBed.overrideProvider(ConsultaioQuery, { useValue: consultaioQueryMock });

    fixture = TestBed.createComponent(ChofereAltaDeExtranjerosComponent);
    component = fixture.componentInstance;


    component.ngOnInit();
    expect(component.datosConsulta).toContainEqual({ readonly: true, foo: 'bar' });
    expect(component.isReadonly).toBe(true);
  });

  it('should not set datosConsulta or isReadonly if readonly is false', () => {
    consultaioQueryMock.selectConsultaioState$ = of({ readonly: false });
    // Reconfigure the provider and recreate the component to inject the updated mock
    TestBed.overrideProvider(ConsultaioQuery, { useValue: consultaioQueryMock });

    fixture = TestBed.createComponent(ChofereAltaDeExtranjerosComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    expect(component.datosConsulta).toBeUndefined();
    expect(component.isReadonly).toBe(false);
  });

  it('should unsubscribe on destroy', () => {
    jest.spyOn(component.destroy$, 'next');
    jest.spyOn(component.destroy$, 'complete');
    component.ngOnDestroy();
    expect(component.destroy$.next).toHaveBeenCalledWith(true);
    expect(component.destroy$.complete).toHaveBeenCalled();
  });
});