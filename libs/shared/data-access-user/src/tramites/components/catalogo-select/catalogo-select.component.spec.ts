import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoSelectComponent } from './catalogo-select.component';

describe('CatalogoSelectComponent', () => {
  let component: CatalogoSelectComponent;
  let fixture: ComponentFixture<CatalogoSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CatalogoSelectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CatalogoSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
