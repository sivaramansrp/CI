
import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {  PaginaUnoAcusesYResolucionesFolioDelTramiteBusquedaComponent } from './pagina-uno-acuses-y-resoluciones-folio-del-tramite-busqueda.component';
import { AcusesYResolucionesFolioDelTramiteBusquedaComponent } from '@libs/shared/data-access-user/src';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AcusesYResolucionesBusqueda11105Component', () => {
  let component: PaginaUnoAcusesYResolucionesFolioDelTramiteBusquedaComponent;
  let fixture: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        AcusesYResolucionesFolioDelTramiteBusquedaComponent,
        HttpClientTestingModule,
        PaginaUnoAcusesYResolucionesFolioDelTramiteBusquedaComponent
      ],
      declarations: [],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginaUnoAcusesYResolucionesFolioDelTramiteBusquedaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have a defined constructor', () => {
    expect(component).toBeDefined();
  });
});
