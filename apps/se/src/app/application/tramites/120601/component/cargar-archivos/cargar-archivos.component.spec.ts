import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CargarArchivosComponent } from './cargar-archivos.component';

describe('CargarArchivosComponent', () => {
  let component: CargarArchivosComponent;
  let fixture: ComponentFixture<CargarArchivosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CargarArchivosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CargarArchivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
