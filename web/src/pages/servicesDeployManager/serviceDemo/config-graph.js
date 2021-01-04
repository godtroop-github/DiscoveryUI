export default {
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
}