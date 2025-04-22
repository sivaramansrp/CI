import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExpedicionCertificadosAsignacionDirectaComponent } from './expedicion-certificados-asignacion-directa.component';

describe('ExpedicionCertificadosAsignacionDirectaComponent', () => {
  let component: ExpedicionCertificadosAsignacionDirectaComponent;
  let fixture: ComponentFixture<ExpedicionCertificadosAsignacionDirectaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpedicionCertificadosAsignacionDirectaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(
      ExpedicionCertificadosAsignacionDirectaComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
