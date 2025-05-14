import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { PagoDeDerechoComponent } from './pago-de-derecho.component';
import { Tramite230201Query } from '../../estados/tramite230201.query';
import { Tramite230201Store } from '../../estados/tramite230201.store';
import { ValidacionesFormularioService } from '@ng-mf/data-access-user';
import { MediodetransporteService } from '../../services/medio-de-transporte.service';

describe('PagoDeDerechoComponent', () => {
  let component: PagoDeDerechoComponent;
  let fixture: ComponentFixture<PagoDeDerechoComponent>;
  let mockMedioDeTransporteService: any;
  let mockSolicitudQuery: any;
  let mockSolicitudStore: any;
  let mockValidacionesService: any;

  beforeEach(() => {
    mockMedioDeTransporteService = {
      getMedioDeTransporte: jest.fn(),
    };

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
        { provide: MediodetransporteService, useValue: mockMedioDeTransporteService },
        { provide: Tramite230201Query, useValue: mockSolicitudQuery },
        { provide: Tramite230201Store, useValue: mockSolicitudStore },
        { provide: ValidacionesFormularioService, useValue: mockValidacionesService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PagoDeDerechoComponent);
    component = fixture.componentInstance;
  });
});
