import React from "react";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import { useMemo } from 'react'
import {useSelector} from 'react-redux'
import {createAction, handleActions} from 'redux-actions'
import produce from 'immer'
import { combineReducers } from "redux";


const CHANGE_INPUT = 'todos/CHANGE_INPUT'
const INSERT = 'todos/INSERT'
const TOGGLE = 'todos/TOGGLE'
const REMOVE = 'todos/REMOVE'

export const changeInput = createAction(CHANGE_INPUT, input => input)
let id = 3
export const insert = createAction(INSERT, text => ({id: id++, text, done: false}))
export const toggle = createAction(TOGGLE, id => id)
export const remove = createAction(REMOVE, id => id)

function useActions(actions, deps) {
    const dispatch = useDispatch()
    return useMemo(
        ()=>{
            if(Array.isArray(actions)){
                return actions.map(a => bindActionCreators(a, dispatch))
            }
            return bindActionCreators(actions, dispatch)
        }, deps ? [dispatch, ...deps] : deps
    )
}

const initailState = {
    input: '',
    todos: [
        {
            id: 1,
            text: '서울역',
            done: true
        },
        {
            id: 2,
            text: '노고산',
            done: false
        }
    ]
}

const todosReducer = handleActions({
    [CHANGE_INPUT]: (state, {payload: input})=> produce(state, draft =>{draft.input = input}) ,
    [INSERT]: (state, {payload: todo})=> produce(state, draft => {draft.todos.push(todo)}),
    [TOGGLE]: (state, {payload: id})=>
        produce(state, draft => {const todo = draft.todos.find(todo => todo.id === id)
            todo.done = !todo.done}),
    [REMOVE]: (state, { payload: id })=>
        produce(state, draft => {const index = draft.todos.findIndex(todo => todo.id === id)
            draft.todos.splice(index, 1)})

}, initailState)

const TodoItem = ({todo, onRemove}:any) =>{
    return <>
        <div>
            <span>
                {todo.id} {todo.text}
              </span>
            <button onClick={() => onRemove(todo.id)}>삭제</button>
        </div>
    </>
}

const Todos= ({input, todos, onChangeInput, onInsert,  onToggle, onRemove}) => {
    const onSubmit = e => {
        e.preventDefault()
        onInsert(input)
        onChangeInput('')
    }
    const onChange = e => {
        e.preventDefault()
        onChangeInput(e.target.value)
    }
    return <>
        <div>
            <form onSubmit={onSubmit} >
                <div>
                    <div>
                        <input
                            value={input}
                            onChange={onChange}
                        />
                    </div>
                    <button type="submit">
                        등록
                    </button>
                </div>
            </form>
            <div>
                {
                    todos.map(todo=>(<TodoItem
                        todo={todo}
                        key={todo.id}
                        onToggle={onToggle}
                        onRemove={onRemove}/>))
                }
            </div>
        </div>
    </>
}
const Directions= () => {
    const {input, todos}:any =
        useSelector(({todosReducer}:any)=>{

            if (typeof(todosReducer.input) == 'undefined') {
                alert(`todos.input 은 undefinded 입니다`)
            }else{

                return {input: todosReducer.input, todos: todosReducer.todos}
            }


        })
    const [onChangeInput, onInsert, onToggle, onRemove] = useActions(
        [changeInput, insert, toggle, remove],
        []
    )
    return (
        <Todos input={input} todos={todos} onChangeInput={onChangeInput}
               onInsert={onInsert} onToggle={onToggle} onRemove={onRemove}/>)
}
export default React.memo(Directions)

export const rootReducer = combineReducers({
    todosReducer
})
