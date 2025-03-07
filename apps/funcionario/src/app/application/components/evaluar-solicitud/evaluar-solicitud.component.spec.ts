import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EvaluarSolicitudComponent } from './evaluar-solicitud.component';

describe('EvaluarSolicitudComponent', () => {
  let component: EvaluarSolicitudComponent;
  let fixture: ComponentFixture<EvaluarSolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvaluarSolicitudComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EvaluarSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
