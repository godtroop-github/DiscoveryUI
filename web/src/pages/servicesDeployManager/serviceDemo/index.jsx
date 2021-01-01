import React, { useEffect } from 'react';
import G6 from '@antv/g6';
import Config from './config-graph'
import { data } from './data';


export default function() {
  const ref = React.useRef(null)
  let graph = null

  useEffect(() => {
    if(!graph) {
      graph = new G6.Graph({
        container: ref.current,
        width: 1200,
        height: 800,
        ...Config
      })
    }
    graph.data(data)
    graph.render()
  }, [])

  return (
    <div ref={ref} />
  );
}