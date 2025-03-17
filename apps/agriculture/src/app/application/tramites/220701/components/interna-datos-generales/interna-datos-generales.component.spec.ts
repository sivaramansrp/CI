import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternaDatosGeneralesComponent } from './interna-datos-generales.component';

describe('InternaDatosGeneralesComponent', () => {
  let component: InternaDatosGeneralesComponent;
  let fixture: ComponentFixture<InternaDatosGeneralesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InternaDatosGeneralesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InternaDatosGeneralesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
