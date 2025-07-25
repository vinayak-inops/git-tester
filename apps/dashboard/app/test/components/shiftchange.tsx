"use client";
import React, { useState } from 'react';
import { Form, Input, DatePicker, Select, Button, Card, Space, Typography } from 'antd/lib';
import type { FormInstance, FormListFieldData } from 'antd/lib/form';
import type { FormItemProps } from 'antd/lib/form';
import type { InputProps } from 'antd/lib/input';
import type { FormProps } from 'antd/lib/form';

const { Title } = Typography;

// Types for shift change
interface ShiftChangeBase {
  empid: string;
  fromdate: string;
  todate: string;
  type: 'Automatic' | 'Fixed' | 'Rotational';
  shiftgroup: string;
}

interface AutomaticShiftChange extends ShiftChangeBase {
  type: 'Automatic';
}

interface FixedShiftChange extends ShiftChangeBase {
  type: 'Fixed';
  shift: string;
}

interface RotationalShiftChange extends ShiftChangeBase {
  type: 'Rotational';
  shifts: Array<{
    shift: string;
    noofdays: number;
  }>;
}

type ShiftChange = AutomaticShiftChange | FixedShiftChange | RotationalShiftChange;

// Sample employee data - replace this with actual data from your backend
const sampleEmployees = [
  { value: 'EMP001', label: 'EMP001 - John Doe' },
  { value: 'EMP002', label: 'EMP002 - Jane Smith' },
  { value: 'EMP003', label: 'EMP003 - Mike Johnson' },
  { value: 'EMP004', label: 'EMP004 - Sarah Williams' },
  { value: 'EMP005', label: 'EMP005 - David Brown' },
];

