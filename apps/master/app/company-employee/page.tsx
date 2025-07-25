"use client";
import { EmployeeDeploymentForm } from "./_components/employee-deployment-form";

export default function Home() {
 

  return (
    <div className="w-full flex justify-center py-6">
      <div className="w-full max-w-7xl">
        <EmployeeDeploymentForm />
      </div>
    </div>
  );
}
