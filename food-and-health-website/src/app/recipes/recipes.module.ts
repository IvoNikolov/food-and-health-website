import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { RecipeListComponent } from './../recipes/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './../recipes/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './../recipes/recipe-list/recipe-item/recipe-item.component';
import { RecipeStartComponent } from './../recipes/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './../recipes/recipe-edit/recipe-edit.component';


@NgModule({
    declarations: [
        RecipeListComponent,
        RecipeDetailComponent,
        RecipeItemComponent,
        RecipeStartComponent,
        RecipeEditComponent,
    ],
    imports: [RouterModule, CommonModule, ReactiveFormsModule],
    exports: [
        RecipeListComponent,
        RecipeDetailComponent,
        RecipeItemComponent,
        RecipeStartComponent,
        RecipeEditComponent,
    ]
})

export class RecipesModule {

}