import profileProgress from './profileProgress'

function getProfileProgress(cv, bio, education, experience, dp) {
  let _result = 0
  if (dp === 'true') _result += profileProgress.dp
  if (cv === 'true') _result += profileProgress.cv
  if (bio === 'true') _result += profileProgress.bio
  if (education === 'true') _result += profileProgress.experience
  if (experience === 'true') _result += profileProgress.experience
  return _result
}
export default getProfileProgress
