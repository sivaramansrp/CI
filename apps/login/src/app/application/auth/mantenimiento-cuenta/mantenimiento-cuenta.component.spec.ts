import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MantenimientoCuentaComponent } from './mantenimiento-cuenta.component';

describe('MantenimientoCuentaComponent', () => {
  let component: MantenimientoCuentaComponent;
  let fixture: ComponentFixture<MantenimientoCuentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MantenimientoCuentaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MantenimientoCuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
