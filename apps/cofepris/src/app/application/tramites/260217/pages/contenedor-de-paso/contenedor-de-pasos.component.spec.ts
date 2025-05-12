import { ComponentFixture, TestBed } from '@angular/core/testing';
import {ContenedorDePasosComponent} from './contenedor-de-pasos.component';
import { HttpClientModule } from '@angular/common/http';
describe('SolicitudPageComponent', () => {

  let component: ContenedorDePasosComponent;
  let fixture: ComponentFixture<ContenedorDePasosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContenedorDePasosComponent, HttpClientModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ContenedorDePasosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
