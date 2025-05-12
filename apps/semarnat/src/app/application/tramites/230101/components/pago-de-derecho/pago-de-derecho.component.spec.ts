import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of, ReplaySubject, Subject } from 'rxjs';
import { PagoDeDerechoComponent } from './pago-de-derecho.component';
import { CapturaSolicitudeService } from '../../services/captura-solicitud.service';
import { MediodetransporteService } from '../../services/medio-de-transporte.service';
import { Solicitud230101Query } from '../../estados/queries/tramites230101.query';
import { Solicitud230101Store } from '../../estados/tramites/tramites230101.store';
import { ValidacionesFormularioService } from '@ng-mf/data-access-user';

describe('PagoDeDerechoComponent', () => {
  let component: PagoDeDerechoComponent;
  let fixture: ComponentFixture<PagoDeDerechoComponent>;
  let mockMedioDeTransporteService: any;
  let mockCapturaSolicitudeService: any;
  let mockSolicitudQuery: any;
  let mockSolicitudStore: any;
  let mockValidacionesService: any;

  beforeEach(() => {
    mockMedioDeTransporteService = {
      getMedioDeTransporte: jest.fn(),
    };

    mockCapturaSolicitudeService = {};

    mockSolicitudQuery = {
      selectSolicitud$: of({
        claveDeReferencia: 'REF123',
        cadenaDependencia: 'DEPENDENCIA',
        banco: 'BANCO',
        llaveDePago: 'LLAVE',
        fechaPago: '2025-03-20',
        importePago: 1000,
      }),
    };

    mockSolicitudStore = {
      set: jest.fn(),
    };

    mockValidacionesService = {
      isValid: jest.fn(() => true),
    };

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [PagoDeDerechoComponent],
      providers: [
        FormBuilder,
        { provide: CapturaSolicitudeService, useValue: mockCapturaSolicitudeService },
        { provide: MediodetransporteService, useValue: mockMedioDeTransporteService },
        { provide: Solicitud230101Query, useValue: mockSolicitudQuery },
        { provide: Solicitud230101Store, useValue: mockSolicitudStore },
        { provide: ValidacionesFormularioService, useValue: mockValidacionesService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PagoDeDerechoComponent);
    component = fixture.componentInstance;
  });
});
