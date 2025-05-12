// @ts-nocheck
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
  Pipe,
  PipeTransform,
  Injectable,
} from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { VehiculosComponent } from './vehiculos.component';
import { Tramite40101Service } from '../../estado/tramite40101.service';
import { Tramite10301Store } from '../../../10301/estados/tramite10301.store';
import { Tramite40101Query } from '../../estado/tramite40101.query';
import { of, throwError } from 'rxjs';

@Injectable()
class MockTramite10301Store {
  setUnidadesdeArrastre = jest.fn();
}

@Injectable()
class MockTramite40101Service {
  getTipoVehiculoArrastreAGA = jest.fn().mockReturnValue(of([]));
  getPaisEmisor = jest.fn().mockReturnValue(of([]));
  getcolorAGA = jest.fn().mockReturnValue(of([]));
}

@Injectable()
class MockTramite40101Query {
  getvehiculos$ = of([]);
  getUnidadesdeArrastre$ = of([]);
}

@Pipe({ name: 'translate' })
class TranslatePipe implements PipeTransform {
  transform(value: any) {
    return value;
  }
}

describe('VehiculosComponent', () => {
  let fixture: ComponentFixture<VehiculosComponent>;
  let component: VehiculosComponent;
  let tramiteService: Tramite40101Service;
  let tramiteStore: Tramite10301Store;
  let tramiteQuery: Tramite40101Query;
  let toastr: ToastrService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VehiculosComponent, TranslatePipe],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        {
          provide: ToastrService,
          useValue: { success: jest.fn(), error: jest.fn() },
        },
        { provide: Tramite40101Service, useClass: MockTramite40101Service },
        { provide: Tramite10301Store, useClass: MockTramite10301Store },
        { provide: Tramite40101Query, useClass: MockTramite40101Query },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(VehiculosComponent);
    component = fixture.componentInstance;
    tramiteService = TestBed.inject(Tramite40101Service);
    tramiteStore = TestBed.inject(Tramite10301Store);
    tramiteQuery = TestBed.inject(Tramite40101Query);
    toastr = TestBed.inject(ToastrService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ()', () => {
    const mockFormGroup = new FormGroup({
      solicitudVehiculoVin2: new FormControl(''),
      solicitudVehiculoTipoVehiculo: new FormControl(''),
      solicitudVehiculoNumeroEconomico: new FormControl(''),
    });
  });
});
