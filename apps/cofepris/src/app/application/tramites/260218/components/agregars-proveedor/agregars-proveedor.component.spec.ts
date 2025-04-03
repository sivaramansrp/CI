import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarsProveedorComponent } from './agregars-proveedor.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AgregarsProveedorComponent', () => {
  let component: AgregarsProveedorComponent;
  let fixture: ComponentFixture<AgregarsProveedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarsProveedorComponent, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AgregarsProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
