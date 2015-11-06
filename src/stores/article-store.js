import { BaseStore } from 'fluxible/addons';
import _ from 'lodash';

class ArticleStore extends BaseStore {
  constructor(dispatcher) {
    super(dispatcher);
    this.articles = [];
  }
  handleArticledLoaded(payload) {
    var article = _.find(this.articles, { appType: payload.appType, tech: payload.tech });
    if (article) {
      article = payload;
    } else {
      this.articles.push(payload);
    }
    this.emitChange();
  }
  handleArticledLoadFailure(payload) {
    // TODO: Handle the error
  }
  getArticleHtml(appType, tech) {
    var article = _.find(this.articles, { appType: appType, tech: tech });
    if (article) {
      return article.html;
    }
  }
  getState() {
    return {
      articles: this.articles,
      onDocumentLoaded : this.onDocumentLoaded
    };
  }
  dehydrate() {
    return this.getState();
  }
  rehydrate(state) {
    this.articles = state.articles;
  }
}

ArticleStore.storeName = 'ArticleStore';
ArticleStore.handlers = {
  'RECIEVE_ARTICLE_SUCCESS': 'handleArticledLoaded',
  'RECIEVE_ARTICLE_FAILURE': 'handleArticledLoadFailure'
};

export default ArticleStore;