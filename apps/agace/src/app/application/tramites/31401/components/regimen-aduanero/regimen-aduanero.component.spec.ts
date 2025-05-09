import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegimenAduaneroComponent } from './regimen-aduanero.component';

describe('RegimenAduaneroComponent', () => {
  let component: RegimenAduaneroComponent;
  let fixture: ComponentFixture<RegimenAduaneroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegimenAduaneroComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RegimenAduaneroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
