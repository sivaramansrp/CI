import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SeleccionModuloComponent } from './seleccion-modulo.component';

describe('SeleccionModuloComponent', () => {
  let component: SeleccionModuloComponent;
  let fixture: ComponentFixture<SeleccionModuloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeleccionModuloComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SeleccionModuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
