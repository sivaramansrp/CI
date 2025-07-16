import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosProductorComponent } from './datos-productor.component';

describe('DatosProductorComponent', () => {
  let component: DatosProductorComponent;
  let fixture: ComponentFixture<DatosProductorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosProductorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosProductorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
