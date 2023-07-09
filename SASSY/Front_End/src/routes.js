import React from "react"
import { useRoutes, Navigate } from "react-router-dom"
import { HelmetWrap, PageWrap } from "./wrapper"
import { LoginForm } from "./pages"
import { PatientProfile } from "./pages/Doctor"
import { pages, usermap, routeChildren } from "./constants"

export default function Router({ handleLogin }) {
  const routes = useRoutes([
    {
      breadcrumb: "Home",
      path: "/",
      element:
        <HelmetWrap
          title="Home"
          element={<LoginForm handleLogin={handleLogin} />}
        />
    },

    ...pages.map((page) => ({
      breadcrumb: page.breadcrumb,
      path: `/${usermap[page.usertype]}`,
      ...(routeChildren[page.usertype].length > 0) ? {
        children: [
          {
            element: <Navigate to={routeChildren[page.usertype][0].path} replace />,
            index: true
          },
          ...routeChildren[page.usertype].map((child) => ({
            breadcrumb: child.breadcrumb,
            path: child.path,
            element:
              <PageWrap
                title={child.breadcrumb}
                element={child.element}
              />
          }))
        ]
      } : {
        element:
          <PageWrap
            title={page.breadcrumb}
            element={<page.element />}
          />
      }
    })),

    {
      breadcrumb: "Patient profile",
      path: "/doctor/patients/:id",
      element:
        <PageWrap
          title="Patient profile"
          element={<PatientProfile />}
        />
    }
  ])

  return routes
}