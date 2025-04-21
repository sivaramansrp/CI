import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosDelNombreComponent } from './datos-del-nombre.component';

describe('DatosDelNombreComponent', () => {
  let component: DatosDelNombreComponent;
  let fixture: ComponentFixture<DatosDelNombreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosDelNombreComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosDelNombreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
