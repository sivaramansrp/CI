import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AtenderRequerimientoComponent } from './atender-requerimiento.component';

describe('AtenderRequerimientoComponent', () => {
  let component: AtenderRequerimientoComponent;
  let fixture: ComponentFixture<AtenderRequerimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtenderRequerimientoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AtenderRequerimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
