"use client";
import React, { Suspense, useEffect } from 'react'
import TabControler from './tab-controler'
import { useParams } from "next/navigation";
import { navorganization } from '@/json/organization/menu';

function PageRoute() {
  const params = useParams()
  const [dynamicFormName, setDynamicFormName] = React.useState<any>("")

  useEffect(() => {
    navorganization.forEach((navs) => {
      navs.items.forEach((nav) => {
       if(nav.href==`/contractor-employee/${params["contractor-employee"][0]}`){
        console.log("nav?.from",nav?.from)
          setDynamicFormName(nav?.from)
        }
      });
    });
  }, []);

  return (
    <Suspense fallback={<div className="p-4">Loading location data...</div>}>
      <TabControler pagename={params["contractor-employee"][0]} dynamicFormName={dynamicFormName}/>
    </Suspense>
  )
}

export default PageRoute