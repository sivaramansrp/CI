import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BusquedaPermisosComponent } from './busqueda-permisos.component';

describe('BusquedaPermisosComponent', () => {
  let component: BusquedaPermisosComponent;
  let fixture: ComponentFixture<BusquedaPermisosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusquedaPermisosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BusquedaPermisosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
