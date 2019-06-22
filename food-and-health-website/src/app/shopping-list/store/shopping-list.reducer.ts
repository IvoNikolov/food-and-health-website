import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';

const initialState = {
    ingredients: [
        new Ingredient('Potato', 5),
        new Ingredient('Onion', 2 )
      ]
};
export function ShoppingListReducer(state = initialState, action: ShoppingListActions.AddIngredient) {
    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIENT:
            return {
                ...state,
                ingredient: [...state.ingredients, action.payload]
            };
        default: return state;
    }
}
