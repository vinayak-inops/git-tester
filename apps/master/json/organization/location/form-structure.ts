export const location = {
  component: "form",
  mode: "view",
  title: "Location",
  description: "An location is a structured group working toward shared goals.",
  classvalue: "grid-cols-12",
  baseurl: "api/sectiondetails",
  subformstructure: [
    {
      formgrid: 1,
      title: "Location",
      classvalue: "col-span-6 gap-4",
      validationRules: {
        required: [
          "code",
          "birth_date",
          "father_name",
          "owner_name",
          "owner_contact_no",
          "owner_email",
          "contact_person_name",
          "contact_person_contact_no",
          "contact_person_email",
          "type_of_company",
          "area_of_work",
          "service_from",
          "service_end",
          "name",
        ],
      },
      fields: [
        {
          type: "text",
          tag: "input",
          label: "Name *",
          value:"",

          classvalue: {
            container: "col-span-6 mb-2",
            label: "text-gray-600",
            field: "p-1",
          },
          name: "name",
          mode: "super-edit",
          required: false,
          icon: "",
          fieldgrid: 1,
          displayOrder: 1,
        },
        {
          type: "text",
          tag: "input",
          label: "Code",
          value:"",
          classvalue: {
            container: "col-span-6 mb-2",
            label: "text-gray-600",
            field: "p-1",
          },
          name: "code",
          mode: "super-edit",
          required: true,
          icon: "",
          fieldgrid: 1,
          displayOrder: 2,
        },
        {
          type: "checkbox",
          tag: "checkbox",
          label: "",
          value:"",
          name: "action",
          placeholder: "Enable quarter day option",
          classvalue: {
            container: "col-span-6 mb-2",
            label: "text-gray-600",
            field: "p-1",
          },
          required: false,
          mode: "super-edit",
          icon: "",
          fieldgrid: 1,
          displayOrder: 3,
        },
        {
          type: "select",
          tag: "select",
          label: "Region",
          name: "region",
          value:"",
          mode: "super-edit",
          classvalue: {
            container: "col-span-6 mb-2",
            label: "text-gray-600",
            field: "p-1",
          },
          main: true,
          icon: "",
          options: [
            { label: "John Doe", value: "John Doe" },
            { label: "Alice Johnson", value: "Alice Johnson" },
            { label: "Mark Taylor", value: "Mark Taylor" },
            { label: "Lucy Anderson", value: "Lucy Anderson" },
            { label: "Ethan Carter", value: "Ethan Carter" },
          ],
          required: true,
          onChange: "fetchFormDetails",
          fieldgrid: 1,
          displayOrder: 4,
        },
        // {
        //   tag: "dummy",
        //   classvalue: {
        //     container: "col-span-6 mb-2",
        //   },
        //   fieldgrid: 1,
        //   displayOrder: 5,
        // },
        {
          type: "select",
          tag: "select",
          label: "Zone",
          value:"",
          name: "zone",
          mode: "super-edit",
          classvalue: {
            container: "col-span-6 mb-2",
            label: "text-gray-600",
            field: "p-1",
          },
          main: true,
          icon: "",
          options: [
            { label: "John Doe", value: "John Doe" },
            { label: "Alice Johnson", value: "Alice Johnson" },
            { label: "Mark Taylor", value: "Mark Taylor" },
            { label: "Lucy Anderson", value: "Lucy Anderson" },
            { label: "Ethan Carter", value: "Ethan Carter" },
          ],
          required: true,
          onChange: "fetchFormDetails",
          fieldgrid: 1,
          displayOrder: 6,
        },
      ],
    },
    {
      formgrid: 1,
      classvalue: "col-span-6 ",
      title: "Contact Detail",
      validationRules: {
        required: [
          "code",
          "birth_date",
          "father_name",
          "owner_name",
          "owner_contact_no",
          "owner_email",
          "contact_person_name",
          "contact_person_contact_no",
          "contact_person_email",
          "type_of_company",
          "area_of_work",
          "service_from",
          "service_end",
          "name",
        ],
      },
      fields: [
        {
          type: "text",
          tag: "input",
          label: "Address Line 1",
          value:"",
          classvalue: {
            container: "col-span-12 mb-2",
            label: "text-gray-600",
            field: "p-1",
          },
          name: "addresslineone",
          mode: "super-edit",
          required: true,
          icon: "",
          fieldgrid: 1,
          displayOrder: 1,
        },
        {
          type: "text",
          tag: "input",
          label: "Address Line 2",
          value:"",
          classvalue: {
            container: "col-span-12 mb-2",
            label: "text-gray-600",
            field: "p-1",
          },
          name: "addresslinetwo",
          mode: "super-edit",
          required: true,
          icon: "",
          fieldgrid: 1,
          displayOrder: 2,
        },
        {
          type: "text",
          tag: "input",
          label: "City",
          value:"",
          classvalue: {
            container: "col-span-6 mb-2",
            label: "text-gray-600",
            field: "p-1",
          },
          name: "city",
          mode: "super-edit",
          required: true,
          icon: "",
          fieldgrid: 1,
          displayOrder: 4,
        },
        {
          type: "text",
          tag: "input",
          label: "PIN Code",
          value:"",
          classvalue: {
            container: "col-span-6 mb-2",
            label: "text-gray-600",
            field: "p-1",
          },
          name: "pincode",
          mode: "super-edit",
          required: true,
          icon: "",
          fieldgrid: 1,
          displayOrder: 4,
        },
        {
          type: "text",
          tag: "input",
          label: "State",
          value:"",
          classvalue: {
            container: "col-span-6 mb-2",
            label: "text-gray-600",
            field: "p-1",
          },
          name: "state",
          mode: "super-edit",
          required: true,
          icon: "",
          fieldgrid: 1,
          displayOrder: 4,
        },
        {
          type: "text",
          tag: "input",
          label: "Country",
          value:"",
          classvalue: {
            container: "col-span-6 mb-2",
            label: "text-gray-600",
            field: "p-1",
          },
          name: "country*",
          mode: "super-edit",
          required: true,
          icon: "",
          fieldgrid: 1,
          displayOrder: 4,
        },
      ],
    },
  ],
  actions: [
    {
      type: "button",
      label: "Save",
      action: "save",
      classvalue: "btn-primary",
    },
    {
      type: "button", 
      label: "Close",
      action: "close",
      classvalue: "btn-secondary",
    },
    {
      type: "button",
      label: "Submit",
      action: "submit",
      classvalue: "btn-secondary",
    },
  ],
};

export const headData = [
  "name",
  "code",
  "region",
  "zone",
  "active",
  "address_line_1",
  "address_line_2",
  "country*",
  "state",
  "city*",
  "pincode",
];
