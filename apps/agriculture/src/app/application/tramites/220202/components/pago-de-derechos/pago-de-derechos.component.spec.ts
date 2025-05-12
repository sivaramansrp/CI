import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PagoDeDerechosComponent } from './pago-de-derechos.component';
import { Catalogo } from "libs/shared/data-access-user/src/core/models/shared/catalogos.model"
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AlertComponent, CatalogoSelectComponent, InputFechaComponent, InputRadioComponent, TablaDinamicaComponent, TituloComponent } from '@libs/shared/data-access-user/src';

describe('PagoDeDerechosComponent', () => {
  let component: PagoDeDerechosComponent;
  let fixture: ComponentFixture<PagoDeDerechosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PagoDeDerechosComponent], // Declara el componente
      imports: [ReactiveFormsModule, HttpClientTestingModule, TituloComponent, InputFechaComponent, CatalogoSelectComponent, AlertComponent, TablaDinamicaComponent, InputRadioComponent], // Importa ReactiveFormsModule
    }).compileComponents();

    fixture = TestBed.createComponent(PagoDeDerechosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});