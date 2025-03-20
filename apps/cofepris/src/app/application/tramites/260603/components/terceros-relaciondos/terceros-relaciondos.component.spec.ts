import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TercerosRelaciondosComponent } from './terceros-relaciondos.component';

describe('TercerosRelaciondosComponent', () => {
  let component: TercerosRelaciondosComponent;
  let fixture: ComponentFixture<TercerosRelaciondosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TercerosRelaciondosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TercerosRelaciondosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
