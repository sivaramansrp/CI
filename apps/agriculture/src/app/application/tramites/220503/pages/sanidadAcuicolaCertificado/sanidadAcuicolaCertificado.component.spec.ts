import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SanidadAcuicolaCertificadoComponent } from './sanidadAcuicolaCertificado.component';

describe('SanidadAcuicolaCertificadoComponent', () => {
  let component: SanidadAcuicolaCertificadoComponent;
  let fixture: ComponentFixture<SanidadAcuicolaCertificadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SanidadAcuicolaCertificadoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SanidadAcuicolaCertificadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
