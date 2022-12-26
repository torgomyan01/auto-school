import axios from 'axios';
import { API_URLS } from '../../utils/consts';

export const GetDiscussion = (id: string | number) =>
    axios.get(`${API_URLS.GET_DISCUSSION}/${id}`);

export const CreateDiscussionItem = (data: any) =>
    axios.post(API_URLS.CREATE_DISCUSSION_ITEM, data);
