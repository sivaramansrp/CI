import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificarCaatMaritimoComponent } from './modificar-caat-maritimo.component';

describe('ModificarCaatMaritimoComponent', () => {
  let component: ModificarCaatMaritimoComponent;
  let fixture: ComponentFixture<ModificarCaatMaritimoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificarCaatMaritimoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModificarCaatMaritimoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
