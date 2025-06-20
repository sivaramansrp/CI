import {
  AlertComponent,
  BtnContinuarComponent,
  SolicitanteComponent,
} from '@ng-mf/data-access-user';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FirmaElectronicaComponent } from '@ng-mf/data-access-user';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PasoCapturarSolicitudComponent } from './paso-capturar-solicitud.component';
import { WizardComponent } from '@ng-mf/data-access-user';
import { PasoUnoCsComponent } from '../paso-uno-cs/paso-uno-cs.component';
import { PasoDosComponent } from '../paso-dos/paso-dos.component';
import { PasoFirmarSolicitudComponent } from '../paso-firmar-solicitud/paso-firmar-solicitud.component';

describe('PasoCapturarSolicitudComponent', () => {
  let component: PasoCapturarSolicitudComponent;
  let fixture: ComponentFixture<PasoCapturarSolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        PasoCapturarSolicitudComponent,
        PasoUnoCsComponent,
        PasoDosComponent,
        PasoFirmarSolicitudComponent,
      ],
      imports: [
        HttpClientTestingModule,
        WizardComponent,
        FirmaElectronicaComponent,
        BtnContinuarComponent,
        AlertComponent,
        SolicitanteComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PasoCapturarSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize datosPasos correctly', () => {
    expect(component.datosPasos.nroPasos).toBe(component.pasos.length);
    expect(component.datosPasos.indice).toBe(1);
    expect(component.datosPasos.txtBtnAnt).toBe('Anterior');
    expect(component.datosPasos.txtBtnSig).toBe('Continuar');
  });

  it('should have infoAlert class set to "alert-info"', () => {
    expect(component.infoAlert).toBe('alert-info');
  });

  it('should clean up destroy$ on ngOnDestroy', () => {
    const destroy$Spy = jest.spyOn(component.destroyNotifier$, 'next');
    const completeSpy = jest.spyOn(component.destroyNotifier$, 'complete');
    component.ngOnDestroy();
    expect(destroy$Spy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

});
