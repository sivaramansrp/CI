import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { PagoDeDerechosComponent } from './pago-de-derechos.component';
import { TituloComponent } from '@libs/shared/data-access-user/src';

describe('PagoDeDerechosComponent', () => {
  let component: PagoDeDerechosComponent;
  let fixture: ComponentFixture<PagoDeDerechosComponent>;
  let fb: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, PagoDeDerechosComponent, TituloComponent],
      providers: [FormBuilder],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoDeDerechosComponent);
    component = fixture.componentInstance;
    fb = TestBed.inject(FormBuilder);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with "Linea" and "monto" fields', () => {
    const form = component.FormSolicitud;
    expect(form).toBeTruthy();
    expect(form.get('pagodederechos.Linea')).toBeTruthy();
    expect(form.get('pagodederechos.monto')).toBeTruthy();
  });

  it('should set "monto" field value to 4845 and disable it', () => {
    const montoControl = component.FormSolicitud.get('pagodederechos.monto');

    // After ngOnInit, monto should be disabled and set to 4845
    component.ngOnInit(); // Trigger ngOnInit to initialize the form
    fixture.detectChanges(); // Make sure changes are reflected

    expect(montoControl?.value).toBe('4845');
    expect(montoControl?.disabled).toBe(true);
  });

  it('should have "Linea" field as required', () => {
    const form = component.FormSolicitud;
    const lineaControl = form.get('pagodederechos.Linea');
    
    // Check if the "Linea" field is required
    expect(lineaControl?.hasError('required')).toBe(true);
  });

  it('should call updateformfied on ngOnInit and update the monto field', () => {
    spyOn(component, 'updateformfied'); // Spy on the updateformfied method

    component.ngOnInit(); // Trigger ngOnInit to invoke the lifecycle method
    fixture.detectChanges(); // Ensure the view updates

    expect(component.updateformfied).toHaveBeenCalled();
    
    
  });
});
