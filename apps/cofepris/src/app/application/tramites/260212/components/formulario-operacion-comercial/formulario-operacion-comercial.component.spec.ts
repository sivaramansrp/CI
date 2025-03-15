import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormularioOperacionComercialComponent } from './formulario-operacion-comercial.component';

describe('FormularioOperacionComercialComponent', () => {
  let component: FormularioOperacionComercialComponent;
  let fixture: ComponentFixture<FormularioOperacionComercialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioOperacionComercialComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FormularioOperacionComercialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
