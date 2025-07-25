"use client";
import React from "react";
import OrganizationPage from "./_components/organization-page";
import Component from "./_components/temp-me-organization";
import OrganizationInfo from "./_components/organization-info";

export default function Home() {
  const [formData, setFormData] = React.useState<any>(null);
  

  return (
    <div className="w-full overflow-y-auto">
      {/* <OrganizationInfo/> */}
      <Component/>
      {/* <LocationManagement/> */}
      {/* <OrganizationPage /> */}
      {/* {formData !== null ? <DynamicForm department={formData} /> : null} */}
    </div>
  );
}
