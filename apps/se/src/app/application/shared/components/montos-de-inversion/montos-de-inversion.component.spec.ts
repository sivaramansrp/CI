import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MontosDeInversionComponent } from './montos-de-inversion.component';

describe('MontosDeInversionComponent', () => {
  let component: MontosDeInversionComponent;
  let fixture: ComponentFixture<MontosDeInversionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MontosDeInversionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MontosDeInversionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
