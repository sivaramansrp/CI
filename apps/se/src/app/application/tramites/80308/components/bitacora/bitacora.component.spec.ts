import { TestBed } from '@angular/core/testing';
import { Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, of as observableOf, throwError } from 'rxjs';
import { BitacoraComponent } from './bitacora.component';
import { ModificacionSolicitudeService } from '../../services/modificacion-solicitude.service';

@Injectable()
class MockModificacionSolicitudeService {}

describe('BitacoraComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],
      declarations: [ ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        { provide: ModificacionSolicitudeService, useClass: MockModificacionSolicitudeService }
      ]
    }).overrideComponent(BitacoraComponent, {

      set: { providers: [{ provide: ModificacionSolicitudeService, useClass: MockModificacionSolicitudeService }] }    
    }).compileComponents();
    fixture = TestBed.createComponent(BitacoraComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('debería ejecutar #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('debería ejecutar #ngOnInit()', async () => {
    component.modificionService = component.modificionService || {};
    component.modificionService.obteberBitacora = jest.fn().mockReturnValue(observableOf({}));
    component.ngOnInit();
    expect(component.modificionService.obteberBitacora).toHaveBeenCalled();
  });

  it('debería ejecutar #ngOnDestroy()', async () => {
    component.destroyNotifier$ = component.destroyNotifier$ || {};
    component.destroyNotifier$.next = jest.fn();
    component.destroyNotifier$.unsubscribe = jest.fn();
    component.ngOnDestroy();
    expect(component.destroyNotifier$.next).toHaveBeenCalled();
    expect(component.destroyNotifier$.unsubscribe).toHaveBeenCalled();
  });

});