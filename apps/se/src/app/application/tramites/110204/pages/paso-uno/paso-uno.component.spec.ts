import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasoUnoComponent } from './paso-uno.component';
import { HttpClientModule } from '@angular/common/http';
import { SolicitanteComponent } from '@libs/shared/data-access-user/src';
import { CertificadoOrigenComponent } from '../../components/certificado-origen/certificado-origen.component';
import { DatosCertificadoComponent } from '../../components/datos-certificado/datos-certificado.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

describe('PasoUnoComponent', () => {
  let component: PasoUnoComponent;
  let fixture: ComponentFixture<PasoUnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SolicitanteComponent,
        CertificadoOrigenComponent,
        DatosCertificadoComponent,
        ReactiveFormsModule,
        CommonModule,
        HttpClientModule],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
