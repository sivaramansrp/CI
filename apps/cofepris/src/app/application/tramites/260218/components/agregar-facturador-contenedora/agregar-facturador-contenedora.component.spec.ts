import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarsFacturadorContenedoraComponent } from './agregar-facturador-contenedora.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AgregarsFacturadorContenedoraComponent', () => {
  let component: AgregarsFacturadorContenedoraComponent;
  let fixture: ComponentFixture<AgregarsFacturadorContenedoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarsFacturadorContenedoraComponent, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AgregarsFacturadorContenedoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
