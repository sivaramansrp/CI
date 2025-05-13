import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AsignciontabComponent } from './asigncion-tab.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { SolicitanteasigncionserviceService } from '@libs/shared/data-access-user/src/core/services/120404/solicitanteAsigncionservice.service';
import { Tramite120404Store } from '../../estados/store/tramite120404.store';
import { Tramite120404Query } from '../../estados/queries/tramite120404.query';

describe('AsignciontabComponent', () => {
  let component: AsignciontabComponent;
  let fixture: ComponentFixture<AsignciontabComponent>;
  let service: SolicitanteasigncionserviceService;
  let store: Tramite120404Store;
  let query: Tramite120404Query;

  const mockSolicitanteList = [
    { id: 1, descripcion: 'Option 1' },
    { id: 2, descripcion: 'Option 2' },
  ];

  const mockTramiteState = {
    numTramite: '12345',
    asignacionsolitud: 'Test Solicitud',
    asignacionRadio: true,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsignciontabComponent,ReactiveFormsModule],
      providers: [
        FormBuilder,
        {
          provide: SolicitanteasigncionserviceService,
          useValue: {
            getAsigncion: jest.fn().mockReturnValue(of(mockSolicitanteList)),
          },
        },
        {
          provide: Tramite120404Store,
          useValue: {
            setNumTramite: jest.fn(),
            setAsignacionsolitud: jest.fn(),
            setAsignacionRadio: jest.fn(),
          },
        },
        {
          provide: Tramite120404Query,
          useValue: {
            selectTramite120404$: of(mockTramiteState),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignciontabComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(SolicitanteasigncionserviceService);
    store = TestBed.inject(Tramite120404Store);
    query = TestBed.inject(Tramite120404Query);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on component creation', () => {
    expect(component.asignacionForm).toBeDefined();
    expect(component.asignacionForm.get('datosRegimen')?.get('asignacionsolitud')?.value).toBe('');
    expect(component.asignacionForm.get('datosRegimen')?.get('numTramite')?.value).toBe('');
    expect(component.asignacionForm.get('datosRegimen')?.get('asignacionRadio')?.value).toBe(false);
  });

  it('should call loadComboUnidadMedida and set solicitanteList', () => {
    component.loadComboUnidadMedida();
    expect(service.getAsigncion).toHaveBeenCalled();
    expect(component.solicitanteList).toEqual(mockSolicitanteList);
  });

  it('should call enPatchFormData and patch form values from the store', () => {
    component.enPatchFormData();
    expect(component.asignacionForm.get('datosRegimen')?.get('numTramite')?.value).toBe(mockTramiteState.numTramite);
    expect(component.asignacionForm.get('datosRegimen')?.get('asignacionsolitud')?.value).toBe(mockTramiteState.asignacionsolitud);
    expect(component.asignacionForm.get('datosRegimen')?.get('asignacionRadio')?.value).toBe(mockTramiteState.asignacionRadio);
  });

  it('should call setValoresStore and update the store', () => {
    const spy = jest.spyOn(store, 'setNumTramite');
    component.setValoresStore(component.asignacionForm, 'numTramite', 'setNumTramite');
    expect(spy).toHaveBeenCalledWith('');
  });

  it('should return true if a form control is invalid and touched', () => {
    const control = component.asignacionForm.get('datosRegimen')?.get('asignacionsolitud');
    control?.markAsTouched();
    control?.setErrors({ required: true });
    expect(component.isInvalid('asignacionsolitud')).toBe(true);
  });

  it('should return null if a form control does not exist', () => {
    expect(component.isInvalid('nonExistentControl')).toBeNull();
  });

  it('should handle form submission when valid', () => {
    const spy = jest.spyOn(component, 'buscar');
    component.asignacionForm.get('datosRegimen')?.get('asignacionsolitud')?.setValue('Test');
    component.asignacionForm.get('datosRegimen')?.get('numTramite')?.setValue('12345');
    component.asignacionForm.get('datosRegimen')?.get('asignacionRadio')?.setValue(true);
    component.buscar();
    expect(spy).toHaveBeenCalled();
  });

  it('should clean up subscriptions on component destroy', () => {
    const spyNext = jest.spyOn(component['destroyed$'], 'next');
    const spyComplete = jest.spyOn(component['destroyed$'], 'complete');
    component.ngOnDestroy();
    expect(spyNext).toHaveBeenCalled();
    expect(spyComplete).toHaveBeenCalled();
  });
});