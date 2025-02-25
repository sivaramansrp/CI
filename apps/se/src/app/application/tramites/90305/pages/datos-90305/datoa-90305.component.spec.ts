import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Datoa90305Component } from './datoa-90305.component';

describe('Datoa90305Component', () => {
  let component: Datoa90305Component;
  let fixture: ComponentFixture<Datoa90305Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Datoa90305Component],
    }).compileComponents();

    fixture = TestBed.createComponent(Datoa90305Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
