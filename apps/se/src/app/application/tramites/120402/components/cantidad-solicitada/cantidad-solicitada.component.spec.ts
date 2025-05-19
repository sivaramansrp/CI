import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CantidadSolicitadaComponent } from './cantidad-solicitada.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { Tramite120402Query } from '../../estados/queries/tramite120402.query';
import { Tramite120402Store } from '../../estados/tramites/tramite120402.store';

describe('CantidadSolicitadaComponent', () => {
  let component: CantidadSolicitadaComponent;
  let fixture: ComponentFixture<CantidadSolicitadaComponent>;
  let mockStore: any;
  let mockQuery: any;

  const mockCantidad = '500';

  beforeEach(async () => {
    mockStore = {
      setCantidadSolicitada: jest.fn(),
    };

    mockQuery = {
      cantidadSolicitada$: of(mockCantidad),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,CantidadSolicitadaComponent],
      declarations: [],
      providers: [
        FormBuilder,
        { provide: Tramite120402Store, useValue: mockStore },
        { provide: Tramite120402Query, useValue: mockQuery },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CantidadSolicitadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty value', () => {
    expect(component.form).toBeDefined();
    expect(component.form.get('cantidadSolicitada')).toBeTruthy();
  });

  it('should patch the form value from observable', () => {
    expect(component.form.get('cantidadSolicitada')?.value).toBe(mockCantidad);
  });

  it('should mark form as touched if invalid on submit', () => {
    const markAllAsTouchedSpy = jest.spyOn(component.form, 'markAllAsTouched');
    component.form.get('cantidadSolicitada')?.setValue('');
    component.validarYEnviarFormulario();
    expect(markAllAsTouchedSpy).toHaveBeenCalled();
  });

  it('should return true when control is invalid and touched', () => {
    const control = component.form.get('cantidadSolicitada');
    control?.markAsTouched();
    control?.setValue('');
    expect(component.esInvalido('cantidadSolicitada')).toBe(true);
  });

  it('should return false when control is valid', () => {
    component.form.get('cantidadSolicitada')?.setValue('100');
    expect(component.esInvalido('cantidadSolicitada')).toBe(false);
  });

  it('should call store method with correct value', () => {
    const value = '300';
    component.form.get('cantidadSolicitada')?.setValue(value);
    component.getCantidadSolicitada();
    expect(mockStore.setCantidadSolicitada).toHaveBeenCalledWith(value);
  });

  it('should clean up on ngOnDestroy', () => {
    const nextSpy = jest.spyOn((component as any).destroyed$, 'next');
    const completeSpy = jest.spyOn((component as any).destroyed$, 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
