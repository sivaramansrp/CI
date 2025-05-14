import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosMercanciaContenedoraComponent } from './datos-mercancia-contenedora.component';
import { ActivatedRoute } from '@angular/router';
import { DatosSolicitudService } from '../../../../shared/services/datos-solicitud.service';
import { HttpClientModule } from '@angular/common/http';

describe('DatosMercanciaContenedoraComponent', () => {
  let component: DatosMercanciaContenedoraComponent;
  let fixture: ComponentFixture<DatosMercanciaContenedoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosMercanciaContenedoraComponent,HttpClientModule],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { params: {} } }, },
        { provide: DatosSolicitudService}
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosMercanciaContenedoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
});
