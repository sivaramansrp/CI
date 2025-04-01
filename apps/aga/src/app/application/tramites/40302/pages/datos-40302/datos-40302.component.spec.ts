import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Datos40302Component } from './datos-40302.component';

describe('Datos40302Component', () => {
  let component: Datos40302Component;
  let fixture: ComponentFixture<Datos40302Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Datos40302Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Datos40302Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
