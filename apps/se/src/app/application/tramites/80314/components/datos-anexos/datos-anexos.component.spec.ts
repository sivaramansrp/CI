import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  Injectable,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatosAnexosComponent } from './datos-anexos.component';
import { ImmerModificacionService } from '../../service/immer-modificacion.service';
import { ToastrService } from 'ngx-toastr';
import { of as observableOf } from 'rxjs';

@Injectable()
class MockImmerModificacionService {}

@Injectable()
class MockToastrService {
  success(message?: string, title?: string): void {}
  error(message?: string, title?: string): void {}
  info(message?: string, title?: string): void {}
  warning(message?: string, title?: string): void {}
}

describe('DatosAnexosComponent', () => {
  let fixture: ComponentFixture<DatosAnexosComponent>;
  let component: {
    ngOnDestroy: () => void;
    solicitudService: { obtenerAnexo?: any };
    toastr: { error?: any };
    obteneComplimentaria: () => void;
    destroyNotifier$: { next?: any; complete?: any };
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, DatosAnexosComponent],
      declarations: [],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: ImmerModificacionService,
          useClass: MockImmerModificacionService,
        },
        ToastrService,
      ],
    })
      .overrideComponent(DatosAnexosComponent, {
        set: {
          providers: [
            {
              provide: ImmerModificacionService,
              useClass: MockImmerModificacionService,
            },
            { provide: ToastrService, useClass: MockToastrService },
          ],
        },
      })
      .compileComponents();
    fixture = TestBed.createComponent(DatosAnexosComponent);
    component = fixture.debugElement.componentInstance;
  });

  afterEach(() => {
    component.ngOnDestroy = function () {};
    fixture.destroy();
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #obteneComplimentaria()', async () => {
    component.solicitudService = component.solicitudService || {};
    component.solicitudService.obtenerAnexo = jest
      .fn()
      .mockReturnValue(observableOf({}));
    component.toastr = component.toastr || {};
    component.toastr.error = jest.fn();
    component.obteneComplimentaria();
    expect(component.solicitudService.obtenerAnexo).toHaveBeenCalled();
    expect(component.toastr.error).toHaveBeenCalled();
  });

  it('should run #ngOnDestroy()', async () => {
    component.destroyNotifier$ = component.destroyNotifier$ || {};
    component.destroyNotifier$.next = jest.fn();
    component.destroyNotifier$.complete = jest.fn();
    component.ngOnDestroy();
    expect(component.destroyNotifier$.next).toHaveBeenCalled();
    expect(component.destroyNotifier$.complete).toHaveBeenCalled();
  });
});
