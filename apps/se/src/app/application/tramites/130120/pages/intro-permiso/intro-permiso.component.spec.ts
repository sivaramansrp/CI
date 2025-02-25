import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroPermisoComponent } from './intro-permiso.component';

describe('IntroPermisoComponent', () => {
  let component: IntroPermisoComponent;
  let fixture: ComponentFixture<IntroPermisoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IntroPermisoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IntroPermisoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});