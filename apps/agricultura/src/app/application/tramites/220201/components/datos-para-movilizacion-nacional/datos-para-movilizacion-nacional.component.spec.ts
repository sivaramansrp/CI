import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosParaMovilizacionNacionalComponent } from './datos-para-movilizacion-nacional.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CatalogoSelectComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { ReactiveFormsModule } from '@angular/forms';

describe('DatosParaMovilizacionNacionalComponent', () => {
  let component: DatosParaMovilizacionNacionalComponent;
  let fixture: ComponentFixture<DatosParaMovilizacionNacionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [HttpClientTestingModule, TituloComponent, CatalogoSelectComponent, ReactiveFormsModule,DatosParaMovilizacionNacionalComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DatosParaMovilizacionNacionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});