import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PaginaDosAcusesYResolucionesDetallesComponent } from './pagina-dos-acuses-y-resoluciones-detalles.component';
import { AcusesYResoluionesFolioDelTramiteDetallesComponent } from '@libs/shared/data-access-user/src/tramites/components/acuses-y-resoluiones-folio-del-tramite-detalles/acuses-y-resoluiones-folio-del-tramite-detalles.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AcusesYResolucionesDetalles11105Component', () => {
  let component: PaginaDosAcusesYResolucionesDetallesComponent;
  let fixture: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        AcusesYResoluionesFolioDelTramiteDetallesComponent,
        PaginaDosAcusesYResolucionesDetallesComponent,
      ],
      declarations: [],
    }).compileComponents();

    fixture = TestBed.createComponent(
      PaginaDosAcusesYResolucionesDetallesComponent
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
