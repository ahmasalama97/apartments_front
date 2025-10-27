import axiosInstance from './AxiosInstance';

export function getPosts() {
    return axiosInstance.get(`posts.json`);
}

export function createPost(postData: any) {
    return axiosInstance.post(`posts.json`, postData);
}

export function updatePost(post: any, postId: any) {
    return axiosInstance.put(`posts/${postId}.json`, post);
}

export function deletePost(postId: any) {
    return axiosInstance.delete(`posts/${postId}.json`);
}

export function formatPosts(postsData: any) {
    let posts = [];
    for (let key in postsData) {
        posts.push({ ...postsData[key], id: key });
    }

    return posts;
}
