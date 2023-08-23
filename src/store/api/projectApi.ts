import { createApi } from '@reduxjs/toolkit/query/react'
import { setProject, setProjects } from 'store/reducers/project'
import { IProjectEntity } from 'store/types'
import { baseQueryWithReauth } from 'store/utils'

export const projectApi = createApi({
  reducerPath: 'projectApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Project'],
  endpoints: (builder) => ({
    getProjects: builder.query<Array<IProjectEntity>, void>({
      query() {
        return {
          url: 'projects',
          credentials: 'include',
        }
      },
      transformResponse: (res: any) => res.projects as Array<IProjectEntity>,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(setProjects(data))

          // todo
          // const savedProject = getRecentProject(projects[0])

          // let currentProject = projects.find(
          //   (project) => project.id === (activeProjectId || savedProject.id),
          // )

          // if (!currentProject) {
          //   currentProject = projects[0]
          // }
          // yield put(
          //   fetchProjectsSuccess({projects
          //     projects,
          //     currentProject,
          //     isLoadingProjects: false,
          //   }),
          // )
          // if (projects && projects.length > 0) {
          //   const cachedLocations = yield select(selectCachedLocations())
          //   const locIds = []
          //   forEach(projects, (project, key) => {
          //     locIds.push(
          //       ...project.locations
          //         .map((l) => l.loc_id)
          //         .filter((locId) => isCity(locId) && !cachedLocations[locId]),
          //     )
          //   })
          //   if (locIds.length > 0) yield put(getLocationsInfo(uniq(locIds)))
          // }
        } catch (err) {
          // * nothing to do
        }
      },
    }),
    getProject: builder.query<IProjectEntity, string | number>({
      query(projectId) {
        return {
          url: `projects/${projectId}`,
          credentials: 'include',
        }
      },
      transformResponse: (res: any) => res.project as IProjectEntity,
      async onQueryStarted(_projectId, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(setProject(data))
        } catch (err) {
          // * nothing to do
        }
      },
    }),
  }),
})

export const { useGetProjectsQuery, useLazyGetProjectsQuery } = projectApi
