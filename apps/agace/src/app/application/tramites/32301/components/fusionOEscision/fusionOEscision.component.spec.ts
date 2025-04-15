import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FusionOEscisionComponent } from './fusionOEscision.component';

describe('FusionOEscisionComponent', () => {
  let component: FusionOEscisionComponent;
  let fixture: ComponentFixture<FusionOEscisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FusionOEscisionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FusionOEscisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
