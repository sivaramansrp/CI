import { TestBed, ComponentFixture } from '@angular/core/testing';
import { of, Subject } from 'rxjs';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RepresentanteLegalComponent } from './representante-legal.component';
import { Tramite110218Store } from '../../estados/tramites/tramite110218.store';
import { Tramite110218Query } from '../../estados/queries/tramite110218.query';
import { CertificadoTecnicoJaponService } from '@libs/shared/data-access-user/src/core/services/110218/certificadoTecnicoJapon.service';

describe('RepresentanteLegalComponent', () => {
  let component: RepresentanteLegalComponent;
  let fixture: ComponentFixture<RepresentanteLegalComponent>;
  let mockStore: Partial<Tramite110218Store>;
  let mockQuery: Partial<Tramite110218Query>;
  let mockService: Partial<CertificadoTecnicoJaponService>;
  let destroyed$: Subject<void>;

  beforeEach(async () => {
    destroyed$ = new Subject<void>();

    mockStore = {
      setnombredelRepresentante: jest.fn(),
      setcargo: jest.fn(),
      setteléfonos: jest.fn(),
      setfaxs: jest.fn(),
      setcorreoElectrónicos: jest.fn(),
    };

    mockQuery = {
      nombredelRepresentante$: of('John Doe'),
      cargo$: of('Manager'),
      teléfonos$: of('123456789'),
      faxs$: of('987654321'),
      correoElectrónicos$: of('test@example.com'),
    };

    mockService = {
      getrepresentante: jest.fn().mockReturnValue(of({ empresa: 'Test Corp' })),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,RepresentanteLegalComponent],
      declarations: [],
      providers: [
        FormBuilder,
        { provide: Tramite110218Store, useValue: mockStore },
        { provide: Tramite110218Query, useValue: mockQuery },
        { provide: CertificadoTecnicoJaponService, useValue: mockService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RepresentanteLegalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    destroyed$.next();
    destroyed$.complete();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.datosdelexportador.value).toEqual({
      nombredelRepresentante: '',
      empresa: '',
      cargo: '',
      teléfonos: '',
      faxs: '',
      correoElectronico: '',
    });
  });

  it('should call getTabledatas() and update the form', () => {
    component.getTabledatas();
    expect(mockService.getrepresentante).toHaveBeenCalled();
    expect(component.datosdelexportador.get('empresa')?.value).toBe('Test Corp');
  });

  it('should subscribe to store changes and update form values', () => {
    component.subscribeToStoreChanges();
    expect(component.datosdelexportador.get('nombredelRepresentante')?.value).toBe('John Doe');
    expect(component.datosdelexportador.get('cargo')?.value).toBe('Manager');
    expect(component.datosdelexportador.get('teléfonos')?.value).toBe('123456789');
    expect(component.datosdelexportador.get('faxs')?.value).toBe('987654321');
    expect(component.datosdelexportador.get('correoElectronicos')?.value).toBe('test@example.com');
  });

  it('should call the correct store method on form change', () => {
    component.datosdelexportador.get('nombredelRepresentante')?.setValue('New Name');
    component.onDatosdelexportadorChange('nombredelRepresentante');
    expect(mockStore.setnombredelRepresentante).toHaveBeenCalledWith('New Name');

    component.datosdelexportador.get('cargo')?.setValue('New Role');
    component.onDatosdelexportadorChange('cargo');
    expect(mockStore.setcargo).toHaveBeenCalledWith('New Role');
  });

  it('should clean up subscriptions on destroy', () => {
    const spy = jest.spyOn(component['destroyed$'], 'next');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
  });
});
