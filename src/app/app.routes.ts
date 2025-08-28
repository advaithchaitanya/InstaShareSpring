import { Routes } from '@angular/router';
import { AuthComponent } from './Components/auth/auth.component';
import { HomeComponent } from './Components/home/home.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { MyProfileComponent } from './Components/my-profile/my-profile.component';
import { SearchComponent } from './Components/search/search.component';
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component';
import { MainComponent } from './Components/main/main.component';
import { SavedComponent } from './Components/saved/saved.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {path:'',component:AuthComponent},
    {path:'main',
        component:MainComponent,
        canActivate:[authGuard],
        children:[
            
            {path:'home',component:HomeComponent},
            {path:'user-profile/:id',component:ProfileComponent},
            {path:'my-profile',component:MyProfileComponent},
            {path:'search',component:SearchComponent},
            {path:'saved',component:SavedComponent},
            { path: '', redirectTo: 'home', pathMatch: 'full' },
        ]
    },
    {path:'**',component:PageNotFoundComponent}

];
