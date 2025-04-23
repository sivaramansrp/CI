import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OperacionesDeComercioExteriorComponent } from './operaciones-de-comercio-exterior.component';

describe('OperacionesDeComercioExteriorComponent', () => {
  let component: OperacionesDeComercioExteriorComponent;
  let fixture: ComponentFixture<OperacionesDeComercioExteriorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OperacionesDeComercioExteriorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OperacionesDeComercioExteriorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
