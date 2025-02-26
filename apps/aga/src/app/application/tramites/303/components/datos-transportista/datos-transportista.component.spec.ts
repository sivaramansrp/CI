import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosTransportistaComponent } from './datos-transportista.component';

describe('DatosTransportistaComponent', () => {
  let component: DatosTransportistaComponent;
  let fixture: ComponentFixture<DatosTransportistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DatosTransportistaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DatosTransportistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
