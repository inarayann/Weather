import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { filter, Observable, Subscription, take } from 'rxjs';
import { AppState } from '../../app.config';
import { selectAuthenticated, selectAuthError, selectAuthLoading } from '../../store/selector/user.selector';
import { CommonModule } from '@angular/common';
import { RegisterPayload, UserActions } from '../../store/action/user.action';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  login_Form!: FormGroup;
  loading$: Observable<boolean>;
  isAuthenticated$: Observable<any | null>;
  error$: Observable<any | null>;
  initializeForm(): void {
    this.login_Form = this.fb.group({
      identifier: ['', Validators.required],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(16),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/)
      ],],
      rememberMe: [true]
    });
  }

  constructor(private title: Title, private store: Store<AppState>, private readonly fb: FormBuilder, private router: Router) {
    this.loading$ = this.store.select(selectAuthLoading);
    this.error$ = this.store.select(selectAuthError);
    this.isAuthenticated$ = this.store.select(selectAuthenticated);
  }
  authSubscription!: Subscription;
  ngOnInit(): void {
    this.title.setTitle("Weather - Login");
    this.initializeForm();
    this.handleRedirectionToHome()
  }

  handleRedirectionToHome() {
    this.authSubscription = this.isAuthenticated$.pipe(
      filter(isAuthenticated => isAuthenticated),
      take(1)
    ).subscribe(() => {
      console.log('Login successful, redirecting from component.');
      this.router.navigate(['/home']); // Redirect to home page
    });
  }

  onSubmit() {
    this.login_Form.markAllAsTouched();
    if (this.login_Form.valid) {
      console.log('Form submitted:', this.login_Form.value);
      this.store.dispatch(UserActions.loginRequest(this.login_Form.value));

    } else {
      console.log('Form is invalid');
    }
  }
}
