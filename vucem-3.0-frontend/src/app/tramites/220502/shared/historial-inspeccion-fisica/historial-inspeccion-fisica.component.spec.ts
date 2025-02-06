import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialInspeccionFisicaComponent } from './historial-inspeccion-fisica.component';

describe('HistorialInspeccionFisicaComponent', () => {
  let component: HistorialInspeccionFisicaComponent;
  let fixture: ComponentFixture<HistorialInspeccionFisicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HistorialInspeccionFisicaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistorialInspeccionFisicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
