// @ts-nocheck
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitudPageComponent } from './solicitud-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { WizardComponent } from '@libs/shared/data-access-user/src';
import { PermisoOrdinarioParaLaExportacionDeSustanciasQuimicasRoutingModule } from '../../permiso-ordinario-para-la-exportacion-de-sustancias-quimicas-routing.module';

describe('SolicitudPageComponent', () => {
  let component: SolicitudPageComponent;
  let fixture: ComponentFixture<SolicitudPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitudPageComponent, HttpClientTestingModule, PermisoOrdinarioParaLaExportacionDeSustanciasQuimicasRoutingModule, WizardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitudPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});