import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IRootState } from 'store'
import { IProjectEntity } from 'store/types'
import { normalize } from 'store/utils'

interface IProjectState {
  entities: {
    [key: string | number]: IProjectEntity
  }
  isLoaded: boolean
}

const initialState = {
  entities: {},
  isLoaded: false,
} as IProjectState

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setProjects: (state, action: PayloadAction<Array<IProjectEntity>>) => {
      state.entities = normalize(action.payload)
      state.isLoaded = true
    },
    setProject: (state, action: PayloadAction<IProjectEntity>) => {
      state.entities[action.payload.id] = action.payload
    },
  },
})

export const projectsSelector = (state: IRootState) => state.project.entities
export const projectCountSelector = (state: IRootState) => Object.values(state.project.entities).length || 0

export const { setProjects, setProject } = projectSlice.actions

export default projectSlice.reducer
