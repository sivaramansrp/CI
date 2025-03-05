import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TercerosRelacionadosComponent } from './terceros-relacionados.component';

describe('TercerosRelacionadosComponent', () => {
  let component: TercerosRelacionadosComponent;
  let fixture: ComponentFixture<TercerosRelacionadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TercerosRelacionadosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TercerosRelacionadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set enableScrollbar to true', () => {
    component.enableScrollbar = true;
    expect(component.enableScrollbar).toBe(true);
  });

  it('should set enableScrollbar to false', () => {
    component.enableScrollbar = false;
    expect(component.enableScrollbar).toBe(false);
  });

});