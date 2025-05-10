import { memo, useState } from 'react'
import { Handle, Position } from '@xyflow/react'
import { IconComponent, SpecType } from '../helpers'
import { Grid } from '@mui/material'
import { ItemType } from '../helpers'
import Paper from '@mui/material/Paper'
import styled from 'styled-components'
const ItemNode = (item: any) => {
  const [isSelected, setIsSelected] = useState(false)

  const { label, type, description, specType } = item.data

  const onClick = () => {
    setIsSelected(!isSelected)
  }



  return (
    <div style={{ width: '200px' }} onClick={onClick}>
      <HandlersComponent type={type} label={label} specType={specType} />
      <Grid container spacing={1}>
        <Grid size={1}>
          <IconComponent type={type} />
        </Grid>
        <Grid size={11} textAlign={'left'} sx={{ paddingLeft: '5px', textTransform: 'capitalize' }}>
          {label}
        </Grid>
        {description && (
          <Grid size={12} sx={{ borderTop: '1px solid rgba(0, 0, 0, 0.1)', paddingTop: '4px' }}>
            <Paper elevation={0} sx={{ padding: '5px', backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
              <Grid container textAlign={'left'} sx={{ textTransform: 'capitalize' }}>
                {description}
              </Grid>
            </Paper>
          </Grid>
        )}
      </Grid>
    </div>
  )
}

interface IHandlerProps {
  type: ItemType
  label: string
  specType: string
}

const NeedAnalyticHandler = styled(Handle)`
  background-color: rgb(247, 201, 190);
`

const HandlersComponent = ({ type, label, specType }: IHandlerProps) => {
  switch (type) {
    case ItemType.RELEASE:
      return (
        <>
          <Handle type="target" position={Position.Bottom} id={`${label}-in`} />
        </>
      )
    case ItemType.STORY:
      return (
        <>
          <Handle type="source" position={Position.Top} id={`${label}-out`} />
          <Handle type="target" position={Position.Bottom} id={`${label}-in`} />
          <NeedAnalyticHandler type="target" position={Position.Left} id={`${label}-in-an`} />
        </>
      )
    case ItemType.TASK:
      return (
        <>
          <Handle type="source" position={Position.Top} id={`${label}-out`} />
          {specType !== SpecType.ANALYSIS && <NeedAnalyticHandler type="target" position={Position.Left} id={`${label}-in-an`} />}
        </>
      )
    case ItemType.BUG:
      return (
        <>
          <Handle type="source" position={Position.Top} id={`${label}-out`} />
          <NeedAnalyticHandler type="target" position={Position.Left} id={`${label}-in-an`} />
        </>
      )
    default:
      return <></>
  }
}

export default memo(ItemNode)
