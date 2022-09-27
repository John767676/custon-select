import React, {useState} from 'react';
import Select, {SelectOptions} from "./Select";

const options = [
    {label: 'First', value: 1},
    {label: 'Second', value: 2},
    {label: 'Third', value: 3},
    {label: 'Fourth', value: 4},
    {label: 'Fifth', value: 5},
]

const App = () => {
    const [value,setValue] = useState<SelectOptions | undefined>(options[0]) //can be selected or nothing
    const [value1,setValue1] = useState<SelectOptions[]>([options[0]]) //can be arr of options or empty arr
    return (
        <>
            <Select options={options} value={value} onChange={o => setValue(o)}/>
            <Select multiple={true} options={options} value={value1} onChange={o => setValue1(o)}/>
        </>
    );
};

export default App;