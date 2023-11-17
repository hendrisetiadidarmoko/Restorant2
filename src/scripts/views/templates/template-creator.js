import CONFIG from '../../globals/config';

const createRestaurantTemplate = (restaurant) => `
    <div class="card">
        <img src="${CONFIG.BASE_IMAGE_URL + restaurant.pictureId}" alt="${restaurant.name}">
        <div class="content"> 
            <p class="ratting"><i class="fas fa-star">${restaurant.rating}</i></p>
            <h3 class="nema-restaurant"><a href="/#/detail/${restaurant.id}">${restaurant.name}</a></h3>
        </div>
    </div>
`;

const createRestaurantDetailTemplate = (restaurant) => `
<img src="${CONFIG.BASE_IMAGE_URL + restaurant.pictureId}" alt="${restaurant.name}">
<h2 class="nema-restaurant">${restaurant.name}</h2>
<p class="ratting"><i class="fas fa-star">${restaurant.rating}</i></p>
<div class="restaurant-info">
    <p>Kota                 : ${restaurant.city} </p>
    <p>Alamat               : ${restaurant.address} </p>
    <p>Deskripsi Restorant  : ${restaurant.description} </p>
    <div class="restaurant-categories">
        <p>Categories: ${restaurant.categories.map((category) => category.name).join(', ')}</p>
    </div>
    <div class="menu-section">
        <h2>Food Menu</h2>
        <ol class="menu-list">
            ${restaurant.menus.foods.map((food) => `<li class="menu-item">${food.name}</li>`).join('')}
        </ol>
    </div>
    <div class="menu-section">
        <h2>Drink Menu</h2>
        <ol class="menu-list">
            ${restaurant.menus.drinks.map((drink) => `<li class="menu-item">${drink.name}</li>`).join('')}
        </ol>
    </div>
    <div class="customer-reviews">
        <h2>Customer Reviews</h2>
        ${restaurant.customerReviews.map((review) => `
            <div class="customer-review">
                <p>Nama    : ${review.name}</p>
                <p>Review  : ${review.review}</p>
                <p>Tanggal : ${review.date}</p>
            </div>
            <hr>
        `).join('')}
    </div>
</div>


`;

const createLikeButtonTemplate = () => `
    <button aria-label="like this restaurant" id="likeButton" class="like">
        <i class="fa fa-heart-o" aria-hidden="true"></i>
    </button>
`;

const createLikedButtonTemplate = () => `
    <button aria-label="unlike this restaurant" id="likeButton" class="like">
        <i class="fa fa-heart" aria-hidden="true"></i>
    </button>
`;

export {
  createRestaurantTemplate,
  createRestaurantDetailTemplate,
  createLikeButtonTemplate,
  createLikedButtonTemplate,
};
