import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { map, switchMap } from 'rxjs/operators';
import * as RecipeActions from '../store/recipe.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router,
              private store: Store<fromApp.AppState>) { }

  ngOnInit() {
   this.route.params.pipe(map(params => {
     return +params.id;
   }), switchMap(id => {
      this.id = id;
      return this.store.select('recipes');
   }), map(recipesState => {
    return recipesState.recipes.find((recipe, index) => {
      return index === this.id;
    });
  })).subscribe(recipe => {
    this.recipe = recipe;
  });
  /*
    .subscribe((params: Params) => {
     this.id = +params.id;
     this.recipe = this.recipeService.getRecipe(this.id);
     this.store.select('recipes').pipe(
      map(recipesState => {
        return recipesState.recipes.find((recipe, index) => {
          return index === this.id;
        });
      })
     )
     .subscribe(recipe => {
       this.recipe = recipe;
     });
      */
  
// });
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteRecipe() {
    // this.recipeService.deleteRecipe(this.id);
    this.store.dispatch(new RecipeActions.DeleteRecipes(this.id));
    this.router.navigate(['/recipes']);
  }
}
