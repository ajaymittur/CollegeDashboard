import React, { useState } from 'react'
import { Form, Button, Divider } from 'semantic-ui-react'

function FormExampleField() {
  const [subCount, setSubCount] = useState(0)
  return (
    <Form>
      <Form.Field
        name='subDisplay'
        onChange={(e) => setSubCount(Number(e.target.value))}
      >
        <label>Enter the number of subjects:</label>
        <input />
      </Form.Field>
      
      {[...Array(subCount)].map((e, i) => (
        <Form>
          <Form.Field key={i}>
            <label>Marks obtained in subject {i+1}:</label>
            <input />
            <label>Credits:</label>
            <input />
          </Form.Field>
        </Form>
      ))}
      <Divider></Divider>
      <Button>Submit</Button>
    </Form>
  )
}

export default FormExampleField
