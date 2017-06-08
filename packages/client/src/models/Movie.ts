import { IMovie as IAPIMovie } from 'Interfaces/models/Movie';
import IBaseModel from './Base';

interface IMovie extends IAPIMovie<string>, IBaseModel {}

export default IMovie;
