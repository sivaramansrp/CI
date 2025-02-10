import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetosGenDelComponent } from './detos-gen-del.component';

describe('DetosGenDelComponent', () => {
  let component: DetosGenDelComponent;
  let fixture: ComponentFixture<DetosGenDelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetosGenDelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetosGenDelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
