import { Grid } from '@mui/material'
import React, { useEffect } from 'react'
import styled from 'styled-components'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import { ItemType, SpecType, IconComponent, getStyleByType } from '../helpers'
import { v4 as uuidv4 } from 'uuid'

const ControlsWrapper = styled.div`
  width: 600px;
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 10;
`
const PaddedText = styled.div`
  padding-left: 5px;
`
const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 350,
    },
  },
}

interface IControlProps {
  onAdd: (node: any) => void
}

export const Controls = ({ onAdd }: IControlProps) => {
  const [type, setType] = React.useState(ItemType.TASK)
  const [specType, setSpecType] = React.useState('')
  const [title, setTitle] = React.useState('')
  const [description, setDescription] = React.useState('')

  const handleChange = (event: SelectChangeEvent) => {
    setType(event.target.value)
  }
  const handleSpecChange = (event: SelectChangeEvent) => {
    setSpecType(event.target.value)
  }
  const handleTitleChange = (event: any) => {
    setTitle(event.target.value)
  }
  const handleDescriptionChange = (event: any) => {
    setDescription(event.target.value)
  }

  // Ожидаю что эта хуйня очистит инпут тайтла
  const onClearForm = () => {
    setTitle('')
  }

  return (
    <ControlsWrapper>
      <Paper sx={{ width: '100%', p: 1 }}>
        <Grid container spacing={2}>
          <Grid size={3}>
            <FormControl size="small" sx={{ width: '150px' }}>
              <InputLabel id="demo-select-small-label" focused>
                Тип
              </InputLabel>
              <Select labelId="demo-select-small-label" id="demo-select-small" value={type} label="Тип" onChange={handleChange} MenuProps={MenuProps}>
                <MenuItem value={ItemType.RELEASE}>
                  <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1 }}>
                    <IconComponent type={ItemType.RELEASE} />
                    <PaddedText>Release</PaddedText>
                  </Box>
                </MenuItem>
                <MenuItem value={ItemType.STORY}>
                  <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1 }}>
                    <IconComponent type={ItemType.STORY} />
                    <PaddedText>Story</PaddedText>
                  </Box>
                </MenuItem>
                <MenuItem value={ItemType.TASK}>
                  <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1 }}>
                    <IconComponent type={ItemType.TASK} />
                    <PaddedText>Task</PaddedText>
                  </Box>
                </MenuItem>
                <MenuItem value={ItemType.BUG}>
                  <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1 }}>
                    <IconComponent type={ItemType.BUG} />
                    <PaddedText>Bug</PaddedText>
                  </Box>
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={9}>
            <Box component="form" noValidate autoComplete="off">
              <TextField fullWidth label="Название" id="titleInput" size="small" focused onChange={handleTitleChange} />
            </Box>
          </Grid>
          <Grid size={12}>
            <Box component="form" noValidate autoComplete="off">
              <TextField fullWidth id="outlined-multiline-static" label="Описание" multiline rows={2} focused onChange={handleDescriptionChange} />
            </Box>
          </Grid>
          <Grid container size={12} justifyContent="flex-end">
            {type === ItemType.TASK && (
              <Grid size={3}>
                <FormControl size="small" sx={{ width: '150px' }}>
                  <InputLabel id="demo-select-small-label" focused>
                    Специализация
                  </InputLabel>
                  <Select labelId="demo-select-small-label" id="demo-select-small" label="Специализация" value={specType} onChange={handleSpecChange} MenuProps={MenuProps}>
                    <MenuItem value={SpecType.ANALYSIS}>
                      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1 }}>
                        <PaddedText>{SpecType.ANALYSIS}</PaddedText>
                      </Box>
                    </MenuItem>
                    <MenuItem value={SpecType.FRONTEND}>
                      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1 }}>
                        <PaddedText>{SpecType.FRONTEND}</PaddedText>
                      </Box>
                    </MenuItem>
                    <MenuItem value={SpecType.BACKEND}>
                      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1 }}>
                        <PaddedText>{SpecType.BACKEND}</PaddedText>
                      </Box>
                    </MenuItem>
                    <MenuItem value={SpecType.TEST}>
                      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1 }}>
                        <PaddedText>{SpecType.TEST}</PaddedText>
                      </Box>
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            )}
            <Grid>
              <Button
                variant="contained"
                onClick={() => {
                  onAdd({
                    id: uuidv4(),
                    data: { label: title, description, type, specType },
                    style: getStyleByType(specType),
                  })
                  // Тут вызываем и пытаемся чистить
                  onClearForm();
                }}
              >
                Добавить
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </ControlsWrapper>
  )
}
