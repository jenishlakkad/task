import React, { useState } from 'react'

const TaskPractice2 = () => {
    let [obj, setobj] = useState({})
    // let [array, setArray] = useState([])
    let [array, setArray] = useState(JSON.parse(localStorage.getItem('array')) || [])
    // let [count, setcount] = useState(0)
    let [count, setcount] = useState(JSON.parse(localStorage.getItem('count')) || 0)
    let [blankObj, setblankObj] = useState({})
    
    
    const getData  = async (e) =>{ 
            obj[e.target.name] = e.target.value
            blankObj[e.target.name] = ''
        console.log(obj);
        setblankObj({...blankObj})
        setobj({...obj})
    } 


    const saveData = () => {
        if(obj.id == undefined)
        {
            count++
            setcount(count)
            obj.id = count
            obj.check = false;
            array.push(obj);
            localStorage.setItem('count',JSON.stringify(count))
        }
        else
        {
            let index = array.findIndex(x => x.id == obj.id)
            array.splice(index,1,obj)
        }
        setArray([...array])
        localStorage.setItem('array', JSON.stringify(array))
        setobj({...blankObj})
    }

    const deleteData = (id) =>{
        let index = array.findIndex(x => x.id == id)
        array.splice(index,1)
        setobj({...obj})
        console.log('Pass');
        localStorage.setItem('array', JSON.stringify(array))
    } 
    const editData = (id) =>{
        let editObj = array.find(x => x.id == id)
        obj = editObj
        setobj({...obj})
    }

    const CompletedData = () => {
        array = JSON.parse(localStorage.getItem("array"));
        let arrayComp = [];
        array.forEach(x => {
            if(x.check){
                arrayComp = [ ...arrayComp , ...array.filter(y => y.id == x.id)];
            }
        })
        setArray([...arrayComp]);
    }

    const UncompletedData = () => {
        array = JSON.parse(localStorage.getItem("array"));
        let arrayComp = [];
        array.forEach(x => {
            if(!x.check){
                arrayComp = [ ...arrayComp , ...array.filter(y => y.id == x.id)];
            }
        })
        console.log(arrayComp);
        setArray([...arrayComp]);
    }

    const checkValue = (x , e) => {
        if(e.target.checked){
            x.check = true;
        }
        else{
            x.check = false;
        }
        localStorage.setItem("array" , JSON.stringify(array));
        setArray([...array]);
    }

    const allData = () => {
        array = JSON.parse(localStorage.getItem("array"));
        setArray([...array]);
    }
    
  return (
    <>
        <form className='w-50 mx-auto my-4'>
        <div className="mb-3">
            <label  className="form-label">Task </label>
            <input type="text" name='task' value={obj.task ?? ''} className="form-control" onChange={getData} id="exampleInputEmail1" aria-describedby="emailHelp"/>
        </div> 
        <button type="button" onClick={saveData} className="btn btn-primary my-2">Submit</button>
        <div className='mx-auto w-100 ' style={{margin:'0 auto'}}>
            <button type='button'  value='allTask' className='btn btn-light' onClick={allData}>All Task</button>
            <button type='button' value='CompletedTask' className='btn btn-light' onClick={CompletedData}>Completed Task</button>
            <button type='button' value='UncompletedTask' className='btn btn-light' onClick={UncompletedData}>Uncompleted Task</button>
        </div>
    </form> 

    <table className='table w-75 mx-auto border-1 table-dark'>
        <thead>
            <tr>
                <th>Checkbox</th>
                <th>Id</th>
                <th>Task</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
           {
            array.map((x,i) => {
                return(
                    <tr key={i}>
                        <td><input className='bg-dark' type='checkbox' name='task' value={x.id} onChange={(e) => checkValue(x , e)} checked={x.check}  /></td> 
                        <td>{x.id}</td>
                        <td>{x.task}</td>
                        <td>
                            <button type='button' onClick={() => editData(x.id)}  className='btn btn-light mx-2'>Edit</button>
                            <button type='button' onClick={() => deleteData(x.id)} className='btn btn-danger mx-2'>Delete</button>
                        </td>
                    </tr> 
                )
            })
           }
        </tbody>
    </table>
    

    </>
  )
}

export default TaskPractice2