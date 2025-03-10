import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PermisoMaquilaComponent } from './permiso-maquila.component';
describe('PermisoMaquilaComponent', () => {
  let component: PermisoMaquilaComponent;
  let fixture: ComponentFixture<PermisoMaquilaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PermisoMaquilaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PermisoMaquilaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
