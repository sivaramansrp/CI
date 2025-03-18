import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitudImportacionNeumaticosComercializarComponent } from './solicitud-importacion-neumaticos-comercializar.component';

describe('SolicitudImportacionNeumaticosComercializarComponent', () => {
  let component: SolicitudImportacionNeumaticosComercializarComponent;
  let fixture: ComponentFixture<SolicitudImportacionNeumaticosComercializarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitudImportacionNeumaticosComercializarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(
      SolicitudImportacionNeumaticosComercializarComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
