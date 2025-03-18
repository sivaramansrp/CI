import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasotresComponent } from './pasotres.component';

describe('PasotresComponent', () => {
  let component: PasotresComponent;
  let fixture: ComponentFixture<PasotresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasotresComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PasotresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
