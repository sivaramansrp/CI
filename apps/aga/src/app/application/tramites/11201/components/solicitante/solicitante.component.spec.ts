import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { of } from 'rxjs';
import { SolicitanteComponent } from './solicitante.component';
import { DatosTramiteService } from '../../services/datos-tramite.service';
import { TituloComponent } from '@ng-mf/data-access-user';
import { Tramite11201Query } from '../../../../core/queries/tramite11201.query';
import { Tramite11201Store } from '../../../../core/estados/tramites/tramite11201.store';
import { provideHttpClient } from '@angular/common/http';

describe('SolicitanteComponent', () => {
  let component: SolicitanteComponent;
  let fixture: ComponentFixture<SolicitanteComponent>;
  let datosTramiteServiceMock: any;
  let tramite11201QueryMock: any;
  let tramite11201StoreMock: any;

  beforeEach(async () => {
    datosTramiteServiceMock = {
      getDatosSolicitante: jest.fn().mockReturnValue(of({
        rfc: 'RFC123456',
        denominacion: 'Denominación Ejemplo',
        actividadEconomica: 'Actividad Económica Ejemplo',
        correoElectronico: 'correo@ejemplo.com'
      }))
    };

    tramite11201QueryMock = {
      selectSolicitud$: of({
        datosSolicitante: {
          rfc: 'RFC123456',
          denominacion: 'Denominación Ejemplo',
          actividadEconomica: 'Actividad Económica Ejemplo',
          correoElectronico: 'correo@ejemplo.com'
        }
      })
    };

    tramite11201StoreMock = {
      setDatosSolicitante: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        TituloComponent,
        SolicitanteComponent
      ],
      providers: [
        provideHttpClient(),
        FormBuilder,
        { provide: DatosTramiteService, useValue: datosTramiteServiceMock },
        { provide: Tramite11201Query, useValue: tramite11201QueryMock },
        { provide: Tramite11201Store, useValue: tramite11201StoreMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.solicitudForm).toBeDefined();
  });

  it('should emit continuarEvento on continuar', () => {
    const continuarEventoSpy = jest.spyOn(component.continuarEvento, 'emit');
    component.continuar();
    expect(continuarEventoSpy).toHaveBeenCalledWith('');
  });

  it('should complete destroyNotifier$ on ngOnDestroy', () => {
    const nextSpy = jest.spyOn(component.destroyNotifier$, 'next');
    const completeSpy = jest.spyOn(component.destroyNotifier$, 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});