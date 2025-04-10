import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DomicilioEstablecimientosComponent } from './domicilio-establecimientos.component';

describe('DomicilioEstablecimientosComponent', () => {
  let component: DomicilioEstablecimientosComponent;
  let fixture: ComponentFixture<DomicilioEstablecimientosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DomicilioEstablecimientosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DomicilioEstablecimientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
