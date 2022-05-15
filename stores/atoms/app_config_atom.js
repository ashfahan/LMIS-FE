import { atom } from 'recoil'

const islg = () => {
  if (
    typeof window !== 'undefined' &&
    sessionStorage.getItem('jobhop_loggedin_user')
  ) {
    return true
  } else {
    return false
  }
}

const checkAdmin = () => {
  if (
    typeof window !== 'undefined' &&
    sessionStorage.getItem('jobhop_loggedin_user_type') === '0'
  ) {
    return true
  } else {
    return false
  }
}

const checkCandidate = () => {
  if (
    typeof window !== 'undefined' &&
    sessionStorage.getItem('jobhop_loggedin_user_type') === '1'
  ) {
    return true
  } else {
    return false
  }
}

const isLoggedIn = atom({
  key: 'IS_LOGGED_IN',
  default: islg(),
})

const is_admin_user = atom({
  key: 'IS_ADMIN_USER',
  default: checkAdmin(),
})

const is_candidate_user = atom({
  key: 'IS_CANDIDATE_USER',
  default: checkCandidate(),
})

const GetCurrentCandidateId = atom({
  key: 'CURRENT_LOGGEDIN_CANDIDATE_ID',
  default:
    typeof window !== 'undefined'
      ? parseInt(
          sessionStorage.getItem('jobhop_loggedin_candidate_id')
            ? sessionStorage.getItem('jobhop_loggedin_candidate_id')
            : 0,
        )
      : 0,
})

const sessionStorageEffect =
  (key) =>
  ({ setSelf, onSet }) => {
    const savedValue =
      typeof window !== 'undefined' && sessionStorage.getItem(key)
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue))
    }
    onSet((newValue, _, isReset) => {
      isReset
        ? typeof window !== 'undefined' && sessionStorage.removeItem(key)
        : typeof window !== 'undefined' &&
          sessionStorage.setItem(key, JSON.stringify(newValue))
    })
  }

const language = atom({
  key: 'SELECTED_LANGUAGE',
  default:
    typeof window !== 'undefined' &&
    (sessionStorage.getItem('i18nextLng')
      ? sessionStorage.getItem('i18nextLng')
      : 'en'),
})

const userTypeAtom = atom({
  key: 'jobhop_loggedin_user_type',
  default: null,
  effects_UNSTABLE: [
    sessionStorageEffect('jobhop_loggedin_user_type'),
    // sessionStorageLanguageEffect('i18nextLng'),
  ],
})

const sidebarToggleBtn = atom({
  key: 'Sidebar_BTN_TOGGLE',
  default: false,
})

export {
  language,
  isLoggedIn,
  GetCurrentCandidateId,
  is_admin_user,
  is_candidate_user,
  userTypeAtom,
  sidebarToggleBtn,
}
