import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesProveedoresExtrajeroComponent } from './clientes-proveedores-extrajero.component';

describe('ClientesProveedoresExtrajeroComponent', () => {
  let component: ClientesProveedoresExtrajeroComponent;
  let fixture: ComponentFixture<ClientesProveedoresExtrajeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientesProveedoresExtrajeroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientesProveedoresExtrajeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
