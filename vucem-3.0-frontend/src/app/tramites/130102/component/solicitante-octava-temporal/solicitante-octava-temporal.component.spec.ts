import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitanteOctavaTemporalComponent } from './solicitante-octava-temporal.component';

describe('DetosGenDelComponent', () => {
  let component: SolicitanteOctavaTemporalComponent;
  let fixture: ComponentFixture<SolicitanteOctavaTemporalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitanteOctavaTemporalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SolicitanteOctavaTemporalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
