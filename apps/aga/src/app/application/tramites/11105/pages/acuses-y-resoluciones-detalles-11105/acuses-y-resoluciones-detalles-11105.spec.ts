import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AcusesYResolucionesDetalles11105Component } from './acuses-y-resoluciones-detalles-11105.component';
import { AcusesYResoluionesFolioDelTramiteDetallesComponent } from '@libs/shared/data-access-user/src/tramites/components/acuses-y-resoluiones-folio-del-tramite-detalles/acuses-y-resoluiones-folio-del-tramite-detalles.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AcusesYResolucionesDetalles11105Component', () => {
  let component: AcusesYResolucionesDetalles11105Component;
  let fixture: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        AcusesYResoluionesFolioDelTramiteDetallesComponent,
        AcusesYResolucionesDetalles11105Component
      ],
      declarations: [],
    }).compileComponents();

    fixture = TestBed.createComponent(
      AcusesYResolucionesDetalles11105Component
    );
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
