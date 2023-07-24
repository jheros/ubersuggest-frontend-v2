import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchGTM = async () => {
  return await fetch('https://www.googletagmanager.com/gtm.js?id=GTM-WMJBH6Z')
}

export const fetchHotJar = async () => {
  return await fetch('https://static.hotjar.com/c/hotjar-2058125.js?sv=6')
}

// todo: confirm this logic is correct
// todo: cache
export const detectAdBlocker = createAsyncThunk('adBlockApi/detectAdBlocker', async () => {
  try {
    const responses = await Promise.all([fetchGTM(), fetchHotJar()])
    return !responses[0]
  } catch (err: any) {
    return err && !err.response
  }
})
