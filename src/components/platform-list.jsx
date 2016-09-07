import React from 'react';
import Platform from './platform';

class PlatformList extends React.Component {
  
  render() {
    let {quickstart, singleArticleMode, customNavigationAction} = this.props;
    
    let items = Object.keys(quickstart.platforms).map((name, i) => (
      <Platform
        key={quickstart.name + i}
        delay={20 * i}
        quickstart={quickstart}
        platform={quickstart.platforms[name]}
        singleArticleMode={singleArticleMode}
        customNavigationAction={customNavigationAction} />
    ));

    return (
      <div className="container techlist">
        <ul className="circle-list">{items}</ul>
      </div>
    );
  }
  
}

PlatformList.propTypes = {
  quickstart: React.PropTypes.object,
  customNavigationAction: React.PropTypes.func
};

export default PlatformList;
