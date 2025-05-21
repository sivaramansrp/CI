import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmpresasTerciarizadaasComponent } from './empresas-terciarizadaas.component';

describe('EmpresasTerciarizadaasComponent', () => {
  let component: EmpresasTerciarizadaasComponent;
  let fixture: ComponentFixture<EmpresasTerciarizadaasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpresasTerciarizadaasComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EmpresasTerciarizadaasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
