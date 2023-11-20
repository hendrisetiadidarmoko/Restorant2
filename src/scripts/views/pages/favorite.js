import FavoriteRestaurantIdb from '../../data/favorite-restorant-idb';
import FavoriteRestaurantView from './liked-restaurant/favorite-restaurant-view';
import FavoriteRestaurantShowPresenter from './liked-restaurant/favorite-restaurant-show';
import FavoriteRestaurantSearchPresenter from './liked-restaurant/favorite-restaurant-search-presenter';

const view = new FavoriteRestaurantView();

const Favorite = {
  async render() {
    return view.getTemplate();
  },

  async afterRender() {
    // eslint-disable-next-line no-new
    new FavoriteRestaurantShowPresenter({ view, favoriteRestaurants: FavoriteRestaurantIdb });
    // eslint-disable-next-line no-new
    new FavoriteRestaurantSearchPresenter({ view, favoriteRestaurants: FavoriteRestaurantIdb });

    const skipLink = document.querySelector('.skip-link');
    skipLink.href = '#restaurants';
  },
};

export default Favorite;
