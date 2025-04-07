import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CamCertificadoComponent } from './cam-certificado.component';
import { BtnContinuarComponent, CatalogoSelectComponent, SharedModule, SolicitanteComponent, WizardComponent } from '@libs/shared/data-access-user/src';
import { ReactiveFormsModule } from '@angular/forms';
import { CertificadoDeOrigenComponent } from '../../../110201/components/certificado-de-origen/certificado-de-origen.component';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { PasoDosComponent } from '../paso-dos/paso-dos.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CamCertificadoComponent', () => {
  let component: CamCertificadoComponent;
  let fixture: ComponentFixture<CamCertificadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CamCertificadoComponent,PasoUnoComponent,PasoDosComponent],
      imports: [
    SharedModule,
    ReactiveFormsModule,
    WizardComponent,
    BtnContinuarComponent,
    CatalogoSelectComponent,
    CertificadoDeOrigenComponent,
    SolicitanteComponent,
    HttpClientTestingModule
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CamCertificadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
