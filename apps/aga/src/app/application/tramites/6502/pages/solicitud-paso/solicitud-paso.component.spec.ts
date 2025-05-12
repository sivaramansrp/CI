import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitudPasoComponent } from './solicitud-paso.component';

describe('SolicitudPasoComponent', () => {
  let component: SolicitudPasoComponent;
  let fixture: ComponentFixture<SolicitudPasoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SolicitudPasoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitudPasoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
