import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaosCertificadoComponent } from './daos-certificado.component';

describe('DaosCertificadoComponent', () => {
  let component: DaosCertificadoComponent;
  let fixture: ComponentFixture<DaosCertificadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DaosCertificadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DaosCertificadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
