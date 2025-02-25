import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Sector90305Component } from './sector-90305.component';

describe('Sector90305Component', () => {
  let component: Sector90305Component;
  let fixture: ComponentFixture<Sector90305Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sector90305Component],
    }).compileComponents();

    fixture = TestBed.createComponent(Sector90305Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
