import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarCuentaComponent } from './agregar-cuenta.component';

describe('AgregarCuentaComponent', () => {
  let component: AgregarCuentaComponent;
  let fixture: ComponentFixture<AgregarCuentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarCuentaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AgregarCuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
