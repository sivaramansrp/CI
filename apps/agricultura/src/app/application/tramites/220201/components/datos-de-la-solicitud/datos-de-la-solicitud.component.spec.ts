import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosDeLaSolicitudComponent } from './datos-de-la-solicitud.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AlertComponent, CatalogoSelectComponent, InputRadioComponent, TableComponent, TituloComponent } from '@ng-mf/data-access-user';
import { ReactiveFormsModule } from '@angular/forms';

describe('DatosDeLaSolicitudComponent', () => {
  let component: DatosDeLaSolicitudComponent;
  let fixture: ComponentFixture<DatosDeLaSolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DatosDeLaSolicitudComponent],
      imports: [HttpClientTestingModule, TituloComponent, CatalogoSelectComponent, InputRadioComponent, AlertComponent, TableComponent, ReactiveFormsModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DatosDeLaSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});