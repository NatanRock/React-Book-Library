import { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch, useSelector } from 'react-redux'
import { clearError, selectError } from '../../redux/slices/errorSlice'

export const Error = () => {
    const dispatch = useDispatch()
    const errorMessages = useSelector(selectError)

    useEffect(() => {
        if (errorMessages) {
            toast.info(errorMessages)
            dispatch(clearError())
        }
    }, [ errorMessages, dispatch ])

    return <ToastContainer position="top-right" autoClose={2000} />
}