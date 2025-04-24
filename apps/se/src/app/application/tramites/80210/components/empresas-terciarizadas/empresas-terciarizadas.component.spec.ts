import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmpresasTerciarizadasComponent } from './empresas-terciarizadas.component';

describe('EmpresasTerciarizadasComponent', () => {
  let component: EmpresasTerciarizadasComponent;
  let fixture: ComponentFixture<EmpresasTerciarizadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpresasTerciarizadasComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EmpresasTerciarizadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
