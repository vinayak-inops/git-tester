"use client"
import React, { useState, useEffect } from 'react';
import Form from 'antd/es/form';
import { Input, TimePicker, InputNumber, Switch } from 'antd';
import Select from 'antd/lib/select';
import dayjs from 'dayjs';
import { Button } from '@/components/ui/button';

// Add utility functions for time conversion
const decimalToTime = (decimal: number | string): string => {
  const num = typeof decimal === 'string' ? parseFloat(decimal) : decimal;
  const hours = Math.floor(num * 24);
  const minutes = Math.round((num * 24 - hours) * 60);
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};

const timeToDecimal = (time: string): number => {
  const [hours, minutes] = time.split(':').map(Number);
  return (hours + minutes / 60) / 24;
};

const decimalToDayjs = (decimal: number | string): dayjs.Dayjs => {
  const timeStr = decimalToTime(decimal);
  return dayjs(timeStr, 'HH:mm');
};

const dayjsToDecimal = (date: dayjs.Dayjs): number => {
  const hours = date.hour();
  const minutes = date.minute();
  return (hours + minutes / 60) / 24;
};

interface Shift {
  shiftCode: string;
  shiftName: string;
  shiftStart: dayjs.Dayjs;
  shiftEnd: dayjs.Dayjs;
  firstHalfStart: dayjs.Dayjs;
  firstHalfEnd: dayjs.Dayjs;
  secondHalfStart: dayjs.Dayjs;
  secondHalfEnd: dayjs.Dayjs;
  lunchStart: dayjs.Dayjs;
  lunchEnd: dayjs.Dayjs;
  duration: number;
  crossDay: boolean;
  flexible: boolean;
  flexiFullDayDuration: number;
  flexiHalfDayDuration: number;
  inAheadMargin: number;
  inAboveMargin: number;
  outAheadMargin: number;
  outAboveMargin: number;
  lateInAllowedTime: number;
  earlyOutAllowedTime: number;
  graceIn: number;
  graceOut: number;
  earlyOutTime: number;
  minimumDurationForFullDay: number;
  minimumDurationForHalfDay: number;
  minimumExtraMinutesForExtraHours: number;
}

interface ShiftGroupFormData {
  organizationCode: string;
  tenantCode: string;
  shiftGroupCode: string;
  shiftGroupName: string;
  subsidiary: {
    subsidiaryCode: string;
    subsidiaryName: string;
  };
  location: {
    locationCode: string;
    locationName: string;
  };
  employeeCategory: string[];
  shift: Shift[];
}

