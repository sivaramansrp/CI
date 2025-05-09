import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalidadDeLaGarantiaComponent } from './modalidad-de-la-garantia.component';

describe('ModalidadDeLaGarantiaComponent', () => {
  let component: ModalidadDeLaGarantiaComponent;
  let fixture: ComponentFixture<ModalidadDeLaGarantiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalidadDeLaGarantiaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalidadDeLaGarantiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
