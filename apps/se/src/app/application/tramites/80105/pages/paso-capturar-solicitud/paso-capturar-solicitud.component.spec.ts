import { AlertComponent,BtnContinuarComponent } from '@ng-mf/data-access-user';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FirmaElectronicaComponent } from '@ng-mf/data-access-user';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PasoCapturarSolicitudComponent } from './paso-capturar-solicitud.component';
import { WizardComponent } from '@ng-mf/data-access-user';
import { ModalidadTerciarizaciónModule } from '../../modalidad-terciarización.module';

describe('PasoCapturarSolicitudComponent', () => {
  let component: PasoCapturarSolicitudComponent;
  let fixture: ComponentFixture<PasoCapturarSolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasoCapturarSolicitudComponent],
      imports:[HttpClientTestingModule, WizardComponent, FirmaElectronicaComponent, BtnContinuarComponent,
        AlertComponent, ModalidadTerciarizaciónModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PasoCapturarSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});