import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeccionSubcontratadosComponent } from './seccion-subcontratados.component';

describe('SeccionSubcontratadosComponent', () => {
  let component: SeccionSubcontratadosComponent;
  let fixture: ComponentFixture<SeccionSubcontratadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SeccionSubcontratadosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SeccionSubcontratadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
