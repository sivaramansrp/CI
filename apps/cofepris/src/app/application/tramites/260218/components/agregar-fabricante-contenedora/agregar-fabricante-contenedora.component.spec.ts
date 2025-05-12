import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarsFabricanteContenedoraComponent } from './agregar-fabricante-contenedora.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AgregarsFabricanteContenedoraComponent', () => {
  let component: AgregarsFabricanteContenedoraComponent;
  let fixture: ComponentFixture<AgregarsFabricanteContenedoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarsFabricanteContenedoraComponent, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AgregarsFabricanteContenedoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
