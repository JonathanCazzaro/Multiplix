import database from '../storage/database';
import { User } from './classes/userModel';

const user = new User(database);

export default user;
