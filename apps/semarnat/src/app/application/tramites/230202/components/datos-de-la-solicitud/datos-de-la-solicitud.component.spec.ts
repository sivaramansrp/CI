import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosDeLaSolicitudComponent } from './datos-de-la-solicitud.component';
import { PhytosanitaryReexportacionService } from '../../services/phytosanitary-reexportacion.service';
import { HttpClientModule } from '@angular/common/http';

describe('DatosDeLaSolicitudComponent', () => {
  let component: DatosDeLaSolicitudComponent;
  let fixture: ComponentFixture<DatosDeLaSolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosDeLaSolicitudComponent, HttpClientModule],
      providers: [PhytosanitaryReexportacionService], // Add any necessary providers here
    }).compileComponents();

    fixture = TestBed.createComponent(DatosDeLaSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
