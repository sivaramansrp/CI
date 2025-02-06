import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsableInspeccionEnPuntoComponent } from './responsable-inspeccion-en-punto.component';

describe('ResponsableInspeccionEnPuntoComponent', () => {
  let component: ResponsableInspeccionEnPuntoComponent;
  let fixture: ComponentFixture<ResponsableInspeccionEnPuntoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResponsableInspeccionEnPuntoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResponsableInspeccionEnPuntoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
