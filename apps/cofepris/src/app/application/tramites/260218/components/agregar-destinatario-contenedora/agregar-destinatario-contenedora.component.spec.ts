import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarsDestinatarioContenedoraComponent } from './agregar-destinatario-contenedora.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AgregarsDestinatarioComponent', () => {
  let component: AgregarsDestinatarioContenedoraComponent;
  let fixture: ComponentFixture<AgregarsDestinatarioContenedoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarsDestinatarioContenedoraComponent, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(
      AgregarsDestinatarioContenedoraComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
