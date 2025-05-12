import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermisoDeRetiroComponent } from './permiso-de-retiro.component';

describe('PermisoDeRetiroComponent', () => {
  let component: PermisoDeRetiroComponent;
  let fixture: ComponentFixture<PermisoDeRetiroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PermisoDeRetiroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PermisoDeRetiroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});