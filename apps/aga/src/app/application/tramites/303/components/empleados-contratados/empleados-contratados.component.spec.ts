import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadosContratadosComponent } from './empleados-contratados.component';

describe('EmpleadosContratadosComponent', () => {
  let component: EmpleadosContratadosComponent;
  let fixture: ComponentFixture<EmpleadosContratadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmpleadosContratadosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmpleadosContratadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
