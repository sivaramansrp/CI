import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarMiembrosEmpresaComponent } from './agregar-miembros-empresa.component';

describe('AgregarMiembrosEmpresaComponent', () => {
  let component: AgregarMiembrosEmpresaComponent;
  let fixture: ComponentFixture<AgregarMiembrosEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgregarMiembrosEmpresaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgregarMiembrosEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
