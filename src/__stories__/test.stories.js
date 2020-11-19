import React from 'react'
import {MaskedTextField} from '@fluentui/react'
import moment from 'moment'

export default {
  title: 'POCs/Test',

}

export const EditingArrayOfInputFields = ()  => {
  const [fields,  setFields] = React.useState([
    {
      inputVal: '12:00',
      inTime: moment('12:00', 'HH:mm').valueOf(),
    }, {
      inputVal: '13:00',
      inTime: moment('13:00', 'HH:mm').valueOf()
    },{
      inputVal: '14:00',
      inTime: '14:00'
    }
  ])

  const handleChange = React.useCallback(({evt, item, idx, value}) => {
    console.log({
      targetVal: evt.target.value,
      value
    })
    // const value = evt.target.value;
    // console.log({
    //   value, targetVal: evt.target.value
    // })
    // const valMoment = moment(value, 'HH:mm')
    // let val = value
    // if(valMoment.isValid()) {
    //   val = valMoment.format('HH:mm')
    //   console.log({validVal: val})
    // }
    // setFields(fields => {
    //   return fields.map(
    //     (field, fieldIdx) => fieldIdx === idx ? val : field)
    // })
  },[])

  const handleClick = React.useCallback((evt) => {
    evt.target.select();
    evt.target.select(0,99999);
  },[])

  return (
    <>
      {fields.map((item, idx) => (
        <MaskedTextField
          type="text"
          key={idx}
          value={item.inputVal}
          onChange={(evt, value) => handleChange({evt, item, idx, value})}
          mask="99:99"
          onClick={handleClick}
        />
      ))}
      <pre>
          {JSON.stringify({fields},null, 2)}
      </pre>
    </>
  )
}
