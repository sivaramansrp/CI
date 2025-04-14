import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RetornoImportacionTemporalComponent } from './retorno-importacion-temporal-page.component';

describe('PageComponent', () => {
  let component: RetornoImportacionTemporalComponent;
  let fixture: ComponentFixture<RetornoImportacionTemporalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RetornoImportacionTemporalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RetornoImportacionTemporalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
