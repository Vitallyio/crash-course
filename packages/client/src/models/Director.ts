import { IDirector as IAPIDirector } from 'Interfaces/models/Director';
import IBaseModel from './Base';

interface IDirector extends IAPIDirector, IBaseModel {
  moviesCount: number;
}

export default IDirector;
