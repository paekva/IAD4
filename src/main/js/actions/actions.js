export function changeX(x) {
    return{
        type: "CHANGE_X",
        payload: x,
    }
}

export function changeY(y) {
    return{
        type: "CHANGE_Y",
        payload: y,
    }
}

export function changeR(r) {
    return{
        type: "CHANGE_R",
        payload: r,
    }
}

export function change(bool) {
    return{
        type: "CHANGE_INSIDE",
        payload: bool,
    }
}