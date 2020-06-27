import ShopActionTypes from './shop.types';
import { remapCollection } from './shop.util';

const fetchCollectionsStart = () => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_START,
});

const fetchCollectionsSuccess = collections => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collections
});

const fetchCollectionsFailure = errorMsg => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload: errorMsg
})

export const fetchCollectionsStartAsync = (query) => {
    const str = query.replace(" ", "%")
    const apiKey = process.env.REACT_APP_API_KEY;

    return async dispatch => {
        dispatch(fetchCollectionsStart())
        try {
            const locationResult = await fetch('https://developers.zomato.com/api/v2.1/locations?query=' + str, {
                method: 'GET',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                    'user-key': apiKey
                }
            });

            const locationData = await locationResult.json().then(data => data.location_suggestions[0]);

            const entity_id = locationData.entity_id;
            const entity_type = locationData.entity_type;

            const collectionResult = await fetch(`https://developers.zomato.com/api/v2.1/location_details?entity_id=${entity_id}&entity_type=${entity_type}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                    'user-key': apiKey
                }
            });

            let newData = await collectionResult.json().then(data => remapCollection(data));
            dispatch(fetchCollectionsSuccess(newData))
        } catch (error) {
            dispatch(fetchCollectionsFailure(error.message));
        }
    }
}