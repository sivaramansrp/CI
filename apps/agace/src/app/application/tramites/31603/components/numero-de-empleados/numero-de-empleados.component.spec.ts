import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NumeroDeEmpleadosComponent } from './numero-de-empleados.component';

describe('NumeroDeEmpleadosComponent', () => {
  let component: NumeroDeEmpleadosComponent;
  let fixture: ComponentFixture<NumeroDeEmpleadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NumeroDeEmpleadosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NumeroDeEmpleadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
