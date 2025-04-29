import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnexoUnoPestanaComponent } from './anexo-uno-pestana.component';

describe('AnexoUnoPestanaComponent', () => {
  let component: AnexoUnoPestanaComponent;
  let fixture: ComponentFixture<AnexoUnoPestanaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnexoUnoPestanaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AnexoUnoPestanaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
