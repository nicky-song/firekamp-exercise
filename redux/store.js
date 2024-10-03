import { legacy_createStore as createStore, combineReducers} from 'redux'
import discoverReducer from './reducers/discoverReducer'
import genresReducer from './reducers/genresReducer';

const rootReducer = combineReducers({
    discoverList: discoverReducer,
    genresList: genresReducer,
})

export const store = createStore(rootReducer);