import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Plantas90305Component } from './plantas-90305.component';

describe('Plantas90305Component', () => {
  let component: Plantas90305Component;
  let fixture: ComponentFixture<Plantas90305Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Plantas90305Component],
    }).compileComponents();

    fixture = TestBed.createComponent(Plantas90305Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
