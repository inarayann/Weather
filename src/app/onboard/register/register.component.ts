import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder, AbstractControl, ValidationErrors } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.config';
import { Observable } from 'rxjs';
import { selectAuthError, selectAuthLoading } from '../../store/selector/user.selector';
import { UserActions, RegisterPayload } from '../../store/action/user.action';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  register_Form!: FormGroup;
  loading$: Observable<boolean>;
  error$: Observable<any | null>;

  constructor(private store: Store<AppState>, private readonly fb: FormBuilder) {
    this.loading$ = this.store.select(selectAuthLoading);
    this.error$ = this.store.select(selectAuthError);
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.register_Form = this.fb.group({
       username: ['', Validators.required],
      name: [''],
      email: ['', [Validators.required, Validators.email]],
      
      dob: [''], 
      location: this.fb.group({
        lat: [null, [Validators.min(-90), Validators.max(90)]],
        lng: [null, [Validators.min(-180), Validators.max(180)]]
      }),
      lang: ['en'],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(16),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/)
      ]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (!password || !confirmPassword) {
      return null;
    }

    if (password.value !== confirmPassword.value) {
      if (!confirmPassword.hasError('mismatch')) {
        confirmPassword.setErrors({ mismatch: true });
      }
      return { passwordsMismatch: true };
    } else {
      if (confirmPassword.hasError('mismatch')) {
        confirmPassword.setErrors(null);
      }
      return null; // Passwords match, no error
    }
  }

  onSubmit(): void {
    this.register_Form.markAllAsTouched(); 
    if (this.register_Form.valid) {
      console.log('Form submitted:', this.register_Form.value);
      const registerData: RegisterPayload = this.register_Form.value;
      this.store.dispatch(UserActions.registerRequest({ registerData }));
    } else {
      console.log('Form is invalid');
    }
  }

  getForm(){
    return this.register_Form
  }
}