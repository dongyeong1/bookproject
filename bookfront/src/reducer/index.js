import { produce } from "immer";
const initState = {
    books: null,
    book: null,
    posts: null,
    post: null,
    user: null,
    signUpData: null,
    ratePostLoading: false,
    ratePostSuccess: false,
    ratePostError: null,
    searchbookLoading: false,
    searchbookSuccess: false,
    seachbookError: null,
    signupLoading: false,
    signupSuccess: false,
    signupError: null,
    loginLoading: false,
    loginSuccess: false,
    loginError: null,
    addPostLoading: false,
    addPostSuccess: false,
    addPostError: null,
    addCommentLoading: false,
    addCommentSuccess: false,
    addCommentError: null,
    bookPostsLoading: false,
    bookPostsSuccess: null,
    booPostsError: null,
    postloadLoading: false,
    postloadSuccess: false,
    postloadError: null,
    likePostLoading: false,
    likePostSuccess: false,
    likePostError: null,
    unlikePostLoading: false,
    unlikePostSuccess: false,
    unlikePostError: null,
    loadMyInfoLoading: false, // 유저 정보 가져오기 시도중
    loadMyInfoSuccess: false,
    loadMyInfoError: null,
    followLoading: false, // 팔로우 시도중
    followSuccess: false,
    followError: null,
    unfollowLoading: false, // 언팔로우 시도중
    unfollowSuccess: false,
    unfollowError: null,
    postEditLoading: false,
    postEditSuccess: false,
    postEditError: null,
    postDeleteLoading: false,
    postDeleteSuccess: false,
    postDeleteError: null,
};

//액션

export const BOOK_LOAD_REQUEST = "BOOK_LOAD_REQUEST";
export const BOOK_LOAD_SUCCESS = "BOOK_LOAD_SUCCESS";
export const BOOK_LOAD_FAIL = "BOOK_LOAD_FAIL";

export const SEARCH_BOOK_REQUEST = "SEARCH_BOOK_REQUEST";
export const SEARCH_BOOK_SUCCESS = "SEARCH_BOOK_SUCCESS";
export const SEARCH_BOOK_FAIL = "SEARCH_BOOK_FAIL";

export const SEARCH_BOOK_REMOVE = "SEARCH_BOOK_REMOVE";

export const SIGNUP_REQUEST = "SIGNUP_REQUEST";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAIL = "SIGNUP_FAIL";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";

export const ADD_POST_REQUEST = "ADD_POST_REQUEST";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAIL = "ADD_POST_FAIL";

export const ADD_COMMENT_REQUEST = "ADD_COMMENT_REQUEST";
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";
export const ADD_COMMENT_FAIL = "ADD_COMMENT_FAIL";

export const BOOK_POSTS_REQUEST = "BOOK_POSTS_REQUEST";
export const BOOK_POSTS_SUCCESS = "BOOK_POSTS_SUCCESS";
export const BOOK_POSTS_FAIL = "BOOK_POSTS_FAIL";

export const POST_LOAD_REQUEST = "POST_LOAD_REQUEST";
export const POST_LOAD_SUCCESS = "POST_LOAD_SUCCESS";
export const POST_LOAD_FAIL = "POST_LOAD_FAIL";

export const LIKE_POST_REQUEST = "LIKE_POST_REQUEST";
export const LIKE_POST_SUCCESS = "LIKE_POST_SUCCESS";
export const LIKE_POST_FAIL = "LIKE_POST_FAIL";

export const UNLIKE_POST_REQUEST = "UNLIKE_POST_REQUEST";
export const UNLIKE_POST_SUCCESS = "UNLIKE_POST_SUCCESS";
export const UNLIKE_POST_FAIL = "UNLIKE_POST_FAIL";

export const LOAD_MY_INFO_REQUEST = "LOAD_MY_INFO_REQUEST";
export const LOAD_MY_INFO_SUCCESS = "LOAD_MY_INFO_SUCCESS";
export const LOAD_MY_INFO_FAILURE = "LOAD_MY_INFO_FAILURE";

export const FOLLOW_REQUEST = "FOLLOW_REQUEST";
export const FOLLOW_SUCCESS = "FOLLOW_SUCCESS";
export const FOLLOW_FAILURE = "FOLLOW_FAILURE";

export const UNFOLLOW_REQUEST = "UNFOLLOW_REQUEST";
export const UNFOLLOW_SUCCESS = "UNFOLLOW_SUCCESS";
export const UNFOLLOW_FAILURE = "UNFOLLOW_FAILURE";

export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST";
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";
export const LOG_OUT_FAILURE = "LOG_OUT_FAILURE";

export const POST_EDIT_REQUEST = "POST_EDIT_REQUEST";
export const POST_EDIT_SUCCESS = "POST_EDIT_SUCCESS";
export const POST_EDIT_FAIL = "POST_EDIT_FAIL";

