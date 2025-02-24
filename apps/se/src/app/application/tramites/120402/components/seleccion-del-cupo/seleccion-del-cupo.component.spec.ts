import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SeleccionDelCupoComponent } from './seleccion-del-cupo.component';

describe('SeleccionDelCupoComponent', () => {
  let component: SeleccionDelCupoComponent;
  let fixture: ComponentFixture<SeleccionDelCupoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeleccionDelCupoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SeleccionDelCupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
