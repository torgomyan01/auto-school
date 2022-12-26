import axios from 'axios';
import { API_URLS } from '../../utils/consts';

export const CreateCommentLesson = (data: {}) =>
    axios.post(API_URLS.CREATE_COMMENT_LESSON, data);

export const GetLessonComment = (cat_id: string, lesson_id: string) =>
    axios.get(`${API_URLS.GET_LESSON_COMMENT}/${cat_id}/${lesson_id}`);
