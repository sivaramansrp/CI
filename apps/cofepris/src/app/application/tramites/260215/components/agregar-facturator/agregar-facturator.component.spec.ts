import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarFacturatorComponent } from './agregar-facturator.component';

describe('AgregarFacturatorComponent', () => {
  let component: AgregarFacturatorComponent;
  let fixture: ComponentFixture<AgregarFacturatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarFacturatorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AgregarFacturatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
