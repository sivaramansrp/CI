import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoTresComponent } from './paso-tres.component';
import { Router } from '@angular/router';
import { TramiteFolioService } from '@ng-mf/data-access-user';
import { TramiteStore } from '../../../../estados/tramite.store';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrService } from 'ngx-toastr';

describe('PasoTresComponent', () => {
  let component: PasoTresComponent;
  let fixture: ComponentFixture<PasoTresComponent>;
  let router: Router;
  let tramiteFolioService: any;
  let tramiteStore: any;

  beforeEach(async () => {
    router = { navigate: jest.fn() } as any;
    tramiteFolioService = {
      obtenerTramite: jest.fn()
    };
    tramiteStore = {
      establecerTramite: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [PasoTresComponent, HttpClientTestingModule],
      providers: [
        { provide: Router, useValue: router },
        { provide: TramiteFolioService, useValue: tramiteFolioService },
        { provide: TramiteStore, useValue: tramiteStore },
        { provide: ToastrService, useValue: { error: jest.fn(), success: jest.fn(), info: jest.fn(), warning: jest.fn() } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PasoTresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('no debe llamar a obtenerTramite si la FIRMA es falsy', () => {
    component.obtieneFirma('');
    expect(tramiteFolioService.obtenerTramite).not.toHaveBeenCalled();
  });

  it('debe manejar el error en el observable de obtenerTramite', (done) => {
    tramiteFolioService.obtenerTramite.mockReturnValue(throwError(() => new Error('fail')));
    const spy = jest.spyOn(tramiteStore, 'establecerTramite');
    component.obtieneFirma('firma');
    setTimeout(() => {
      expect(spy).not.toHaveBeenCalled();
      done();
    }, 0);
  });
});
