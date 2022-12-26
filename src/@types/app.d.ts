interface Quotation {
    id: string;
    test: string;
    title: string;
    img: string | null;
    questions: string[];
    true: number;
    request: boolean | undefined;
}

interface IAnswer {
    trusty: boolean;
    myIndex: number | boolean;
}

interface SelectedQuotation {
    id: number;
    lessons: Quotation[];
}

interface VideoCurs {
    id: string | number;
    title: string;
    url: string;
    created_at: string;
    updated_at: string;
}

interface IComment {
    cat_id: string;
    comment: string;
    created_at: string;
    email: string;
    id: number;
    lesson_id: string;
    name: string;
    updated_at: string;
}

interface IDiscussions {
    id: number;
    name: string;
    like: number;
    created_at: string;
    updated_at: string;
}

interface IDiscussionItem {
    id: number;
    discussion_id: string;
    name: string;
    text: string;
    email: string;
    like: number;
    created_at: string;
    updated_at: string;
}
