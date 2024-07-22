# 🌟 Advanced Forms in Angular 🌟

Welcome to the **Advanced Forms in Angular** repository! This project demonstrates how to use both **template-driven** and **reactive forms** in Angular, along with custom validators, including directives and asynchronous validators. 🚀

## Table of Contents 📚

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Template-Driven Forms](#template-driven-forms)
- [Reactive Forms](#reactive-forms)
- [Custom Validators](#custom-validators)
  - [Directive Validators](#directive-validators)
  - [Async Validators](#async-validators)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This project provides a comprehensive guide and example code for implementing advanced forms in Angular. Whether you prefer **template-driven** forms or **reactive** forms, this repository has got you covered! 🛠️

## Features

- 🌐 Template-Driven Forms
- 🧩 Reactive Forms
- 🛡️ Custom Directive Validators
- ⏳ Asynchronous Validators
- 🎨 Attractive and Interactive UI

## Installation

First, clone the repository:

```bash
git https://github.com/BeshoySaeed/advanced-angular-form.git
cd projectPath
```

Then, install the dependencies:

```bash
npm install
```

## Usage

To start the development server, run:

```bash
ng serve
```

Open your browser and navigate to `http://localhost:4200` to see the application in action! 🌟

## Template-Driven Forms

Template-driven forms rely on Angular directives to create forms. They are simpler to use but less scalable for complex forms.

### Example

```html
<form #form="ngForm" (ngSubmit)="onSubmit(form)">
  <input type="text" name="name" ngModel required />
  <button type="submit">Submit</button>
</form>
```

### Handling Form Submission

```typescript
onSubmit(form: NgForm) {
  console.log('Form Submitted!', form.value);
}
```

## Reactive Forms

Reactive forms provide a model-driven approach to handling form inputs. They are more powerful and scalable for complex forms.

### Example

```typescript
import { FormGroup, FormControl } from "@angular/forms";

this.form = new FormGroup({
  name: new FormControl("", [Validators.required]),
});
```

### Template

```html
<form [formGroup]="form" (ngSubmit)="onSubmit()">
  <input type="text" formControlName="name" />
  <button type="submit">Submit</button>
</form>
```

### Handling Form Submission

```typescript
onSubmit() {
  console.log('Form Submitted!', this.form.value);
}
```

## Custom Validators

### Directive Validators

Custom validators can be created as directives to encapsulate validation logic.

### Example

```typescript
import { Directive } from "@angular/core";
import {
  NG_VALIDATORS,
  Validator,
  AbstractControl,
  ValidationErrors,
} from "@angular/forms";

@Directive({
  selector: "[appCustomValidator]",
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: CustomValidatorDirective,
      multi: true,
    },
  ],
})
export class CustomValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    // Custom validation logic
    return control.value ? null : { customError: "This field is required" };
  }
}
```

### Usage in Template

```html
<input type="text" name="customField" ngModel appCustomValidator />
```

### Async Validators

Asynchronous validators allow you to perform validation that requires a server call or other asynchronous operations.

### Example

```typescript
import { ValidatorFn, AbstractControl } from "@angular/forms";
import { Observable, of } from "rxjs";
import { delay, map } from "rxjs/operators";

export function asyncValidator(): ValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return of(control.value).pipe(
      delay(1000),
      map((value) => (value ? null : { asyncError: "Async validation failed" }))
    );
  };
}
```

### Usage in Reactive Form

```typescript
this.form = new FormGroup({
  name: new FormControl("", [], [asyncValidator()]),
});
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. Let's make this project even more awesome together! 💪

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Made with ❤️ by [Bishoy](https://github.com/BeshoySaeed)
