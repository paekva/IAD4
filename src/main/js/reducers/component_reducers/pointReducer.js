export default function reducer( state = {
                                        x: 0,
                                        y: 0,
                                        r: 0,
                                        inside: null,
                                 } , action )
{

    switch(action.type)
    {
        case "CHANGE_X":
        {
            state = Object.assign({}, state, { x: action.payload});
            break;
        }
        case "CHANGE_Y":
        {
            state = Object.assign({}, state, { y: action.payload});
            break;
        }
        case "CHANGE_R":
        {
            state = Object.assign({}, state, { r: action.payload});
            break;
        }
        default: break;
    }

    return state;
}
