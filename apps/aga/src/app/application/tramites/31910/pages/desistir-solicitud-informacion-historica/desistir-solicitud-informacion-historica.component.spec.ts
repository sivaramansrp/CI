import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DesistirSolicitudInformacionHistoricaComponent } from './desistir-solicitud-informacion-historica.component';

describe('DesistirSolicitudInformacionHistoricaComponent', () => {
  let component: DesistirSolicitudInformacionHistoricaComponent;
  let fixture: ComponentFixture<DesistirSolicitudInformacionHistoricaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DesistirSolicitudInformacionHistoricaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(
      DesistirSolicitudInformacionHistoricaComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
