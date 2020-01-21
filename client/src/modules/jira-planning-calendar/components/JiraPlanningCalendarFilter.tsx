import Form from '@atlaskit/form';
import React from 'react';
import { DatePicker } from '@atlaskit/datetime-picker';
import Button from '@atlaskit/button';
import Textfield from '@atlaskit/textfield';
import { Field, CheckboxField } from '@atlaskit/form';
import { Checkbox } from '@atlaskit/checkbox';
import moment from 'moment';
import './JiraPlanningCalendarFilter.css';

const JiraPlanningCalendarFilter = (props) => {
   const filterHandler = props.filterHandler;

   return (
      <Form onSubmit={data => filterHandler(data)}>
         {({ formProps, dirty, submitting }) => (
            <form {...formProps}>
               <div className='filter-container'>
                     <div className='filter-container-row'>
                        <div className='filter-item'>
                           <Field label='Start date' name='startDate' defaultValue={moment().startOf('isoWeek').format('YYYY-MM-DD')} >
                              {({ fieldProps, error, valid }) => <DatePicker {...fieldProps} />}
                           </Field>
                        </div>

                        <div className='filter-item'>
                           <Field label='End date' name='endDate' defaultValue={moment().endOf('isoWeek').format('YYYY-MM-DD')} >
                              {({ fieldProps, error, valid }) => <DatePicker {...fieldProps} />}
                           </Field>
                        </div>

                        <div className='filter-item'>
                           <Field label='User' name='user' defaultValue=''>
                              {({ fieldProps, error, valid }) => <Textfield {...fieldProps} />}
                           </Field>
                        </div>

                        <div className='filter-item'>
                           <Field label='Issue' name='issue' defaultValue='' >
                              {({ fieldProps, error, valid }) => <Textfield {...fieldProps} />}
                           </Field>
                        </div>

                        <div className='submit-button'>
                           <Button
                              type='submit'
                              appearance='primary'
                              isDisabled={submitting}>
                              Search
                           </Button>
                        </div>
                     </div>

                     <div className='filter-container-row'>
                        <CheckboxField name='showWithoutDueDate'>
                           {({ fieldProps }) => (
                              <Checkbox {...fieldProps} label='Show issues without due date' />
                           )}
                        </CheckboxField>
                     </div>
                  </div>
            </form>
         )}
      </Form>
   )
};

export default JiraPlanningCalendarFilter;