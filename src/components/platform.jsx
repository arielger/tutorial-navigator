import React from 'react';
import navigateAction from '../action/navigate-action';
import loadArticleAction from '../action/load-article-action';

class Platform extends React.Component {
  
  handleClick() {
    let {appType, platform, customNavigationAction} = this.props;
    let payload = {
      appType,
      platform: platform.name,
      article: platform.articles[0].name
    };
    if (customNavigationAction) {
      this.context.executeAction(customNavigationAction, payload);
    }
    else {
      Promises.all([
        this.context.executeAction(loadArticleAction, payload),
        this.context.executeAction(navigateAction, payload)
      ]);
    }
  }
  
  getStyle() {
    return {
      animationDelay: this.props.delay + 'ms',
      WebkitAnimationDelay: this.props.delay + 'ms',
      animationDuration: '200ms',
      WebkitAnimationDuration: '200ms',
      animationTimingFunction: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)',
      WebkitAnimationTimingFunction: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)'
    };
  }
  
  render() {
    var {platform} = this.props;
    return (
      <li className='animated scaleIn' style={this.getStyle()}>
        <div data-name={platform.name} className='circle-logo' onClick={this.handleClick.bind(this)}>
          <div className='logo'></div>
          <div className='title'>{platform.title}</div>
        </div>
      </li>
    );
  }
  
}

Platform.propTypes = {
  platform: React.PropTypes.object,
  customNavigationAction: React.PropTypes.func
}

Platform.contextTypes = {
  executeAction: React.PropTypes.func,
};

export default Platform;
