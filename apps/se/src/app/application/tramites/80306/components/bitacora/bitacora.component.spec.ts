import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of as observableOf, throwError } from 'rxjs';
import { BitacoraComponent } from './bitacora.component';
import { ToastrService } from 'ngx-toastr';
import { ImmerModificacionService } from '../../service/immer-modificacion.service';

@Injectable()
class MockImmerModificacionService {}

@Injectable()
class MockToastrService {
  success(message?: string, title?: string): void {}
  error(message?: string, title?: string): void {}
  info(message?: string, title?: string): void {}
  warning(message?: string, title?: string): void {}
}

describe('BitacoraComponent', () => {
  let fixture: ComponentFixture<BitacoraComponent>;
  let component: { ngOnDestroy: () => void; modificionService: { obtenerBitacora?: any; }; toastr: { error?: any; }; ngOnInit: () => void; destroyNotifier$: { next?: any; unsubscribe?: any; }; };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule, BitacoraComponent ],
      declarations: [       
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        { provide: ImmerModificacionService, useClass: MockImmerModificacionService },
        ToastrService
      ]
    }).overrideComponent(BitacoraComponent, {

      set: { providers: [{ provide: ImmerModificacionService, useClass: MockImmerModificacionService },
{ provide: ToastrService, useClass: MockToastrService }] }    
    }).compileComponents();
    fixture = TestBed.createComponent(BitacoraComponent);
    component = fixture.debugElement.componentInstance;
  });

  afterEach(() => {
    component.ngOnDestroy = function() {};
    fixture.destroy();
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

it('should run #ngOnInit()', async () => {
  // Mock the service to throw an error
  component.modificionService = component.modificionService || {};
  component.modificionService.obtenerBitacora = jest.fn().mockReturnValue(throwError(() => new Error('Error occurred')));

  // Mock toastr
  component.toastr = component.toastr || {};
  component.toastr.error = jest.fn();

  // Call ngOnInit
  component.ngOnInit();

  // Assertions
  expect(component.modificionService.obtenerBitacora).toHaveBeenCalled();
  expect(component.toastr.error).toHaveBeenCalledWith('Error occurred', 'Error');
});

  it('should run #ngOnDestroy()', async () => {
    component.destroyNotifier$ = component.destroyNotifier$ || {};
    component.destroyNotifier$.next = jest.fn();
    component.destroyNotifier$.unsubscribe = jest.fn();
    component.ngOnDestroy();
    expect(component.destroyNotifier$.next).toHaveBeenCalled();
    expect(component.destroyNotifier$.unsubscribe).toHaveBeenCalled();
  });

});