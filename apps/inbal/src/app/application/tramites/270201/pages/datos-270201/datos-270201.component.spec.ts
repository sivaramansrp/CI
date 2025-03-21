import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Datos270201Component } from './datos-270201.component';

describe('Datos270201Component', () => {
  let component: Datos270201Component;
  let fixture: ComponentFixture<Datos270201Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Datos270201Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Datos270201Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
