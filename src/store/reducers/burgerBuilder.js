import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/utility'
const initialState = {
	ingredients: null,
	totalPrice: 4,
	error: false,
	building: false
}

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};
const addIngredients = (state, action) => {
	const udpateIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 }
	const udpateIngredients = updateObject(state.ingredients, udpateIngredient)
	const updateState = {
		ingredients: udpateIngredients,
		totalPrice: state.totalPrice +  INGREDIENT_PRICES[action.ingredientName],
		building: true
	}
	return updateObject(state, updateState)
}
const removeIngredients= (state, action) => {
	const udpateIng = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 }
				const udpateIngs = updateObject(state.ingredients, udpateIng)
				const updateSt = {
					ingredients: udpateIngs,
					totalPrice: state.totalPrice -  INGREDIENT_PRICES[action.ingredientName],
					building: true
				}
				return updateObject(state, updateSt)
}
const setIngredients = (state, action) => {
	return updateObject(state, {
		ingredients: {
			salad: action.ingredients.salad,
			bacon: action.ingredients.bacon,
			meat: action.ingredients.meat,
			cheese: action.ingredients.cheese
		},
		totalPrice: 4,
		error: false,
		building: false
	})
}
const fetchIngredientsFail = (state, action) => {
	return updateObject(state, {
		error: true
	})
}
const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ADD_INGREDIENT: return addIngredients(state, action)
		case actionTypes.REMOVE_INGREDIENT: return removeIngredients(state, action)
		case actionTypes.SET_INGREDIENT: return setIngredients(state, action)
		case actionTypes.FETCH_INGREDIENT_FAILED: return fetchIngredientsFail(state, action) 
		default: return state
	}
}

export default reducer
