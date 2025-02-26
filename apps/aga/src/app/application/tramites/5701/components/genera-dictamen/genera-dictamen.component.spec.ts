import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneraDictamenComponent } from './genera-dictamen.component';

describe('GeneraDictamenComponent', () => {
  let component: GeneraDictamenComponent;
  let fixture: ComponentFixture<GeneraDictamenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GeneraDictamenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GeneraDictamenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
