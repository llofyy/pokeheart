import { Router } from 'express';
import AuthenticateTrainerController from './controllers/AuthenticateTrainerController';
import CreatePokemonController from './controllers/CreatePokemonController';
import CreateTrainerController from './controllers/CreateTrainerController';
import ExploreController from './controllers/ExploreController';
import ProfileController from './controllers/ProfileController';
import authorizationRequired from './middlewares/authenticationRequired';

// import TrainerController from './controllers/TrainerController';
// const trainerController = new TrainerController();

const createTrainerController = new CreateTrainerController();
const authenticateTrainerController = new AuthenticateTrainerController();
const createPokemonController = new CreatePokemonController();
const profileController = new ProfileController();
const exploreController = new ExploreController();
const routes = Router();

routes.get('/', (req, res) => {
  res.render('index');
});

routes.get('/profile', authorizationRequired, profileController.handle);
routes.get('/explore', authorizationRequired, exploreController.handle);

routes.post('/create-trainer', createTrainerController.handle);
routes.post('/pokemons', createPokemonController.handle);
routes.post('/login', authenticateTrainerController.handle);

export default routes;
