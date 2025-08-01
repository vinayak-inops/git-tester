export const organization = {
  component: "form",
  mode: "view",
  title: "organization",
  description:
    "An organization is a structured group working toward shared goals.",
  classvalue: "grid-cols-12 p-4",
  baseurl: "api/sectiondetails",
  subformstructure: [
    {
      formgrid: 1,
      title:"Details",
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
          classvalue: {
            container:"col-span-6 mb-2",
            label:"text-gray-600",
            field:"p-1"
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
          classvalue: {
            container:"col-span-6 mb-2",
            label:"text-gray-600",
            field:"p-1"
          },
          name: "code",
          mode: "super-edit",
          required: true,
          icon: "",
          fieldgrid: 1,
          displayOrder: 2,
        },
        {
          type: "textarea",
          tag: "textarea",
          label: "Description",
          classvalue: {
            container:"col-span-12 mb-2",
            label:"text-gray-600",
            field:"p-1"
          },
          name: "description",
          mode: "super-edit",
          required: true,
          icon: "",
          fieldgrid: 1,
          displayOrder: 3,
        },
        {
          type: "text",
          tag: "input",
          label: "RegistrationNo",
          classvalue: {
            container:"col-span-12 mb-2",
            label:"text-gray-600",
            field:"p-1"
          },
          name: "registrationno",
          mode: "super-edit",
          required: true,
          icon: "",
          fieldgrid: 1,
          displayOrder: 4,
        },
        {
          type: "image",
          tag: "logoupload",
          label: "RegistrationNo",
          classvalue: {
            container:"col-span-12 mb-2",
            label:"text-gray-600",
            field:"p-1"
          },
          name: "registrationno",
          mode: "super-edit",
          required: true,
          icon: "",
          fieldgrid: 1,
          displayOrder: 4,
        },
      ],
    },
    {
      formgrid: 1,
      classvalue: "col-span-6 ",
      title:"Contact Detail",
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
          classvalue: {
            container:"col-span-12 mb-2",
            label:"text-gray-600",
            field:"p-1"
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
          classvalue: {
            container:"col-span-12 mb-2",
            label:"text-gray-600",
            field:"p-1"
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
          classvalue: {
            container:"col-span-6 mb-2",
            label:"text-gray-600",
            field:"p-1"
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
          classvalue: {
            container:"col-span-6 mb-2",
            label:"text-gray-600",
            field:"p-1"
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
          classvalue: {
            container:"col-span-6 mb-2",
            label:"text-gray-600",
            field:"p-1"
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
          classvalue: {
            container:"col-span-6 mb-2",
            label:"text-gray-600",
            field:"p-1"
          },
          name: "country*",
          mode: "super-edit",
          required: true,
          icon: "",
          fieldgrid: 1,
          displayOrder: 4,
        },
        {
          type: "text",
          tag: "input",
          label: "Email Id",
          classvalue: {
            container:"col-span-12 mb-2",
            label:"text-gray-600",
            field:"p-1"
          },
          name: "emailid*",
          mode: "super-edit",
          required: true,
          icon: "",
          fieldgrid: 1,
          displayOrder: 4,
        },
        {
          type: "text",
          tag: "input",
          label: "Contact (P)",
          classvalue: {
            container:"col-span-6 mb-2",
            label:"text-gray-600",
            field:"p-1"
          },
          name: "contactp",
          mode: "super-edit",
          required: true,
          icon: "",
          fieldgrid: 1,
          displayOrder: 4,
        },
        {
          type: "text",
          tag: "input",
          label: "Contact (S)",
          classvalue: {
            container:"col-span-6 mb-2",
            label:"text-gray-600",
            field:"p-1"
          },
          name: "contacts",
          mode: "super-edit",
          required: true,
          icon: "",
          fieldgrid: 1,
          displayOrder: 4,
        },
        {
          type: "text",
          tag: "input",
          label: "Website",
          classvalue: {
            container:"col-span-12 mb-2",
            label:"text-gray-600",
            field:"p-1"
          },
          name: "website",
          mode: "super-edit",
          required: true,
          icon: "",
          fieldgrid: 1,
          displayOrder: 4,
        },
      ],
    },
    // {
    //   formgrid: 1,
    //   title:"Occupier",
    //   classvalue: "col-span-6 gap-4",
    //   validationRules: {
    //     required: [
    //       "code",
    //       "birth_date",
    //       "father_name",
    //       "owner_name",
    //       "owner_contact_no",
    //       "owner_email",
    //       "contact_person_name",
    //       "contact_person_contact_no",
    //       "contact_person_email",
    //       "type_of_company",
    //       "area_of_work",
    //       "service_from",
    //       "service_end",
    //       "name",
    //     ],
    //   },
    //   fields: [
    //     {
    //       type: "text",
    //       tag: "input",
    //       label: "Name",
    //       classvalue: {
    //         container:"col-span-6 mb-2",
    //         label:"text-gray-600",
    //         field:"p-1"
    //       },
    //       name: "name",
    //       mode: "super-edit",
    //       required: false,
    //       icon: "",
    //       fieldgrid: 1,
    //       displayOrder: 1,
    //     },
    //     {
    //       type: "text",
    //       tag: "input",
    //       label: "Contact No",
    //       classvalue: {
    //         container:"col-span-6 mb-2",
    //         label:"text-gray-600",
    //         field:"p-1"
    //       },
    //       name: "contactno",
    //       mode: "super-edit",
    //       required: true,
    //       icon: "",
    //       fieldgrid: 1,
    //       displayOrder: 2,
    //     },
    //     {
    //       type: "text",
    //       tag: "input",
    //       label: "Email Id",
    //       classvalue: {
    //         container:"col-span-12 mb-2",
    //         label:"text-gray-600",
    //         field:"p-1"
    //       },
    //       name: "emailid",
    //       mode: "super-edit",
    //       required: true,
    //       icon: "",
    //       fieldgrid: 1,
    //       displayOrder: 4,
    //     },
    //   ],
    // },
    // {
    //   formgrid: 1,
    //   title:"Factory Manager",
    //   classvalue: "col-span-6 gap-4",
    //   validationRules: {
    //     required: [
    //       "code",
    //       "birth_date",
    //       "father_name",
    //       "owner_name",
    //       "owner_contact_no",
    //       "owner_email",
    //       "contact_person_name",
    //       "contact_person_contact_no",
    //       "contact_person_email",
    //       "type_of_company",
    //       "area_of_work",
    //       "service_from",
    //       "service_end",
    //       "name",
    //     ],
    //   },
    //   fields: [
    //     {
    //       type: "text",
    //       tag: "input",
    //       label: "Name",
    //       classvalue: {
    //         container:"col-span-6 mb-2",
    //         label:"text-gray-600",
    //         field:"p-1"
    //       },
    //       name: "name",
    //       mode: "super-edit",
    //       required: false,
    //       icon: "",
    //       fieldgrid: 1,
    //       displayOrder: 1,
    //     },
    //     {
    //       type: "text",
    //       tag: "input",
    //       label: "Contact No",
    //       classvalue: {
    //         container:"col-span-6 mb-2",
    //         label:"text-gray-600",
    //         field:"p-1"
    //       },
    //       name: "contactno",
    //       mode: "super-edit",
    //       required: true,
    //       icon: "",
    //       fieldgrid: 1,
    //       displayOrder: 2,
    //     },
    //     {
    //       type: "text",
    //       tag: "input",
    //       label: "Email Id",
    //       classvalue: {
    //         container:"col-span-12 mb-2",
    //         label:"text-gray-600",
    //         field:"p-1"
    //       },
    //       name: "emailid",
    //       mode: "super-edit",
    //       required: true,
    //       icon: "",
    //       fieldgrid: 1,
    //       displayOrder: 4,
    //     },
    //   ],
    // },
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
  ],
};
