import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { AsignciontabComponent } from './asigncion-tab.component';
import { SolicitanteasigncionserviceService } from 'libs/shared/data-access-user/src/core/services/120404/solicitanteasigncionService.service';
import { Catalogo } from 'libs/shared/data-access-user/src/core/models/catalogo.model';

describe('AsignciontabComponent', () => {
  let component: AsignciontabComponent;
  let fixture: ComponentFixture<AsignciontabComponent>;
  let service: jest.Mocked<SolicitanteasigncionserviceService>;

  beforeEach(async () => {
    const serviceSpy = jest.fn(() => ({
      getAsigncion: jest.fn()
    }))();

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [AsignciontabComponent],
      providers: [
        { provide: SolicitanteasigncionserviceService, useValue: serviceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AsignciontabComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(SolicitanteasigncionserviceService) as jest.Mocked<SolicitanteasigncionserviceService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    component.ngOnInit();
    expect(component.asignacionForm).toBeDefined();
    expect(component.asignacionForm.get('datosRegimen')).toBeDefined();
  });

  it('should call loadComboUnidadMedida on init', () => {
    jest.spyOn(component, 'loadComboUnidadMedida');
    component.ngOnInit();
    expect(component.loadComboUnidadMedida).toHaveBeenCalled();
  });

  it('should load combo unidad medida', () => {
    const mockData: Catalogo[] = [{ id: 1, descripcion: 'Test' }];
    service.getAsigncion.mockReturnValue(of(mockData));

    component.loadComboUnidadMedida();
    expect(service.getAsigncion).toHaveBeenCalled();
    expect(component.asigncionendid).toEqual(mockData);
  });

  it('should check if form control is invalid', () => {
    component.ngOnInit();
    const control = component.asignacionForm.get('datosRegimen.asignacionsolitud');
    control?.markAsTouched();
    control?.setErrors({ required: true });

    expect(component.isInvalid('asignacionsolitud')).toBeTruthy();
  });

  it('should submit the form if valid', () => {
    jest.spyOn(console, 'log');
    component.ngOnInit();
    component.asignacionForm.get('datosRegimen')?.setValue({
      asignacionsolitud: 'test',
      numTramite: '123'
    });

    component.buscar();
    expect(console.log).toHaveBeenCalledWith('Formulario enviado:', component.asignacionForm.value);
  });

  it('should not submit the form if invalid', () => {
    jest.spyOn(console, 'log');
    component.ngOnInit();

    component.buscar();
    expect(console.log).toHaveBeenCalledWith('Formulario no válido');
  });

  it('should clean up on destroy', () => {
    const destroyed$ = {
      next: jest.fn(),
      complete: jest.fn()
    };
    (component as any).destroyed$ = destroyed$;

    component.ngOnDestroy();
    expect(destroyed$.next).toHaveBeenCalled();
    expect(destroyed$.complete).toHaveBeenCalled();
  });
});