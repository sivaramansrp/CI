import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Datos90305Component } from './datos-90305.component';

describe('Datos90305Component', () => {
  let component: Datos90305Component;
  let fixture: ComponentFixture<Datos90305Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Datos90305Component],
    }).compileComponents();

    fixture = TestBed.createComponent(Datos90305Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
