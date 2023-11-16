import RestaurantList from '../views/pages/restaurant';
import Favorite from '../views/pages/favorite';
import Detail from '../views/pages/details';

const routes = {
  '/': RestaurantList, // default page
  '/restaurant-list': RestaurantList,
  '/favorite': Favorite,
  '/detail/:id': Detail,
};

export default routes;
