import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProveedorExtranjeroComponent } from './proveedorExtranjero.component';

describe('ProveedorExtranjeroComponent', () => {
  let component: ProveedorExtranjeroComponent;
  let fixture: ComponentFixture<ProveedorExtranjeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProveedorExtranjeroComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProveedorExtranjeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
