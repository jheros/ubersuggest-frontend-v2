import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { Box, MenuItem, Select, SelectChangeEvent, styled, useTheme } from '@mui/material'
import { lightTheme, Typography } from '@ubersuggest/common-ui'
import { IRootState } from 'store'
import { IProjectEntity } from 'store/types'
import { setOpacity } from 'utils/colors'

const palette = lightTheme.palette
const colors = [
  palette.common.red.main,
  palette.common.pink.main,
  palette.common.blue.light,
  palette.common.orange.bright,
  palette.common.green.main,
  palette.common.yellow.main,
  palette.common.lightGray.main,
  palette.common.orange.main,
  palette.common.gray.main,
  palette.common.green.dark,
  palette.common.blue.main,
  palette.common.yellow.dark,
  palette.common.green.dull,
  palette.common.yellow.lime,
  palette.common.red.dark,
]

interface IDomainIcon {
  colorIndex: number
}

export const DomainIcon = styled('span')((props: IDomainIcon) => ({
  width: 16,
  height: 16,
  minWidth: 16,
  display: 'inline-flex',
  backgroundColor: setOpacity(colors[props.colorIndex], 0.4),
  border: `1px solid ${colors[props.colorIndex]}`,
  color: palette.common.darkGray.main,
  borderRadius: 8,
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '12px',
  lineHeight: '12px',
  paddingTop: '2px',
}))

interface IProjectSelect {
  value?: string
  displayEmpty?: boolean
  fullWidth?: boolean
  onChange?: (id: string) => void
}

export const ProjectSelect = ({ value, displayEmpty = false, fullWidth = false, onChange }: IProjectSelect) => {
  const { t } = useTranslation()
  const theme = useTheme()
  const entities = useSelector((state: IRootState) => state.project.entities)
  const projects = Object.values(entities) || []

  useEffect(() => {
    if (!value && projects.length && !displayEmpty) {
      onChange && onChange(projects[0].id)
    }
  }, [projects])

  return (
    <Select
      value={value || (!displayEmpty ? projects[0]?.id || '' : undefined)}
      onChange={(event: SelectChangeEvent) => onChange && onChange(event.target.value as string)}
      displayEmpty={displayEmpty}
      inputProps={{ 'aria-label': 'Project Select' }}
      fullWidth={fullWidth}
      sx={{ '.MuiSelect-select': { p: 0 }, '.project-domain': { display: 'none' } }}
    >
      {displayEmpty && (
        <MenuItem value={undefined} disableGutters sx={{ p: 0 }}>
          <Box width='100%' display='flex' alignItems='center' p='13px 20px'>
            <Typography fontSize='15px' whiteSpace='nowrap' lineHeight={1.2}>
              {t('all_projects')}
            </Typography>
          </Box>
        </MenuItem>
      )}
      {projects.map((project, index) => (
        <MenuItem value={project.id} key={`project-${project.id}`} disableGutters sx={{ p: 0 }}>
          <Box width='100%' display='flex' alignItems='center' p='13px 20px'>
            {project.icon ? (
              project.icon
            ) : (
              <DomainIcon colorIndex={index} sx={{ mr: 2 }}>
                {project.domain ? project.domain.charAt(0) : project.title.charAt(0)}
              </DomainIcon>
            )}

            <Box>
              <Typography fontSize='15px' whiteSpace='nowrap' lineHeight={1.2} paragraph m={0}>
                {project.title}
              </Typography>
              <Typography
                variant='text14Light'
                whiteSpace='nowrap'
                color={theme.palette.common.darkGray[50]}
                m={0}
                paragraph
                className='project-domain'
              >
                {project.domain}
              </Typography>
            </Box>
          </Box>
        </MenuItem>
      ))}
    </Select>
  )
}