const ShiftForm: React.FC = () => {
  const [form] = Form.useForm();
  const [shifts, setShifts] = useState<Shift[]>([]);

  const onFinish = (values: ShiftGroupFormData) => {
    // Convert time values to decimal format before submission
    const processedValues = {
      ...values,
      shift: values.shift.map((shift: any) => ({
        ...shift,
        shiftStart: dayjsToDecimal(shift.shiftStart),
        shiftEnd: dayjsToDecimal(shift.shiftEnd),
        firstHalfStart: dayjsToDecimal(shift.firstHalfStart),
        firstHalfEnd: dayjsToDecimal(shift.firstHalfEnd),
        secondHalfStart: dayjsToDecimal(shift.secondHalfStart),
        secondHalfEnd: dayjsToDecimal(shift.secondHalfEnd),
        lunchStart: dayjsToDecimal(shift.lunchStart),
        lunchEnd: dayjsToDecimal(shift.lunchEnd),
        crossDay: shift.crossDay ? "TRUE" : "FALSE",
        flexible: shift.flexible ? "TRUE" : "FALSE"
      }))
    };
    console.log('Form values:', processedValues);
    // Handle form submission here
  };

  const addShift = () => {
    const newShift: Shift = {
      shiftCode: '',
      shiftName: '',
      shiftStart: decimalToDayjs(0),
      shiftEnd: decimalToDayjs(0),
      firstHalfStart: decimalToDayjs(0),
      firstHalfEnd: decimalToDayjs(0),
      secondHalfStart: decimalToDayjs(0),
      secondHalfEnd: decimalToDayjs(0),
      lunchStart: decimalToDayjs(0),
      lunchEnd: decimalToDayjs(0),
      duration: 480,
      crossDay: false,
      flexible: false,
      flexiFullDayDuration: 0,
      flexiHalfDayDuration: 0,
      inAheadMargin: 0,
      inAboveMargin: 0,
      outAheadMargin: 0,
      outAboveMargin: 0,
      lateInAllowedTime: 0,
      earlyOutAllowedTime: 0,
      graceIn: 5,
      graceOut: 5,
      earlyOutTime: 10,
      minimumDurationForFullDay: 360,
      minimumDurationForHalfDay: 180,
      minimumExtraMinutesForExtraHours: 30
    };
    setShifts([...shifts, newShift]);
  };

  // Add function to set initial values
  const setInitialValues = (data: Partial<ShiftGroupFormData>) => {
    if (data) {
      const processedData = {
        ...data,
        shift: Array.isArray(data.shift) ? data.shift : [data.shift],
        employeeCategory: Array.isArray(data.employeeCategory) ? data.employeeCategory : [data.employeeCategory]
      };
      
      // Convert decimal time values to dayjs objects
      processedData.shift = processedData.shift?.map((shift: any) => ({
        ...shift,
        shiftStart: decimalToDayjs(shift.shiftStart),
        shiftEnd: decimalToDayjs(shift.shiftEnd),
        firstHalfStart: decimalToDayjs(shift.firstHalfStart),
        firstHalfEnd: decimalToDayjs(shift.firstHalfEnd),
        secondHalfStart: decimalToDayjs(shift.secondHalfStart),
        secondHalfEnd: decimalToDayjs(shift.secondHalfEnd),
        lunchStart: decimalToDayjs(shift.lunchStart),
        lunchEnd: decimalToDayjs(shift.lunchEnd),
        duration: typeof shift.duration === 'string' ? parseInt(shift.duration) : shift.duration,
        flexiFullDayDuration: typeof shift.flexiFullDayDuration === 'string' ? parseInt(shift.flexiFullDayDuration) : shift.flexiFullDayDuration,
        flexiHalfDayDuration: typeof shift.flexiHalfDayDuration === 'string' ? parseInt(shift.flexiHalfDayDuration) : shift.flexiHalfDayDuration,
        inAheadMargin: typeof shift.inAheadMargin === 'string' ? parseInt(shift.inAheadMargin) : shift.inAheadMargin,
        inAboveMargin: typeof shift.inAboveMargin === 'string' ? parseInt(shift.inAboveMargin) : shift.inAboveMargin,
        outAheadMargin: typeof shift.outAheadMargin === 'string' ? parseInt(shift.outAheadMargin) : shift.outAheadMargin,
        outAboveMargin: typeof shift.outAboveMargin === 'string' ? parseInt(shift.outAboveMargin) : shift.outAboveMargin,
        lateInAllowedTime: typeof shift.lateInAllowedTime === 'string' ? parseInt(shift.lateInAllowedTime) : shift.lateInAllowedTime,
        earlyOutAllowedTime: typeof shift.earlyOutAllowedTime === 'string' ? parseInt(shift.earlyOutAllowedTime) : shift.earlyOutAllowedTime,
        graceIn: typeof shift.graceIn === 'string' ? parseInt(shift.graceIn) : shift.graceIn,
        graceOut: typeof shift.graceOut === 'string' ? parseInt(shift.graceOut) : shift.graceOut,
        earlyOutTime: typeof shift.earlyOutTime === 'string' ? parseInt(shift.earlyOutTime) : shift.earlyOutTime,
        minimumDurationForFullDay: typeof shift.minimumDurationForFullDay === 'string' ? parseInt(shift.minimumDurationForFullDay) : shift.minimumDurationForFullDay,
        minimumDurationForHalfDay: typeof shift.minimumDurationForHalfDay === 'string' ? parseInt(shift.minimumDurationForHalfDay) : shift.minimumDurationForHalfDay,
        minimumExtraMinutesForExtraHours: typeof shift.minimumExtraMinutesForExtraHours === 'string' ? parseInt(shift.minimumExtraMinutesForExtraHours) : shift.minimumExtraMinutesForExtraHours,
        crossDay: shift.crossDay === "TRUE",
        flexible: shift.flexible === "TRUE"
      }));

      form.setFieldsValue(processedData as ShiftGroupFormData);
    }
  };

  // Set initial values when component mounts
  useEffect(() => {
    const initialData: Partial<ShiftGroupFormData> = {
      employeeCategory: ["WKM"],
      shiftGroupName: "First Group",
      organizationCode: "ALLNew",
      shift: [{
        lunchEnd: decimalToDayjs(0.35416666666666669),
        outAheadMargin: 0,
        inAheadMargin: 0,
        lateInAllowedTime: 0,
        outAboveMargin: 0,
        duration: 480,
        shiftName: "Second Shift",
        graceIn: 5,
        secondHalfEnd: decimalToDayjs(0.47916666666666669),
        lunchStart: decimalToDayjs(0.3125),
        shiftEnd: decimalToDayjs(0.47916666666666669),
        flexiHalfDayDuration: 0,
        shiftStart: decimalToDayjs(0.14583333333333334),
        secondHalfStart: decimalToDayjs(0.35416666666666669),
        firstHalfStart: decimalToDayjs(0.14583333333333334),
        earlyOutAllowedTime: 0,
        minimumExtraMinutesForExtraHours: 30,
        earlyOutTime: 10,
        minimumDurationForFullDay: 360,
        firstHalfEnd: decimalToDayjs(0.3125),
        flexiFullDayDuration: 0,
        graceOut: 5,
        minimumDurationForHalfDay: 180,
        crossDay: false,
        flexible: false,
        shiftCode: "A002",
        inAboveMargin: 0
      }],
      location: {
        locationName: "Bangalore",
        locationCode: "LOC001"
      },
      tenantCode: "tenant1",
      subsidiary: {
        subsidiaryName: "subsidiary001",
        subsidiaryCode: "sub1"
      },
      shiftGroupCode: "A"
    };
    setInitialValues(initialData);
  }, []);

  return (
    <Form
      form={form}
      onFinish={onFinish}
      initialValues={{
        organizationCode: 'ALL',
        employeeCategory: []
      }}
    >
      <div className="ant-card" style={{ marginBottom: 16, padding: 24, background: '#fff', borderRadius: 2 }}>
        <h3>Shift Group Details</h3>
        <Form.Item name="organizationCode" label="Organization Code" rules={[{ required: true }]}>
          <Input id="organizationCode" />
        </Form.Item>
        <Form.Item name="tenantCode" label="Tenant Code" rules={[{ required: true }]}>
          <Input id="tenantCode" />
        </Form.Item>
        <Form.Item name="shiftGroupCode" label="Shift Group Code" rules={[{ required: true }]}>
          <Input id="shiftGroupCode" />
        </Form.Item>
        <Form.Item name="shiftGroupName" label="Shift Group Name" rules={[{ required: true }]}>
          <Input id="shiftGroupName" />
        </Form.Item>
        <Form.Item name={['subsidiary', 'subsidiaryCode']} label="Subsidiary Code" rules={[{ required: true }]}>
          <Input id="subsidiaryCode" />
        </Form.Item>
        <Form.Item name={['subsidiary', 'subsidiaryName']} label="Subsidiary Name" rules={[{ required: true }]}>
          <Input id="subsidiaryName" />
        </Form.Item>
        <Form.Item name={['location', 'locationCode']} label="Location Code" rules={[{ required: true }]}>
          <Input id="locationCode" />
        </Form.Item>
        <Form.Item name={['location', 'locationName']} label="Location Name" rules={[{ required: true }]}>
          <Input id="locationName" />
        </Form.Item>
        <Form.Item name="employeeCategory" label="Employee Category" rules={[{ required: true }]}>
          <Select
            mode="multiple"
            options={[
              { value: 'WKM', label: 'WKM' },
              { value: 'Cat2', label: 'Cat2' },
              { value: 'Cat3', label: 'Cat3' }
            ]}
          />
        </Form.Item>
      </div>

      <div className="ant-card" style={{ marginBottom: 16, padding: 24, background: '#fff', borderRadius: 2 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h3>Shifts</h3>
          <Button type="button" variant="default" onClick={addShift}>Add Shift</Button>
        </div>

        <Form.List name="shift">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, index) => (
                <div key={field.key} className="ant-card" style={{ marginBottom: 16, padding: 24, background: '#fff', borderRadius: 2 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h4>Shift {index + 1}</h4>
                      <Button type="button" variant="link" onClick={() => remove(index)}>Remove Shift</Button>
                    </div>

                    <Form.Item {...field} name={[field.name, 'shiftCode']} label="Shift Code" rules={[{ required: true }]}>
                      <Input id={`shift-${index}-code`} />
                    </Form.Item>

                    <Form.Item {...field} name={[field.name, 'shiftName']} label="Shift Name" rules={[{ required: true }]}>
                      <Input id={`shift-${index}-name`} />
                    </Form.Item>

                    <div style={{ display: 'flex', gap: 16 }}>
                      <Form.Item {...field} name={[field.name, 'shiftStart']} label="Shift Start" rules={[{ required: true }]}>
                        <TimePicker format="HH:mm" />
                      </Form.Item>
                      <Form.Item {...field} name={[field.name, 'shiftEnd']} label="Shift End" rules={[{ required: true }]}>
                        <TimePicker format="HH:mm" />
                      </Form.Item>
                    </div>

                    <div style={{ display: 'flex', gap: 16 }}>
                      <Form.Item {...field} name={[field.name, 'firstHalfStart']} label="First Half Start" rules={[{ required: true }]}>
                        <TimePicker format="HH:mm" />
                      </Form.Item>
                      <Form.Item {...field} name={[field.name, 'firstHalfEnd']} label="First Half End" rules={[{ required: true }]}>
                        <TimePicker format="HH:mm" />
                      </Form.Item>
                    </div>

                    <div style={{ display: 'flex', gap: 16 }}>
                      <Form.Item {...field} name={[field.name, 'secondHalfStart']} label="Second Half Start" rules={[{ required: true }]}>
                        <TimePicker format="HH:mm" />
                      </Form.Item>
                      <Form.Item {...field} name={[field.name, 'secondHalfEnd']} label="Second Half End" rules={[{ required: true }]}>
                        <TimePicker format="HH:mm" />
                      </Form.Item>
                    </div>

                    <div style={{ display: 'flex', gap: 16 }}>
                      <Form.Item {...field} name={[field.name, 'lunchStart']} label="Lunch Start" rules={[{ required: true }]}>
                        <TimePicker format="HH:mm" />
                      </Form.Item>
                      <Form.Item {...field} name={[field.name, 'lunchEnd']} label="Lunch End" rules={[{ required: true }]}>
                        <TimePicker format="HH:mm" />
                      </Form.Item>
                    </div>

                    <div style={{ display: 'flex', gap: 16 }}>
                      <Form.Item {...field} name={[field.name, 'duration']} label="Duration (minutes)" rules={[{ required: true }]}>
                        <InputNumber min={0} max={1440} />
                      </Form.Item>
                      <Form.Item {...field} name={[field.name, 'crossDay']} label="Cross Day" valuePropName="checked">
                        <Switch />
                      </Form.Item>
                      <Form.Item {...field} name={[field.name, 'flexible']} label="Flexible" valuePropName="checked">
                        <Switch />
                      </Form.Item>
                    </div>

                    <div style={{ display: 'flex', gap: 16 }}>
                      <Form.Item {...field} name={[field.name, 'graceIn']} label="Grace In (minutes)" rules={[{ required: true }]}>
                        <InputNumber min={0} max={1440} />
                      </Form.Item>
                      <Form.Item {...field} name={[field.name, 'graceOut']} label="Grace Out (minutes)" rules={[{ required: true }]}>
                        <InputNumber min={0} max={1440} />
                      </Form.Item>
                    </div>

                    <div style={{ display: 'flex', gap: 16 }}>
                      <Form.Item {...field} name={[field.name, 'earlyOutTime']} label="Early Out Time (minutes)" rules={[{ required: true }]}>
                        <InputNumber min={0} max={1440} />
                      </Form.Item>
                      <Form.Item {...field} name={[field.name, 'minimumDurationForFullDay']} label="Min Duration Full Day (minutes)" rules={[{ required: true }]}>
                        <InputNumber min={0} max={1440} />
                      </Form.Item>
                      <Form.Item {...field} name={[field.name, 'minimumDurationForHalfDay']} label="Min Duration Half Day (minutes)" rules={[{ required: true }]}>
                        <InputNumber min={0} max={1440} />
                      </Form.Item>
                    </div>

                    <div style={{ display: 'flex', gap: 16 }}>
                      <Form.Item {...field} name={[field.name, 'flexiFullDayDuration']} label="Flexi Full Day Duration (minutes)">
                        <InputNumber min={0} max={1440} />
                      </Form.Item>
                      <Form.Item {...field} name={[field.name, 'flexiHalfDayDuration']} label="Flexi Half Day Duration (minutes)">
                        <InputNumber min={0} max={1440} />
                      </Form.Item>
                      <Form.Item {...field} name={[field.name, 'minimumExtraMinutesForExtraHours']} label="Min Extra Minutes" rules={[{ required: true }]}>
                        <InputNumber min={0} max={1440} />
                      </Form.Item>
                    </div>

                    <div style={{ display: 'flex', gap: 16 }}>
                      <Form.Item {...field} name={[field.name, 'inAheadMargin']} label="In Ahead Margin (minutes)">
                        <InputNumber min={0} max={1440} />
                      </Form.Item>
                      <Form.Item {...field} name={[field.name, 'inAboveMargin']} label="In Above Margin (minutes)">
                        <InputNumber min={0} max={1440} />
                      </Form.Item>
                      <Form.Item {...field} name={[field.name, 'outAheadMargin']} label="Out Ahead Margin (minutes)">
                        <InputNumber min={0} max={1440} />
                      </Form.Item>
                      <Form.Item {...field} name={[field.name, 'outAboveMargin']} label="Out Above Margin (minutes)">
                        <InputNumber min={0} max={1440} />
                      </Form.Item>
                    </div>

                    <div style={{ display: 'flex', gap: 16 }}>
                      <Form.Item {...field} name={[field.name, 'lateInAllowedTime']} label="Late In Allowed Time (minutes)">
                        <InputNumber min={0} max={1440} />
                      </Form.Item>
                      <Form.Item {...field} name={[field.name, 'earlyOutAllowedTime']} label="Early Out Allowed Time (minutes)">
                        <InputNumber min={0} max={1440} />
                      </Form.Item>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </Form.List>
      </div>

      <Form.Item>
        <Button type="submit" variant="default">Submit</Button>
      </Form.Item>
    </Form>
  );
};

export default ShiftForm;