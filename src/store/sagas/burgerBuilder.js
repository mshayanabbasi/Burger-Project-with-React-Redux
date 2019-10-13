import axios from '../../axios-orders'
import { put } from 'redux-saga/effects'
import * as actions from '../actions/index'
export function* initIngredientsSaga(action) {
    const response = yield axios.get( 'https://react-my-burger-15db7.firebaseio.com/ingredients.json' )
        try {
			yield put(actions.setIngredient(response.data))
        }
		catch(error){
			yield put(actions.fetchIngredientFailed(error))
        }   
}