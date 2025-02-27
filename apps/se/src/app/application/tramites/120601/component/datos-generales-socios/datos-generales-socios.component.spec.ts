import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosGeneralesSociosComponent } from './datos-generales-socios.component';

describe('DatosGeneralesSociosComponent', () => {
  let component: DatosGeneralesSociosComponent;
  let fixture: ComponentFixture<DatosGeneralesSociosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosGeneralesSociosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosGeneralesSociosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