export const POST_DELETE_REQUEST = "POST_DELETE_REQUEST";
export const POST_DELETE_SUCCESS = "POST_DELETE_SUCCESS";
export const POST_DELETE_FAIL = "POST_DELETE_FAIL";

export const BOOKS_REMOVE_REQUEST = "BOOKS_REMOVE_REQUEST";
export const BOOKS_REMOVE_SUCCESS = "BOOKS_REMOVE_SUCCESS";
export const BOOKS_REMOVE_FAIL = "BOOKS_REMOVE_FAIL";

export const NAVER_LOGIN_REQUEST = "NAVER_LOGIN_REQUEST";
export const NAVER_LOGIN_SUCCESS = "NAVER_LOGIN_SUCCESS";
export const NAVER_LOGIN_FAIL = "NAVER_LOGIN_FAIL";

export const RATE_BOOK_POSTS_REQUEST = "RATE_BOOK_POSTS_REQUEST";
export const RATE_BOOK_POSTS_SUCCESS = "RATE_BOOK_POSTS_SUCCESS";
export const RATE_BOOK_POSTS_FAIL = "RATE_BOOK_POSTS_FAIL";

export const REMOVE_POST_REQUEST = "REMOVE_POST_REQUEST";

const rootReducer = (state = initState, action) =>
    produce(state, (draft) => {
        switch (action.type) {
            case RATE_BOOK_POSTS_REQUEST:
                draft.ratePostLoading = true;
                draft.ratePostSuccess = false;
                break;
            case RATE_BOOK_POSTS_SUCCESS:
                draft.ratePostSuccess = true;
                draft.ratePostLoading = false;
                if (action.data[0]) {
                    draft.posts = action.data;
                } else {
                    draft.posts = null;
                }
                break;
            case RATE_BOOK_POSTS_FAIL:
                draft.ratePostSuccess = false;
                break;
            case NAVER_LOGIN_SUCCESS:
                draft.user = action.data.exUser;
                break;
            case NAVER_LOGIN_FAIL:
                break;
            case BOOK_LOAD_SUCCESS:
                draft.book = action.data[0];
                break;
            case BOOK_LOAD_FAIL:
                break;
            case POST_DELETE_REQUEST:
                draft.postDeleteLoading = true;
                draft.postDeleteSuccess = null;
                draft.postEditSuccess = false;
                break;
            case POST_DELETE_SUCCESS:
                draft.postDeleteLoading = false;
                draft.postDeleteSuccess = true;
                draft.user.Posts = draft.user.Posts.filter(
                    (v) => v.id !== action.data.PostId
                );

                break;
            case POST_DELETE_FAIL:
                draft.postDeleteLoading = false;
                draft.postDeleteError = action.error;
                break;

            case POST_EDIT_REQUEST:
                draft.postEditLoading = true;
                draft.postEditError = null;
                draft.postEditSuccess = false;
                break;
            case POST_EDIT_SUCCESS:
                draft.postEditLoading = false;
                draft.postEditSuccess = true;
                const postIndex = draft.user.Posts.findIndex(
                    (v) => v.id === action.data.PostId
                );
                draft.user.Posts[postIndex] = action.data.updatedPost;

                break;
            case POST_EDIT_FAIL:
                draft.postEditLoading = false;
                draft.postEditError = action.error;
                break;

            case LOG_OUT_REQUEST:
                draft.logOutLoading = true;
                draft.logOutError = null;
                draft.logOutDone = false;
                break;
            case LOG_OUT_SUCCESS:
                draft.logOutLoading = false;
                draft.logOutDone = true;
                draft.user = null;
                break;
            case LOG_OUT_FAILURE:
                draft.logOutLoading = false;
                draft.logOutError = action.error;
                break;
            case LOAD_MY_INFO_REQUEST:
                draft.loadMyInfoLoading = true;
                draft.loadMyInfoError = null;
                draft.loadMyInfoSuccess = false;
                break;
            case LOAD_MY_INFO_SUCCESS:
                draft.loadMyInfoLoading = false;
                if (action.data.Posts[0]) {
                    draft.user = action.data;
                } else {
                    draft.user = action.data;
                    draft.user.Posts = null;
                }
                draft.loadMyInfoSuceess = true;
                break;
            case LOAD_MY_INFO_FAILURE:
                draft.loadMyInfoLoading = false;
                draft.loadMyInfoError = action.error;
                break;
            case FOLLOW_REQUEST:
                draft.followLoading = true;
                draft.followError = null;
                draft.followSuccess = false;
                break;
            case FOLLOW_SUCCESS:
                draft.followLoading = false;
                draft.user.Followings.push({ id: action.data.UserId });
                draft.followSuccess = true;
                break;
            case FOLLOW_FAILURE:
                draft.followLoading = false;
                draft.followError = action.error;
                break;
            case UNFOLLOW_REQUEST:
                draft.unfollowLoading = true;
                draft.unfollowError = null;
                draft.unfollowSuccess = false;
                break;
            case UNFOLLOW_SUCCESS:
                draft.unfollowLoading = false;
                draft.user.Followings = draft.user.Followings.filter(
                    (v) => v.id !== action.data.UserId
                );
                draft.unfollowSuccess = true;
                break;
            case UNFOLLOW_FAILURE:
                draft.unfollowLoading = false;
                draft.unfollowError = action.error;
                break;

            case SEARCH_BOOK_REQUEST:
                draft.searchbookLoading = true;
                draft.searchbookSuccess = false;
                break;
            case SEARCH_BOOK_SUCCESS:
                draft.searchbookLoading = false;
                draft.searchbookSuccess = true;
                if (action.data[0]) {
                    draft.books = action.data;
                } else {
                    draft.books = "검색결과없음";
                }
                break;
            case SEARCH_BOOK_FAIL:
                draft.seachbookError = "err";
                break;
            case SIGNUP_REQUEST:
                draft.signupLoading = true;
                draft.signupSuccess = false;
                draft.signupError = null;
                break;
            case SIGNUP_SUCCESS:
                draft.signupLoading = false;
                draft.signupSuccess = true;
                draft.signupError = null;
                draft.signUpData = action.data;
                break;
            case SIGNUP_FAIL:
                draft.signupError = action.error;

                break;
            case LOGIN_REQUEST:
                draft.loginLoading = true;
                draft.loginSuccess = false;
                break;
            case LOGIN_SUCCESS:
                draft.loginLoading = false;
                draft.loginSuccess = true;
                draft.user = action.data;
                break;
            case LOGIN_FAIL:
                draft.loginError = action.data;
                break;
            case ADD_POST_REQUEST:
                draft.addPostLoading = true;
                draft.addPostSuccess = false;
                break;
            case ADD_POST_SUCCESS:
                draft.addPostLoading = false;
                draft.addPostSuccess = true;
                draft.post = action.data;
                break;
            case ADD_POST_FAIL:
                draft.addPostError = "err";
                break;
            case ADD_COMMENT_REQUEST:
                draft.addCommentLoading = true;
                draft.addCommentSuccess = false;
                break;
            case ADD_COMMENT_SUCCESS:
                draft.addCommentLoading = false;
                draft.addCommentSuccess = true;
                const findIndex = draft.posts.findIndex(
                    (v) => v.id === action.data.postId
                );
                draft.posts[findIndex].Comments.unshift(
                    action.data.fullComment
                );

                break;
            case ADD_COMMENT_FAIL:
                draft.addCommentError = "err";
                break;
            case BOOK_POSTS_REQUEST:
                draft.bookPostsLoading = true;
                draft.bookPostsSuccess = false;
                break;
            case BOOK_POSTS_SUCCESS:
                draft.bookPostsLoading = false;
                draft.bookPostsSuccess = true;
                if (action.data[0]) {
                    draft.posts = action.data;
                } else {
                    draft.posts = null;
                }
                break;
            case BOOK_POSTS_FAIL:
                draft.bookPostsError = "err";
                break;
            case POST_LOAD_REQUEST:
                draft.postloadLoading = true;
                draft.postloadSuccess = false;
                break;
            case POST_LOAD_SUCCESS:
                draft.postloadLoading = false;
                draft.postloadSuccess = true;
                draft.post = action.data;
                break;
            case POST_LOAD_FAIL:
                draft.postloadError = "err";
                break;

            case LIKE_POST_REQUEST:
                draft.likePostLoading = true;
                draft.likePostSuccess = false;
                break;
            case LIKE_POST_SUCCESS:
                draft.likePostLoading = false;
                draft.likePostSuccess = true;
                const post = draft.posts.find(
                    (v) => v.id === action.data.PostId
                );

                post.Likers.push({ id: action.data.UserId });

                break;
            case LIKE_POST_FAIL:
                draft.likePostError = "err";
                break;
            case UNLIKE_POST_REQUEST:
                draft.unlikePostLoading = true;
                draft.unlikePostSuccess = false;
                break;
            case UNLIKE_POST_SUCCESS:
                draft.unlikePostLoading = false;
                draft.unlikePostSuccess = true;
                const post1 = draft.posts.find(
                    (v) => v.id === action.data.PostId
                );
                post1.Likers = post1.Likers.filter(
                    (v) => v.id !== action.data.UserId
                );

                break;
            case UNLIKE_POST_FAIL:
                draft.unlikePostError = "err";
                break;

            case SEARCH_BOOK_REMOVE:
                draft.books = null;
                break;
            case REMOVE_POST_REQUEST:
                draft.post = null;
                break;
            case BOOKS_REMOVE_REQUEST:
                draft.books = null;
                break;

            default:
                break;
        }
    });

export default rootReducer;
