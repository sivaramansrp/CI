import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LicitacionesVigentesComponent } from './licitaciones-vigentes.component';
describe('LicitacionesVigentesComponent', () => {
  let component: LicitacionesVigentesComponent;
  let fixture: ComponentFixture<LicitacionesVigentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LicitacionesVigentesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LicitacionesVigentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
