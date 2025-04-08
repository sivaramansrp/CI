import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Datos250101Component } from './datos-250101.component';

describe('Datos250101Component', () => {
  let component: Datos250101Component;
  let fixture: ComponentFixture<Datos250101Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Datos250101Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Datos250101Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
