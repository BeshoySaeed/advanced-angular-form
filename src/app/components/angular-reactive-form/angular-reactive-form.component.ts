import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { Observable, take, tap } from 'rxjs';
import { SkillsService } from '../../services/skills.service';

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
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      firstName: '',
      lastName: '',
      nickName: '',
      email: '',
      passGroup: this.fb.group({
        password: '',
        confirm: '',
      }),
      phones: this.fb.array([
        this.fb.group({
          label: this.fb.nonNullable.control(this.phoneLabels[0]),
          phone: '',
        }),
      ]),
      skills: this.fb.record<boolean>({}),
    });
  }
  ngOnInit() {
    this.skill$ = this.skillsService
      .getSkills()
      .pipe(tap((skills) => this.addToForm(skills)));
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
}
