import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import classNames from 'classnames';

const PodcastSlide = (props) => {
  let slideClass = classNames({
    'podcast-slide': true,
    '-noslider': !props.isInSlider,
    '-subscribed': props.item.get('hasSubscription') === 2
  });

  return (
    <div className={slideClass}>
      <div className="image" style={{ backgroundImage: `url(${props.item.get('imageUrl')})` }}>
        {props.progress ? <div className="progress"></div> : null}
      </div>

      <h3 className="title">
        {props.item.get('title')}
      </h3>

      {!props.progress ?
        <div className="authors">
          {props.item.get('subtitle')}
        </div>
      : null}

      {props.progress ?
        <div className="progresscopy">
          (72 min - 60 min återstår)
        </div>
      : null}

      <Link to={'/podcast/' + props.item.get('id')} className="block-link"></Link>

      {props.item.get('isPremium')
        ? <div className="premium"></div>
        : ''}
    </div>
  )
}

PodcastSlide.defaultProps = {
  isInSlider: false
};

PodcastSlide.PropTypes = {
  item: PropTypes.object.isRequired,
  isInSlider: PropTypes.bool,
  progress: PropTypes.bool
};

export default PodcastSlide;
