import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermisoDeRetiroComponent } from './permiso-de-retiro.component';
import { provideHttpClient } from '@angular/common/http';

describe('PermisoDeRetiroComponent', () => {
  let component: PermisoDeRetiroComponent;
  let fixture: ComponentFixture<PermisoDeRetiroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [PermisoDeRetiroComponent],
      providers: [provideHttpClient()]
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