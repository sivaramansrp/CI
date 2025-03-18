import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GestionarEmpresasSubfabricantesComponent } from './gestionar-empresas-subfabricante.component';

describe('EmpresasSubfabricanteComponent', () => {
  let component: GestionarEmpresasSubfabricantesComponent;
  let fixture: ComponentFixture<GestionarEmpresasSubfabricantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionarEmpresasSubfabricantesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GestionarEmpresasSubfabricantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
