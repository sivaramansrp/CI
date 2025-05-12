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
import { Chofer40103Service } from '../../estados/chofer40103.service';
import { Chofer40103Store } from '../../estados/chofer40103.store';
import { Chofer40103Query } from '../../estados/chofer40103.query';
import { of, throwError } from 'rxjs';

@Injectable()
class MockChofer40103Store {
  setUnidadesdeArrastre = jest.fn();
}

@Injectable()
class MockChofer40103Service {
  getTipoVehiculoArrastreAGA = jest.fn().mockReturnValue(of([]));
  getPaisEmisor = jest.fn().mockReturnValue(of([]));
  getcolorAGA = jest.fn().mockReturnValue(of([]));
}

@Injectable()
class MockChofer40103Query {
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
  let choferService: Chofer40103Service;
  let choferStore: Chofer40103Store;
  let choferQuery: Chofer40103Query;
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
        { provide: Chofer40103Service, useClass: MockChofer40103Service },
        { provide: Chofer40103Store, useClass: MockChofer40103Store },
        { provide: Chofer40103Query, useClass: MockChofer40103Query },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(VehiculosComponent);
    component = fixture.componentInstance;
    choferService = TestBed.inject(Chofer40103Service);
    choferStore = TestBed.inject(Chofer40103Store);
    choferQuery = TestBed.inject(Chofer40103Query);
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
