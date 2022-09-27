import React, {useEffect, useRef, useState} from 'react';

export interface SelectOptions {
    label: string,
    value: string | number
}

interface MultipleSelectProps {
    multiple: true,
    value: SelectOptions[], //current selected option
    onChange: (value: SelectOptions[]) => void //ability to change the option
}

interface SingleSelectProps {
    multiple?: false,
    value?: SelectOptions, //current selected option
    onChange: (value: SelectOptions | undefined) => void //ability to change the option
}

type SelectProps = {
    options: SelectOptions[], //list of options
} & (SingleSelectProps | MultipleSelectProps)

const Select = ({multiple, value, onChange, options}:SelectProps) => {
    const [isOpen,setIsOpen] = useState(false) //is open options
    const [highlightedIndex,setHighlightedIndex] = useState(0) //chosen index (mouseover)
    // const containerRef = useRef<HTMLDivElement>(null)

    function clearOptions() {
        multiple ? onChange([]) : onChange(undefined) //if mult input set empt arr else undefined
    }

    function selectOption(option: SelectOptions) {
        if (multiple) {
            if (value.includes(option)) {
                onChange(value.filter(o => o !== option)) //if there are already this option then delete it from "input"
            } else {
                onChange([...value,option]) //else add it to array
            }
        } else {
            if(option !== value) onChange(option) //if single not an already option then set it in "input"
        }
    }

    function isOptionSelected(option: SelectOptions) {
        return multiple ? value.includes(option) : option === value //set darker blue color on what we mouseover OR what in a real "input"
    }

    useEffect(() => {
        if (isOpen) setHighlightedIndex(0)
    }, [isOpen]) //reset current index

    // useEffect(() => {
    //     const handler = (e:KeyboardEvent) => {
    //         if (e.target != containerRef.current) return
    //         switch (e.code) {
    //             case 'Enter':
    //             case 'Space':
    //                 setIsOpen(prevState => !prevState)
    //                 if (isOpen) selectOption(options[highlightedIndex])
    //                 break
    //             case 'ArrowUp':
    //             case 'ArrowDown': {
    //                 if (!isOpen) {
    //                     setIsOpen(true)
    //                     break
    //                 }
    //                 const newValue = highlightedIndex + (e.code === 'ArrowDown' ? 1 : -1)
    //                 if (newValue >= 0 && newValue < options.length) {
    //                     setHighlightedIndex(newValue)
    //                 }
    //                 break
    //             }
    //             case 'Escape':
    //                 setIsOpen(false)
    //                 break
    //         }
    //     }
    //
    //     containerRef.current?.addEventListener('keydown', handler)
    //
    //     return () => {
    //         containerRef.current?.removeEventListener('keydown', handler)
    //     }
    // }, [isOpen, highlightedIndex, options])

    return (
        <div className='m-5 p-2 relative border-2 rounded-lg flex gap-1.5 outline-none focus-within:border-blue-500 bg-gray-50 max-w-3xl lg:mx-auto h-fit'
             // ref={containerRef}
             onBlur={() => setIsOpen(false)}
             onClick={() => setIsOpen(prevState => !prevState)}
        >
            <span className='flex-1 flex gap-2 flex-wrap'>
                {multiple ? value.map(v => (
                        <button
                            className='px-1.5 flex items-center bg-gray-200 rounded-md hover:bg-red-300 justify-between'
                            key={v.value} onClick={e => {
                            e.stopPropagation()
                            selectOption(v)
                        }}>{v.label}
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                 stroke="currentColor" className="w-4 h-4">
                                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </span>
                        </button>
                )) : value?.label}
            </span>
            <button className='bg-gray-50 text-gray-500 w-5 h-5 self-center outline-none hover:text-gray-700'
            onClick={(e) => {
                e.stopPropagation()
                clearOptions()
            }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                     stroke="currentColor" className="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                </svg>
            </button>
            <div className='w-0.5 bg-gray-500'>

            </div>
            <div className='w-5 h-5 self-center cursor-pointer'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                     stroke="currentColor" className="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/>
                </svg>
            </div>
            <ul className={`m-0 p-0 max-h-36 overflow-y-auto absolute border-2 w-full -left-[0.1rem] top-[calc(100%_+_.5rem)] rounded-lg ${isOpen ? 'block' : 'hidden'} z-50 bg-gray-50`}>
                {options.map((option,index) => (
                    <li className={`p-0.5 cursor-pointer ${isOptionSelected(option) ? 'bg-blue-300' : ''} ${index === highlightedIndex ? 'bg-blue-500' : ''}`} key={option.label} onClick={e => {
                        e.stopPropagation()
                        selectOption(option)
                        setIsOpen(false)
                    }}
                    onMouseEnter={() => setHighlightedIndex(index)}
                    >{option.label}</li>
                ))}
            </ul>
        </div>
    );
};

export default Select;