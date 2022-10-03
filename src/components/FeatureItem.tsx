import React from 'react';
import './FeatureItem.scss';

interface FeatureItemProps {
  title: string;
  description: string;
}

function FeatureItem({ title, description }: FeatureItemProps) {
  return (
    <li className="FeatureItem">
      <p className="FeatureItem__title">
        {title}
      </p>
      <p className="FeatureItem__description">
        {description}
      </p>
    </li>
  );
}

export default FeatureItem;
