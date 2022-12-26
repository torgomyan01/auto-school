import axios from 'axios';
import { API_URLS } from '../../utils/consts';

export const GetAllDiscussions = () => axios.get(API_URLS.GET_ALL_DISCUSSIONS);

// CREATE DISCUSSION
export const CreateDiscussion = (data: { name: string }) =>
    axios.post(API_URLS.CREATE_DISCUSSION, data);

// CREATE DISCUSSION
export const AddDiscussionLike = (data: { id: string | number }) =>
    axios.post(API_URLS.ADD_DISCUSSION_LIKE, data);
