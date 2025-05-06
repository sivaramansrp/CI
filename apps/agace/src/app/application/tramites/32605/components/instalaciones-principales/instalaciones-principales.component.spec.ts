import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstalacionesPrincipalesComponent } from './instalaciones-principales.component';

describe('InstalacionesPrincipalesComponent', () => {
  let component: InstalacionesPrincipalesComponent;
  let fixture: ComponentFixture<InstalacionesPrincipalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InstalacionesPrincipalesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InstalacionesPrincipalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
