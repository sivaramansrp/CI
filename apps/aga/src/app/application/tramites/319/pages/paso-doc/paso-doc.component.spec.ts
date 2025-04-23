import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoDocComponent } from './paso-doc.component';

describe('PasoDocComponent', () => {
  let component: PasoDocComponent;
  let fixture: ComponentFixture<PasoDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasoDocComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PasoDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
