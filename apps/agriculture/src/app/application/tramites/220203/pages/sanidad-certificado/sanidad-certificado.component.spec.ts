import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SanidadCertificadoComponent } from './sanidad-certificado.component';

describe('SanidadCertificadoComponent', () => {
  let component: SanidadCertificadoComponent;
  let fixture: ComponentFixture<SanidadCertificadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SanidadCertificadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SanidadCertificadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
