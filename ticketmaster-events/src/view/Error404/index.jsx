import React from 'react'
import { useRouteError } from 'react-router-dom'

export default function Error404() {
    const error = useRouteError();
  return (
    <div>
        <h3>Ops!</h3>
        <p>No hemos encontrado la ruta que buscas</p>
        <p>{error.status && error.data}</p>
    </div>
  )
}
