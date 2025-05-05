import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarDeProveedoresComponent } from './registrar-de-proveedores.component';

describe('RegistrarDeProveedoresComponent', () => {
  let component: RegistrarDeProveedoresComponent;
  let fixture: ComponentFixture<RegistrarDeProveedoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarDeProveedoresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarDeProveedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
