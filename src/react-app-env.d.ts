/// <reference types="react-scripts" />
type Users = {
    first: string;
    last: string;
    img: string;
    username: string;
}

type Comments = {
    _id: number;
    post_id: number;
    user: Users;
    content: string;
    up: number;
    down: number;
    liked: boolean | null;
}

type Posts = {
    _id: number;
    user: Users;
    content: string;
    up: number;
    down: number;
    liked: boolean | null;
    comments: Array<Comments>
}