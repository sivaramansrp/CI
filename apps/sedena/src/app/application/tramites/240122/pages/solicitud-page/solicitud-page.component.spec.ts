// @ts-nocheck
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitudPageComponent } from './solicitud-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { WizardComponent } from '@libs/shared/data-access-user/src';
import { PermisoExtraordinarioExportacionExplosivoRoutingModule } from '../../permiso-extraordinario-exportacion-explosivo-routing.module';

describe('SolicitudPageComponent', () => {
  let component: SolicitudPageComponent;
  let fixture: ComponentFixture<SolicitudPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitudPageComponent, HttpClientTestingModule, PermisoExtraordinarioExportacionExplosivoRoutingModule, WizardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitudPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});