import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PermisoSanitarioComponent } from './permiso-sanitario.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('SanitaryPermitComponent', () => {
  let component: PermisoSanitarioComponent;
  let fixture: ComponentFixture<PermisoSanitarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PermisoSanitarioComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(PermisoSanitarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
