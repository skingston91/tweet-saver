interface User_Tweet {
    name: string;
    profile_image_url_https: string;
    screen_name: string;
}

export interface Tweet {
    text: string;
    user: User_Tweet;
    created_at: string;
}