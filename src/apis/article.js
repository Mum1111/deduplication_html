import { post, get, deletes } from "../utils/request";

const loadArticles = (data) => {
  return post(
    `/articles?page_size=${data.pageSize}&current_page=${data.currentPage}`,
    data
  );
};

const loadArticleById = (articleId) => {
  return get(`/articles/${articleId}`);
};

const createTag = (articleId, tagName) => {
  return post(`/articles/${articleId}/tags?tag_name=${tagName}`);
};

const delTag = (articleId, tagName) => {
  return deletes(`/articles/${articleId}/tags?tag_name=${tagName}`);
};

export { loadArticles, loadArticleById, createTag, delTag };
