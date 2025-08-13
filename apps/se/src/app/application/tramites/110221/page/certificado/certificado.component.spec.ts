import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CertificadoComponent } from './certificado.component';
import { AlertComponent, BtnContinuarComponent, CatalogoSelectComponent, SharedModule, SolicitanteComponent, WizardComponent } from '@libs/shared/data-access-user/src';
import { ReactiveFormsModule } from '@angular/forms';
import { CertificadoDeOrigenComponent } from '../../../110201/components/certificado-de-origen/certificado-de-origen.component';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { PasoDosComponent } from '../paso-dos/paso-dos.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CertificadoComponent', () => {
  let component: CertificadoComponent;
  let fixture: ComponentFixture<CertificadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [CertificadoComponent,PasoUnoComponent,PasoDosComponent],
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

    fixture = TestBed.createComponent(CertificadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
