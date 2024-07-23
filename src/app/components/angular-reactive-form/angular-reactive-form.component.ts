import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Observable, take, tap } from 'rxjs';
import { SkillsService } from '../../services/skills.service';
import { banWord } from '../../validators-functions/banWord';
import { passwordConfirmation } from '../../validators-functions/validatePassword';
import { AsyncValidator } from '../../validators-functions/async-validator';

@Component({
  selector: 'app-angular-reactive-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './angular-reactive-form.component.html',
  styleUrl: './angular-reactive-form.component.css',
})
export class AngularReactiveFormComponent {
  phoneLabels = ['phone', 'mobile', 'home', 'work'];
  skill$!: Observable<string[]>;
  form: FormGroup;
  constructor(
    private skillsService: SkillsService,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    private asyncValidators: AsyncValidator
  ) {
    this.form = this.fb.group({
      firstName: [
        '',
        {
          validators: [
            Validators.required,
            Validators.minLength(2),
            banWord(['test', 'test1', 'dummy']),
          ],
          asyncValidators: [
            this.asyncValidators.validate.bind(this.asyncValidators),
          ],
          updateOn: 'blur',
        },
      ],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      nickName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern(/^[\w.]+$/),
        ],
      ],
      email: ['', [Validators.email]],
      passGroup: this.fb.group(
        {
          password: [
            '',
            [Validators.pattern(/^[A-Z]{2}[0-9]{6}$/), Validators.required],
          ],
          confirm: [{ value: '', disabled: true }, [Validators.required]],
        },
        {
          validators: [passwordConfirmation],
        }
      ),
      phones: this.fb.array([
        this.fb.group({
          label: this.fb.nonNullable.control(this.phoneLabels[0]),
          phone: '',
        }),
      ]),
      skills: this.fb.record<boolean>({}),
    });
  }

  @ViewChild(FormGroupDirective)
  private formDir!: FormGroupDirective;

  ngOnInit() {
    this.skill$ = this.skillsService
      .getSkills()
      .pipe(tap((skills) => this.addToForm(skills)));
    this.form.get('passGroup.password')?.valueChanges.subscribe((pass) => {
      const confirmControl = this.form.get('passGroup.confirm');
      const passwordControl = this.form.get('passGroup.password');

      if (pass && passwordControl?.valid) {
        confirmControl?.enable();
      } else {
        confirmControl?.disable();
      }
      confirmControl?.updateValueAndValidity();
    });
  }
  ngOnChange() {}
  ngOnDestroy() {}

  get phones(): FormArray {
    return this.form.get('phones') as FormArray;
  }
  get skills(): FormGroup {
    return this.form.get('skills') as FormGroup;
  }

  addControl() {
    this.phones.push(
      new FormGroup({
        label: new FormControl(this.phoneLabels[0], { nonNullable: true }),
        phone: new FormControl(''),
      })
    );
  }
  removeControl(i: number) {
    this.phones.removeAt(i);
  }

  getSkills() {}

  addToForm(skills: string[]) {
    skills.forEach((sk) =>
      this.skills.addControl(sk, new FormControl(false, { nonNullable: true }))
    );
    this.cdr.detectChanges();
  }

  onSubmit() {
    console.log(this.formDir);
    // this.form.reset();
    this.formDir.resetForm();
  }
}
