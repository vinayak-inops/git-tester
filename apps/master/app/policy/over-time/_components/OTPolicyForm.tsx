import React, { useState, useEffect, useRef } from 'react';
import { OTPolicyApplication, RoundingRule } from './types';
import TopTitleDescription from '@repo/ui/components/titleline/top-title-discription';
import { FiInfo, FiSettings, FiClock, FiCheck, FiX } from 'react-icons/fi';

// Mock data - replace with actual API calls
const mockSubsidiaries = [
  { subsidiaryCode: 'SUB001', subsidiaryName: 'Subsidiary One' },
  { subsidiaryCode: 'SUB002', subsidiaryName: 'Subsidiary Two' },
  { subsidiaryCode: 'SUB003', subsidiaryName: 'Subsidiary Three' },
];

const mockLocations = [
  { locationCode: 'LOC001', locationName: 'Bangalore' },
  { locationCode: 'LOC002', locationName: 'Mumbai' },
  { locationCode: 'LOC003', locationName: 'Delhi' },
];

const mockEmployeeCategories = [
  { code: 'WKM', name: 'Workman' },
  { code: 'Cat2', name: 'Category 2' },
  { code: 'Cat3', name: 'Category 3' },
];

interface OTPolicyFormProps {
  initialValues?: Partial<OTPolicyApplication>;
  onSubmit: (data: OTPolicyApplication) => void;
  onCancel?: () => void;
}

