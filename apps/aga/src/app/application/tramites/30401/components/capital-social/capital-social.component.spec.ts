import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormGroup, FormGroupDirective, FormControl } from '@angular/forms';
import { CapitalSocialComponent } from './capital-social.component';
import { Tramite30401Store } from '../../estados/tramites30401.store';
import { CommonModule } from '@angular/common';
import { TituloComponent } from '@libs/shared/data-access-user/src';

describe('CapitalSocialComponent', () => {
  let component: CapitalSocialComponent;
  let fixture: ComponentFixture<CapitalSocialComponent>;
  let mockTramite30401Store: jest.Mocked<Tramite30401Store>;
  let mockFormGroupDirective: Partial<FormGroupDirective>;

  beforeEach(async () => {
    mockTramite30401Store = {
      establecerDatos: jest.fn(),
    } as unknown as jest.Mocked<Tramite30401Store>;
    mockFormGroupDirective = {
      control: new FormGroup({}),
    };

    await TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule, TituloComponent, CapitalSocialComponent],
      providers: [
        { provide: Tramite30401Store, useValue: mockTramite30401Store },
        { provide: FormGroupDirective, useValue: mockFormGroupDirective },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CapitalSocialComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form group on ngOnInit', () => {
    const mockFormGroup = new FormGroup({});
    mockFormGroupDirective?.control?.addControl('testGroup', mockFormGroup);
    component.grupoDeFormulario = 'testGroup';

    component.ngOnInit();

    expect(component.inicializarFormulario).toBe(mockFormGroup);
  });

  it('should call establecerDatos on setValoresStore', () => {
    const mockFormGroup = new FormGroup({});
    const mockField = 'testField';
    const mockValue = 'testValue';

    mockFormGroup.addControl(mockField, new FormControl(mockValue));
    component.setValoresStore(mockFormGroup, mockField);

    expect(mockTramite30401Store.establecerDatos).toHaveBeenCalledWith({ [mockField]: mockValue });
  });

  it('should return true if a control is invalid and touched or dirty in esInvalido', () => {
    const mockFormGroup = new FormGroup({});
    const mockControlName = 'testControl';

    const mockControl = new FormControl(null);
    mockControl.setErrors({ required: true });
    mockControl.markAsTouched();

    mockFormGroup.addControl(mockControlName, mockControl);
    component.inicializarFormulario = mockFormGroup;

    const result = component.esInvalido(mockControlName);

    expect(result).toBe(true);
  });

  it('should return false if a control is valid or not touched/dirty in esInvalido', () => {
    const mockFormGroup = new FormGroup({});
    const mockControlName = 'testControl';

    const mockControl = new FormControl(null);

    mockFormGroup.addControl(mockControlName, mockControl);
    component.inicializarFormulario = mockFormGroup;

    const result = component.esInvalido(mockControlName);

    expect(result).toBe(false);
  });

  it('should handle missing control in esInvalido gracefully', () => {
    const mockFormGroup = new FormGroup({});
    component.inicializarFormulario = mockFormGroup;

    const result = component.esInvalido('nonExistentControl');

    expect(result).toBe(false);
  });

  it('should not call establecerDatos if control value is null in setValoresStore', () => {
    const mockFormGroup = new FormGroup({});
    const mockField = 'testField';

    mockFormGroup.addControl(mockField, new FormControl(null));
    component.setValoresStore(mockFormGroup, mockField);

    expect(mockTramite30401Store.establecerDatos).not.toHaveBeenCalled();
  });

  it('should handle null form group in setValoresStore gracefully', () => {
    component.setValoresStore(null as any, 'testField');

    expect(mockTramite30401Store.establecerDatos).not.toHaveBeenCalled();
  });

  it('should handle null form group in setValoresStore gracefully', () => {
    component.setValoresStore(null, 'testField');

    expect(mockTramite30401Store.establecerDatos).not.toHaveBeenCalled();
  });
});