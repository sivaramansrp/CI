import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Pantallas260514Component } from './pantallas.component';

describe('Pantallas260514Component', () => {
  let component: Pantallas260514Component;
  let fixture: ComponentFixture<Pantallas260514Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Pantallas260514Component],
    }).compileComponents();

    fixture = TestBed.createComponent(Pantallas260514Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