export default function OTPolicyForm({ initialValues = {}, onSubmit, onCancel }: OTPolicyFormProps) {
  const [form, setForm] = useState<OTPolicyApplication>({
    organizationCode: initialValues.organizationCode || '',
    tenantCode: initialValues.tenantCode || '',
    subsidiary: initialValues.subsidiary || { subsidiaryCode: '', subsidiaryName: '' },
    location: initialValues.location || { locationCode: '', locationName: '' },
    employeeCategory: initialValues.employeeCategory || [],
    otPolicy: {
      otPolicyCode: initialValues.otPolicy?.otPolicyCode || '',
      otPolicyName: initialValues.otPolicy?.otPolicyName || '',
      calculateOnTheBasisOf: initialValues.otPolicy?.calculateOnTheBasisOf || { calculationBasis: '' },
      multiplierForWorkingDay: initialValues.otPolicy?.multiplierForWorkingDay || 0,
      multiplierForNationalHoliday: initialValues.otPolicy?.multiplierForNationalHoliday || 0,
      multiplierForHoliday: initialValues.otPolicy?.multiplierForHoliday || 0,
      multiplierForWeeklyOff: initialValues.otPolicy?.multiplierForWeeklyOff || 0,
      dailyMaximumAllowedHours: initialValues.otPolicy?.dailyMaximumAllowedHours || 0,
      weeklyMaximumAllowedHours: initialValues.otPolicy?.weeklyMaximumAllowedHours || 0,
      monthlyMaximumAllowedHours: initialValues.otPolicy?.monthlyMaximumAllowedHours || 0,
      quaterlyMaximumAllowedHours: initialValues.otPolicy?.quaterlyMaximumAllowedHours || 0,
      yearlyMaximumAllowedHours: initialValues.otPolicy?.yearlyMaximumAllowedHours || 0,
      maximumHoursOnHoliday: initialValues.otPolicy?.maximumHoursOnHoliday || 0,
      maximumHoursOnWeekend: initialValues.otPolicy?.maximumHoursOnWeekend || 0,
      maximumHoursOnWeekday: initialValues.otPolicy?.maximumHoursOnWeekday || 0,
      minimumExtraMinutesConsideredForOT: initialValues.otPolicy?.minimumExtraMinutesConsideredForOT || 0,
      roundingEnabled: initialValues.otPolicy?.roundingEnabled || false,
      afterRoundingOff: initialValues.otPolicy?.afterRoundingOff || false,
      beforeRoundingOff: initialValues.otPolicy?.beforeRoundingOff || false,
      doThisWhenCrossedAllocatedLimit: initialValues.otPolicy?.doThisWhenCrossedAllocatedLimit || 'Restrict',
      approvalRequired: initialValues.otPolicy?.approvalRequired || false,
      minimumFixedMinutesToAllowOvertime: initialValues.otPolicy?.minimumFixedMinutesToAllowOvertime || 0,
      status: initialValues.otPolicy?.status || 'active',
      rounding: initialValues.otPolicy?.rounding || [],
      remark: initialValues.otPolicy?.remark || '',
      isConsideredForHoliday: initialValues.otPolicy?.isConsideredForHoliday || false,
      isConsideredForNationalHoliday: initialValues.otPolicy?.isConsideredForNationalHoliday || false,
      isConsideredForWeeklyOff: initialValues.otPolicy?.isConsideredForWeeklyOff || false,
      isConsideredForWorkingDay: initialValues.otPolicy?.isConsideredForWorkingDay || false,
      isConsideredBeforeShift: initialValues.otPolicy?.isConsideredBeforeShift || false,
      isConsideredAfterShift: initialValues.otPolicy?.isConsideredAfterShift || false,
    },
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [newRoundingRule, setNewRoundingRule] = useState<RoundingRule>({ from: 0, to: 0, roundOffTo: 0 });
  const [subsidiarySearch, setSubsidiarySearch] = useState('');
  const [locationSearch, setLocationSearch] = useState('');
  const [showSubsidiaryDropdown, setShowSubsidiaryDropdown] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showEmployeeCategoryDropdown, setShowEmployeeCategoryDropdown] = useState(false);
  const [employeeCategorySearch, setEmployeeCategorySearch] = useState('');
  const [showRoundingForm, setShowRoundingForm] = useState(false);
  const [roundingRuleError, setRoundingRuleError] = useState<{from?: string, to?: string, roundOffTo?: string}>({});

  const subsidiaryDropdownRef = useRef<HTMLDivElement>(null);
  const locationDropdownRef = useRef<HTMLDivElement>(null);
  const employeeCategoryDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        subsidiaryDropdownRef.current &&
        !subsidiaryDropdownRef.current.contains(event.target as Node)
      ) {
        setShowSubsidiaryDropdown(false);
      }
      if (
        locationDropdownRef.current &&
        !locationDropdownRef.current.contains(event.target as Node)
      ) {
        setShowLocationDropdown(false);
      }
      if (
        employeeCategoryDropdownRef.current &&
        !employeeCategoryDropdownRef.current.contains(event.target as Node)
      ) {
        setShowEmployeeCategoryDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setForm({
      organizationCode: initialValues.organizationCode || '',
      tenantCode: initialValues.tenantCode || '',
      subsidiary: initialValues.subsidiary || { subsidiaryCode: '', subsidiaryName: '' },
      location: initialValues.location || { locationCode: '', locationName: '' },
      employeeCategory: initialValues.employeeCategory || [],
      otPolicy: {
        otPolicyCode: initialValues.otPolicy?.otPolicyCode || '',
        otPolicyName: initialValues.otPolicy?.otPolicyName || '',
        calculateOnTheBasisOf: initialValues.otPolicy?.calculateOnTheBasisOf || { calculationBasis: '' },
        multiplierForWorkingDay: initialValues.otPolicy?.multiplierForWorkingDay || 0,
        multiplierForNationalHoliday: initialValues.otPolicy?.multiplierForNationalHoliday || 0,
        multiplierForHoliday: initialValues.otPolicy?.multiplierForHoliday || 0,
        multiplierForWeeklyOff: initialValues.otPolicy?.multiplierForWeeklyOff || 0,
        dailyMaximumAllowedHours: initialValues.otPolicy?.dailyMaximumAllowedHours || 0,
        weeklyMaximumAllowedHours: initialValues.otPolicy?.weeklyMaximumAllowedHours || 0,
        monthlyMaximumAllowedHours: initialValues.otPolicy?.monthlyMaximumAllowedHours || 0,
        quaterlyMaximumAllowedHours: initialValues.otPolicy?.quaterlyMaximumAllowedHours || 0,
        yearlyMaximumAllowedHours: initialValues.otPolicy?.yearlyMaximumAllowedHours || 0,
        maximumHoursOnHoliday: initialValues.otPolicy?.maximumHoursOnHoliday || 0,
        maximumHoursOnWeekend: initialValues.otPolicy?.maximumHoursOnWeekend || 0,
        maximumHoursOnWeekday: initialValues.otPolicy?.maximumHoursOnWeekday || 0,
        minimumExtraMinutesConsideredForOT: initialValues.otPolicy?.minimumExtraMinutesConsideredForOT || 0,
        roundingEnabled: initialValues.otPolicy?.roundingEnabled || false,
        afterRoundingOff: initialValues.otPolicy?.afterRoundingOff || false,
        beforeRoundingOff: initialValues.otPolicy?.beforeRoundingOff || false,
        doThisWhenCrossedAllocatedLimit: initialValues.otPolicy?.doThisWhenCrossedAllocatedLimit || 'Restrict',
        approvalRequired: initialValues.otPolicy?.approvalRequired || false,
        minimumFixedMinutesToAllowOvertime: initialValues.otPolicy?.minimumFixedMinutesToAllowOvertime || 0,
        status: initialValues.otPolicy?.status || 'active',
        rounding: initialValues.otPolicy?.rounding || [],
        remark: initialValues.otPolicy?.remark || '',
        isConsideredForHoliday: initialValues.otPolicy?.isConsideredForHoliday || false,
        isConsideredForNationalHoliday: initialValues.otPolicy?.isConsideredForNationalHoliday || false,
        isConsideredForWeeklyOff: initialValues.otPolicy?.isConsideredForWeeklyOff || false,
        isConsideredForWorkingDay: initialValues.otPolicy?.isConsideredForWorkingDay || false,
        isConsideredBeforeShift: initialValues.otPolicy?.isConsideredBeforeShift || false,
        isConsideredAfterShift: initialValues.otPolicy?.isConsideredAfterShift || false,
      },
    });
  }, [initialValues]);

  const filteredSubsidiaries = mockSubsidiaries.filter(s => 
    s.subsidiaryName.toLowerCase().includes(subsidiarySearch.toLowerCase())
  );

  const filteredLocations = mockLocations.filter(l => 
    l.locationName.toLowerCase().includes(locationSearch.toLowerCase())
  );

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!form.subsidiary.subsidiaryCode) errs.subsidiaryCode = 'Please select a subsidiary';
    if (!form.location.locationCode) errs.locationCode = 'Please select a location';
    if (!form.employeeCategory.length) errs.employeeCategory = 'Please select at least one employee category';
    if (!form.otPolicy.otPolicyCode) errs.otPolicyCode = 'Please enter a policy code';
    if (!form.otPolicy.otPolicyName) errs.otPolicyName = 'Please enter a policy name';
    return errs;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setForm(f => {
        const parentObj = f[parent as keyof OTPolicyApplication];
        if (typeof parentObj === 'object' && parentObj !== null) {
          return {
            ...f,
            [parent]: {
              ...parentObj,
              [child]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
            },
          };
        }
        return f;
      });
    } else {
      setForm(f => ({
        ...f,
        [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
      }));
    }
  };

  const handleSubsidiarySelect = (subsidiary: typeof mockSubsidiaries[0]) => {
    setForm(f => ({
      ...f,
      subsidiary: {
        subsidiaryCode: subsidiary.subsidiaryCode,
        subsidiaryName: subsidiary.subsidiaryName,
      },
    }));
    setSubsidiarySearch(subsidiary.subsidiaryName);
    setShowSubsidiaryDropdown(false);
  };

  const handleLocationSelect = (location: typeof mockLocations[0]) => {
    setForm(f => ({
      ...f,
      location: {
        locationCode: location.locationCode,
        locationName: location.locationName,
      },
    }));
    setLocationSearch(location.locationName);
    setShowLocationDropdown(false);
  };

  const handleEmployeeCategorySelect = (category: typeof mockEmployeeCategories[0]) => {
    setForm(f => ({
      ...f,
      employeeCategory: f.employeeCategory.includes(category.code)
        ? f.employeeCategory.filter(c => c !== category.code)
        : [...f.employeeCategory, category.code],
    }));
  };

  const removeEmployeeCategory = (categoryCode: string) => {
    setForm(f => ({
      ...f,
      employeeCategory: f.employeeCategory.filter(c => c !== categoryCode),
    }));
  };

  const handleRoundingRuleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewRoundingRule(prev => ({
      ...prev,
      [name]: parseInt(value) || 0,
    }));
  };

  const isRoundingRuleValid = newRoundingRule.from > 0 && newRoundingRule.to > 0 && newRoundingRule.roundOffTo > 0;
  const addRoundingRule = () => {
    const errors: {from?: string, to?: string, roundOffTo?: string} = {};
    if (newRoundingRule.from <= 0) errors.from = 'Enter a valid "From" value';
    if (newRoundingRule.to <= 0) errors.to = 'Enter a valid "To" value';
    if (newRoundingRule.roundOffTo <= 0) errors.roundOffTo = 'Enter a valid "Round Off To" value';
    setRoundingRuleError(errors);
    if (Object.keys(errors).length > 0) return;
    setForm(f => ({
      ...f,
      otPolicy: {
        ...f.otPolicy,
        rounding: [...f.otPolicy.rounding, newRoundingRule],
      },
    }));
    setNewRoundingRule({ from: 0, to: 0, roundOffTo: 0 });
    setRoundingRuleError({});
  };

  const removeRoundingRule = (index: number) => {
    setForm(f => ({
      ...f,
      otPolicy: {
        ...f.otPolicy,
        rounding: f.otPolicy.rounding.filter((_, i) => i !== index),
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      onSubmit(form);
    }
  };

  return (
    <form className=" w-full rounded-xl p-6" onSubmit={handleSubmit}>
      <TopTitleDescription titleValue={{ title: 'Overtime Policy Details', description: 'Enter the details for the overtime policy.' }} />

      {/* Section 1: Basic Information */}
      <div className="flex items-center gap-2 mb-2 border-l-4 border-[#e6f0ff] pl-2">
        <FiInfo className="text-[#0061ff]" size={18} />
        <h3 className="text-base font-semibold">Basic Information</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
        {/* Subsidiary */}
        <div className="flex flex-col gap-2">
          <label className="font-medium text-sm text-gray-700">Subsidiary<span className="text-red-500">*</span></label>
          <div className="relative" ref={subsidiaryDropdownRef}>
            <input
              type="text"
              value={subsidiarySearch}
              onChange={(e) => {
                setSubsidiarySearch(e.target.value);
                setShowSubsidiaryDropdown(true);
              }}
              onFocus={() => setShowSubsidiaryDropdown(true)}
              placeholder="Search subsidiary..."
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-gray-400 placeholder-gray-500"
            />
            {showSubsidiaryDropdown && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow max-h-60 overflow-auto text-sm">
                {filteredSubsidiaries.map((subsidiary) => (
                  <div
                    key={subsidiary.subsidiaryCode}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                    onClick={() => handleSubsidiarySelect(subsidiary)}
                  >
                    {subsidiary.subsidiaryName}
                  </div>
                ))}
              </div>
            )}
            {errors.subsidiaryCode && <span className="text-red-500 text-xs mt-1">{errors.subsidiaryCode}</span>}
          </div>
        </div>
        {/* Location */}
        <div className="flex flex-col gap-2">
          <label className="font-medium text-sm text-gray-700">Location<span className="text-red-500">*</span></label>
          <div className="relative" ref={locationDropdownRef}>
            <input
              type="text"
              value={locationSearch}
              onChange={(e) => {
                setLocationSearch(e.target.value);
                setShowLocationDropdown(true);
              }}
              onFocus={() => setShowLocationDropdown(true)}
              placeholder="Search location..."
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-gray-400 placeholder-gray-500"
            />
            {showLocationDropdown && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow max-h-60 overflow-auto text-sm">
                {filteredLocations.map((location) => (
                  <div
                    key={location.locationCode}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                    onClick={() => handleLocationSelect(location)}
                  >
                    {location.locationName}
                  </div>
                ))}
              </div>
            )}
            {errors.locationCode && <span className="text-red-500 text-xs mt-1">{errors.locationCode}</span>}
          </div>
        </div>
        {/* Employee Categories */}
        <div className="flex flex-col gap-2">
          <label className="font-medium text-sm text-gray-700">Employee Categories<span className="text-red-500">*</span></label>
          <div className="relative" ref={employeeCategoryDropdownRef}>
            <div
              className={`w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-gray-400 min-h-[42px] flex flex-wrap gap-2 items-center`}
              onClick={() => form.subsidiary.subsidiaryCode && form.location.locationCode && setShowEmployeeCategoryDropdown(true)}
              style={{ cursor: (!form.subsidiary.subsidiaryCode || !form.location.locationCode) ? 'not-allowed' : 'pointer' }}
            >
              {form.employeeCategory.length > 0 ? (
                <span className="flex flex-wrap gap-2">
                  {form.employeeCategory.map(code => {
                    const category = mockEmployeeCategories.find(c => c.code === code);
                    return (
                      <span key={code} className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-[#e6f0ff] text-[#0061ff] border border-[#b3d1ff]">{category?.name || code}</span>
                    );
                  })}
                </span>
              ) : (
                <span className="text-gray-500">Select employee categories...</span>
              )}
            </div>
            {showEmployeeCategoryDropdown && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow max-h-60 overflow-auto text-sm">
                <input
                  type="text"
                  value={employeeCategorySearch}
                  onChange={e => setEmployeeCategorySearch(e.target.value)}
                  placeholder="Search categories..."
                  className="w-full px-4 py-2 border-b border-gray-200 focus:outline-none text-sm"
                  onClick={e => e.stopPropagation()}
                  disabled={!form.subsidiary.subsidiaryCode || !form.location.locationCode}
                />
                {mockEmployeeCategories
                  .filter(cat =>
                    cat.name.toLowerCase().includes(employeeCategorySearch.toLowerCase()) ||
                    cat.code.toLowerCase().includes(employeeCategorySearch.toLowerCase())
                  )
                  .map(category => (
                    <div
                      key={category.code}
                      className={`px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm ${form.employeeCategory.includes(category.code) ? 'bg-blue-50' : ''}`}
                      onClick={() => handleEmployeeCategorySelect(category)}
                    >
                      <div className="font-medium text-sm">{category.name}</div>
                    </div>
                  ))}
              </div>
            )}
            {errors.employeeCategory && <span className="text-red-500 text-xs mt-1">{errors.employeeCategory}</span>}
          </div>
        </div>
      </div>
      <div className="border-t border-gray-200 my-6"></div>

      {/* Section 2: Policy Details */}
      <div className="flex items-center gap-2 mb-2 border-l-4 border-[#e6f0ff] pl-2">
        <FiSettings className="text-[#0061ff]" size={18} />
        <h3 className="text-base font-semibold">Policy Details</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
        <div className="flex flex-col gap-2">
          <label className="font-medium text-sm text-gray-700">Policy Code<span className="text-red-500">*</span></label>
          <input
            name="otPolicy.otPolicyCode"
            value={form.otPolicy.otPolicyCode}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-gray-400 placeholder-gray-500"
            disabled={!form.subsidiary.subsidiaryCode || !form.location.locationCode}
          />
          {errors.otPolicyCode && <span className="text-red-500 text-xs mt-1">{errors.otPolicyCode}</span>}
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-medium text-sm text-gray-700">Policy Name<span className="text-red-500">*</span></label>
          <input
            name="otPolicy.otPolicyName"
            value={form.otPolicy.otPolicyName}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-gray-400 placeholder-gray-500"
            disabled={!form.subsidiary.subsidiaryCode || !form.location.locationCode}
          />
          {errors.otPolicyName && <span className="text-red-500 text-xs mt-1">{errors.otPolicyName}</span>}
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-medium text-sm text-gray-700">Calculation Basis</label>
          <input
            name="otPolicy.calculateOnTheBasisOf.calculationBasis"
            value={form.otPolicy.calculateOnTheBasisOf.calculationBasis}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-gray-400 placeholder-gray-500"
            disabled={!form.subsidiary.subsidiaryCode || !form.location.locationCode}
          />
        </div>
      </div>
      <div className="border-t border-gray-200 my-6"></div>

      {/* Section 3: Multipliers */}
      <div className="flex items-center gap-2 mb-2 border-l-4 border-[#e6f0ff] pl-2">
        <FiClock className="text-[#0061ff]" size={18} />
        <h3 className="text-base font-semibold">Multipliers</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-2">
        <div className="flex flex-col gap-2">
          <label className="font-medium text-sm text-gray-700">Working Day Multiplier</label>
          <input
            type="number"
            name="otPolicy.multiplierForWorkingDay"
            value={form.otPolicy.multiplierForWorkingDay}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-gray-400 placeholder-gray-500"
            disabled={!form.subsidiary.subsidiaryCode || !form.location.locationCode}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-medium text-sm text-gray-700">National Holiday Multiplier</label>
          <input
            type="number"
            name="otPolicy.multiplierForNationalHoliday"
            value={form.otPolicy.multiplierForNationalHoliday}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-gray-400 placeholder-gray-500"
            disabled={!form.subsidiary.subsidiaryCode || !form.location.locationCode}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-medium text-sm text-gray-700">Holiday Multiplier</label>
          <input
            type="number"
            name="otPolicy.multiplierForHoliday"
            value={form.otPolicy.multiplierForHoliday}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-gray-400 placeholder-gray-500"
            disabled={!form.subsidiary.subsidiaryCode || !form.location.locationCode}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-medium text-sm text-gray-700">Weekly Off Multiplier</label>
          <input
            type="number"
            name="otPolicy.multiplierForWeeklyOff"
            value={form.otPolicy.multiplierForWeeklyOff}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-gray-400 placeholder-gray-500"
            disabled={!form.subsidiary.subsidiaryCode || !form.location.locationCode}
          />
        </div>
      </div>
      <div className="border-t border-gray-200 my-6"></div>

      {/* Section 4: Maximum Allowed Hours */}
      <div className="flex items-center gap-2 mb-2 border-l-4 border-[#e6f0ff] pl-2">
        <FiClock className="text-[#0061ff]" size={18} />
        <h3 className="text-base font-semibold">Maximum Allowed Hours</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-2">
        <div className="flex flex-col gap-2">
          <label className="font-medium text-sm text-gray-700">Daily Maximum Hours</label>
          <input
            type="number"
            name="otPolicy.dailyMaximumAllowedHours"
            value={form.otPolicy.dailyMaximumAllowedHours}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-gray-400 placeholder-gray-500"
            disabled={!form.subsidiary.subsidiaryCode || !form.location.locationCode}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-medium text-sm text-gray-700">Weekly Maximum Hours</label>
          <input
            type="number"
            name="otPolicy.weeklyMaximumAllowedHours"
            value={form.otPolicy.weeklyMaximumAllowedHours}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-gray-400 placeholder-gray-500"
            disabled={!form.subsidiary.subsidiaryCode || !form.location.locationCode}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-medium text-sm text-gray-700">Monthly Maximum Hours</label>
          <input
            type="number"
            name="otPolicy.monthlyMaximumAllowedHours"
            value={form.otPolicy.monthlyMaximumAllowedHours}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-gray-400 placeholder-gray-500"
            disabled={!form.subsidiary.subsidiaryCode || !form.location.locationCode}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-medium text-sm text-gray-700">Quarterly Maximum Hours</label>
          <input
            type="number"
            name="otPolicy.quaterlyMaximumAllowedHours"
            value={form.otPolicy.quaterlyMaximumAllowedHours}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-gray-400 placeholder-gray-500"
            disabled={!form.subsidiary.subsidiaryCode || !form.location.locationCode}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-medium text-sm text-gray-700">Yearly Maximum Hours</label>
          <input
            type="number"
            name="otPolicy.yearlyMaximumAllowedHours"
            value={form.otPolicy.yearlyMaximumAllowedHours}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-gray-400 placeholder-gray-500"
            disabled={!form.subsidiary.subsidiaryCode || !form.location.locationCode}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-medium text-sm text-gray-700">Maximum Hours On Holiday</label>
          <input
            type="number"
            name="otPolicy.maximumHoursOnHoliday"
            value={form.otPolicy.maximumHoursOnHoliday}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-gray-400 placeholder-gray-500"
            disabled={!form.subsidiary.subsidiaryCode || !form.location.locationCode}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-medium text-sm text-gray-700">Maximum Hours On Weekend</label>
          <input
            type="number"
            name="otPolicy.maximumHoursOnWeekend"
            value={form.otPolicy.maximumHoursOnWeekend}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-gray-400 placeholder-gray-500"
            disabled={!form.subsidiary.subsidiaryCode || !form.location.locationCode}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-medium text-sm text-gray-700">Maximum Hours On Weekday</label>
          <input
            type="number"
            name="otPolicy.maximumHoursOnWeekday"
            value={form.otPolicy.maximumHoursOnWeekday}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-gray-400 placeholder-gray-500"
            disabled={!form.subsidiary.subsidiaryCode || !form.location.locationCode}
          />
        </div>
      </div>
      <div className="border-t border-gray-200 my-6"></div>

      {/* Section 5: Overtime Settings */}
      <div className="flex items-center gap-2 mb-2 border-l-4 border-[#e6f0ff] pl-2">
        <FiClock className="text-[#0061ff]" size={18} />
        <h3 className="text-base font-semibold">Overtime Settings</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
        <div className="flex flex-col gap-2">
          <label className="font-medium text-sm text-gray-700">Minimum Extra Minutes Considered For OT</label>
          <input
            type="number"
            name="otPolicy.minimumExtraMinutesConsideredForOT"
            value={form.otPolicy.minimumExtraMinutesConsideredForOT}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-gray-400 placeholder-gray-500"
            disabled={!form.subsidiary.subsidiaryCode || !form.location.locationCode}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-medium text-sm text-gray-700">Minimum Fixed Minutes To Allow Overtime</label>
          <input
            type="number"
            name="otPolicy.minimumFixedMinutesToAllowOvertime"
            value={form.otPolicy.minimumFixedMinutesToAllowOvertime}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-gray-400 placeholder-gray-500"
            disabled={!form.subsidiary.subsidiaryCode || !form.location.locationCode}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-medium text-sm text-gray-700">Do This When Crossed Allocated Limit</label>
          <select
            name="otPolicy.doThisWhenCrossedAllocatedLimit"
            value={form.otPolicy.doThisWhenCrossedAllocatedLimit}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-gray-400 placeholder-gray-500"
            disabled={!form.subsidiary.subsidiaryCode || !form.location.locationCode}
          >
            <option value="Restrict">Restrict</option>
            <option value="Allow">Allow</option>
          </select>
        </div>
      </div>
      <div className="border-t border-gray-200 my-6"></div>

      {/* Section 6: Rounding */}
      <div className="flex items-center gap-2 mb-2 border-l-4 border-[#e6f0ff] pl-2">
        <FiClock className="text-[#0061ff]" size={18} />
        <h3 className="text-base font-semibold">Rounding</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="otPolicy.roundingEnabled"
            checked={form.otPolicy.roundingEnabled}
            onChange={handleChange}
            className="accent-[#0061ff]"
            disabled={!form.subsidiary.subsidiaryCode || !form.location.locationCode}
          />
          <label className="font-medium text-sm text-gray-700">Rounding Enabled</label>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="otPolicy.afterRoundingOff"
            checked={form.otPolicy.afterRoundingOff}
            onChange={handleChange}
            className="accent-[#0061ff]"
            disabled={!form.subsidiary.subsidiaryCode || !form.location.locationCode}
          />
          <label className="font-medium text-sm text-gray-700">After Rounding Off</label>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="otPolicy.beforeRoundingOff"
            checked={form.otPolicy.beforeRoundingOff}
            onChange={handleChange}
            className="accent-[#0061ff]"
            disabled={!form.subsidiary.subsidiaryCode || !form.location.locationCode}
          />
          <label className="font-medium text-sm text-gray-700">Before Rounding Off</label>
        </div>
      </div>
      <div className="mb-2">
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 bg-[#0061ff] text-white rounded-lg font-bold shadow-md hover:bg-[#0052cc] hover:scale-105 transition-transform duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0061ff] flex items-center gap-2 text-base"
          onClick={() => setShowRoundingForm((prev: boolean) => !prev)}
          aria-label={showRoundingForm ? "Close" : "Add Rounding Rule"}
        >
          {showRoundingForm ? "Close" : "Add Rounding Rule"}
        </button>
        {showRoundingForm && (
          <div className="flex gap-2 items-end mt-2">
            <input
              type="number"
              name="from"
              value={newRoundingRule.from}
              onChange={handleRoundingRuleChange}
              placeholder="From"
              className="rounded-lg border border-gray-200 px-3 py-2 text-sm w-24"
            />
            {roundingRuleError.from && <span className="text-xs text-red-500">{roundingRuleError.from}</span>}
            <input
              type="number"
              name="to"
              value={newRoundingRule.to}
              onChange={handleRoundingRuleChange}
              placeholder="To"
              className="rounded-lg border border-gray-200 px-3 py-2 text-sm w-24"
            />
            {roundingRuleError.to && <span className="text-xs text-red-500">{roundingRuleError.to}</span>}
            <input
              type="number"
              name="roundOffTo"
              value={newRoundingRule.roundOffTo}
              onChange={handleRoundingRuleChange}
              placeholder="Round To"
              className="rounded-lg border border-gray-200 px-3 py-2 text-sm w-24"
            />
            {roundingRuleError.roundOffTo && <span className="text-xs text-red-500">{roundingRuleError.roundOffTo}</span>}
            <button
              type="button"
              onClick={addRoundingRule}
              className="px-4 py-2 bg-[#0061ff] text-white rounded-lg text-sm hover:bg-[#0052cc]"
              disabled={!isRoundingRuleValid}
            >
              Add
            </button>
            {!isRoundingRuleValid && <span className="text-xs text-red-500 ml-2">Fill all fields</span>}
          </div>
        )}
        <div className="mt-2 flex flex-wrap gap-2">
          {form.otPolicy.rounding.map((rule, idx) => (
            <div key={idx} className="flex items-center rounded px-3 py-1 text-sm text-gray-700 border border-gray-200">
              <span>{rule.from} – {rule.to} → {rule.roundOffTo}</span>
              <button
                type="button"
                onClick={() => removeRoundingRule(idx)}
                className="ml-2 text-red-500 hover:text-red-700"
                aria-label="Remove rule"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-gray-200 my-6"></div>

      {/* Section 7: Applicability */}
      <div className="flex items-center gap-2 mb-2 border-l-4 border-[#e6f0ff] pl-2">
        <FiClock className="text-[#0061ff]" size={18} />
        <h3 className="text-base font-semibold">Applicability</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="otPolicy.isConsideredForHoliday"
            checked={form.otPolicy.isConsideredForHoliday}
            onChange={handleChange}
            className="accent-[#0061ff]"
            disabled={!form.subsidiary.subsidiaryCode || !form.location.locationCode}
          />
          <label className="font-medium text-sm text-gray-700">Considered For Holiday</label>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="otPolicy.isConsideredForNationalHoliday"
            checked={form.otPolicy.isConsideredForNationalHoliday}
            onChange={handleChange}
            className="accent-[#0061ff]"
            disabled={!form.subsidiary.subsidiaryCode || !form.location.locationCode}
          />
          <label className="font-medium text-sm text-gray-700">Considered For National Holiday</label>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="otPolicy.isConsideredForWeeklyOff"
            checked={form.otPolicy.isConsideredForWeeklyOff}
            onChange={handleChange}
            className="accent-[#0061ff]"
            disabled={!form.subsidiary.subsidiaryCode || !form.location.locationCode}
          />
          <label className="font-medium text-sm text-gray-700">Considered For Weekly Off</label>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="otPolicy.isConsideredForWorkingDay"
            checked={form.otPolicy.isConsideredForWorkingDay}
            onChange={handleChange}
            className="accent-[#0061ff]"
            disabled={!form.subsidiary.subsidiaryCode || !form.location.locationCode}
          />
          <label className="font-medium text-sm text-gray-700">Considered For Working Day</label>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="otPolicy.isConsideredBeforeShift"
            checked={form.otPolicy.isConsideredBeforeShift}
            onChange={handleChange}
            className="accent-[#0061ff]"
            disabled={!form.subsidiary.subsidiaryCode || !form.location.locationCode}
          />
          <label className="font-medium text-sm text-gray-700">Considered Before Shift</label>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="otPolicy.isConsideredAfterShift"
            checked={form.otPolicy.isConsideredAfterShift}
            onChange={handleChange}
            className="accent-[#0061ff]"
            disabled={!form.subsidiary.subsidiaryCode || !form.location.locationCode}
          />
          <label className="font-medium text-sm text-gray-700">Considered After Shift</label>
        </div>
      </div>
      <div className="border-t border-gray-200 my-6"></div>

      {/* Section 8: Status & Approval */}
      <div className="flex items-center gap-2 mb-2 border-l-4 border-[#e6f0ff] pl-2">
        <FiClock className="text-[#0061ff]" size={18} />
        <h3 className="text-base font-semibold">Status & Approval</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
        <div className="flex flex-col gap-2">
          <label className="font-medium text-sm text-gray-700">Status</label>
          <select
            name="otPolicy.status"
            value={form.otPolicy.status}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-gray-400 placeholder-gray-500"
            disabled={!form.subsidiary.subsidiaryCode || !form.location.locationCode}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-medium text-sm text-gray-700">Approval Required</label>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="otPolicy.approvalRequired"
              checked={form.otPolicy.approvalRequired}
              onChange={handleChange}
              className="accent-[#0061ff]"
              disabled={!form.subsidiary.subsidiaryCode || !form.location.locationCode}
            />
            <span className="text-sm">Yes</span>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-200 my-6"></div>

      {/* Section 9: Remarks */}
      <div className="flex items-center gap-2 mb-2 border-l-4 border-[#e6f0ff] pl-2">
        <FiClock className="text-[#0061ff]" size={18} />
        <h3 className="text-base font-semibold">Remarks</h3>
      </div>
      <div className="mb-6">
        <textarea
          name="otPolicy.remark"
          value={form.otPolicy.remark}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-gray-400 placeholder-gray-500"
          rows={3}
          disabled={!form.subsidiary.subsidiaryCode || !form.location.locationCode}
          aria-label="Remarks"
        />
      </div>

      {/* Form Actions */}
      <div className="flex gap-4 justify-end mt-8 mb-6">
        <button
          type="submit"
          className="px-8 py-1 bg-[#0061ff] text-white rounded-lg font-bold shadow-md hover:bg-[#0052cc] hover:scale-105 transition-transform duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0061ff] flex items-center gap-2 text-base"
          aria-label="Save"
        >
          Save
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-8 py-1 border border-gray-300 bg-white text-gray-700 rounded-lg font-bold hover:bg-gray-100 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 flex items-center gap-2 text-base"
            aria-label="Cancel"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
} 