import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroPersonaNotificacionesComponent } from './registro-persona-notificaciones.component';

describe('RegistroPersonaNotificacionesComponent', () => {
  let component: RegistroPersonaNotificacionesComponent;
  let fixture: ComponentFixture<RegistroPersonaNotificacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroPersonaNotificacionesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroPersonaNotificacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
