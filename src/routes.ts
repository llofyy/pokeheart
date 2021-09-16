import { Router } from 'express';
import AuthenticateTrainerController from './controllers/AuthenticateTrainerController';
import CreateFragmentController from './controllers/CreateFragmentController';
import CreatePokemonController from './controllers/CreatePokemonController';
import CreateTrainerController from './controllers/CreateTrainerController';
import ExploreController from './controllers/ExploreController';
import LaboratoryController from './controllers/LaboratoryController';
import ProfileController from './controllers/ProfileController';
import StrengthenPokemonController from './controllers/StrengthenPokemonController';
import TrainerController from './controllers/TrainerController';
import authorizationRequired from './middlewares/authenticationRequired';

// import TrainerController from './controllers/TrainerController';
// const trainerController = new TrainerController();

const createTrainerController = new CreateTrainerController();
const authenticateTrainerController = new AuthenticateTrainerController();
const createPokemonController = new CreatePokemonController();
const profileController = new ProfileController();
const exploreController = new ExploreController();
const createFragmentController = new CreateFragmentController();
const laboratoryController = new LaboratoryController();
const strengthenPokemonController = new StrengthenPokemonController();
const trainerController = new TrainerController();

const routes = Router();

routes.get('/', (req, res) => {
  res.render('index');
});

routes.get('/profile', authorizationRequired, profileController.handle);
routes.get('/explore', authorizationRequired, exploreController.handle);
routes.get('/laboratory/:pokemonName?', authorizationRequired, laboratoryController.handle);
routes.get('/list-trainers', trainerController.handle);

routes.post('/register', createTrainerController.handle);
routes.post('/pokemons', createPokemonController.handle);
routes.post('/login', authenticateTrainerController.handle);
routes.post('/fragment', createFragmentController.handle);
routes.post('/strengthen', authorizationRequired, strengthenPokemonController.handle);

export default routes;
