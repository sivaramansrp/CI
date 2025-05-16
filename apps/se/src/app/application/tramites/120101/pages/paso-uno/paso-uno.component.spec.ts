import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoUnoComponent } from './paso-uno.component';
import { DatosGeneralesComponent } from '../../components/datos-generales/datos-generales.component';
import { DomicilioFiscalComponent } from '../../components/domicilio-fiscal/domicilio-fiscal.component';
import { ConsultarCupoComponent } from '../../components/consultar-cupo/consultar-cupo.component';
import { DescripcionDelCupoComponent } from '../../components/descripcion-del-cupo/descripcion-del-cupo.component';
import { RepresentacionFederalComponent } from '../../components/representacion-federal/representacion-federal.component';
import { BienFinalComponent } from '../../components/bien-final/bien-final.component';

describe('PasoUnoComponent', () => {
  let component: PasoUnoComponent;
  let fixture: ComponentFixture<PasoUnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasoUnoComponent],
      imports: [
        DatosGeneralesComponent,
        DomicilioFiscalComponent,
        ConsultarCupoComponent,
        DescripcionDelCupoComponent,
        RepresentacionFederalComponent,
        BienFinalComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
