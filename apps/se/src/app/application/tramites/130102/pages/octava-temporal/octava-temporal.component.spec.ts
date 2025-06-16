import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OctavaTemporalComponent } from './octava-temporal.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AlertComponent, BtnContinuarComponent, WizardComponent } from '@libs/shared/data-access-user/src';
import { DatosComponent } from '../datos/datos.component';
import { PasoTresComponent } from '../../component/paso-tres/paso-tres.component';
import { SolicitanteOctavaTemporalComponent } from '../../component/solicitante-octava-temporal/solicitante-octava-temporal.component';

describe('OctavaTemporalComponent', () => {
  let component: OctavaTemporalComponent;
  let fixture: ComponentFixture<OctavaTemporalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OctavaTemporalComponent, DatosComponent,],
      imports: [HttpClientTestingModule, WizardComponent, AlertComponent, BtnContinuarComponent, PasoTresComponent, SolicitanteOctavaTemporalComponent],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OctavaTemporalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
