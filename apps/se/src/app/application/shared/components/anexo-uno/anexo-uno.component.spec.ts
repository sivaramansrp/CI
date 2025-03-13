import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnexoUnoComponent } from './anexo-uno.component';

describe('AnexoUnoComponent', () => {
  let component: AnexoUnoComponent;
  let fixture: ComponentFixture<AnexoUnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnexoUnoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AnexoUnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
