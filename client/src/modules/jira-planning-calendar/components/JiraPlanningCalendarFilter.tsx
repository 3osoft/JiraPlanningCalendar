import Form from '@atlaskit/form';
import Button from '@atlaskit/button';
import React from 'react';
import { DatePicker } from '@atlaskit/datetime-picker';
import Textfield from '@atlaskit/textfield';
import { Field } from '@atlaskit/form';
import moment from 'moment';

const JiraPlanningCalendarFilter = (props) => {
   const getContainerStyle = () => ({
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'nowrap',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      alignContent: 'space-between'
   } as React.CSSProperties)

   const getFilterItemStyle = (pos: number) => (
      {
      width: '25%',
      flex: '0 1 auto',
      alignSelf: 'auto',
      marginLeft: pos === 0 ? '0' : '1%'
   } as React.CSSProperties)

   const getButtonStyle = () => ({
      width: '10%',
      flex: '0 1 auto',
      alignSelf: 'center',
      marginLeft: '1%',
      marginTop: '30px'
   } as React.CSSProperties)

   const filterHandler = props.filterHandler;
   return (
      <Form onSubmit={data => filterHandler(data)}>
         {({ formProps, dirty, submitting }) => (
            <form {...formProps}>
               <div style={getContainerStyle()}>
                  <div style={getFilterItemStyle(0)}>
                     <Field label="Start date" name="startDate" defaultValue={moment().startOf('isoWeek').format('YYYY-MM-DD')} >
                        {({ fieldProps, error, valid }) => <DatePicker {...fieldProps} />}
                     </Field>
                  </div>

                  <div style={getFilterItemStyle(1)}>
                     <Field label="End date" name="endDate" defaultValue={moment().endOf('isoWeek').format('YYYY-MM-DD')} >
                        {({ fieldProps, error, valid }) => <DatePicker {...fieldProps} />}
                     </Field>
                  </div>

                  <div style={getFilterItemStyle(2)}>
                     <Field label="User" name="user" defaultValue="" >
                        {({ fieldProps, error, valid }) => <Textfield {...fieldProps} />}
                     </Field>
                  </div>

                  <div style={getFilterItemStyle(3)}>
                     <Field label="Issue" name="issue" defaultValue="" >
                        {({ fieldProps, error, valid }) => <Textfield {...fieldProps} />}
                     </Field>
                  </div>

                  <div style={getButtonStyle()}>
                     <Button
                        type="submit"
                        appearance="primary"
                        isDisabled={submitting}>
                        Search
                     </Button>
                  </div>
               </div>
            </form>
         )}
      </Form>
   )
};

export default JiraPlanningCalendarFilter;