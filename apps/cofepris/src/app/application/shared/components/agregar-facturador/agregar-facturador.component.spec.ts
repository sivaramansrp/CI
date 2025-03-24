import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarFacturadorComponent } from './agregar-facturador.component';

describe('AgregarFacturadorComponent', () => {
  let component: AgregarFacturadorComponent;
  let fixture: ComponentFixture<AgregarFacturadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarFacturadorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AgregarFacturadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
