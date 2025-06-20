import {
  AlertComponent,
  BtnContinuarComponent,
  SeccionLibStore
} from '@ng-mf/data-access-user';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FirmaElectronicaComponent } from '@ng-mf/data-access-user';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PasoCapturarSolicitudComponent } from './paso-capturar-solicitud.component';
import { WizardComponent } from '@ng-mf/data-access-user';
import { ModalidadTerciarizaciónModule } from '../../modalidad-terciarización.module';
import { Tramite80101Query } from '../../estados/tramite80101.query';
import { Subject, of } from 'rxjs';

describe('PasoCapturarSolicitudComponent', () => {
  let component: PasoCapturarSolicitudComponent;
  let fixture: ComponentFixture<PasoCapturarSolicitudComponent>;
  const mockFormaValida$ = new Subject<boolean>();

  const mockQuery: Partial<Tramite80101Query> = {
    FormaValida$: mockFormaValida$.asObservable(),
  };

  const mockSeccion = {
    establecerSeccion: jest.fn(),
    establecerFormaValida: jest.fn(),
    _select: jest.fn(() => of({})),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasoCapturarSolicitudComponent],
      imports: [
        HttpClientTestingModule,
        WizardComponent,
        FirmaElectronicaComponent,
        BtnContinuarComponent,
        AlertComponent,
        ModalidadTerciarizaciónModule,
      ],
      providers: [
        { provide: Tramite80101Query, useValue: mockQuery },
        { provide: SeccionLibStore, useValue: mockSeccion },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PasoCapturarSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize datosPasos with correct values', () => {
    expect(component.datosPasos.nroPasos).toBe(component.pasos.length);
    expect(component.datosPasos.indice).toBe(1);
    expect(component.datosPasos.txtBtnAnt).toBe('Anterior');
    expect(component.datosPasos.txtBtnSig).toBe('Continuar');
  });

  it('should subscribe to FormaValida$ and call store setters', () => {
    mockFormaValida$.next(true);
    expect(mockSeccion.establecerSeccion).toHaveBeenCalledWith([true]);
    expect(mockSeccion.establecerFormaValida).toHaveBeenCalledWith([true]);
  });

  it('should clean up destroyNotifier$ on ngOnDestroy', () => {
    const nextSpy = jest.spyOn(component['destroyNotifier$'], 'next');
    const completeSpy = jest.spyOn(component['destroyNotifier$'], 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
