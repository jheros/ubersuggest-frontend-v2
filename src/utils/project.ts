import { IProjectEntity } from 'store/types'

export const getProjectKeywordCount = (project: IProjectEntity) => {
  return Object.values(project.keywords || {}).reduce((sum, v) => sum + v.length, 0)
}

export const getProjectIssueCount = (project: IProjectEntity) => {
  return project.audit?.issues_per_category?.errors?.count ?? 0
}
