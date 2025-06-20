import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BtnContinuarComponent } from '@ng-mf/data-access-user';

import { HttpClientModule } from '@angular/common/http';

import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { SolicitanteComponent } from '@ng-mf/data-access-user';
import { SolicitudPageComponent } from './solicitud-page.component';
import { WizardComponent } from '@ng-mf/data-access-user';

describe('SolicitudPageComponent', () => {
  let component: SolicitudPageComponent;
  let fixture: ComponentFixture<SolicitudPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        WizardComponent,
        BtnContinuarComponent,
        SolicitanteComponent,
        HttpClientModule,
        PasoUnoComponent,
      ],
      declarations: [SolicitudPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitudPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
