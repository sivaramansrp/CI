import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaisDeOrigenComponent } from './pais-de-origen.component';

describe('PaisDeOrigenComponent', () => {
  let component: PaisDeOrigenComponent;
  let fixture: ComponentFixture<PaisDeOrigenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaisDeOrigenComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PaisDeOrigenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
