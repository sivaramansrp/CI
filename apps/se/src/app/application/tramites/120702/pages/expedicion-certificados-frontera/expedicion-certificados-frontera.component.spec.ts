import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpedicionCertificadosFronteraComponent } from './expedicion-certificados-frontera.component';

describe('ExpedicionCertificadosFronteraComponent', () => {
  let component: ExpedicionCertificadosFronteraComponent;
  let fixture: ComponentFixture<ExpedicionCertificadosFronteraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpedicionCertificadosFronteraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpedicionCertificadosFronteraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
