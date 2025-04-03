import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Datos260514Component } from './datos-260514.component';

describe('Datos260514Component', () => {
  let component: Datos260514Component;
  let fixture: ComponentFixture<Datos260514Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Datos260514Component],
    }).compileComponents();

    fixture = TestBed.createComponent(Datos260514Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
