import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TerritorioNacionalSolicitudeComponent } from './territorio-nacional-solicitude.component';
import { DatosPasos, ListaPasosWizard, WizardComponent,BtnContinuarComponent,SolicitanteComponent} from '@libs/shared/data-access-user/src';
import { DatosTerritorioComponent } from '../datos-territorio.component/datos-territorio.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import { fakeAsync, tick } from '@angular/core/testing';

describe('TerritorioNacionalSolicitudeComponent', () => {
  let component: TerritorioNacionalSolicitudeComponent;
  let fixture: ComponentFixture<TerritorioNacionalSolicitudeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TerritorioNacionalSolicitudeComponent,DatosTerritorioComponent],
      imports:[WizardComponent,BtnContinuarComponent,HttpClientTestingModule,SolicitanteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TerritorioNacionalSolicitudeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    fixture.detectChanges();
  });

  it('should create', fakeAsync(() => {
  expect(component).toBeTruthy();
  tick();
  fixture.detectChanges();
}));
});
