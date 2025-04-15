import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdicionFraccionComponent } from './adicionFraccion.component';

describe('AdicionFraccionComponent', () => {
  let component: AdicionFraccionComponent;
  let fixture: ComponentFixture<AdicionFraccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdicionFraccionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdicionFraccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
