import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosMercanciaComponent } from './datos-mercancia.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AlertComponent, CatalogoSelectComponent, TablaDinamicaComponent, TituloComponent } from '@libs/shared/data-access-user/src';

describe('DatosMercanciaComponent', () => {
  let component: DatosMercanciaComponent;
  let fixture: ComponentFixture<DatosMercanciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [ReactiveFormsModule, FormsModule, HttpClientTestingModule, TituloComponent, CatalogoSelectComponent, TablaDinamicaComponent, AlertComponent,DatosMercanciaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosMercanciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
