import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ReactiveFormDemo';

  constructor(private fb: FormBuilder) {}

  formGroup = this.fb.group({
    field00: ['Hello World', [Validators.required, Validators.minLength(5)]],
    field01: [1, [Validators.min(5)]]
  });

  click() {
    this.formGroup.patchValue({
      field00: '',
      field01: ''
    });
  }

  range(i: number) {
    return new Array(i);
  }
}
