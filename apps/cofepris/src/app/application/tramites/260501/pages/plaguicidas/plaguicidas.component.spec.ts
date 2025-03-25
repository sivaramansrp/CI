import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlaguicidasComponent } from './plaguicidas.component';

describe('PlaguicidasComponent', () => {
  let component: PlaguicidasComponent;
  let fixture: ComponentFixture<PlaguicidasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaguicidasComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlaguicidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
