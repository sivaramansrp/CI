import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AsignarCaatMaritimoComponent } from './asignar-caat-maritimo.component';

describe('AsignarCaatMaritimoComponent', () => {
  let component: AsignarCaatMaritimoComponent;
  let fixture: ComponentFixture<AsignarCaatMaritimoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsignarCaatMaritimoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AsignarCaatMaritimoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
