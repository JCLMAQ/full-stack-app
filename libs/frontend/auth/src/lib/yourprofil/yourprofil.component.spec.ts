import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YourprofilComponent } from './yourprofil.component';

describe('YourprofilComponent', () => {
  let component: YourprofilComponent;
  let fixture: ComponentFixture<YourprofilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [YourprofilComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YourprofilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
