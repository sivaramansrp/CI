import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosGeneralesDeLaSolicitudComponent } from './datos-generales-de-la-solicitud.component';

describe('DatosGeneralesDeLaSolicitudComponent', () => {
  let component: DatosGeneralesDeLaSolicitudComponent;
  let fixture: ComponentFixture<DatosGeneralesDeLaSolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DatosGeneralesDeLaSolicitudComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DatosGeneralesDeLaSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
