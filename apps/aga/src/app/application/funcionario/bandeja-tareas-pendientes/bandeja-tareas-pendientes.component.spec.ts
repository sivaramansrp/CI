import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BandejaTareasPendientesComponent } from './bandeja-tareas-pendientes.component';

describe('BandejaTareasPendientesComponent', () => {
  let component: BandejaTareasPendientesComponent;
  let fixture: ComponentFixture<BandejaTareasPendientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BandejaTareasPendientesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BandejaTareasPendientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
