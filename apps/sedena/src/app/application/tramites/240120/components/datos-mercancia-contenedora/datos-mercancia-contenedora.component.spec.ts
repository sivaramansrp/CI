// // @ts-nocheck

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Injectable } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of as observableOf, Subject } from 'rxjs';
import { DatosMercanciaContenedoraComponent } from './datos-mercancia-contenedora.component';
import { Tramite240120Store } from '../../estados/tramite240120Store.store';
import { Tramite240120Query } from '../../estados/tramite240120Query.query';
import { ActivatedRoute } from '@angular/router';
import { DatosSolicitudService } from '../../../../shared/services/datos-solicitud.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

@Injectable()
class MockTramite240120Store {
  updateMercanciaTablaDatos = jest.fn();
  actualizarMercanciasdatos = jest.fn();
  setModificarMercanciasDatos = jest.fn();
}

@Injectable()
class MockTramite240120Query {
  private subject = new Subject<any>();
  getmodificarMercanciaTablaDatos$ = this.subject.asObservable();
  emitValue(val: any) {
    this.subject.next(val);
  }
}

describe('DatosMercanciaContenedoraComponent', () => {
  let fixture: ComponentFixture<DatosMercanciaContenedoraComponent>;
  let component: DatosMercanciaContenedoraComponent;
  let tramiteStore: MockTramite240120Store;
  let tramiteQuery: MockTramite240120Query;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        { provide: Tramite240120Store, useClass: MockTramite240120Store },
        { provide: Tramite240120Query, useClass: MockTramite240120Query },
        DatosSolicitudService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { url: 'url', params: {}, queryParams: {}, data: {} },
            url: observableOf('url'),
            params: observableOf({}),
            queryParams: observableOf({}),
            fragment: observableOf('fragment'),
            data: observableOf({})
          }
        }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(DatosMercanciaContenedoraComponent);
    component = fixture.componentInstance;
    tramiteStore = TestBed.inject(Tramite240120Store) as unknown as MockTramite240120Store;
    tramiteQuery = TestBed.inject(Tramite240120Query) as unknown as MockTramite240120Query;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call updateMercanciaTablaDatos on the store', () => {
    const mockData = [{ descripcion: 'Test' }];
    component.updateMercanciaDetalle(mockData as any);
    expect(tramiteStore.updateMercanciaTablaDatos).toHaveBeenCalledWith(mockData);
  });

  it('should call actualizarMercanciasdatos on the store', () => {
    const mockData = [{ descripcion: 'Test2' }];
    component.actualizaExistenteEnDatosMercancias(mockData as any);
    expect(tramiteStore.actualizarMercanciasdatos).toHaveBeenCalledWith(mockData);
  });

  it('should call setModificarMercanciasDatos(null) on cancelarClickeado', () => {
    component.cancelarClickeado();
    expect(tramiteStore.setModificarMercanciasDatos).toHaveBeenCalledWith(null);
  });

  it('should update mercanciaDatos when observable emits a value', () => {
    const testValue = { descripcion: 'Mercancia' };
    tramiteQuery.emitValue(testValue);
    expect(component.mercanciaDatos).toEqual(testValue);
  });

  it('should clean up subscriptions on ngOnDestroy', () => {
    const spyNext = jest.spyOn((component as any).destroyNotifier$, 'next');
    const spyComplete = jest.spyOn((component as any).destroyNotifier$, 'complete');
    component.ngOnDestroy();
    expect(spyNext).toHaveBeenCalled();
    expect(spyComplete).toHaveBeenCalled();
  });

  it('should allow multiple ngOnDestroy calls without error', () => {
    expect(() => {
      component.ngOnDestroy();
      component.ngOnDestroy();
    }).not.toThrow();
  });
});
