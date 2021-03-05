import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
// import data from './data';
import G6 from '@antv/g6';
import insertCss from 'insert-css';

// 我们用 insert-css 演示引入自定义样式
// 推荐将样式添加到自己的样式文件中
// 若拷贝官方代码，别忘了 npm install insert-css
insertCss(`
  .g6-tooltip {
    border-radius: 6px;
    font-size: 12px;
    color: #fff;
    background-color: #000;
    padding: 2px 8px;
    text-align: center;
  }
`);

const service = (props) => {

  const ref = React.useRef(null);
  const [graph, setGraph] = useState(null)

  const gobal = props.gobal

  useEffect(() => {
    G6.registerNode(
      'sql',
      {
        drawShape(cfg, group) {
          const rect = group.addShape('rect', {
            attrs: {
              x: -75,
              y: -25,
              width: 150,
              height: 50,
              radius: 10,
              stroke: '#5B8FF9',
              fill: '#C6E5FF',
              lineWidth: 3,
            },
            name: 'rect-shape',
          });
          if (cfg.name) {
            group.addShape('text', {
              attrs: {
                text: cfg.name,
                x: 0,
                y: 0,
                fill: '#00287E',
                fontSize: 14,
                textAlign: 'center',
                textBaseline: 'middle',
                fontWeight: 'bold',
              },
              name: 'text-shape',
            });
          }
          return rect;
        },
      },
      'single-node',
    );
    if (!graph) {
      const container = ReactDOM.findDOMNode(ref.current);
      console.log(container)
      const width = container.scrollWidth;
      const height = container.scrollHeight || 500;

      let _graph = new G6.Graph({
        container: container,
        width,
        height,
        layout: {
          type: 'dagre',
          nodesepFunc: (d) => {
            if (d.id === '3') {
              return 500;
            }
            return 50;
          },
          ranksep: 70,
          controlPoints: true,
        },
        defaultNode: {
          type: 'sql',
        },
        defaultEdge: {
          type: 'polyline',
          style: {
            radius: 20,
            offset: 45,
            endArrow: true,
            lineWidth: 2,
            stroke: '#C2C8D5',
          },
        },
        nodeStateStyles: {
          selected: {
            stroke: '#d9d9d9',
            fill: '#5394ef',
          },
        },
        modes: {
          default: [
            'drag-canvas',
            'zoom-canvas',
            'click-select',
            {
              type: 'tooltip',
              // formatText(model) {
              //  const cfg = model.conf;
              //  const text = [];
              //  cfg.forEach((row) => {
              //   text.push(row.label + ':' + row.value + '<br>');
              //  });
              //  return text.join('\n');
              // },
              offset: 30,
            },
          ],
        },
        fitView: true,
      })
      setGraph(_graph)
      window.grapha = _graph
      _graph.data({});
      _graph.render();
      console.log(11111)
    }
  }, [])

  useEffect(() => {
    console.log(graph)
    if (graph) {

      let nodes = []
      let edges = []

      if (gobal.subscribeInstanceKey) {
        console.log(gobal.subscribeInstanceKey)
        nodes.push({
          id: gobal.subscribeInstanceKey.name,
          dataType: 'alps',
          label: gobal.subscribeInstanceKey.name
        })
      }

      if (gobal.arrange) {
        console.log(gobal.arrange)
        let _grayNode = gobal.subscribeInstanceKey.name,
          _stableNode = gobal.subscribeInstanceKey.name

        gobal.arrange.map((item, index) => {
          let _grayService = item.name + item.grayService
          let _stableService = item.name + item.stableService
          nodes.push({
            id: _grayService + "_gray",
            dataType: 'alps',
            label: _grayService
          })
          nodes.push({
            id: _stableService + "_stable",
            dataType: 'alps',
            label: _stableService
          })
          edges.push({
            source: _grayNode,
            target: _grayService + "_gray"
          })
          edges.push({
            source: _stableNode,
            target: _stableService + "_stable"
          })
          _grayNode = _grayService + "_gray"
          _stableNode = _stableService + "_stable"
        })
      }
      let data = {
        nodes,
        edges
      }
      console.log(JSON.stringify(data))
      graph.changeData(data)
      graph.fitView()
    }

  }, [gobal])

  return (
    <>
      <div ref={ref}></div>
    </>
  )
}
export default service;