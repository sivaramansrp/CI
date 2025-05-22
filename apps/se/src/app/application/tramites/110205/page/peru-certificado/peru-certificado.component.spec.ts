import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertComponent, BtnContinuarComponent, CatalogoSelectComponent, SharedModule, SolicitanteComponent, WizardComponent } from '@libs/shared/data-access-user/src';
import { ReactiveFormsModule } from '@angular/forms';
import { CertificadoDeOrigenComponent } from '../../../110201/components/certificado-de-origen/certificado-de-origen.component';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { PasoDosComponent } from '../paso-dos/paso-dos.component';
import { PeruCertificadoComponent } from './peru-certificado.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PeruCertificadoComponent', () => {
  let component: PeruCertificadoComponent;
  let fixture: ComponentFixture<PeruCertificadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PeruCertificadoComponent,PasoUnoComponent,PasoDosComponent],
      imports: [
    SharedModule,
    ReactiveFormsModule,
    WizardComponent,
    BtnContinuarComponent,
    CatalogoSelectComponent,
    CertificadoDeOrigenComponent,
    SolicitanteComponent,
    HttpClientTestingModule,
    AlertComponent
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PeruCertificadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
