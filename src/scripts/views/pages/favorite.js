import FavoriteRestaurantIdb from '../../data/favorite-restorant-idb';
import { createRestaurantTemplate } from '../templates/template-creator';

const Favorite = {
  async render() {
    return `
          <section class="restorant-list" id="maincontent">
            <h2>Favorite Restaurant</h2>
          </section>
            `;
  },

  async afterRender() {
    const restorant = await FavoriteRestaurantIdb.getAllRestaurant();
    const restorantContainer = document.querySelector('#maincontent');

    restorant.forEach((restaurant) => {
      restorantContainer.innerHTML += createRestaurantTemplate(restaurant);
    });

    const skipLink = document.querySelector('.skip-link');
    skipLink.href = '#maincontent';
  },
};

export default Favorite;
