import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModPermisoSanitarioImportacion260904Component } from './mod-permiso-sanitario-importacion-260904.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ModPermisoSanitarioImportacion260904Component', () => {
  let component: ModPermisoSanitarioImportacion260904Component;
  let fixture: ComponentFixture<ModPermisoSanitarioImportacion260904Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModPermisoSanitarioImportacion260904Component],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ModPermisoSanitarioImportacion260904Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});