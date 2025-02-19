import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarMiembroDeLaEmpresaComponent } from './agregar-miembro-de-la-empresa.component';

describe('AgregarMiembroDeLaEmpresaComponent', () => {
  let component: AgregarMiembroDeLaEmpresaComponent;
  let fixture: ComponentFixture<AgregarMiembroDeLaEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgregarMiembroDeLaEmpresaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgregarMiembroDeLaEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
