import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaisDeOriginComponent } from './pais-de-origin.component';

describe('PaisDeOriginComponent', () => {
  let component: PaisDeOriginComponent;
  let fixture: ComponentFixture<PaisDeOriginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaisDeOriginComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PaisDeOriginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
