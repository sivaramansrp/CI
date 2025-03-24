import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosDelCafeComponent } from './datos-del-cafe.component';

describe('DatosDelCafeComponent', () => {
  let component: DatosDelCafeComponent;
  let fixture: ComponentFixture<DatosDelCafeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosDelCafeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosDelCafeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
