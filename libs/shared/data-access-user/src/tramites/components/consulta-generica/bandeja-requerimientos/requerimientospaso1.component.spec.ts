import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Requerimientospaso1Component } from './requerimientospaso1.component';

describe('Requerimientospaso1Component', () => {
  let component: Requerimientospaso1Component;
  let fixture: ComponentFixture<Requerimientospaso1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Requerimientospaso1Component],
    }).compileComponents();

    fixture = TestBed.createComponent(Requerimientospaso1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
