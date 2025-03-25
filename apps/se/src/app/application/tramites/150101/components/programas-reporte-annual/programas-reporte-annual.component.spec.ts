import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramasReporteAnnualComponent } from './programas-reporte-annual.component';

describe('ProgramasReporteAnnualComponent', () => {
  let component: ProgramasReporteAnnualComponent;
  let fixture: ComponentFixture<ProgramasReporteAnnualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProgramasReporteAnnualComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProgramasReporteAnnualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
