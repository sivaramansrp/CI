import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitanteSolicitudComponent } from './solicitante-solicitud.component';

describe('SolicitanteSolicitudComponent', () => {
  let component: SolicitanteSolicitudComponent;
  let fixture: ComponentFixture<SolicitanteSolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitanteSolicitudComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitanteSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
