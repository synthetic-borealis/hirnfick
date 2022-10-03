import React from 'react';
import FeatureItem from '../components/FeatureItem';
import './Features.scss';

function Features() {
  return (
    <section className="Features">
      <h2 className="Features__title">Features</h2>
      <ul className="Features__features-list">
        <FeatureItem
          title="Supports multiple runtime environments"
          description="Works in Node.js, Deno, and web-browsers."
        />
        <FeatureItem
          title="Multiple output options"
          description="Translates input code to JavaScript, C++, Rust & more."
        />
        <FeatureItem
          title="Safety measures"
          description="Bounds checking prevents issues such as buffer overflows & wrap-arounds."
        />
        <FeatureItem
          title="Open-source"
          description="Available under the MIT license."
        />
      </ul>
    </section>
  );
}

export default Features;
