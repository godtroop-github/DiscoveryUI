import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { data } from './data';
import G6 from '@antv/g6';

export default function() {
  const ref = React.useRef(null)
  let graph = null

  useEffect(() => {
    if(!graph) {
      graph = new G6.Graph({
        container: ref.current,
        width: 1200,
        height: 800,
        modes: {
          default: ['drag-canvas']
        },
        layout: {
        	type: 'dagre',
          direction: 'LR'
        },
        defaultNode: {
          shape: 'node',
          labelCfg: {
            style: {
              fill: '#000000A6',
              fontSize: 10
            }
          },
          style: {
            stroke: '#72CC4A',
            width: 150
          }
        },
        defaultEdge: {
          shape: 'polyline'
        }
      })
    }
    graph.data(data)
    graph.render()
  }, [])

  return (
    <div ref={ref}></div>
  );
}