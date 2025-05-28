
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosParaMovilizacionNacionalComponent } from './datos-para-movilizacion-nacional.component';
import { of } from 'rxjs';
import { AlertComponent, Catalogo, CatalogoSelectComponent, TablaDinamicaComponent, TituloComponent } from '@ng-mf/data-access-user';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DatosParaMovilizacionNacionalComponent', () => {
  let component: DatosParaMovilizacionNacionalComponent;
  let fixture: ComponentFixture<DatosParaMovilizacionNacionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DatosParaMovilizacionNacionalComponent],
      imports: [ReactiveFormsModule, TituloComponent, CatalogoSelectComponent, AlertComponent, TablaDinamicaComponent, HttpClientTestingModule], // Importa ReactiveFormsModule
      providers: [{ provide: HttpClient }] // Inyectamos el mock en lugar del servicio real
    }).compileComponents();

    fixture = TestBed.createComponent(DatosParaMovilizacionNacionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});