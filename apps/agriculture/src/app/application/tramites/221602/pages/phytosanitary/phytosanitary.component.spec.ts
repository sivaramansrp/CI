import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PhytosanitaryComponent } from './phytosanitary.component';

describe('DesmantelarComponent', () => {
  let component: PhytosanitaryComponent;
  let fixture: ComponentFixture<PhytosanitaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhytosanitaryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PhytosanitaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
