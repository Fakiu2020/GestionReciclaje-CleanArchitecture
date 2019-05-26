import {Routes} from '@angular/router';
import { ListUserComponent } from './users/list-user/list-user.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './_guards/auth.guard';
import { CreateUserComponent } from './users/create-user/create-user.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { DetailUserResolver } from './_resolvers/detail-user-resolvers';
import { ListUserResolver } from './_resolvers/list-user-resolvers';
import { HomeComponent } from './home/home.component';
import { ListPlantResolver } from './_resolvers/list-plant-resolvers';
import { CreatePlantComponent } from './plant/create-plant/create-plant.component';
import { EditPlantComponent } from './plant/edit-plant/edit-plant.component';
import { ListPlantComponent } from './plant/list-plant/list-plant.component';
import { DetailPlantResolver } from './_resolvers/detail-plant-resolvers';



export const appRoutes: Routes = [

    {path: 'login', component: LoginComponent},
    {path: 'home', component: HomeComponent},
    {
      path: '',
        runGuardsAndResolvers: 'pathParamsChange',
       // runGuardsAndResolvers: () => false,
       canActivate: [AuthGuard],
        children: [
            {path: 'users', component: ListUserComponent, resolve: {users: ListUserResolver}},

            {path: 'user/edit/:id', component: EditUserComponent, resolve: {user: DetailUserResolver} },

            {path: 'user/create', component: CreateUserComponent},

            {path: 'Plant', component: ListPlantComponent , resolve: {plants: ListPlantResolver} },

            {path: 'Plant/create', component: CreatePlantComponent  },

            {path: 'Plant/edit/:id', component: EditPlantComponent , resolve: {plant: DetailPlantResolver} },
        ]
     },
    {path: '', redirectTo: 'login', pathMatch: 'full'},
];
