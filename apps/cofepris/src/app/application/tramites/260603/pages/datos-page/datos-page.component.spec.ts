import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosPageComponent } from './datos-page.component';

describe('DatosPageComponent', () => {
  let component: DatosPageComponent;
  let fixture: ComponentFixture<DatosPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DatosPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
