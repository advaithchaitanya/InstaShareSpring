import { Injectable } from '@angular/core';
import { MyDetailsDTO } from '../app.component';
import { HttpClient } from '@angular/common/http';
import { MainService } from './main.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private currentUser: MyDetailsDTO | null = null;
  private isLoaded = false; // so we don’t refetch on every call

  constructor(private http: HttpClient,public mainService:MainService) {}

  /**
   * Loads the logged-in user's details from backend (/getMe).
   * Only calls API if we haven’t loaded yet.
   */
  loadCurrentUser() {
    this.mainService.getMe().subscribe({
      next: (user) => {
        this.currentUser = user;
        console.log('Current user loaded:', user);
      },
      error: (err) => {
        console.log('Could not load user', err);
        this.currentUser = null;
      },
    });
  }

  /**
   * Get the cached user synchronously (may be null if not loaded yet).
   */
  getCurrentUser(): MyDetailsDTO | null {
    return this.currentUser;
  }

  /**
   * Set user manually (e.g. after login).
   */
  setCurrentUser(user: MyDetailsDTO | null) {
    this.currentUser = user;
    this.isLoaded = true;
  }

  /**
   * Clears user (e.g. on logout).
   */
  clearUser() {
    this.currentUser = null;
    this.isLoaded = false;
  }
  
}
