import axios from 'axios'
import { useState,React } from 'react'



function Test(){
    const [inputFields, setInputFields] = useState([
        {name: '', age: ''}
    ])
    const [label, setLabel] = useState([
        
    ])
    const handleFormChange = (index, event) => {
        let data = [...inputFields];
        data[index][event.target.name] = event.target.value;
        setInputFields(data);
    }
    const addFields = () => {
        let newfield = { name: '', age: '' }

        setInputFields([...inputFields, newfield])
    }
    const submit = (e) => {
        e.preventDefault();
        inputFields.forEach((item,index)=>{
            axios.post("http://localhost:3002/shito",{"item":item})

        })
    }
    const handleLabelChange = (index,event) =>{
        let data = [...inputFields,event.target.value];


        setLabel(data)
    }
  
      return (
  
        <div className="App">
      <form>
        {inputFields.map((input, index) => {
             
          return (
          <>
           {console.log(label)}
            <div key={index}>
            <input type="text" value={label[index]} onChange={event => handleLabelChange(index,event)}></input>
            <textarea
              name='name'
              placeholder='Name'
              value={input.name}
              onChange={event => handleFormChange(index, event)}
            />
            <textarea
              name='age'
              placeholder='Age'
              value={input.age}
              onChange={event => handleFormChange(index, event)}
            ></textarea>
          </div>
            </>
          )
        })}
        <button type='button' onClick={addFields}>Add More..</button>
        <button type='button' onClick={submit}>Submit</button>
      </form>
    </div>

      );
    }

    

export default Test