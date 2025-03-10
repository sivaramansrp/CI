import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Datos260212Component } from './datos-260212.component';

describe('Datos260212Component', () => {
  let component: Datos260212Component;
  let fixture: ComponentFixture<Datos260212Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Datos260212Component],
    }).compileComponents();

    fixture = TestBed.createComponent(Datos260212Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
