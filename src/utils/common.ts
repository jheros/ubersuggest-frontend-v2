export const getOS = () => {
  const OS_Name = navigator.appVersion
  if (OS_Name.indexOf('Win') !== -1) {
    return 'Win'
  } else if (OS_Name.indexOf('Mac') !== -1) {
    return 'Mac'
  } else if (OS_Name.indexOf('X11') !== -1) {
    return 'X11'
  } else if (OS_Name.indexOf('Linux') !== -1) {
    return 'Linux'
  } else if (OS_Name.indexOf('SunOS') !== -1) {
    return 'SunOS'
  } else {
    return 'Win'
  }
}
