import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CancelacionDeComponent } from './cancelacion-de.component';

describe('CancelacionDeComponent', () => {
  let component: CancelacionDeComponent;
  let fixture: ComponentFixture<CancelacionDeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CancelacionDeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CancelacionDeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
