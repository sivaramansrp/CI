import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpedicionAsignacionComponent } from './expedicion-asignacion.component';

describe('ExpedicionAsignacionComponent', () => {
  let component: ExpedicionAsignacionComponent;
  let fixture: ComponentFixture<ExpedicionAsignacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpedicionAsignacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpedicionAsignacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
