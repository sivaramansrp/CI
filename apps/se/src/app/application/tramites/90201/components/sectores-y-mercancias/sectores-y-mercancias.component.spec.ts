import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SectoresYMercanciasComponent } from './sectores-y-mercancias.component';

describe('SectoresYMercanciasComponent', () => {
  let component: SectoresYMercanciasComponent;
  let fixture: ComponentFixture<SectoresYMercanciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectoresYMercanciasComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SectoresYMercanciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
