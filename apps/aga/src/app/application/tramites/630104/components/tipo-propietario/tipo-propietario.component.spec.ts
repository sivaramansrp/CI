import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TipoPropietarioComponent } from './tipo-propietario.component';

describe('TipoPropietarioComponent', () => {
  let component: TipoPropietarioComponent;
  let fixture: ComponentFixture<TipoPropietarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipoPropietarioComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TipoPropietarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
