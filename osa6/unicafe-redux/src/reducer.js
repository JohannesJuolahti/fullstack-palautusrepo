const initialState = {
  good: 0,
  ok: 0,
  bad: 0,
  zero: 0
}
let changed = false
let changedState = {}

const counterReducer = (state = initialState, action) => {
  !changed ? changedState = { 
    ...initialState, 
  }
  : changedState = {
    ...changedState
  }
  
  switch (action.type) {
    case 'GOOD':
      changedState.good += 1
      changed = true
      return changedState
    case 'BAD':
      changedState.bad += 1
      changed = true
      return changedState
    case 'OK':
      changedState.ok += 1
      changed = true
      return changedState
    case 'ZERO':
      changedState = initialState
      changed = false
      return initialState
    default: return initialState
  }
  
}

export default counterReducer