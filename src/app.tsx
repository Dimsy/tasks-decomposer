import { useCallback, useState } from 'react'
import { Background, ReactFlow, addEdge, useNodesState, useEdgesState } from '@xyflow/react'
import { Controls } from './Components/Controls'
import '@xyflow/react/dist/style.css'
import ItemNode from './CustomNodes/ItemNode'

import { ItemType } from './helpers'

const nodeTypes = {
  item: ItemNode,
}

const initialNodes: any = [
  {
    id: '1',
    type: 'item',
    data: { type: ItemType.RELEASE, label: 'SMSEC-1048: Разделение ОО' },
  },
  {
    id: '2',
    type: 'item',
    data: { type: ItemType.STORY, label: 'Разделение ОО: Иное, Корпус' },
  },
  {
    id: '3',
    type: 'item',
    data: { type: ItemType.TASK, label: '[B]: Разработка ОО: Иное' },
    style: { backgroundColor: 'rgb(198, 238, 245)', borderColor: 'rgba(94, 177, 191, 0.5)' },
  },
  {
    id: '4',
    type: 'item',
    data: { type: ItemType.TASK, label: '[B]: Разработка ОО: Иное' },
    style: { backgroundColor: 'rgb(198, 238, 245)', borderColor: 'rgba(94, 177, 191, 0.5)' },
  },
  {
    id: '5',
    type: 'item',
    data: { type: ItemType.TASK, label: '[F]: Разработка фронта для новых ОО' },
    style: { backgroundColor: 'rgb(189, 248, 220)', borderColor: 'rgba(73, 160, 120, 0.5)' },
  },
]

initialNodes.forEach((node: any, index: number) => {
  node.position = {}
  node.position.x = 0
  node.position.y = index * 60
})

const CustomNodeFlow = () => {
  const [selectedNode, setSelectedNode] = useState(null)
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState([])

  const onConnect = useCallback(
    (params: any) =>
      setEdges((eds): any => {
        params.type = 'smoothstep'
        return addEdge(params, eds)
      }),
    [setEdges],
  )

  const onAdd = useCallback(
    (node: any) => {
      console.log(node)
      const newNode = {
        id: node.id,
        type: 'item',
        data: node.data,
        style: node.style,
        position: {
          x: (Math.random() - 0.5) * 400,
          y: (Math.random() - 0.5) * 400,
        },
      }
      setNodes((nds) => nds.concat(newNode))
    },
    [setNodes],
  )

  const setNode = (e, node) => {
    setSelectedNode(node)
  }

  const onUpdateNode = (id, data, style) => {
    console.log('id', id)
    console.log('data', data)
    const newNodes = [...nodes]
    newNodes.forEach((node) => {
      console.log(node)
      if (node.id == id) {
        node.data = data
        node.style = style
      }
    })
    setNodes(newNodes)
    setSelectedNode(null)
  }

  return (
    <div style={{ width: '1280p', height: '1024px' }}>
      <Controls onAdd={onAdd} selectedNode={selectedNode} onUpdateNode={onUpdateNode} setSelectedNode={setSelectedNode} />
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        onNodeClick={setNode}
        onPaneClick={() => setSelectedNode(null)}
        
        fitView
        style={{ backgroundColor: '#F7F9FB' }}
      >
        <Background />
      </ReactFlow>
    </div>
  )
}

export default CustomNodeFlow
