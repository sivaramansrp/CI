import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosdelasolicitudComponent } from './datos-de-la-solicitud.component';

describe('DatosdelasolicitudComponent', () => {
  let component: DatosdelasolicitudComponent;
  let fixture: ComponentFixture<DatosdelasolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosdelasolicitudComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosdelasolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
