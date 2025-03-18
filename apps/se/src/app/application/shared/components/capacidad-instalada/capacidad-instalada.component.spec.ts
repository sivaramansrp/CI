import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CapacidadInstaladaComponent } from './capacidad-instalada.component';

describe('CapacidadInstaladaComponent', () => {
  let component: CapacidadInstaladaComponent;
  let fixture: ComponentFixture<CapacidadInstaladaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CapacidadInstaladaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CapacidadInstaladaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
