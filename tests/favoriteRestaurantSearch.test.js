import {
  beforeEach, describe, expect, it, jest,
} from '@jest/globals';
import FavoriteRestaurantSearchPresenter from '../src/scripts/views/pages/liked-restaurant/favorite-restaurant-search-presenter';
import FavoriteRestaurantView from '../src/scripts/views/pages/liked-restaurant/favorite-restaurant-view';

// eslint-disable-next-line
describe("Searching restaurants", () => {
  // eslint-disable-next-line no-unused-vars
  let presenter;
  let favoriteRestaurants;
  let view;

  const searchRestaurants = (query) => {
    const queryElement = document.getElementById('query');
    queryElement.value = query;
    queryElement.dispatchEvent(new Event('change'));
  };

  const setRestaurantSearchContainer = () => {
    view = new FavoriteRestaurantView();
    document.body.innerHTML = view.getTemplate();
  };

  const constructPresenter = () => {
    favoriteRestaurants = {
      // eslint-disable-next-line no-undef
      getAllRestaurant: jest.fn(),
      // eslint-disable-next-line no-undef
      searchRestaurants: jest.fn(),
    };

    // eslint-disable-next-line no-undef
    presenter = new FavoriteRestaurantSearchPresenter({
      favoriteRestaurants,
      view,
    });
  };

  // eslint-disable-next-line no-undef
  beforeEach(() => {
    setRestaurantSearchContainer();
    constructPresenter();
  });

  // eslint-disable-next-line no-undef
  describe('When query is not empty', () => {
    // eslint-disable-next-line no-undef
    it('should be able to capture the query typed by the user', () => {
      favoriteRestaurants.searchRestaurants.mockImplementation(() => []);

      searchRestaurants('restaurant a');

      // eslint-disable-next-line no-undef
      expect(presenter.latestQuery).toEqual('restaurant a');
    });

    // eslint-disable-next-line no-undef
    it('should ask the model to search for liked restaurants', () => {
      favoriteRestaurants.searchRestaurants.mockImplementation(() => []);

      searchRestaurants('restaurant a');

      // eslint-disable-next-line no-undef
      expect(favoriteRestaurants.searchRestaurants).toHaveBeenCalledWith('restaurant a');
    });

    // eslint-disable-next-line no-undef
    it('should show the restaurants found by Favorite Restaurants', (done) => {
      document.getElementById('restaurants').addEventListener('restaurants:updated', () => {
        // eslint-disable-next-line no-undef
        expect(document.querySelectorAll('.card').length).toEqual(3);
        done(); // Panggil done() setelah pengujian selesai
      });

      favoriteRestaurants.searchRestaurants.mockImplementation((query) => {
        if (query === 'restaurant a') {
          return [
            { id: 111, title: 'restaurant abc' },
            { id: 222, title: 'ada juga restaurant abcde' },
            { id: 333, title: 'ini juga boleh restaurant a' },
          ];
        }
        return [];
      });
      searchRestaurants('restaurant a');
    });

    // eslint-disable-next-line no-undef
    it('should show the name of the restaurants found by Favorite Restaurants', (done) => {
      document.getElementById('restaurants').addEventListener('restaurants:updated', () => {
        const restaurantTitles = document.querySelectorAll('.nema-restaurant');
        // eslint-disable-next-line no-undef
        expect(restaurantTitles.item(0).textContent).toEqual('restaurant abc');
        // eslint-disable-next-line no-undef
        expect(restaurantTitles.item(1).textContent).toEqual('ada juga restaurant abcde');
        // eslint-disable-next-line no-undef
        expect(restaurantTitles.item(2).textContent).toEqual('ini juga boleh restaurant a');

        done();
      });

      favoriteRestaurants.searchRestaurants.mockImplementation((query) => {
        if (query === 'restaurant a') {
          return [
            { id: 111, name: 'restaurant abc' },
            { id: 222, name: 'ada juga restaurant abcde' },
            { id: 333, name: 'ini juga boleh restaurant a' },
          ];
        }
        return [];
      });

      searchRestaurants('restaurant a');
    });

    // eslint-disable-next-line no-undef
    it('should show - when the restaurant returned does not contain a title', (done) => {
      document.getElementById('restaurants').addEventListener('restaurants:updated', () => {
        const restaurantTitles = document.querySelectorAll('.nema-restaurant');
        // eslint-disable-next-line no-undef
        expect(restaurantTitles.item(0).textContent).toEqual('-');

        done();
      });

      favoriteRestaurants.searchRestaurants.mockImplementation((query) => {
        if (query === 'restaurant a') {
          return [{ id: 444 }];
        }
        return [];
      });

      searchRestaurants('restaurant a');
    });
  });

  // eslint-disable-next-line no-undef
  describe('When query is empty', () => {
    // eslint-disable-next-line no-undef
    it('should capture the query as empty', () => {
      favoriteRestaurants.getAllRestaurant.mockImplementation(() => []);

      searchRestaurants(' ');
      // eslint-disable-next-line no-undef
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurants('    ');
      // eslint-disable-next-line no-undef
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurants('');
      // eslint-disable-next-line no-undef
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurants('\t');
      // eslint-disable-next-line no-undef
      expect(presenter.latestQuery.length).toEqual(0);
    });

    // eslint-disable-next-line no-undef
    it('should show all favorite restaurants', () => {
      favoriteRestaurants.getAllRestaurant.mockImplementation(() => []);

      searchRestaurants('    ');

      // eslint-disable-next-line no-undef
      expect(favoriteRestaurants.getAllRestaurant).toHaveBeenCalled();
    });
  });

  // eslint-disable-next-line no-undef
  describe('When no favorite restaurants could be found', () => {
    // eslint-disable-next-line no-undef
    it('should show the empty message', (done) => {
      document.getElementById('restaurants').addEventListener('restaurants:updated', () => {
        // eslint-disable-next-line no-undef
        expect(document.querySelectorAll('.restaurant-item__not__found').length).toEqual(1);
        done();
      });

      favoriteRestaurants.searchRestaurants.mockImplementation(() => []);
      searchRestaurants('restaurant a');
    });

    // eslint-disable-next-line no-undef
    it('should not show any restaurant', (done) => {
      document.getElementById('restaurants').addEventListener('restaurants:updated', () => {
        // eslint-disable-next-line no-undef
        expect(document.querySelectorAll('.card').length).toEqual(0);
        done();
      });

      favoriteRestaurants.searchRestaurants.mockImplementation(() => []);

      searchRestaurants('restaurant a');
    });
  });
});
