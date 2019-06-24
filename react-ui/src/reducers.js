export function reducer(state = {}, action) {

    if (action.type === 'TEST_1') {
        return { ...state,
        testarray: action.testarray};
    }

    return state;
}
