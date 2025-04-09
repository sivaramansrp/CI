import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CriterioDeDictamenComponent } from './criterio-de-dictamen.component';

describe('CriterioDeDictamenComponent', () => {
  let component: CriterioDeDictamenComponent;
  let fixture: ComponentFixture<CriterioDeDictamenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CriterioDeDictamenComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CriterioDeDictamenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
