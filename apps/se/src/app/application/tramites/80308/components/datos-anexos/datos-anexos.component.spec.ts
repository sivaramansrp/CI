import { CUSTOM_ELEMENTS_SCHEMA, Injectable, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatosAnexosComponent } from './datos-anexos.component';
import { ModificacionSolicitudeService } from '../../services/modificacion-solicitude.service';
import { of as observableOf } from 'rxjs';

@Injectable()
class MockModificacionSolicitudeService {}


describe('DatosAnexosComponent', () => {
  let fixture !: ComponentFixture<DatosAnexosComponent>;
  let component!: DatosAnexosComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],
      declarations: [ ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        { provide: ModificacionSolicitudeService, useClass: MockModificacionSolicitudeService }
      ]
    }).overrideComponent(DatosAnexosComponent, {

      set: { providers: [{ provide: ModificacionSolicitudeService, useClass: MockModificacionSolicitudeService }] }    
    }).compileComponents();
    fixture = TestBed.createComponent(DatosAnexosComponent);
    component = fixture.debugElement.componentInstance;
  });


  it('debería ejecutar #constructor()', () => {
    expect(component).toBeTruthy();
  });

  it('debería ejecutar #ngOnInit()', () => {
    component.obteneComplimentaria = jest.fn();
    component.ngOnInit();
    expect(component.obteneComplimentaria).toHaveBeenCalled();
  });

  it('debe ejecutar #obteneComplimentaria()', () => {
    component.modificionService = component.modificionService || {};
    component.modificionService.obtenerAnexo = jest.fn().mockReturnValue(observableOf({}));
    component.obteneComplimentaria();
    expect(component.modificionService.obtenerAnexo).toHaveBeenCalled();
  });

  it('debería ejecutar #ngOnDestroy()', () => {
    component.destroyNotifier$ = component.destroyNotifier$ || {};
    component.destroyNotifier$.next = jest.fn();
    component.destroyNotifier$.complete = jest.fn();
    component.destroyNotifier$.unsubscribe = jest.fn();
    component.ngOnDestroy();
    expect(component.destroyNotifier$.next).toHaveBeenCalled();
    expect(component.destroyNotifier$.complete).toHaveBeenCalled();
    expect(component.destroyNotifier$.unsubscribe).toHaveBeenCalled();
  });

});