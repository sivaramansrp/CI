import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BandejaPaso1Component } from './bandeja-paso1.component';

describe('BandejaPaso1Component', () => {
  let component: BandejaPaso1Component;
  let fixture: ComponentFixture<BandejaPaso1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BandejaPaso1Component],
    }).compileComponents();

    fixture = TestBed.createComponent(BandejaPaso1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
