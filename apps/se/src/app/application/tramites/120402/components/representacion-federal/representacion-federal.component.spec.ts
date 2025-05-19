import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, Subject } from 'rxjs';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RepresentacionFederalComponent } from './representacion-federal.component';
import { RepresentacionFederalService } from '@ng-mf/data-access-user';
import { Tramite120402Query } from '../../estados/queries/tramite120402.query';
import { Tramite120402Store } from '../../estados/tramites/tramite120402.store';

const mockEntidad = [
  { id: 1, descripcion: 'Entidad 1' },
  { id: 2, descripcion: 'Entidad 2' }
];

const mockRepresentacion = [
  { id: 101, descripcion: 'Rep A', relacionadaUmtId: 1 },
  { id: 102, descripcion: 'Rep B', relacionadaUmtId: 2 },
  { id: 103, descripcion: 'Rep C', relacionadaUmtId: 1 }
];

describe('RepresentacionFederalComponent', () => {
  let component: RepresentacionFederalComponent;
  let fixture: ComponentFixture<RepresentacionFederalComponent>;
  let serviceMock: any;
  let storeMock: any;
  let queryMock: any;

  beforeEach(async () => {
    serviceMock = {
      getEntidad: jest.fn().mockReturnValue(of(mockEntidad)),
      getRepresentacion: jest.fn().mockReturnValue(of(mockRepresentacion)),
    };

    storeMock = {
      setEntidad: jest.fn(),
      setRepresentacion: jest.fn(),
    };

    queryMock = {
      entidad$: of(mockEntidad[0]),
      representacion$: of(''),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,RepresentacionFederalComponent],
      declarations: [],
      providers: [
        FormBuilder,
        { provide: RepresentacionFederalService, useValue: serviceMock },
        { provide: Tramite120402Query, useValue: queryMock },
        { provide: Tramite120402Store, useValue: storeMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RepresentacionFederalComponent);
    component = fixture.componentInstance;
    // Mock destroyed$ as Subject if not already present
    if (!(component as any).destroyed$) {
      (component as any).destroyed$ = new Subject<void>();
    }
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty values', () => {
    expect(component.representacionForm).toBeDefined();
    expect(component.representacionForm.get('entidad')?.value).toEqual(mockEntidad[0]);
    expect(component.representacionForm.get('representacion')?.value).toEqual('');
  });

  it('should load entidad catalog', () => {
    component.loadEntidad();
    expect(serviceMock.getEntidad).toHaveBeenCalled();
    expect(component.entidad).toEqual(mockEntidad);
  });

  it('should load representacion catalog and filter based on selected entidad', () => {
    component.representacionForm.get('entidad')?.setValue(mockEntidad[0]);
    component.loadRepresentacion();
    expect(serviceMock.getRepresentacion).toHaveBeenCalled();
    expect(component.allRepresentaciones).toEqual(mockRepresentacion);
  });

  it('should update representacion options correctly based on selected entidad', () => {
    component.allRepresentaciones = mockRepresentacion;
    component.updateRepresentacionOptions(mockEntidad[0]);
    expect(component.representacion.length).toBe(2);

    component.updateRepresentacionOptions(null);
    expect(component.representacion.length).toBe(0);
  });

  it('should set selected entidad and update options', () => {
    const spy = jest.spyOn(component as any, 'updateRepresentacionOptions');
    component.getEntidad(mockEntidad[0]);
    expect(storeMock.setEntidad).toHaveBeenCalledWith(mockEntidad[0]);
    expect(spy).toHaveBeenCalledWith(mockEntidad[0]);
  });

  it('should set selected representacion and update form', () => {
    component.getRepresentacion(mockRepresentacion[0]);
    expect(storeMock.setRepresentacion).toHaveBeenCalledWith(mockRepresentacion[0]);
    expect(component.representacionForm.get('representacion')?.value).toBe(
      mockRepresentacion[0].id.toString()
    );
  });

  it('should update store values using setValoresStore', () => {
    const setMock = jest.fn();
    storeMock.setEntidad = setMock;
    component.setValoresStore(component.representacionForm, 'entidad', 'setEntidad');
    expect(setMock).toHaveBeenCalled();
  });

  it('should return correct value from esInvalido()', () => {
    const control = component.representacionForm.get('entidad');
    control?.markAsTouched();
    control?.setValue('');
    expect(component.esInvalido('entidad')).toBe(true);
  });

  it('should unsubscribe on destroy', () => {
    const completeSpy = jest.spyOn((component as any).destroyed$, 'complete');
    component.ngOnDestroy();
    expect(completeSpy).toHaveBeenCalled();
  });
});
