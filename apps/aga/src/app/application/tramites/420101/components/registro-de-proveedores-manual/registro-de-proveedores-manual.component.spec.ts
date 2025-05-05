import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroDeProveedoresManualComponent } from './registro-de-proveedores-manual.component';

describe('RegistroDeProveedoresManualComponent', () => {
  let component: RegistroDeProveedoresManualComponent;
  let fixture: ComponentFixture<RegistroDeProveedoresManualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroDeProveedoresManualComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroDeProveedoresManualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
