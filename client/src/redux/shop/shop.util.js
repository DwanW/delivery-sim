async function postData(url = '', data = {}) {
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    return response.json()
}

export const remapCollection = async (collections) => {
    let newRestaurantList =[];
    let newCollections = {};
    let arr = collections.best_rated_restaurant
    for( let i = 0; i<arr.length; i++){
        let menu = []
        await postData('http://127.0.0.1:5000/getmenu', arr[i].restaurant.cuisines.split(',').map(str=> str.trim())).then(data => menu.push(data))
        newRestaurantList.push({
            all_reviews_count:arr[i].restaurant.all_reviews_count,
            cuisine_menu: menu[0],
            featured_image: arr[i].restaurant.featured_image,
            id: arr[i].restaurant.id,
            name : arr[i].restaurant.name,
            user_rating: arr[i].restaurant.user_rating
        })
    }
    newCollections.best_rated_restaurant = newRestaurantList;
    newCollections.location = collections.location;
    return newCollections;
}