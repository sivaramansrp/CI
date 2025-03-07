import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroAvisoComponent } from './intro-aviso.component';
import { HttpClientModule } from '@angular/common/http';

describe('IntroAvisoComponent', () => {
  let component: IntroAvisoComponent;
  let fixture: ComponentFixture<IntroAvisoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntroAvisoComponent, HttpClientModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IntroAvisoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
