import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificadoDeOrigenComponent } from './certificado-de-origen.component';

describe('CertificadoDeOrigenComponent', () => {
  let component: CertificadoDeOrigenComponent;
  let fixture: ComponentFixture<CertificadoDeOrigenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CertificadoDeOrigenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CertificadoDeOrigenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
