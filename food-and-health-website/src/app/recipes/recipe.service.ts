import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';


@Injectable()
export class RecipeService {

    private recipes: Recipe[] = [
        new Recipe('Soup',
        'Homemade soup',
        'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/recipe-image-legacy-id-1074500_11.jpg',
        [
            new Ingredient('Tomatoes', 2),
            new Ingredient('Potatoes', 1)
        ]),
        new Recipe('Pizza',
        'Homemade pizza',
        'https://upload.wikimedia.org/wikipedia/commons/a/a3/Eq_it-na_pizza-margherita_sep2005_sml.jpg',
        [
            new Ingredient('Tomatoes', 2),
            new Ingredient('Salami', 1),
            new Ingredient('Doe', 1)
        ])
    ];

    constructor(private slService: ShoppingListService){

    }

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    addingredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }
}
