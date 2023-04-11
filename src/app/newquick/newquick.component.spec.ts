import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewquickComponent } from './newquick.component';

describe('NewquickComponent', () => {
  let component: NewquickComponent;
  let fixture: ComponentFixture<NewquickComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewquickComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewquickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