const ShiftChangeForm: React.FC = () => {
  const [form] = Form.useForm<ShiftChange>();
  const [shiftType, setShiftType] = useState<'Automatic' | 'Fixed' | 'Rotational'>('Automatic');
  const [totalDays, setTotalDays] = useState<number>(0);
  const [allocatedDays, setAllocatedDays] = useState<number>(0);

  const calculateTotalDays = (fromDate: string, toDate: string) => {
    const start = new Date(fromDate);
    const end = new Date(toDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 to include both start and end dates
    return diffDays;
  };

  const onFinish = (values: ShiftChange) => {
    console.log('Form values:', values);
    // Handle form submission here
  };

  const handleTypeChange = (value: 'Automatic' | 'Fixed' | 'Rotational') => {
    setShiftType(value);
    form.resetFields(['shift', 'shifts']);
  };

  const handleDateChange = () => {
    const fromDate = form.getFieldValue('fromdate')?.format('YYYY-MM-DD');
    const toDate = form.getFieldValue('todate')?.format('YYYY-MM-DD');
    
    if (fromDate && toDate) {
      const days = calculateTotalDays(fromDate, toDate);
      setTotalDays(days);
      // Reset allocated days when dates change
      setAllocatedDays(0);
      form.resetFields(['shifts']);
    }
  };

  const updateAllocatedDays = (shifts: any[]) => {
    const total = shifts.reduce((sum: number, shift: any) => {
      return sum + (Number(shift?.noofdays) || 0);
    }, 0);
    setAllocatedDays(total);
  };

  const validateTotalDays = (_: any, value: number) => {
    const shifts = form.getFieldValue('shifts') || [];
    const currentIndex = shifts.findIndex((shift: any) => shift?.noofdays === value);
    const otherShiftsTotal = shifts.reduce((sum: number, shift: any, index: number) => {
      if (index !== currentIndex && shift?.noofdays) {
        return sum + Number(shift.noofdays);
      }
      return sum;
    }, 0);

    const newTotal = otherShiftsTotal + Number(value);

    // Strict validation for exact total at all times
    if (newTotal !== totalDays) {
      return Promise.reject(`Sum must equal exactly ${totalDays} days`);
    }

    // Validate individual shift days
    if (Number(value) > totalDays) {
      return Promise.reject(`Shift days cannot exceed ${totalDays} days`);
    }

    // Update allocated days after validation
    updateAllocatedDays(shifts);
    return Promise.resolve();
  };

  const validateShiftDistribution = () => {
    const shifts = form.getFieldValue('shifts') || [];
    const totalAllocated = shifts.reduce((sum: number, shift: any) => {
      return sum + (Number(shift?.noofdays) || 0);
    }, 0);

    // Strict validation for exact total at all times
    if (totalAllocated !== totalDays) {
      return Promise.reject(`Sum of days (${totalAllocated}) must equal exactly ${totalDays} days`);
    }

    // Validate shift distribution
    const shiftDays = shifts.map((shift: any) => Number(shift?.noofdays) || 0);
    
    // Validate that no single shift exceeds totalDays
    const hasInvalidShift = shiftDays.some((days: number) => days > totalDays);
    if (hasInvalidShift) {
      return Promise.reject(`No single shift can exceed ${totalDays} days`);
    }

    // Validate that all shifts have positive days
    const hasZeroOrNegativeDays = shiftDays.some((days: number) => days <= 0);
    if (hasZeroOrNegativeDays) {
      return Promise.reject('Each shift must have at least 1 day');
    }

    return Promise.resolve();
  };

  return (
    <Card style={{ maxWidth: 800, margin: '20px auto' }}>
      <Title level={3}>Shift Change Request</Title>
      <Form<ShiftChange>
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ type: 'Automatic' }}
      >
        <Form.Item<ShiftChange>
          name="empid"
          label="Employee ID"
          rules={[{ required: true, message: 'Please select Employee ID' }]}
        >
          <Select
            id="empid"
            placeholder="Select Employee ID"
            options={sampleEmployees}
            showSearch
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
          />
        </Form.Item>

        <Form.Item<ShiftChange>
          name="fromdate"
          label="From Date"
          rules={[{ required: true, message: 'Please select From Date' }]}
        >
          <DatePicker 
            style={{ width: '100%' }} 
            format="DD-MMM-YYYY" 
            onChange={handleDateChange}
          />
        </Form.Item>

        <Form.Item<ShiftChange>
          name="todate"
          label="To Date"
          rules={[{ required: true, message: 'Please select To Date' }]}
        >
          <DatePicker 
            style={{ width: '100%' }} 
            format="DD-MMM-YYYY" 
            onChange={handleDateChange}
          />
        </Form.Item>

        <Form.Item<ShiftChange>
          name="type"
          label="Shift Type"
          rules={[{ required: true, message: 'Please select Shift Type' }]}
        >
          <Select
            onChange={handleTypeChange}
            options={[
              { value: 'Automatic', label: 'Automatic' },
              { value: 'Fixed', label: 'Fixed' },
              { value: 'Rotational', label: 'Rotational' },
            ]}
          />
        </Form.Item>

        <Form.Item<ShiftChange>
          name="shiftgroup"
          label="Shift Group"
          rules={[{ required: true, message: 'Please enter Shift Group' }]}
        >
          <Input id="shiftgroup" placeholder="Enter Shift Group" />
        </Form.Item>

        {shiftType === 'Fixed' && (
          <Form.Item<ShiftChange>
            name="shift"
            label="Shift"
            rules={[{ required: true, message: 'Please enter Shift' }]}
          >
            <Input id="shift" placeholder="Enter Shift (e.g., A1)" />
          </Form.Item>
        )}

        {shiftType === 'Rotational' && (
          <>
            {totalDays > 0 && (
              <Space direction="vertical" style={{ width: '100%', marginBottom: 16 }}>
                <Typography.Text type="secondary">
                  Total available days: {totalDays}
                </Typography.Text>
                <Typography.Text type="secondary">
                  Allocated days: {allocatedDays} / {totalDays}
                </Typography.Text>
                <Typography.Text type="warning" style={{ fontSize: '12px' }}>
                  Note: Sum of shift days must equal exactly {totalDays} days at all times
                </Typography.Text>
              </Space>
            )}
            <Form.List 
              name="shifts"
              rules={[
                { validator: validateShiftDistribution }
              ]}
            >
              {(fields: FormListFieldData[], { add, remove }: { add: () => void; remove: (index: number) => void }) => (
                <>
                  {fields.map(({ key, name, ...restField }: FormListFieldData) => (
                    <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                      <Form.Item
                        {...restField}
                        name={[name, 'shift']}
                        rules={[{ required: true, message: 'Missing shift' }]}
                      >
                        <Input id={`shift-${name}`} placeholder="Shift (e.g., A1)" />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, 'noofdays']}
                        rules={[
                          { required: true, message: 'Missing days' },
                          { validator: validateTotalDays }
                        ]}
                      >
                        <Input 
                          id={`days-${name}`} 
                          type="number" 
                          min={1}
                          max={totalDays}
                          placeholder="Number of days" 
                          onChange={(e) => {
                            const value = Number(e.target.value);
                            if (value) {
                              const shifts = form.getFieldValue('shifts') || [];
                              shifts[name] = { ...shifts[name], noofdays: value };
                              updateAllocatedDays(shifts);
                              
                              // Always validate the sum
                              const newTotal = shifts.reduce((sum: number, shift: any) => {
                                return sum + (Number(shift?.noofdays) || 0);
                              }, 0);
                              
                              if (newTotal !== totalDays) {
                                form.setFields([
                                  {
                                    name: ['shifts', name, 'noofdays'],
                                    errors: [`Sum must equal exactly ${totalDays} days`]
                                  }
                                ]);
                              } else {
                                form.setFields([
                                  {
                                    name: ['shifts', name, 'noofdays'],
                                    errors: []
                                  }
                                ]);
                              }
                            }
                          }}
                        />
                      </Form.Item>
                      <Button type="link" onClick={() => {
                        remove(name);
                        const shifts = form.getFieldValue('shifts') || [];
                        updateAllocatedDays(shifts);
                      }}>
                        Delete
                      </Button>
                    </Space>
                  ))}
                  <Form.Item>
                    <Button 
                      type="dashed" 
                      onClick={() => add()} 
                      block
                      disabled={
                        fields.length >= 3 || 
                        allocatedDays >= totalDays
                      }
                    >
                      Add Shift Rotation
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </>
        )}

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ShiftChangeForm;