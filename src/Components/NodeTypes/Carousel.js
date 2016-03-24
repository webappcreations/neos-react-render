import React from 'react';
import Transmit from 'react-transmit';
import ContentCase from 'Components/ContentCase';

const Carousel = (props) => (
  <ul className='Carousel'>
    {props.data.map((itemProps, i) => <li key={i}><ContentCase {...itemProps} /></li>)}
  </ul>
);
Carousel.propTypes = {
  data: React.PropTypes.array.isRequired
};

const WrappedCarousel = Transmit.createContainer(Carousel, {
  initialVariables: {},
  fragments: {
    data() {
      let nodes;
      return fetch('http://localhost:3000/carousel.json')
        .then(r => r.json())
        .then(i => {
          nodes = i;
          return Promise.all(i.map(node => {
            return ContentCase.getFragment('data', {node});
          }));
        })
        .then(datas => {
          return datas.map((i, j) => ({
            node: nodes[j],
            data: i
          }));
        });
    }
  }
});

export default WrappedCarousel;
