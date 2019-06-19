import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { RecipeListComponent } from './../recipes/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './../recipes/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './../recipes/recipe-list/recipe-item/recipe-item.component';
import { RecipeStartComponent } from './../recipes/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './../recipes/recipe-edit/recipe-edit.component';
import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipesComponent } from './recipes.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
    declarations: [
        RecipesComponent,
        RecipeListComponent,
        RecipeDetailComponent,
        RecipeItemComponent,
        RecipeStartComponent,
        RecipeEditComponent,
    ],
    imports: [
        RouterModule,
        ReactiveFormsModule,
        RecipesRoutingModule,
        SharedModule
    ]
})

export class RecipesModule {

}
