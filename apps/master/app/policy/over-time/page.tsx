"use client"
import React, { useEffect, useState } from 'react';
import OTPolicyForm from './_components/OTPolicyForm';
import OTPolicyList from './_components/OTPolicyList';
import ReadMore from './_components/ReadMore';
import { OTPolicyApplication } from './_components/types';
import { db } from './_components/db';
import TopTitleDescription from '@repo/ui/components/titleline/top-title-discription';
import SemiPopupWrapper from '@repo/ui/components/popupwrapper/semi-popup-wrapper';
import BigPopupWrapper from '@repo/ui/components/popupwrapper/big-popup-wrapper';

export default function OTPolicyPage() {
  const [data, setData] = useState<OTPolicyApplication[]>([]);
  const [editing, setEditing] = useState<OTPolicyApplication | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [readMoreItem, setReadMoreItem] = useState<OTPolicyApplication | null>(null);
  const [showReadMore, setShowReadMore] = useState(false);

  const fetchData = async () => {
    const all = await db.otPolicies.toArray();
    setData(all);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = async (item: OTPolicyApplication) => {
    if (item._id) {
      const { _id, ...changes } = item;
      await db.otPolicies.update(_id, changes);
    } else {
      await db.otPolicies.add(item);
    }
    setShowForm(false);
    setEditing(null);
    fetchData();
  };

  const handleEdit = (item: OTPolicyApplication) => {
    setEditing(item);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this policy?')) {
      await db.otPolicies.delete(id);
      fetchData();
    }
  };

  const handleAdd = () => {
    setEditing(null);
    setShowForm(true);
  };

  const handleCancel = () => {
    setEditing(null);
    setShowForm(false);
  };

  const handleReadMore = (item: OTPolicyApplication) => {
    setReadMoreItem(item);
    setShowReadMore(true);
  };

  return (
    <div className="p-8 px-12 bg-gray-100 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-6">
        <TopTitleDescription
          titleValue={{
            title: 'Overtime Policy Management',
            description: 'Manage overtime policies for your organization.'
          }}
        />
        <div className="flex gap-2">
          <button
            className="btn btn-sm text-white font-semibold text-base rounded-md px-4 py-2 text-base"
            style={{ backgroundColor: '#0061ff', borderColor: '#0061ff' }}
            onClick={handleAdd}
          >
            + Add Overtime Policy
          </button>
        </div>
      </div>

      {/* Form Modal */}
      <BigPopupWrapper
        open={showForm}
        setOpen={setShowForm}
        content={{
          title: editing ? 'Edit Overtime Policy' : 'Add Overtime Policy',
          description: 'Fill in the details for the overtime policy below.'
        }}
      >
        <div className="flex-1 flex overflow-auto">
          <OTPolicyForm
            initialValues={editing || {}}
            onSubmit={handleSave}
            onCancel={handleCancel}
          />
        </div>
      </BigPopupWrapper>

      {/* Read More Modal */}
      <BigPopupWrapper
        open={showReadMore}
        setOpen={setShowReadMore}
        content={{
          title: 'Overtime Policy Details',
          description: 'Detailed view of the overtime policy.'
        }}
      >
        {readMoreItem && (
          <ReadMore
            item={readMoreItem}
            onClose={() => setShowReadMore(false)}
          />
        )}
      </BigPopupWrapper>

      {/* List View */}
      <div className="min-w-0 overflow-x-auto">
        <OTPolicyList
          data={data}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onReadMore={handleReadMore}
        />
      </div>
    </div>
  );
}