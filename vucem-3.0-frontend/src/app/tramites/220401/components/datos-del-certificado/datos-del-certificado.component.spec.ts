import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosDelCertificadoComponent } from './datos-del-certificado.component';

describe('DatosDelComponent', () => {
  let component: DatosDelCertificadoComponent;
  let fixture: ComponentFixture<DatosDelCertificadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DatosDelCertificadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DatosDelCertificadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
