import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosGeneralesAnimalesComponent } from './datos-generales-animales.component';

describe('DatosGeneralesAnimalesComponent', () => {
  let component: DatosGeneralesAnimalesComponent;
  let fixture: ComponentFixture<DatosGeneralesAnimalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DatosGeneralesAnimalesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DatosGeneralesAnimalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
