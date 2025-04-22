import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudPageComponent } from './solicitud-page.component';
import { BtnContinuarComponent, SolicitanteComponent, WizardComponent } from '@libs/shared/data-access-user/src';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { PasoDosComponent } from '../paso-dos/paso-dos.component';
import { PasoTresComponent } from '../paso-tres/paso-tres.component';
import { HttpClientModule } from '@angular/common/http';

describe('SolicitudPageComponent', () => {
  let component: SolicitudPageComponent;
  let fixture: ComponentFixture<SolicitudPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        SolicitudPageComponent,
        PasoUnoComponent,
        PasoDosComponent,
        PasoTresComponent
      ],
      imports: [
        WizardComponent,
        BtnContinuarComponent,
        SolicitanteComponent,
        HttpClientModule
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SolicitudPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
