import axios from 'axios';
import { API_URLS } from '../../utils/consts';

export const GetAllVideoCurses = () => axios.get(API_URLS.GET_ALL_VISE_CURSES);
