import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AcuicolaComponent } from './acuicola.component';

describe('AcuicolaComponent', () => {
  let component: AcuicolaComponent;
  let fixture: ComponentFixture<AcuicolaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcuicolaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AcuicolaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
