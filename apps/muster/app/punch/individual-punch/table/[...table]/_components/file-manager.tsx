"use client"
import Table from "@repo/ui/components/table-dynamic/data-table";
import { useRouter } from "next/navigation";
import FileManagerHeader from "./file-manager-header";
import PunchFormPopup from "../../../../_components/punch-form-popup";
import PunchRequestsPopup from '../../../../_components/punch-requests-popup';
import { useState, useEffect } from "react"; // adjust import as needed
import { useRequest } from "@repo/ui/hooks/api/useGetRequest";

function FileManager() {
    const router = useRouter();
    const [isPunchFormOpen, setIsPunchFormOpen] = useState(false);
    const [isPunchRequestsPopupOpen, setIsPunchRequestsPopupOpen] = useState(false);
    const [punchData, setPunchData] = useState([]);
  
  // Single employee data with multiple punch records
  const employeeData = [
    {
      id: "1",
      employeeId: "EMP1001",
      name: "John Smith",
      date: "2025-01-06",
      type: "punch_in",
      timestamp: "2025-01-06T08:55:00",
      location: "Office - New York",
      device: "Web Portal",
      notes: "On time arrival",
      totalHoursWorked: "09:00",
      status: "Present",
    },
    {
      id: "2",
      employeeId: "EMP1001",
      name: "John Smith",
      date: "2025-01-06",
      type: "punch_out",
      timestamp: "2025-01-06T17:45:00",
      location: "Office - New York",
      device: "Web Portal",
      notes: "Regular shift end",
      totalHoursWorked: "08:50",
      status: "Present",
    },
    {
      id: "3",
      employeeId: "EMP1001",
      name: "John Smith",
      date: "2025-01-07",
      type: "punch_in",
      timestamp: "2025-01-07T09:15:00",
      location: "Remote",
      device: "Mobile App",
      notes: "Remote work day",
      totalHoursWorked: "08:30",
      status: "Late",
    },
    {
      id: "4",
      employeeId: "EMP1001",
      name: "John Smith",
      date: "2025-01-07",
      type: "punch_out",
      timestamp: "2025-01-07T18:00:00",
      location: "Remote",
      device: "Mobile App",
      notes: "Remote work completed",
      totalHoursWorked: "08:45",
      status: "Present",
    },
    {
      id: "5",
      employeeId: "EMP1001",
      name: "John Smith",
      date: "2025-01-08",
      type: "punch_in",
      timestamp: "2025-01-08T08:40:00",
      location: "Office - New York",
      device: "Biometric",
      notes: "Early start",
      totalHoursWorked: "09:15",
      status: "Present",
    },
    {
      id: "6",
      employeeId: "EMP1001",
      name: "John Smith",
      date: "2025-01-08",
      type: "punch_out",
      timestamp: "2025-01-08T18:10:00",
      location: "Office - New York",
      device: "Biometric",
      notes: "Overtime for project",
      totalHoursWorked: "09:30",
      status: "Present",
    },
    {
      id: "7",
      employeeId: "EMP1001",
      name: "John Smith",
      date: "2025-01-09",
      type: "punch_in",
      timestamp: "2025-01-09T09:30:00",
      location: "Office - New York",
      device: "Web Portal",
      notes: "Traffic delay",
      totalHoursWorked: "07:45",
      status: "Late",
    },
    {
      id: "8",
      employeeId: "EMP1001",
      name: "John Smith",
      date: "2025-01-09",
      type: "punch_out",
      timestamp: "2025-01-09T17:30:00",
      location: "Office - New York",
      device: "Web Portal",
      notes: "Regular shift",
      totalHoursWorked: "08:00",
      status: "Present",
    },
    {
      id: "9",
      employeeId: "EMP1001",
      name: "John Smith",
      date: "2025-01-10",
      type: "punch_in",
      timestamp: "2025-01-10T08:50:00",
      location: "Office - New York",
      device: "Biometric",
      notes: "On time",
      totalHoursWorked: "08:45",
      status: "Present",
    },
    {
      id: "10",
      employeeId: "EMP1001",
      name: "John Smith",
      date: "2025-01-10",
      type: "punch_out",
      timestamp: "2025-01-10T17:45:00",
      location: "Office - New York",
      device: "Biometric",
      notes: "Regular shift end",
      totalHoursWorked: "08:55",
      status: "Present",
    },
    {
      id: "11",
      employeeId: "EMP1001",
      name: "John Smith",
      date: "2025-01-13",
      type: "punch_in",
      timestamp: "2025-01-13T08:55:00",
      location: "Remote",
      device: "Mobile App",
      notes: "Remote work day",
      totalHoursWorked: "08:30",
      status: "Present",
    },
    {
      id: "12",
      employeeId: "EMP1001",
      name: "John Smith",
      date: "2025-01-13",
      type: "punch_out",
      timestamp: "2025-01-13T17:30:00",
      location: "Remote",
      device: "Mobile App",
      notes: "Remote work completed",
      totalHoursWorked: "08:35",
      status: "Present",
    },
    {
      id: "13",
      employeeId: "EMP1001",
      name: "John Smith",
      date: "2025-01-14",
      type: "punch_in",
      timestamp: "2025-01-14T09:00:00",
      location: "Office - New York",
      device: "Web Portal",
      notes: "On time",
      totalHoursWorked: "08:45",
      status: "Present",
    },
    {
      id: "14",
      employeeId: "EMP1001",
      name: "John Smith",
      date: "2025-01-14",
      type: "punch_out",
      timestamp: "2025-01-14T18:00:00",
      location: "Office - New York",
      device: "Web Portal",
      notes: "Regular shift",
      totalHoursWorked: "09:00",
      status: "Present",
    },
    {
      id: "15",
      employeeId: "EMP1001",
      name: "John Smith",
      date: "2025-01-15",
      type: "punch_in",
      timestamp: "2025-01-15T08:45:00",
      location: "Office - New York",
      device: "Biometric",
      notes: "Early start",
      totalHoursWorked: "09:15",
      status: "Present",
    },
    {
      id: "16",
      employeeId: "EMP1001",
      name: "John Smith",
      date: "2025-01-15",
      type: "punch_out",
      timestamp: "2025-01-15T18:15:00",
      location: "Office - New York",
      device: "Biometric",
      notes: "Overtime for deadline",
      totalHoursWorked: "09:30",
      status: "Present",
    },
    {
      id: "17",
      employeeId: "EMP1001",
      name: "John Smith",
      date: "2025-01-16",
      type: "punch_in",
      timestamp: "2025-01-16T09:10:00",
      location: "Office - New York",
      device: "Web Portal",
      notes: "Slight delay",
      totalHoursWorked: "08:20",
      status: "Late",
    },
    {
      id: "18",
      employeeId: "EMP1001",
      name: "John Smith",
      date: "2025-01-16",
      type: "punch_out",
      timestamp: "2025-01-16T17:30:00",
      location: "Office - New York",
      device: "Web Portal",
      notes: "Regular shift end",
      totalHoursWorked: "08:20",
      status: "Present",
    }
  ];

  // Get values from URL query parameters
  let employeeId = null, fromDate = null, toDate = null;
  if (typeof window !== "undefined") {
    const params = new URLSearchParams(window.location.search);
    employeeId = params.get("employeeId");
    fromDate = params.get("fromdate"); // use 'fromdate' as in the URL
    toDate = params.get("todate");     // use 'todate' as in the URL
  }

  // Prepare request data
  const getRequestData = () => {
    const filters = [];
    if (employeeId) filters.push({ field: "employeeID", operator: "eq", value: employeeId });
    if (fromDate) filters.push({ field: "attendanceDate", operator: "gte", value: fromDate });
    if (toDate) filters.push({ field: "attendanceDate", operator: "lte", value: toDate });
    return filters;
  };

  // Use your request hook to fetch punch data
  const {
    data: punchDataResponse,
    loading: isLoading,
    error: punchError,
    refetch: fetchPunchData
  } = useRequest({
    url: "punchdata/search",
    method: "POST",
    data: getRequestData(),
    onSuccess: (data: any) => {
      console.log("Punch data received:", data);
      setPunchData(data)
      // You can set state here if you want to display the data
    },
    onError: (error: any) => {
      console.error("Error fetching punch data:", error);
    },
    dependencies: [employeeId, fromDate, toDate]
  });

  useEffect(() => {
    fetchPunchData()
  }, [])

  const handleUpload = () => {
    console.log("Upload functionality")
  }

  const handleDownloadPDF = () => {
    console.log("Download PDF functionality")
  }

  const handlePunchApplication = () => {
    console.log("Punch Application functionality")
    setIsPunchFormOpen(true)
  }

  const handleRequestPunch = () => {
    console.log("Request for Punch functionality")
    setIsPunchRequestsPopupOpen(true)
  }

  const handlePunchFormSubmit = (data: any) => {
    console.log("Punch form submitted:", data)
    setIsPunchFormOpen(false)
  }

  // Mock punchRequests data (replace with real data as needed)
  const punchRequests: any[] = [
    {
      id: '1',
      type: "in" as "in",
      requestedTime: new Date('2024-01-14T09:15:00'),
      reason: 'Forgot to punch in due to urgent meeting',
      status: 'pending',
      submittedAt: new Date('2024-01-14T10:00:00'),
    },
    {
      id: '2',
      type: "out" as "out",
      requestedTime: new Date('2024-01-13T18:00:00'),
      reason: 'System was down during punch out',
      status: 'approved',
      submittedAt: new Date('2024-01-13T19:00:00'),
    },
    // ...add more mock requests as needed...
  ]

  // Utility to format ISO time strings
  function formatTimeDisplay(isoString: string) {
    if (!isoString) return '';
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return isoString; // fallback if invalid
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  }

  // Format punchData before passing to Table
  const formattedPunchData = punchData.map((record: any) => ({
    ...record,
    timestamp: formatTimeDisplay(record.timestamp),
    punchedTime: formatTimeDisplay(record.punchedTime),
    transactionTime: formatTimeDisplay(record.transactionTime),
    uploadTime: formatTimeDisplay(record.uploadTime),
    date: formatTimeDisplay(record.date),
  }));

  const functionalityList = {
    tabletype: {
      type: "data",
      classvalue: {
        container: "col-span-12 mb-2",
        tableheder: {
          container: "bg-[#f8fafc]",
        },
        label: "text-gray-600",
        field: "p-1",
      },
    },
    columnfunctionality: {
      draggable: {
        status: true,
      },
      handleRenameColumn: {
        status: true,
      },
      slNumber: {
        status: true,
      },
      selectCheck: {
        status: false,
      },
      activeColumn: {
        status: false,
      },
    },
    textfunctionality: {
      expandedCells: {
        status: true,
      },
    },
    filterfunctionality: {
      handleSortAsc: {
        status: true,
      },
      handleSortDesc: {
        status: true,
      },
      search: {
        status: true,
      },
    },
    outsidetablefunctionality: {
      paginationControls: {
        status: true,
        start: "",
        end: "",
      },
      entriesPerPageSelector: {
        status: false,
      },
    },
    buttons: {
      save: {
        label: "Save",
        status: false,
        classvalue: {
          container: "col-span-12 mb-2",
          label: "text-gray-600",
          field: "p-1",
        },
        function: () => console.log("form"),
      },
      submit: {
        label: "Submit",
        status: false,
        classvalue: {
          container: "col-span-12 mb-2",
          label: "text-gray-600",
          field: "p-1",
        },
        function: () => console.log("form"),
      },
      addnew: {
        label: "Add New",
        status: false,
        classvalue: {
          container: "col-span-12 mb-2",
          label: "text-gray-600",
          field: "p-1",
        },
        function: () => router.push("/leave-policy/create-leave-policy"),
      },
      cancel: {
        label: "Cancel",
        status: false,
        classvalue: {
          container: "col-span-12 mb-2",
          label: "text-gray-600",
          field: "p-1",
        },
        function: () => console.log("form"),
      },
      actionDelete: {
        label: "Delete",
        status: false,
        classvalue: {
          container: "col-span-12 mb-2",
          label: "text-gray-600",
          field: "p-1",
        },
        function: (id: string) => console.log("location-inops", id),
      },
      actionLink: {
        label: "link",
        status: false,
        classvalue: {
          container: "col-span-12 mb-2",
          label: "text-gray-600",
          field: "p-1",
        },
        function: (item: any) => {
          router.push(`/excel-file-manager/upload-statues/${item?.like}`);
        },
      },
      actionEdit: {
        label: "Edit",
        status: false,
        classvalue: {
          container: "col-span-12 mb-2",
          label: "text-gray-600",
          field: "p-1",
        },
        function: (id: string) => console.log("location-inops", id),
      },
    },
  };
  return (
    <>
      <div className="bg-white border border-gray-200 shadow-xl rounded-xl">
        <div className="p-6 pb-0 border-b border-gray-200"> 
        <FileManagerHeader 
          title="John Smith - Attendance Records"
          description="View and manage punch records for John Smith (EMP1001)"
          onPunchApplication={handlePunchApplication}
          onRequestPunch={handleRequestPunch}
          onDownloadPDF={handleDownloadPDF}
        /> 
        </div>
        <Table functionalityList={functionalityList} data={formattedPunchData} />
      </div>

      {/* Punch Form Popup */}
      <PunchFormPopup
        isOpen={isPunchFormOpen}
        onClose={() => setIsPunchFormOpen(false)}
        onSubmit={handlePunchFormSubmit}
      />

      {/* Punch Requests Popup */}
      <PunchRequestsPopup
        isOpen={isPunchRequestsPopupOpen}
        onClose={() => setIsPunchRequestsPopupOpen(false)}
        punchRequests={punchRequests}
      />
    </>
  );
}

export default FileManager;
