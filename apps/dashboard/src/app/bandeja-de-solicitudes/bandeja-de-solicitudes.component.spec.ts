import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BandejaDeSolicitudesComponent } from './bandeja-de-solicitudes.component';

describe('BandejaDeSolicitudesComponent', () => {
  let component: BandejaDeSolicitudesComponent;
  let fixture: ComponentFixture<BandejaDeSolicitudesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BandejaDeSolicitudesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BandejaDeSolicitudesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
