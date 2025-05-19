import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmarNotificacionComponent } from './confirmar-notificacion.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ConfirmarNotificacionComponent', () => {
  let component: ConfirmarNotificacionComponent;
  let fixture: ComponentFixture<ConfirmarNotificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmarNotificacionComponent, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmarNotificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a button element', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const buttonElement = compiled.querySelector('button');
    expect(buttonElement).toBeTruthy();
  });

  it('should increment indiceDePaso when alContinuar is called', () => {
    component.indiceDePaso = 1;
    component.alContinuar();
    expect(component.indiceDePaso).toBe(2);
  });

  it('should set indiceDePaso to 3 when obtieneFirma is called', () => {
    component.indiceDePaso = 1;
    component.obtieneFirma('some-signature');
    expect(component.indiceDePaso).toBe(3);
  });
});
