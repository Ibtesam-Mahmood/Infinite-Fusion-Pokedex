import React from 'react'
import Router from "./router";
import {RouterProvider} from "react-router-dom";

export default function RouterWrapper() {
  return (
    <RouterProvider router={Router} />
  )
}
